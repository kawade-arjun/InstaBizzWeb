import React from "react";
import type { Metadata } from "next";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/components/PuppyCard";
import { PuppyBrowser } from "@/components/PuppyBrowser";

export const metadata: Metadata = {
  title: "Available puppies | TeddyPups U.A.E.",
  description:
    "Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.",
};

export default function PuppiesPage() {
  const allPuppies = puppiesData as Puppy[];

  return (
    <div data-page="pups" className="tp-page">
      <section aria-labelledby="pups-title" className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                from Teddy&apos;s sketchbook
              </p>
              <h1
                id="pups-title"
                className="font-plush text-giant tp-sketchbook__title relative inline-block"
                data-reveal="true"
              >
                Available puppies
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
                Every listing shows real photos of the actual puppy. Open a profile to see them all,
                then ask us about them on WhatsApp.
              </p>
            </div>
          </div>

          {/* Puppy Browser & Filters */}
          <div className="mt-12">
            <PuppyBrowser initialPuppies={allPuppies} />
          </div>
        </div>
      </section>
    </div>
  );
}
