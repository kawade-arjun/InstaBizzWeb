"use client";

import React, { useEffect, useRef, useState } from "react";
import { TeddyBuddy } from "./TeddyBuddy";

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export function PupCompanion() {
  const [mounted, setMounted] = useState(false);
  const [travelPos, setTravelPos] = useState<{ x: number; y: number; scale: number } | null>(null);
  const [travelPose, setTravelPose] = useState<"sit" | "walk" | "peek" | "bow" | "snug">("walk");
  const [travelFacing, setTravelFacing] = useState<"left" | "right">("right");

  const printsRef = useRef<HTMLDivElement>(null);
  const printIdxRef = useRef(0);
  const lastStampPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setMounted(true);

    let rafId: number;

    const onScrollOrFrame = () => {
      const stops = [...document.querySelectorAll<HTMLElement>("[data-pup-stop='true']")];
      if (stops.length < 2) return;

      const vh = window.innerHeight;
      const focalLine = vh * 0.48; // Viewport focal zone

      // Find which stops are above and below the focal line
      let activeIdx = 0;
      for (let i = 0; i < stops.length - 1; i++) {
        const rect = stops[i].getBoundingClientRect();
        if (rect.top <= focalLine) {
          activeIdx = i;
        }
      }

      const curStop = stops[activeIdx];
      const nextStop = stops[Math.min(activeIdx + 1, stops.length - 1)];

      const curRect = curStop.getBoundingClientRect();
      const nextRect = nextStop.getBoundingClientRect();

      const span = nextRect.top - curRect.top;

      if (span > 50 && activeIdx < stops.length - 1) {
        // Calculate progress between the two stops based on viewport focal line
        const rawProgress = (focalLine - curRect.top) / span;
        const progress = Math.min(1, Math.max(0, rawProgress));

        // When actively traveling between sections (progress between 0.15 and 0.85)
        if (progress > 0.15 && progress < 0.85) {
          const ease = progress * progress * (3 - 2 * progress);
          let x = curRect.left + (nextRect.left - curRect.left) * ease;
          let y = curRect.top + (nextRect.top - curRect.top) * ease;

          // Leap arch
          const hop = Math.sin(progress * Math.PI) * 45;
          y -= hop;

          // Clamp to safe viewport bounds so he NEVER scrolls off screen
          const safeTop = 80;
          const safeBottom = vh - 160;
          y = Math.min(safeBottom, Math.max(safeTop, y));

          const curScale = Math.max(0.4, Math.min(1.1, curRect.width / 300));
          const nextScale = Math.max(0.4, Math.min(1.1, nextRect.width / 300));
          const scale = curScale + (nextScale - curScale) * ease;

          const facing = nextRect.left >= curRect.left ? "right" : "left";

          setTravelPos({ x, y, scale: scale || 0.8 });
          setTravelPose("walk");
          setTravelFacing(facing);

          // Stamp paw prints along the movement trajectory
          if (printsRef.current) {
            const paws = printsRef.current.children;
            if (paws.length > 0) {
              const prev = lastStampPosRef.current;
              if (!prev || Math.hypot(x - prev.x, y - prev.y) > 30) {
                const paw = paws[printIdxRef.current % paws.length] as HTMLElement;
                printIdxRef.current++;

                const dx = prev ? x - prev.x : 1;
                const dy = prev ? y - prev.y : 0;
                const angle = Math.atan2(dy, dx) + Math.PI / 2;
                const size = 15 * Math.max(0.75, 1.3 * (scale || 0.8));

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

                lastStampPosRef.current = { x, y };
              }
            }
          }
        } else {
          // Settled near a section stop: hide the traveling companion so the section's dog is seen
          setTravelPos(null);
        }
      } else {
        setTravelPos(null);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScrollOrFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 24 Paw prints stamped along the travel trajectory */}
      <div ref={printsRef} aria-hidden="true" className="pup-prints">
        {Array.from({ length: 24 }).map((_, i) => (
          <svg key={i} viewBox="0 0 64 64" fill="currentColor">
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>

      {/* Leaping/Traveling companion actor when scrolling between sections */}
      {travelPos && (
        <div className="pup-layer" data-front="true" aria-hidden="true">
          <div
            className="pup-actor"
            style={{
              transform: `translate3d(${travelPos.x.toFixed(1)}px, ${travelPos.y.toFixed(1)}px, 0) scale(${travelPos.scale.toFixed(3)})`,
              transition: "transform 0.06s linear",
            }}
          >
            <div className="pup-actor__body">
              <TeddyBuddy
                pose={travelPose}
                facing={travelFacing}
                responsiveCursor={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
