"use client";

import React, { useEffect, useRef } from "react";

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  scale: number;
  createdAt: number;
}

export function PupCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const printsRef = useRef<PawPrint[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const stepCountRef = useRef(0);
  const nextIdRef = useRef(0);

  useEffect(() => {
    // Check for reduced motion or coarse pointer (touch devices)
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const minDistance = 38; // px between prints
    const maxLifeTime = 850; // ms to live

    const handlePointerMove = (e: PointerEvent) => {
      // Calculate absolute coordinates in page
      const currentX = e.pageX;
      const currentY = e.pageY;

      if (!lastPosRef.current) {
        lastPosRef.current = { x: currentX, y: currentY };
        return;
      }

      const dx = currentX - lastPosRef.current.x;
      const dy = currentY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist >= minDistance) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        stepCountRef.current += 1;
        
        // Alternate left/right offset for natural gait
        const sideOffset = (stepCountRef.current % 2 === 0 ? -7 : 7);
        const rad = ((angle - 90) * Math.PI) / 180;
        const normX = -Math.sin(rad) * sideOffset;
        const normY = Math.cos(rad) * sideOffset;

        const newPrint: PawPrint = {
          id: nextIdRef.current++,
          x: currentX + normX,
          y: currentY + normY,
          rotation: angle,
          opacity: 0.72,
          scale: 1.08,
          createdAt: performance.now(),
        };

        printsRef.current.push(newPrint);
        lastPosRef.current = { x: currentX, y: currentY };
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let animId: number;
    const updateLoop = () => {
      const now = performance.now();
      const container = containerRef.current;

      if (container) {
        // Filter out expired prints
        printsRef.current = printsRef.current.filter((p) => {
          const age = now - p.createdAt;
          return age < maxLifeTime;
        });

        // Update DOM elements inside container
        container.innerHTML = "";
        for (const p of printsRef.current) {
          const age = now - p.createdAt;
          const progress = age / maxLifeTime;
          const currentOpacity = (1 - progress) * 0.7;
          const currentScale = 1.08 - progress * 0.12;

          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("viewBox", "0 0 64 64");
          svg.style.position = "absolute";
          svg.style.left = `${p.x - 7.5}px`;
          svg.style.top = `${p.y - 7.5}px`;
          svg.style.width = "15px";
          svg.style.height = "15px";
          svg.style.fill = "#c2622b";
          svg.style.opacity = currentOpacity.toFixed(3);
          svg.style.transform = `rotate(${p.rotation.toFixed(1)}deg) scale(${currentScale.toFixed(3)})`;
          svg.style.pointerEvents = "none";
          svg.style.zIndex = "5";

          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute(
            "d",
            "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
          );
          svg.appendChild(path);
          container.appendChild(svg);
        }
      }

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pup-prints pointer-events-none fixed inset-0 overflow-hidden z-20"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    />
  );
}
