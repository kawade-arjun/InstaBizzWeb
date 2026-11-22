"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MediaItem {
  id: string;
  url: string;
  kind: string;
  width: number;
  height: number;
  alt: string;
  poster?: {
    url: string;
  };
}

interface PuppyMediaGalleryProps {
  media: MediaItem[];
  name: string;
}

export function PuppyMediaGallery({ media, name }: PuppyMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="aspect-[4/5] rounded-3xl border-3 border-cocoa bg-honey/20 flex items-center justify-center">
        <p className="font-scrawl text-cocoa">No media available</p>
      </div>
    );
  }

  const currentMedia = media[activeIndex] || media[0];

  return (
    <div className="space-y-4">
      {/* Active Media Display */}
      <div className="relative aspect-[4/5] rounded-3xl border-3 border-cocoa bg-[#f7f0e7] overflow-hidden shadow-xl">
        {currentMedia.kind === "video" ? (
          <video
            key={currentMedia.url}
            src={currentMedia.url}
            poster={currentMedia.poster?.url}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="size-full object-cover"
          />
        ) : (
          <Image
            src={currentMedia.url}
            alt={currentMedia.alt || name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
            unoptimized={currentMedia.url.startsWith("http")}
          />
        )}
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex flex-wrap gap-3 overflow-x-auto py-2">
          {media.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative size-20 rounded-2xl border-2 overflow-hidden transition-all shrink-0 cursor-pointer ${
                activeIndex === idx
                  ? "border-toffee ring-2 ring-toffee/30 scale-105 shadow-md"
                  : "border-cocoa/20 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={item.poster?.url || item.url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                unoptimized={item.url.startsWith("http")}
              />
              {item.kind === "video" && (
                <span className="absolute inset-0 bg-cocoa/30 flex items-center justify-center text-milk text-xs font-bold">
                  ▶
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
