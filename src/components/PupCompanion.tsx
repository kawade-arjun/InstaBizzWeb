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
  isBehind: boolean;
}

export function PupCompanion() {
  const [mounted, setMounted] = useState(false);
  const [actorPos, setActorPos] = useState({ x: 0, y: 0, scale: 0.8 });
  const [currentPose, setCurrentPose] = useState<"sit" | "bow" | "snug" | "peek" | "walk">("peek");
  const [currentFacing, setCurrentFacing] = useState<"left" | "right">("right");
  const [isFront, setIsFront] = useState(false);

  const actorRef = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<StopInfo[]>([]);

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
      const focalLine = scrollY + vh * 0.45;

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
      let isBehind = curStop.isBehind;

      if (k < stops.length - 1 && nextStop.docTop > curStop.docTop) {
        const segmentDist = nextStop.docTop - curStop.docTop;
        const progress = Math.min(1, Math.max(0, (focalLine - curStop.docTop) / segmentDist));

        // Smooth cubic easing for travel
        const ease = progress * progress * (3 - 2 * progress);

        // Current target element rects in live viewport
        const curRect = curStop.el.getBoundingClientRect();
        const nextRect = nextStop.el.getBoundingClientRect();

        x = curRect.left + (nextRect.left - curRect.left) * ease;
        y = curRect.top + (nextRect.top - curRect.top) * ease;

        const curScale = Math.max(0.4, Math.min(1.2, curStop.width / 300));
        const nextScale = Math.max(0.4, Math.min(1.2, nextStop.width / 300));
        scale = curScale + (nextScale - curScale) * ease;

        if (progress > 0.15 && progress < 0.85) {
          // Traveling between stops: playful hop arc
          const hop = Math.sin(progress * Math.PI) * 45;
          y -= hop;
          pose = "walk";
          facing = nextRect.left >= curRect.left ? "right" : "left";
          isBehind = false;
        } else if (progress >= 0.85) {
          pose = nextStop.pose;
          facing = nextStop.facing;
          isBehind = nextStop.isBehind;
        } else {
          pose = curStop.pose;
          facing = curStop.facing;
          isBehind = curStop.isBehind;
        }
      } else {
        const curRect = curStop.el.getBoundingClientRect();
        x = curRect.left;
        y = curRect.top;
      }

      setActorPos({ x, y, scale: scale || 0.8 });
      setCurrentPose(pose);
      setCurrentFacing(facing);
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
            responsiveCursor={true}
          />
        </div>
      </div>
    </div>
  );
}
