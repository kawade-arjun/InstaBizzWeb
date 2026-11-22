"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Photo, PhotoLightbox } from "@/components/PhotoLightbox";

interface HappyFamiliesGalleryProps {
  photos: Photo[];
}

export function HappyFamiliesGallery({ photos }: HappyFamiliesGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-cocoa/10 pb-4 mb-8">
        <span className="font-scrawl text-toffee text-lg">
          {photos.length} moments and counting
        </span>
        <span className="text-xs text-cocoa-soft font-semibold">
          Click any photo to enlarge
        </span>
      </div>

      {/* Masonry / Grid of Photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos.map((photo, idx) => (
          <button
            key={photo.id || idx}
            type="button"
            onClick={() => setActivePhotoIndex(idx)}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-cocoa/15 bg-honey/10 shadow-sm hover:border-toffee hover:shadow-lg transition-all text-left cursor-pointer"
          >
            <Image
              src={photo.url}
              alt={photo.alt || "TeddyPups happy family moment"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized={photo.url.startsWith("http")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
              <span className="font-scrawl text-milk text-xs line-clamp-2">
                {photo.caption || photo.alt || "A loving Teddy Pup home"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={photos}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
