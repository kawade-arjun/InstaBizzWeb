import React from "react";
import type { Metadata } from "next";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/components/PuppyCard";
import { PuppyBrowser } from "@/components/PuppyBrowser";

export const metadata: Metadata = {
  title: "Available puppies | TeddyPups U.A.E.",
  description:
    "Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy.",
};

export default function PuppiesPage() {
  const allPuppies = puppiesData as Puppy[];

  return (
    <div className="gutter mx-auto max-w-[110rem] py-12 md:py-16 space-y-12">
      {/* Page Header */}
      <div>
        <p className="font-scrawl text-toffee text-lg">choose your companion</p>
        <h1 className="font-plush text-4xl sm:text-5xl md:text-6xl text-cocoa font-bold mt-1">
          Available puppies
        </h1>
        <p className="mt-3 max-w-2xl text-cocoa-soft text-base sm:text-lg">
          Meet local teacup and teddy bear puppies ready for same-day adoption in Downtown Dubai, or reserve a rare breed flown safely from our ethical partner breeders.
        </p>
      </div>

      {/* Browser with Filters & Grid */}
      <PuppyBrowser initialPuppies={allPuppies} />
    </div>
  );
}
