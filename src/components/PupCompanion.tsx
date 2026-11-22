"use client";

import React, { useEffect, useRef, useState } from "react";
import { TeddyBuddy } from "./TeddyBuddy";

interface StopPoint {
  x: number;
  track: {
    kind: "page" | "pin" | "screen";
    top: number;
    from?: number;
    to?: number;
  };
  s: number;
  behind: boolean;
  sink: number;
  box: [number, number, number, number];
  pose: "sit" | "bow" | "snug" | "peek" | "walk";
  facing: "left" | "right";
  act?: "tilt" | "basket" | "treadmill" | "peekaboo";
}

interface StopHold {
  from: number;
  to: number;
}

const D_ANCHOR = { x: 150, y: 228 };
const DEFAULT_BOX: [number, number, number, number] = [48, 30, 288, 236];

const BOXES: Record<string, [number, number, number, number]> = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236],
  walk: [48, 30, 288, 236],
};

const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val));
const smootherstep = (t: number) => t * t * t * (t * (6 * t - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Soft boundary clamping via soft-plus to avoid hard collisions
const softMax = (val: number, min: number, k = 8) => {
  const diff = (val - min) / k;
  return diff > 20 ? val : min + k * Math.log1p(Math.exp(diff));
};
const softMin = (val: number, max: number, k = 8) => -softMax(-val, -max, k);

function softClamp(
  x: number,
  y: number,
  scale: number,
  box: [number, number, number, number],
  safe: { left: number; top: number; right: number; bottom: number },
  k = 8
) {
  const leftInset = (D_ANCHOR.x - box[0]) * scale;
  const rightInset = (box[2] - D_ANCHOR.x) * scale;
  const topInset = (D_ANCHOR.y - box[1]) * scale;
  const bottomInset = (box[3] - D_ANCHOR.y) * scale;

  let clampedX = x;
  if (safe.right - safe.left > leftInset + rightInset) {
    clampedX = softMin(softMax(x, safe.left + leftInset, k), safe.right - rightInset, k);
  } else {
    clampedX = (safe.left + safe.right) / 2 - (rightInset - leftInset) / 2;
  }

  let clampedY = y;
  if (safe.bottom - safe.top > topInset + bottomInset) {
    clampedY = softMin(softMax(y, safe.top + topInset, k), safe.bottom - bottomInset, k);
  } else {
    clampedY = safe.bottom - bottomInset;
  }

  return { x: clampedX, y: clampedY };
}

function bezierPoint(
  p0: { x: number; y: number },
  c1: { x: number; y: number },
  c2: { x: number; y: number },
  p1: { x: number; y: number },
  t: number
) {
  const inv = 1 - t;
  const inv2 = inv * inv;
  const inv3 = inv2 * inv;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: inv3 * p0.x + 3 * inv2 * t * c1.x + 3 * inv * t2 * c2.x + t3 * p1.x,
    y: inv3 * p0.y + 3 * inv2 * t * c1.y + 3 * inv * t2 * c2.y + t3 * p1.y,
  };
}

function getStopViewportPos(stop: StopPoint, scrollY: number) {
  const track = stop.track;
  let topY = 0;
  if (track.kind === "page") {
    topY = track.top - scrollY;
  } else if (track.kind === "screen") {
    topY = track.top;
  } else {
    // Pin / Sticky tracking
    const from = track.from ?? 0;
    const to = track.to ?? 0;
    if (scrollY < from) {
      topY = track.top - (scrollY - from);
    } else if (scrollY > to) {
      topY = track.top - (scrollY - to);
    } else {
      topY = track.top;
    }
  }

  return {
    x: stop.x + D_ANCHOR.x * stop.s,
    y: topY + D_ANCHOR.y * stop.s,
  };
}

export function PupCompanion() {
  const [mounted, setMounted] = useState(false);
  const [currentPose, setCurrentPose] = useState<"sit" | "bow" | "snug" | "peek" | "walk">("peek");
  const [currentFacing, setCurrentFacing] = useState<"left" | "right">("right");
  const [currentAct, setCurrentAct] = useState<"tilt" | "basket" | "treadmill" | "peekaboo" | undefined>();
  const [isFront, setIsFront] = useState(false);

  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);

  const stopsRef = useRef<StopPoint[]>([]);
  const holdsRef = useRef<StopHold[]>([]);
  const printIdxRef = useRef(0);
  const lastStampPosRef = useRef<{ x: number; y: number } | null>(null);

  // Active state caches to prevent unnecessary React renders in RAF loop
  const activePoseRef = useRef<"sit" | "bow" | "snug" | "peek" | "walk">("peek");
  const activeFacingRef = useRef<"left" | "right">("right");
  const activeActRef = useRef<"tilt" | "basket" | "treadmill" | "peekaboo" | undefined>(undefined);
  const activeFrontRef = useRef<boolean>(false);
  const prevCoordRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setMounted(true);
    document.documentElement.dataset.pup = "live";

    const updateStops = () => {
      const stopEls = [...document.querySelectorAll<HTMLElement>("[data-pup-stop='true']")].filter(
        (el) => el.getClientRects().length > 0
      );
      if (stopEls.length < 2) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = document.documentElement.clientWidth;
      const headerH = document.getElementById("site-header")?.offsetHeight ?? 76;
      const safe = {
        left: 10,
        top: headerH + 10,
        right: vw - 10,
        bottom: vh - 10,
      };

      const stops: StopPoint[] = [];
      const rawHolds: StopHold[] = [];

      stopEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const pose = (el.dataset.pose as any) || "sit";
        const facing = (el.dataset.facing as any) || "right";
        const act = (el.dataset.act as any) || undefined;
        const behind = el.dataset.behind === "true";
        const box = BOXES[pose] || DEFAULT_BOX;

        const baseScale = rect.width ? rect.width / 300 : 0.6;
        const scale = act === "basket" ? baseScale : Math.min(1.05, Math.max(0.46, 1.12 * baseScale));

        // Detect if stop is inside a sticky parent (e.g. Hall of Doors runway)
        let stickyParent: HTMLElement | null = null;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          if (getComputedStyle(p).position === "sticky") {
            stickyParent = p;
            break;
          }
        }

        let track: StopPoint["track"];
        if (stickyParent) {
          const s = parseFloat(getComputedStyle(stickyParent).top) || 0;
          const n = rect.top - stickyParent.getBoundingClientRect().top;
          const oldPos = stickyParent.style.position;
          stickyParent.style.position = "relative";
          const stickyRect = stickyParent.getBoundingClientRect();
          const parent = stickyParent.parentElement!;
          const parentBottom =
            parent.getBoundingClientRect().bottom - (parseFloat(getComputedStyle(parent).paddingBottom) || 0);
          stickyParent.style.position = oldPos;

          const from = stickyRect.top + scrollY - s;
          const to = parentBottom + scrollY - stickyRect.height - s;

          if (to <= from) {
            track = { kind: "page", top: stickyRect.top + scrollY + n };
          } else {
            track = { kind: "pin", top: s + n, from, to };
          }
        } else {
          track = { kind: "page", top: rect.top + scrollY };
        }

        const stopPoint: StopPoint = {
          x: rect.left,
          track,
          s: scale,
          behind,
          sink: 0,
          box,
          pose,
          facing,
          act,
        };
        stops.push(stopPoint);

        // Compute natural scroll hold window where this stop is comfortably centered
        if (track.kind === "pin") {
          rawHolds.push({ from: track.from!, to: track.to! });
        } else {
          const s = track.top;
          const topEdge = s + box[1] * scale;
          const bottomEdge = s + box[3] * scale;
          const mid = (topEdge + bottomEdge) / 2;
          const safeH = safe.bottom - safe.top;
          let o = mid - (safe.top + 0.72 * safeH);
          let d = mid - (safe.top + 0.44 * safeH);
          o = Math.max(o, bottomEdge - safe.bottom);
          d = Math.min(d, topEdge - safe.top);
          if (o > d) {
            o = d = mid - (safe.top + safeH / 2);
          }
          rawHolds.push({ from: Math.min(o, d), to: Math.max(o, d) });
        }
      });

      // Chain and resolve hold intervals into a continuous uninterrupted sequence
      const maxDocScroll = document.documentElement.scrollHeight - vh;
      const holds: StopHold[] = rawHolds.map((h) => ({ from: h.from, to: h.to }));

      if (holds.length > 0) {
        holds[0].from = -Infinity;
        holds[holds.length - 1].to = Infinity;
        holds[holds.length - 1].from = Math.min(holds[holds.length - 1].from, maxDocScroll - 1);

        for (let i = 0; i < holds.length - 1; i++) {
          const cur = holds[i];
          const next = holds[i + 1];

          // Ensure travel distance between stops has comfortable scroll runway
          const minRunway = Math.min(1.2 * vh, Math.max(0.45 * vh, 0.8 * (next.from - cur.to)));
          if (next.from < cur.to + minRunway) {
            const midpoint = (cur.to + next.from) / 2;
            cur.to = Math.max(cur.from, midpoint - minRunway / 2);
            next.from = Math.min(next.to, midpoint + minRunway / 2);
          }
        }
      }

      stopsRef.current = stops;
      holdsRef.current = holds;
    };

    updateStops();

    let rafId: number;

    const render = () => {
      const stops = stopsRef.current;
      const holds = holdsRef.current;
      if (stops.length < 2 || holds.length < 2) {
        updateStops();
        return;
      }

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = document.documentElement.clientWidth;
      const headerH = document.getElementById("site-header")?.offsetHeight ?? 76;
      const safe = {
        left: 10,
        top: headerH + 10,
        right: vw - 10,
        bottom: vh - 10,
      };

      // Determine active segment index k and progress t [0..1]
      let k = 0;
      let t = 0;

      if (scrollY <= holds[0].to) {
        k = 0;
        t = 0;
      } else if (scrollY >= holds[holds.length - 1].from) {
        k = stops.length - 1;
        t = 0;
      } else {
        for (let i = 0; i < holds.length - 1; i++) {
          const curEnd = holds[i].to;
          const nextStart = holds[i + 1].from;
          if (scrollY < nextStart) {
            k = i;
            const span = Math.max(1, nextStart - curEnd);
            t = clamp((scrollY - curEnd) / span);
            break;
          } else if (scrollY <= holds[i + 1].to) {
            k = i + 1;
            t = 0;
            break;
          }
        }
      }

      let curX = 0;
      let curY = 0;
      let scale = stops[k].s;
      let front = !stops[k].behind;
      let pose: "sit" | "bow" | "snug" | "peek" | "walk" = stops[k].pose;
      let facing: "left" | "right" = stops[k].facing;
      let act: "tilt" | "basket" | "treadmill" | "peekaboo" | undefined = stops[k].act;

      if (t <= 0 || k >= stops.length - 1) {
        // Holding cleanly at stop k
        const stopPos = getStopViewportPos(stops[k], scrollY);
        const clamped = softClamp(stopPos.x, stopPos.y, stops[k].s, stops[k].box, safe);
        curX = clamped.x;
        curY = clamped.y;
        scale = stops[k].s;
        front = !stops[k].behind;
        pose = stops[k].pose;
        facing = stops[k].facing;
        act = stops[k].act;
      } else {
        // Traveling continuously along Hermite / Bezier trajectory between stops[k] and stops[k+1]
        const s0 = stops[k];
        const s1 = stops[k + 1];
        const h0End = holds[k].to;
        const h1Start = holds[k + 1].from;

        const p0 = getStopViewportPos(s0, h0End);
        const p1 = getStopViewportPos(s1, h1Start);

        // Compute curved bezier control points
        const dx = p1.x - p0.x;
        const lateralArc = Math.max(0.42 * Math.abs(dx), 24);
        const dir = dx >= 0 ? 1 : -1;
        const c1 = {
          x: clamp(p0.x + dir * lateralArc, safe.left, safe.right),
          y: clamp(p0.y, safe.top, safe.bottom),
        };
        const c2 = {
          x: clamp(p1.x - dir * lateralArc, safe.left, safe.right),
          y: clamp(p1.y, safe.top, safe.bottom),
        };

        const w = smootherstep(t);
        const bezierPt = bezierPoint(p0, c1, c2, p1, w);

        scale = lerp(s0.s, s1.s, smootherstep(t));

        // Blend with the natural page movement
        const blendR = 0.18;
        const S_blend = 1 - clamp(t / blendR);
        const T_blend = clamp((t - (1 - blendR)) / blendR);

        const currentS0Pos = getStopViewportPos(s0, scrollY);
        const currentS1Pos = getStopViewportPos(s1, scrollY);

        let targetY = bezierPt.y + S_blend * (currentS0Pos.y - p0.y) + T_blend * (currentS1Pos.y - p1.y);
        let targetX = bezierPt.x;

        // Playful hop arc when transitioning out of or into behind elements
        if (s0.behind && t < 0.36) {
          targetY -= Math.sin((t / 0.36) * Math.PI) * Math.min(56 * s0.s, 64);
        }
        if (s1.behind && t > 0.68) {
          targetY -= Math.sin(((t - 0.68) / 0.32) * Math.PI) * Math.min(48 * s1.s, 54);
        }

        const currentBox: [number, number, number, number] = [
          lerp(s0.box[0], s1.box[0], t),
          lerp(s0.box[1], s1.box[1], t),
          lerp(s0.box[2], s1.box[2], t),
          lerp(s0.box[3], s1.box[3], t),
        ];

        const clamped = softClamp(targetX, targetY, scale, currentBox, safe);
        curX = clamped.x;
        curY = clamped.y;

        // Front layer during flight, slips behind only at arrival/departure
        front = !(s0.behind && t < 0.12 || s1.behind && t > 0.92);

        pose = "walk";
        facing = dx >= 0 ? "right" : "left";
        act = undefined;

        // Stamp 24 golden background paw prints along the movement trajectory
        if (printsRef.current) {
          const paws = printsRef.current.children;
          if (paws.length > 0) {
            const prev = lastStampPosRef.current;
            if (!prev || Math.hypot(curX - prev.x, curY - prev.y) > 30) {
              const paw = paws[printIdxRef.current % paws.length] as HTMLElement;
              printIdxRef.current++;

              const stepDx = prev ? curX - prev.x : 1;
              const stepDy = prev ? curY - prev.y : 0;
              const angle = Math.atan2(stepDy, stepDx) + Math.PI / 2;
              const pawSize = 15 * Math.max(0.75, 1.25 * (scale || 0.8));

              // Compute paw position in document coordinates
              const docPawX = curX - D_ANCHOR.x * scale + (facing === "right" ? 175 : 125) * scale;
              const docPawY = curY - D_ANCHOR.y * scale + scrollY + 220 * scale;

              paw.style.transform = `translate(${(docPawX - pawSize / 2).toFixed(1)}px, ${(docPawY - pawSize / 2).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
              paw.style.width = `${pawSize.toFixed(1)}px`;
              paw.style.height = `${pawSize.toFixed(1)}px`;

              paw.animate(
                [
                  { opacity: 0 },
                  { opacity: 0.52, offset: 0.08 },
                  { opacity: 0.52, offset: 0.55 },
                  { opacity: 0 },
                ],
                { duration: 2600, easing: "ease-out" }
              );

              lastStampPosRef.current = { x: curX, y: curY };
            }
          }
        }
      }

      // Smooth hardware transform on GPU compositor — 0ms lag, 120fps fluid
      if (actorRef.current) {
        actorRef.current.style.transform = `translate3d(${(curX - D_ANCHOR.x * scale).toFixed(2)}px, ${(curY - D_ANCHOR.y * scale).toFixed(2)}px, 0)`;
      }
      if (bodyRef.current) {
        bodyRef.current.style.transform = `scale(${scale.toFixed(4)})`;
      }

      // Sync state changes only when they actually differ to preserve 60-120fps render budget
      if (activePoseRef.current !== pose) {
        activePoseRef.current = pose;
        setCurrentPose(pose);
      }
      if (activeFacingRef.current !== facing) {
        activeFacingRef.current = facing;
        setCurrentFacing(facing);
      }
      if (activeActRef.current !== act) {
        activeActRef.current = act;
        setCurrentAct(act);
      }
      if (activeFrontRef.current !== front) {
        activeFrontRef.current = front;
        setIsFront(front);
      }

      prevCoordRef.current = { x: curX, y: curY };
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      updateStops();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    render();

    return () => {
      delete document.documentElement.dataset.pup;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 24 Paw prints stamped along the dog's path in document space */}
      <div ref={printsRef} aria-hidden="true" className="pup-prints">
        {Array.from({ length: 24 }).map((_, i) => (
          <svg key={i} viewBox="0 0 64 64" fill="currentColor">
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
        ))}
      </div>

      {/* Single persistent traveling companion actor across the entire page */}
      <div
        className="pup-layer"
        data-front={isFront ? "true" : "false"}
        aria-hidden="true"
      >
        <div
          ref={actorRef}
          className="pup-actor"
          style={{
            willChange: "transform",
            transition: "none", // Zero CSS delay for instantaneous 0-lag 120fps tracking
          }}
        >
          <div ref={bodyRef} className="pup-actor__body">
            <TeddyBuddy
              pose={currentPose}
              facing={currentFacing}
              act={currentAct}
              responsiveCursor={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
