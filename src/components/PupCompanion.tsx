"use client";

import React, { useEffect, useRef, useState } from "react";
import { TeddyBuddy } from "./TeddyBuddy";

interface StopInfo {
  el: HTMLElement;
  docTop: number;
  docLeft: number;
  width: number;
  height: number;
  pose: "sit" | "bow" | "snug" | "peek" | "walk";
  facing: "left" | "right";
  act?: "tilt" | "basket" | "treadmill" | "peekaboo";
  isBehind: boolean;
}

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export function PupCompanion() {
  const [mounted, setMounted] = useState(false);
  const [actorPos, setActorPos] = useState({ x: 0, y: 0, scale: 0.8 });
  const [currentPose, setCurrentPose] = useState<"sit" | "bow" | "snug" | "peek" | "walk">("peek");
  const [currentFacing, setCurrentFacing] = useState<"left" | "right">("right");
  const [currentAct, setCurrentAct] = useState<"tilt" | "basket" | "treadmill" | "peekaboo" | undefined>();
  const [isFront, setIsFront] = useState(false);

  const actorRef = useRef<HTMLDivElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<StopInfo[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const printIndexRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    document.documentElement.dataset.pup = "true";

    const cacheStops = () => {
      const stopEls = [...document.querySelectorAll<HTMLElement>("[data-pup-stop='true']")];
      if (stopEls.length === 0) return;

      const scrollY = window.scrollY;
      stopsRef.current = stopEls.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          docTop: rect.top + scrollY,
          docLeft: rect.left,
          width: rect.width,
          height: rect.height,
          pose: (el.dataset.pose as any) || "sit",
          facing: (el.dataset.facing as any) || "right",
          act: (el.dataset.act as any) || undefined,
          isBehind: el.dataset.behind === "true",
        };
      });
    };

    cacheStops();

    let rafId: number;

    const onScrollOrFrame = () => {
      const stops = stopsRef.current;
      if (stops.length === 0) {
        cacheStops();
        return;
      }

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const focalLine = scrollY + vh * 0.48;

      // Find the segment [k, k + 1]
      let k = 0;
      for (let i = 0; i < stops.length - 1; i++) {
        if (focalLine >= stops[i].docTop) {
          k = i;
        }
      }

      const curStop = stops[k];
      const nextStop = stops[Math.min(k + 1, stops.length - 1)];

      let x = curStop.docLeft;
      let y = curStop.docTop - scrollY;
      let scale = Math.max(0.4, Math.min(1.2, curStop.width / 300));
      let pose = curStop.pose;
      let facing = curStop.facing;
      let act = curStop.act;
      let isBehind = curStop.isBehind;

      if (k < stops.length - 1 && nextStop.docTop > curStop.docTop) {
        const segmentDist = nextStop.docTop - curStop.docTop;
        const progress = Math.min(1, Math.max(0, (focalLine - curStop.docTop) / segmentDist));

        // Smooth cubic easing for travel between stops
        const ease = progress * progress * (3 - 2 * progress);

        const curRect = curStop.el.getBoundingClientRect();
        const nextRect = nextStop.el.getBoundingClientRect();

        x = curRect.left + (nextRect.left - curRect.left) * ease;
        y = curRect.top + (nextRect.top - curRect.top) * ease;

        const curScale = Math.max(0.4, Math.min(1.2, curStop.width / 300));
        const nextScale = Math.max(0.4, Math.min(1.2, nextStop.width / 300));
        scale = curScale + (nextScale - curScale) * ease;

        if (progress > 0.12 && progress < 0.88) {
          // Playful leap arch between stops
          const hop = Math.sin(progress * Math.PI) * 45;
          y -= hop;
          pose = "walk";
          facing = nextRect.left >= curRect.left ? "right" : "left";
          act = undefined;
          isBehind = false;

          // Stamp paw prints along the travel path
          if (printsRef.current && lastPosRef.current) {
            const dx = x - lastPosRef.current.x;
            const dy = y - lastPosRef.current.y;
            const dist = Math.hypot(dx, dy);

            if (dist > 32) {
              const paws = printsRef.current.children;
              if (paws.length > 0) {
                const paw = paws[printIndexRef.current % paws.length] as HTMLElement;
                printIndexRef.current++;

                const angle = Math.atan2(dy, dx) + Math.PI / 2;
                const size = 15 * Math.max(0.75, 1.3 * scale);

                paw.style.transform = `translate(${(x + 150 * scale - size / 2).toFixed(1)}px, ${(y + 200 * scale - size / 2).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
                paw.style.width = `${size.toFixed(1)}px`;
                paw.style.height = `${size.toFixed(1)}px`;

                paw.animate(
                  [
                    { opacity: 0 },
                    { opacity: 0.5, offset: 0.08 },
                    { opacity: 0.5, offset: 0.5 },
                    { opacity: 0 },
                  ],
                  { duration: 2600, easing: "ease-out" }
                );
              }
              lastPosRef.current = { x, y };
            }
          } else {
            lastPosRef.current = { x, y };
          }
        } else if (progress >= 0.88) {
          pose = nextStop.pose;
          facing = nextStop.facing;
          act = nextStop.act;
          isBehind = nextStop.isBehind;
        } else {
          pose = curStop.pose;
          facing = curStop.facing;
          act = curStop.act;
          isBehind = curStop.isBehind;
        }
      } else {
        const curRect = curStop.el.getBoundingClientRect();
        x = curRect.left;
        y = curRect.top;
        pose = curStop.pose;
        facing = curStop.facing;
        act = curStop.act;
        isBehind = curStop.isBehind;
      }

      setActorPos({ x, y, scale: scale || 0.8 });
      setCurrentPose(pose);
      setCurrentFacing(facing);
      setCurrentAct(act);
      setIsFront(!isBehind);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScrollOrFrame);
    };

    const handleResize = () => {
      cacheStops();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    handleScroll();

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
      {/* 24 Paw prints stamped along the dog's path */}
      <div ref={printsRef} aria-hidden="true" className="pup-prints">
        {Array.from({ length: 24 }).map((_, i) => (
          <svg key={i} viewBox="0 0 64 64" fill="currentColor">
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>

      {/* Persistent companion actor layer */}
      <div
        className="pup-layer"
        data-front={isFront ? "true" : "false"}
        aria-hidden="true"
      >
        <div
          ref={actorRef}
          className="pup-actor"
          style={{
            transform: `translate3d(${actorPos.x.toFixed(1)}px, ${actorPos.y.toFixed(1)}px, 0) scale(${actorPos.scale.toFixed(3)})`,
            transition: "transform 0.08s linear",
          }}
        >
          <div className="pup-actor__body">
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
