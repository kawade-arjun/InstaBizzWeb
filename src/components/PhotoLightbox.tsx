"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export interface Photo {
  id: string;
  url: string;
  kind?: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

interface PhotoLightboxProps {
  photos: Photo[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = currentIndex !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = "";
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (currentIndex === null || !photos[currentIndex]) return null;

  const photo = photos[currentIndex];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label="Photo viewer"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70 fixed inset-0 z-50 flex flex-col justify-between"
    >
      {/* Top action bar */}
      <div className="flex items-center justify-between p-4 md:p-6 text-sm">
        <span className="font-scrawl text-honey text-base">
          {currentIndex + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-milk/10 px-4 py-2 font-semibold text-milk hover:bg-milk/20 transition-colors cursor-pointer"
        >
          Close [Esc]
        </button>
      </div>

      {/* Main Image container */}
      <div className="relative flex-1 flex items-center justify-center p-4">
        <div className="relative max-w-4xl max-h-[75vh] w-full h-full flex items-center justify-center">
          <Image
            src={photo.url}
            alt={photo.alt || "Happy family puppy photo"}
            width={photo.width || 1200}
            height={photo.height || 1200}
            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            unoptimized={photo.url.startsWith("http")}
          />
        </div>

        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous photo"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-milk/15 p-3 hover:bg-milk/30 transition-colors text-milk cursor-pointer"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next photo"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-milk/15 p-3 hover:bg-milk/30 transition-colors text-milk cursor-pointer"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom caption */}
      <div className="p-4 md:p-6 text-center">
        <p className="font-scrawl text-honey text-base">
          {photo.caption || photo.alt || "Loving moments with TeddyPups"}
        </p>
      </div>
    </dialog>
  );
}
