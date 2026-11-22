import React from "react";
import type { Metadata } from "next";
import puppiesData from "@/data/puppies.json";
import { Puppy, PuppyCard } from "@/components/PuppyCard";

export const metadata: Metadata = {
  title: "Gone home | TeddyPups U.A.E.",
  description: "TeddyPups puppies who have already joined their families.",
};

export default function GoneHomePage() {
  const allPuppies = puppiesData as Puppy[];
  const goneHomePuppies = allPuppies.filter((p) => p.status === "gone-home");

  return (
    <div className="gutter mx-auto max-w-[110rem] py-12 md:py-16 space-y-12">
      {/* Header */}
      <div>
        <p className="font-scrawl text-toffee text-lg">forever loved</p>
        <h1 className="font-plush text-4xl sm:text-5xl md:text-6xl text-cocoa font-bold mt-1">
          Gone home
        </h1>
        <p className="mt-3 max-w-2xl text-cocoa-soft text-base sm:text-lg">
          Meet our precious alumni who have found their forever homes and loving families across the United Arab Emirates and worldwide.
        </p>
      </div>

      {/* Grid of Adopted Puppies */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {goneHomePuppies.map((puppy, idx) => (
          <PuppyCard key={puppy.id} puppy={puppy} tiltIndex={idx} />
        ))}
      </ul>
    </div>
  );
}
