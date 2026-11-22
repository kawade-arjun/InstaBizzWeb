import React from "react";
import type { Metadata } from "next";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/components/PuppyCard";
import { LetterForm } from "@/components/LetterForm";

export const metadata: Metadata = {
  title: "Visit & contact | TeddyPups U.A.E.",
  description:
    "Visit TeddyPups in Downtown Dubai or get in touch on WhatsApp, by phone or email.",
};

export default function ContactPage() {
  const allPuppies = puppiesData as Puppy[];
  const puppyOptions = allPuppies
    .filter((p) => p.status === "available")
    .map((p) => ({
      id: p.id,
      label: `${p.name} (${p.breed}, ${p.gender})`,
    }));

  return (
    <div className="gutter mx-auto max-w-[110rem] py-12 md:py-16 space-y-16">
      {/* Header */}
      <div>
        <p className="font-scrawl text-toffee text-lg">say hello</p>
        <h1 className="font-plush text-4xl sm:text-5xl md:text-6xl text-cocoa font-bold mt-1">
          Get in touch with us
        </h1>
        <p className="mt-3 max-w-2xl text-cocoa-soft text-base sm:text-lg">
          Visit TeddyPups in Downtown Dubai, chat with our concierge on WhatsApp, or write us a handwritten-style letter below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Showroom & Visit Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-3xl border-3 border-cocoa bg-[#fff9ee] p-8 shadow-md space-y-6">
            <div>
              <span className="font-scrawl text-toffee text-sm font-bold">our showroom</span>
              <h2 className="font-plush text-3xl text-cocoa mt-1 font-bold">
                Visit us in Downtown Dubai
              </h2>
              <p className="text-sm text-cocoa-soft mt-2 leading-relaxed">
                Downtown Dubai, United Arab Emirates. Please book an appointment before visiting so we can prepare private bonding time with your requested puppies.
              </p>
            </div>

            <div className="space-y-4 border-t border-cocoa/10 pt-6 text-sm">
              <div>
                <strong className="block text-cocoa font-bold">Showroom Hours</strong>
                <p className="text-cocoa-soft">Monday – Sunday: 10:00 AM – 9:00 PM</p>
              </div>

              <div>
                <strong className="block text-cocoa font-bold">WhatsApp Concierge</strong>
                <a
                  href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-toffee font-bold hover:underline"
                >
                  +971 50 000 0000 / +91 98981 24987
                </a>
              </div>

              <div>
                <strong className="block text-cocoa font-bold">Email</strong>
                <a href="mailto:info@instabizweb.com" className="text-cocoa-soft hover:underline break-all">
                  info@instabizweb.com
                </a>
              </div>

              <div>
                <strong className="block text-cocoa font-bold">Parking</strong>
                <p className="text-cocoa-soft">Complimentary visitor valet parking available on-site.</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20book%20a%20showroom%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full text-center"
              >
                Book visit on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: The Letter Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border-3 border-cocoa bg-milk p-6 sm:p-10 shadow-lg relative">
            <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ "--tape": "#fbe3b4" } as React.CSSProperties} />
            <h2 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa mb-6">
              Write us a letter
            </h2>
            <LetterForm puppies={puppyOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
