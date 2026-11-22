"use client";

import React, { useEffect, useRef } from "react";

interface RevealScopeProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealScope({ children, className }: RevealScopeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      container.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.dataset.revealed = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.dataset.revealed = "true";
            observer.unobserve(target);
          }
        });
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.08,
      }
    );

    const armAndObserve = (el: HTMLElement) => {
      if (el.dataset.revealed === "true") return;

      const rect = el.getBoundingClientRect();
      // If already in viewport on load, reveal immediately
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.dataset.revealed = "true";
      } else {
        el.dataset.armed = "true";
        observer.observe(el);
      }
    };

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    elements.forEach(armAndObserve);

    // Watch for dynamic DOM additions
    const mutationObserver = new MutationObserver(() => {
      const newElements = container.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
      newElements.forEach(armAndObserve);
    });

    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
