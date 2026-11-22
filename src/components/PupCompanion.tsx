"use client";

import React, { useEffect, useRef, useState } from "react";
import { TeddyBuddy } from "./TeddyBuddy";

interface StopItem {
  el: HTMLElement;
  docTop: number;
  docLeft: number;
  width: number;
  scale: number;
  pose: "sit" | "bow" | "snug" | "peek" | "walk";
  facing: "left" | "right";
  act?: "tilt" | "basket" | "treadmill" | "peekaboo";
  behind: boolean;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val));
// Perlin smootherstep polynomial: 6t^5 - 15t^4 + 10t^3 (zero velocity & zero jerk at endpoints)
const smootherstep = (t: number) => t * t * t * (t * (6 * t - 15) + 10);

export function PupCompanion() {
  const [mounted, setMounted] = useState(false);
  const [currentPose, setCurrentPose] = useState<"sit" | "bow" | "snug" | "peek" | "walk">("peek");
  const [currentFacing, setCurrentFacing] = useState<"left" | "right">("right");
  const [currentAct, setCurrentAct] = useState<"tilt" | "basket" | "treadmill" | "peekaboo" | undefined>();
  const [isFront, setIsFront] = useState(false);

  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);

  const stopsRef = useRef<StopItem[]>([]);
  const printIdxRef = useRef(0);
  const lastStampPosRef = useRef<{ x: number; y: number } | null>(null);

  // Active state caches to prevent unnecessary React renders during 120fps RAF loop
  const activePoseRef = useRef<"sit" | "bow" | "snug" | "peek" | "walk">("peek");
  const activeFacingRef = useRef<"left" | "right">("right");
  const activeActRef = useRef<"tilt" | "basket" | "treadmill" | "peekaboo" | undefined>(undefined);
  const activeFrontRef = useRef<boolean>(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.dataset.pup = "live";

    const updateStops = () => {
      const stopEls = [...document.querySelectorAll<HTMLElement>("[data-pup-stop='true']")].filter(
        (el) => el.offsetParent !== null || el.getClientRects().length > 0
      );
      if (stopEls.length < 2) return;

      const scrollY = window.scrollY;

      const rawStops: StopItem[] = stopEls.map((el) => {
        const rect = el.getBoundingClientRect();
        const pose = (el.dataset.pose as any) || "sit";
        const facing = (el.dataset.facing as any) || "right";
        const act = (el.dataset.act as any) || undefined;
        const behind = el.dataset.behind === "true";
        const width = rect.width || 180;
        const baseScale = width ? width / 300 : 0.6;
        const scale = act === "basket" ? baseScale : Math.min(1.05, Math.max(0.48, 1.12 * baseScale));

        return {
          el,
          docTop: rect.top + scrollY,
          docLeft: rect.left,
          width,
          scale,
          pose,
          facing,
          act,
          behind,
        };
      });

      // Always sort by vertical document position to guarantee top-to-bottom sequence
      rawStops.sort((a, b) => a.docTop - b.docTop);
      stopsRef.current = rawStops;
    };

    updateStops();

    // ResizeObserver recalculates whenever images finish loading or page layout expands
    const resizeObserver = new ResizeObserver(() => {
      updateStops();
    });
    resizeObserver.observe(document.body);

    let rafId: number;

    const render = () => {
      const stops = stopsRef.current;
      if (stops.length < 2) {
        updateStops();
        return;
      }

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const focalY = scrollY + vh * 0.48;

      let curX = stops[0].docLeft;
      let curY = stops[0].docTop - scrollY;
      let scale = stops[0].scale;
      let pose = stops[0].pose;
      let facing = stops[0].facing;
      let act = stops[0].act;
      let behind = stops[0].behind;

      const firstStop = stops[0];
      const lastStop = stops[stops.length - 1];

      if (focalY <= firstStop.docTop) {
        // At the very top (Hero Scene)
        curX = firstStop.docLeft;
        curY = firstStop.docTop - scrollY;
        scale = firstStop.scale;
        pose = firstStop.pose;
        facing = firstStop.facing;
        act = firstStop.act;
        behind = firstStop.behind;
      } else if (focalY >= lastStop.docTop) {
        // At the very bottom (Footer Basket)
        curX = lastStop.docLeft;
        curY = lastStop.docTop - scrollY;
        scale = lastStop.scale;
        pose = lastStop.pose;
        facing = lastStop.facing;
        act = lastStop.act;
        behind = lastStop.behind;
      } else {
        // Find segment k where stops[k].docTop <= focalY < stops[k+1].docTop
        let k = 0;
        for (let i = 0; i < stops.length - 1; i++) {
          if (focalY >= stops[i].docTop) {
            k = i;
          }
        }

        const s0 = stops[k];
        const s1 = stops[k + 1];
        const span = Math.max(60, s1.docTop - s0.docTop);
        const p = clamp((focalY - s0.docTop) / span);

        // Responsive hold threshold: rest cleanly at each stop, walk actively between them
        const holdStart = 0.12;
        const holdEnd = 0.88;

        if (p < holdStart) {
          // Resting at stop s0
          curX = s0.docLeft;
          curY = s0.docTop - scrollY;
          scale = s0.scale;
          pose = s0.pose;
          facing = s0.facing;
          act = s0.act;
          behind = s0.behind;
        } else if (p > holdEnd) {
          // Arrived and resting at stop s1
          curX = s1.docLeft;
          curY = s1.docTop - scrollY;
          scale = s1.scale;
          pose = s1.pose;
          facing = s1.facing;
          act = s1.act;
          behind = s1.behind;
        } else {
          // ACTIVELY WALKING / TRAVELING BETWEEN STOPS
          const u = clamp((p - holdStart) / (holdEnd - holdStart));
          const w = smootherstep(u);

          pose = "walk";
          act = undefined;
          behind = false; // Always in front while traveling
          facing = s1.docLeft >= s0.docLeft ? "right" : "left";

          scale = lerp(s0.scale, s1.scale, w);

          // Interpolate coordinate path between s0 and s1
          const startX = s0.docLeft;
          const endX = s1.docLeft;
          const startY = s0.docTop - scrollY;
          const endY = s1.docTop - scrollY;

          curX = lerp(startX, endX, w);
          curY = lerp(startY, endY, w);

          // Playful hop arc
          const hop = Math.sin(u * Math.PI) * 32;
          curY -= hop;

          // Stamp golden paw prints along the movement trajectory
          if (printsRef.current) {
            const paws = printsRef.current.children;
            if (paws.length > 0) {
              const prev = lastStampPosRef.current;
              if (!prev || Math.hypot(curX - prev.x, curY - prev.y) > 28) {
                const paw = paws[printIdxRef.current % paws.length] as HTMLElement;
                printIdxRef.current++;

                const stepDx = prev ? curX - prev.x : 1;
                const stepDy = prev ? curY - prev.y : 0;
                const angle = Math.atan2(stepDy, stepDx) + Math.PI / 2;
                const pawSize = 15 * Math.max(0.75, 1.25 * (scale || 0.8));

                const docPawX = curX + (facing === "right" ? 175 : 125) * scale;
                const docPawY = curY + scrollY + 220 * scale;

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
      }

      // Safe viewport boundary clamping so Teddy never scrolls off the monitor
      const safeTop = 76;
      const safeBottom = vh - 150;
      curY = Math.min(safeBottom, Math.max(safeTop, curY));

      // 0ms delay hardware-composited GPU transform
      if (actorRef.current) {
        actorRef.current.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      }
      if (bodyRef.current) {
        bodyRef.current.style.transform = `scale(${scale.toFixed(4)})`;
      }

      // Sync React state only when changed to avoid layout re-render jitter
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
      const front = !behind;
      if (activeFrontRef.current !== front) {
        activeFrontRef.current = front;
        setIsFront(front);
      }
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
      resizeObserver.disconnect();
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
