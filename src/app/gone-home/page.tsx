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
    <div data-page="gone-home" className="tp-page">
      <section aria-labelledby="gone-title" className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                forever loved
              </p>
              <h1
                id="gone-title"
                className="font-plush text-giant tp-sketchbook__title relative inline-block"
                data-reveal="true"
              >
                Gone home
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="tp-sketchbook__underline"
                >
                  <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength="1" />
                </svg>
              </h1>
              <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft" data-reveal="true">
                Meet our precious alumni who have found their forever homes and loving families
                across the United Arab Emirates and worldwide.
              </p>
            </div>
          </div>

          {/* Grid of Adopted Puppies */}
          <ul className="tp-sketches mt-16" aria-label="Gone home puppies">
            {goneHomePuppies.map((puppy, idx) => (
              <PuppyCard key={puppy.id} puppy={puppy} tiltIndex={idx} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
