import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import familiesData from "@/data/happy_families.json";

export const metadata: Metadata = {
  title: "Happy families & puppy moments | TeddyPups U.A.E.",
  description:
    "Real family photos and reviews of puppies adopted from TeddyPups in Downtown Dubai and imported worldwide.",
};

export default function HappyFamiliesPage() {
  const families = familiesData;

  const tilts = ["-2.2deg", "1.6deg", "-1.8deg", "2.1deg", "-0.8deg", "1.4deg", "-2.5deg"];
  const tapeColors = ["#f6d79a", "#cfe5f6", "#f9cdbf", "#fbe3b4"];

  return (
    <div data-page="families" className="tp-page">
      <section aria-labelledby="families-title" className="tp-memories">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="tp-memories__head">
            <div>
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                our wall of happy endings
              </p>
              <h1
                id="families-title"
                className="font-plush text-giant tp-memories__title flex items-center gap-4"
                data-reveal="true"
              >
                <span>Happy families</span>
                <svg viewBox="0 0 48 44" className="tp-memories__heart size-10 text-toffee" aria-hidden="true">
                  <path
                    d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h1>
              <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft" data-reveal="true">
                Nothing makes us happier than seeing our puppies in loving homes! Here are some
                beautiful moments shared by our amazing clients after welcoming their furry friends.
              </p>
              <p className="font-scrawl mt-5 text-lg text-toffee-ink" data-reveal="true">
                {families.length} moments and counting
              </p>
            </div>

            {/* Pinned Note */}
            <figure className="tp-memories__note" data-reveal="true">
              <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ "--tape": "#cfe5f6" } as React.CSSProperties} />
              <blockquote className="font-plush-text text-cocoa text-base leading-relaxed">
                “TeddyPups truly made our dream a reality. They supported us at every step of the
                import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having
                24/7 support throughout the process gave us complete peace of mind.”
              </blockquote>
              <figcaption className="font-scrawl text-toffee text-sm mt-3 font-semibold">
                Sarah M., Dubai, UAE
              </figcaption>
            </figure>
          </div>

          {/* Polaroid Photo Wall */}
          <div className="mt-16 md:mt-20">
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
                    <div className="tp-wall__print">
                      <span
                        className="tp-polaroid block bg-white p-3 pb-6 rounded-md shadow-lg hover:shadow-2xl transition-all"
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
                          <span className="font-scrawl text-cocoa text-center block text-xs mt-3 truncate px-1">
                            {fam.caption}
                          </span>
                        )}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
