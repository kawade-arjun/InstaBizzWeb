import React from "react";
import type { Metadata } from "next";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/components/PuppyCard";
import { LetterForm } from "@/components/LetterForm";

export const metadata: Metadata = {
  title: "Visit & contact | TeddyPups U.A.E.",
  description:
    "Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!",
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
    <div data-page="contact" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene"
        style={
          {
            "--sky-top": "#fff9ee",
            "--sky-bottom": "#f9dca4",
          } as React.CSSProperties
        }
        aria-labelledby="contact-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 id="contact-title" className="font-plush text-giant max-w-[12ch] lg:col-span-7">
              Get in touch with us
            </h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
              Have questions about our puppies or adoption process? Fill out the form, and our team
              will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love
              to hear from you!
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Showroom & Info Cards (Left) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="tp-board">
                <span className="font-scrawl text-toffee text-sm font-bold">our showroom</span>
                <h2 className="font-plush text-2xl text-cocoa mt-2 font-bold">
                  Downtown Dubai Showroom
                </h2>
                <p className="text-sm text-cocoa-soft mt-3 leading-relaxed">
                  Downtown Dubai, United Arab Emirates. Please book an appointment before visiting so
                  we can prepare dedicated bonding time with your requested puppies.
                </p>

                <div className="space-y-4 border-t border-cocoa/10 pt-6 mt-6 text-sm">
                  <div>
                    <strong className="block text-cocoa font-bold">Showroom Hours</strong>
                    <p className="text-cocoa-soft">Monday – Sunday: 10:00 AM – 9:00 PM</p>
                  </div>

                  <div>
                    <strong className="block text-cocoa font-bold">WhatsApp Concierge</strong>
                    <a
                      href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I%27d%20like%20to%20discuss%20a%20puppy."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-toffee font-bold hover:underline"
                    >
                      +971 50 000 0000 (Click to chat)
                    </a>
                  </div>

                  <div>
                    <strong className="block text-cocoa font-bold">Email</strong>
                    <a href="mailto:info@instabizweb.com" className="text-toffee hover:underline">
                      info@instabizweb.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Letter Form (Right) */}
            <div className="lg:col-span-7">
              <LetterForm puppies={puppyOptions} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
