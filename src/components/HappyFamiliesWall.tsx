"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PhotoLightbox, Photo } from "@/components/PhotoLightbox";

interface FamilyItem {
  id: string;
  url: string;
  kind?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

interface HappyFamiliesWallProps {
  families: FamilyItem[];
}

export function HappyFamiliesWall({ families }: HappyFamiliesWallProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const tilts = ["-2.2deg", "1.6deg", "-1.8deg", "2.1deg", "-0.8deg", "1.4deg", "-2.5deg"];
  const tapeColors = ["#f6d79a", "#cfe5f6", "#f9cdbf", "#fbe3b4"];

  const lightboxPhotos: Photo[] = families.map((f, i) => ({
    id: f.id,
    url: f.url,
    kind: f.kind,
    width: f.width || 1200,
    height: f.height || 1200,
    alt: f.alt || f.caption || `TeddyPups family photo ${i + 1}`,
    caption: f.caption,
  }));

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % families.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + families.length) % families.length);
  };

  return (
    <>
      <ul className="tp-wall" aria-label="Photos from TeddyPups families">
        {families.map((fam, i) => {
          const tilt = tilts[i % tilts.length];
          const tape = tapeColors[i % tapeColors.length];

          return (
            <li
              key={fam.id}
              className="tp-wall__item"
              data-reveal="true"
              style={{ "--d": `${(i % 8) * 60}ms` } as React.CSSProperties}
            >
              <button
                type="button"
                className="tp-wall__print cursor-pointer"
                aria-label={`Open photo ${i + 1} of ${families.length}`}
                onClick={() => setActivePhotoIndex(i)}
              >
                <span
                  className="tp-polaroid block bg-white p-3 pb-6 rounded-md shadow-lg transition-all"
                  style={{ "--tilt": tilt, "--tape": tape, "--i": i } as React.CSSProperties}
                >
                  <span aria-hidden="true" className="tp-tape tp-tape--center" />
                  <span className="tp-polaroid__photo block relative aspect-square overflow-hidden rounded bg-honey/10">
                    <Image
                      alt={fam.caption || `TeddyPups family photo ${i + 1}`}
                      src={fam.url}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                      className="object-cover"
                    />
                  </span>
                  {fam.caption && (
                    <span className="tp-polaroid__caption font-scrawl text-cocoa text-center block text-xs mt-3 truncate px-1">
                      {fam.caption}
                    </span>
                  )}
                </span>
                <svg viewBox="0 0 64 64" className="tp-wall__paw" aria-hidden="true" fill="currentColor">
                  <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={lightboxPhotos}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
