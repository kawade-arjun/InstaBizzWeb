import React from "react";
import type { Metadata } from "next";
import happyFamiliesData from "@/data/happy_families.json";
import { Photo } from "@/components/PhotoLightbox";
import { HappyFamiliesGallery } from "@/components/HappyFamiliesGallery";

export const metadata: Metadata = {
  title: "Happy families | TeddyPups U.A.E.",
  description:
    "Real photos shared by TeddyPups families after welcoming their new puppy home.",
};

export default function HappyFamiliesPage() {
  const photos = happyFamiliesData as Photo[];

  return (
    <div className="gutter mx-auto max-w-[110rem] py-12 md:py-16 space-y-12">
      {/* Header */}
      <div>
        <p className="font-scrawl text-toffee text-lg">our wall of happy endings</p>
        <h1 className="font-plush text-4xl sm:text-5xl md:text-6xl text-cocoa font-bold mt-1">
          Happy families
        </h1>
        <p className="mt-3 max-w-2xl text-cocoa-soft text-base sm:text-lg">
          Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
        </p>
      </div>

      {/* Featured Testimonial Quote */}
      <div className="rounded-3xl border-3 border-cocoa bg-[#fffbf2] p-8 sm:p-12 shadow-md relative">
        <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ "--tape": "#cfe5f6" } as React.CSSProperties} />
        <blockquote className="font-plush text-xl sm:text-2xl md:text-3xl text-cocoa max-w-4xl mx-auto text-center leading-relaxed">
          “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
        </blockquote>
        <figcaption className="font-scrawl text-center text-lg text-toffee font-bold mt-6">
          — Sarah M., Dubai, UAE
        </figcaption>
      </div>

      {/* 64 Moments Gallery */}
      <HappyFamiliesGallery photos={photos} />
    </div>
  );
}
