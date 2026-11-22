import React from "react";
import Link from "next/link";
import Image from "next/image";
import puppiesData from "@/data/puppies.json";
import faqsData from "@/data/faqs.json";
import { Puppy, PuppyCard } from "@/components/PuppyCard";
import { PhoneSimulator } from "@/components/PhoneSimulator";

export default function HomePage() {
  const allPuppies = puppiesData as Puppy[];
  const availablePuppies = allPuppies.filter((p) => p.status === "available");
  const heroPuppies = availablePuppies.slice(0, 5);
  const featuredPuppies = availablePuppies.slice(0, 8);
  const previewFaqs = faqsData.slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16">
        {/* Decorative sun glow */}
        <span aria-hidden="true" className="tp-hero__sun -top-24 left-1/2 -translate-x-1/2" />

        <div className="gutter mx-auto max-w-[110rem] text-center relative z-10">
          <div className="inline-block relative">
            <p className="tp-hero__note font-scrawl text-lg sm:text-xl text-toffee mb-2">
              every puppy is family
            </p>
          </div>

          <h1 id="hero-title" className="font-plush text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cocoa tracking-tight leading-[1.05]">
            <span className="block">Premium teacup</span>
            <span className="block text-toffee">puppies in Dubai</span>
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-base sm:text-xl text-cocoa-soft leading-relaxed">
            Meet your new best friend in our Downtown Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/puppies" className="btn btn-primary text-base px-8 py-4">
              View available puppies
            </Link>
            <a
              href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-base px-8 py-4"
            >
              Enquire on WhatsApp
            </a>
          </div>

          {/* Hero Puppy Peeking Lineup */}
          <div className="mt-16 sm:mt-20">
            <ul className="flex items-end justify-center -space-x-4 sm:-space-x-8 overflow-hidden py-4" aria-label="Some of the puppies in our showroom">
              {heroPuppies.map((pup, i) => {
                const tilts = ["-6deg", "4deg", "-2deg", "5deg", "-5deg"];
                const tilt = tilts[i % tilts.length];
                const img = pup.media[0]?.url || "/brand/logo.png";
                return (
                  <li
                    key={pup.id}
                    style={{ transform: `rotate(${tilt})` }}
                    className="relative transition-transform duration-300 hover:scale-110 hover:z-20"
                  >
                    <Link
                      href={`/puppies/${pup.slug}`}
                      className="block group"
                      aria-label={`Meet ${pup.name}, ${pup.breed}`}
                    >
                      <div className="size-24 sm:size-36 md:size-44 rounded-full border-4 border-cocoa bg-honey/30 overflow-hidden shadow-lg p-1.5 bg-milk">
                        <div className="size-full rounded-full overflow-hidden relative">
                          <Image
                            src={img}
                            alt={pup.name}
                            fill
                            sizes="200px"
                            className="object-cover"
                            unoptimized={img.startsWith("http")}
                          />
                        </div>
                      </div>
                      <span className="font-scrawl block text-center text-xs sm:text-sm font-bold text-cocoa mt-2 group-hover:text-toffee">
                        {pup.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: MEET THE PUPS */}
      <section className="gutter mx-auto max-w-[110rem]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cocoa/10 pb-6 mb-12">
          <div>
            <span className="font-scrawl text-toffee text-lg">fall in love</span>
            <h2 className="font-plush text-4xl sm:text-5xl text-cocoa mt-1">Meet the pups</h2>
          </div>
          <Link href="/puppies" className="btn btn-ghost text-sm self-start sm:self-auto">
            See all {allPuppies.length} puppies →
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredPuppies.map((puppy, idx) => (
            <PuppyCard key={puppy.id} puppy={puppy} tiltIndex={idx} />
          ))}
        </ul>
      </section>

      {/* SECTION 3: TWO WAYS TO MEET YOUR PUPPY */}
      <section className="gutter mx-auto max-w-[110rem]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg">the teddy experience</span>
          <h2 className="font-plush text-4xl sm:text-5xl text-cocoa mt-1">
            Two ways to meet your puppy
          </h2>
          <p className="mt-4 text-cocoa-soft text-base sm:text-lg">
            Whether you want to cuddle local pups in our showroom today or reserve a rare teacup breed imported with VIP travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: Local Dubai */}
          <div className="rounded-3xl border-3 border-cocoa bg-[#fff9ee] p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div>
              <span className="chip !bg-honey !text-cocoa font-bold text-xs">Available today</span>
              <h3 className="font-plush text-3xl sm:text-4xl text-cocoa mt-4">Puppies in Dubai</h3>
              <p className="mt-3 text-cocoa-soft text-sm sm:text-base leading-relaxed">
                Visit our warm, playful showroom in Downtown Dubai. Spend bonding time with our teacup and teddy bear puppies, ask our specialists anything, and take your bundle of joy home the very same day.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-cocoa font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span> Downtown Dubai showroom visit
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span> In-person bonding &amp; temperament check
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span> Same-day take home with starter kit
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-cocoa/10">
              <Link href="/contact" className="btn btn-primary text-sm w-full text-center">
                Book a showroom visit
              </Link>
            </div>
          </div>

          {/* Card 2: Imported Concierge */}
          <div className="rounded-3xl border-3 border-cocoa bg-[#f7f0e7] p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div>
              <span className="chip !bg-toffee !text-milk font-bold text-xs">Rare breeds &amp; custom match</span>
              <h3 className="font-plush text-3xl sm:text-4xl text-cocoa mt-4">Imported for you</h3>
              <p className="mt-3 text-cocoa-soft text-sm sm:text-base leading-relaxed">
                Looking for a rare Korean teacup Pomeranian, micro Maltipoo, or toy Cavapoo? We work directly with certified international ethical breeders to safely fly your dream pup to Dubai with dedicated care.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-cocoa font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span> Certified health certificates &amp; passport
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span> Temperature-regulated VIP pet travel
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span> Full 1-year genetic health guarantee
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-cocoa/10">
              <Link href="/how-it-works" className="btn btn-ghost text-sm w-full text-center">
                Learn how importing works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: YOUR PUPPY JOURNEY (WHATSAPP SIMULATOR) */}
      <section className="bg-honey/10 py-12 border-y border-cocoa/10">
        <PhoneSimulator />
      </section>

      {/* SECTION 5: WHY FAMILIES TRUST TEDDYPUPS */}
      <section className="gutter mx-auto max-w-[96rem]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg">peace of mind</span>
          <h2 className="font-plush text-4xl sm:text-5xl text-cocoa mt-1">
            Why families trust TeddyPups
          </h2>
          <p className="mt-4 text-cocoa-soft text-base">
            Every puppy that joins a family through TeddyPups is treated like our own family.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl border-2 border-cocoa bg-milk shadow-sm space-y-3">
            <span className="size-12 rounded-2xl bg-honey/30 flex items-center justify-center font-plush text-2xl text-toffee font-bold">
              1
            </span>
            <h3 className="font-plush text-xl font-bold text-cocoa">Health Guarantee</h3>
            <p className="text-sm text-cocoa-soft leading-relaxed">
              Every puppy is backed by our verified 1-year genetic health guarantee and licensed vet clearance.
            </p>
          </div>

          <div className="p-6 rounded-3xl border-2 border-cocoa bg-milk shadow-sm space-y-3">
            <span className="size-12 rounded-2xl bg-honey/30 flex items-center justify-center font-plush text-2xl text-toffee font-bold">
              2
            </span>
            <h3 className="font-plush text-xl font-bold text-cocoa">Up-to-Date Vaccinations</h3>
            <p className="text-sm text-cocoa-soft leading-relaxed">
              Complete age-appropriate core vaccinations and deworming courses documented in their medical card.
            </p>
          </div>

          <div className="p-6 rounded-3xl border-2 border-cocoa bg-milk shadow-sm space-y-3">
            <span className="size-12 rounded-2xl bg-honey/30 flex items-center justify-center font-plush text-2xl text-toffee font-bold">
              3
            </span>
            <h3 className="font-plush text-xl font-bold text-cocoa">Microchipped &amp; Registered</h3>
            <p className="text-sm text-cocoa-soft leading-relaxed">
              ISO standard microchip inserted with international passport ready for registration in UAE.
            </p>
          </div>

          <div className="p-6 rounded-3xl border-2 border-cocoa bg-milk shadow-sm space-y-3">
            <span className="size-12 rounded-2xl bg-honey/30 flex items-center justify-center font-plush text-2xl text-toffee font-bold">
              4
            </span>
            <h3 className="font-plush text-xl font-bold text-cocoa">24/7 Lifetime Support</h3>
            <p className="text-sm text-cocoa-soft leading-relaxed">
              Our specialists remain available on WhatsApp to guide you through feeding, training, and care advice.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: HAPPY FAMILIES PREVIEW */}
      <section className="gutter mx-auto max-w-[110rem]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cocoa/10 pb-6 mb-12">
          <div>
            <span className="font-scrawl text-toffee text-lg">loving homes</span>
            <h2 className="font-plush text-4xl sm:text-5xl text-cocoa mt-1">Happy families &amp; puppies</h2>
          </div>
          <Link href="/happy-families" className="btn btn-ghost text-sm self-start sm:self-auto">
            View all 64 moments →
          </Link>
        </div>

        {/* Featured customer testimonial */}
        <div className="rounded-3xl border-3 border-cocoa bg-[#fffbf2] p-8 sm:p-12 shadow-lg relative">
          <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ "--tape": "#cfe5f6" } as React.CSSProperties} />
          <blockquote className="font-plush text-xl sm:text-2xl md:text-3xl text-cocoa max-w-4xl mx-auto text-center leading-relaxed">
            “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
          </blockquote>
          <figcaption className="font-scrawl text-center text-lg text-toffee font-bold mt-6">
            — Sarah M., Dubai, UAE
          </figcaption>
        </div>
      </section>

      {/* SECTION 7: QUESTIONS, ANSWERED */}
      <section className="gutter mx-auto max-w-[96rem]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg">got questions?</span>
          <h2 className="font-plush text-4xl sm:text-5xl text-cocoa mt-1">Questions, answered</h2>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {previewFaqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border-2 border-cocoa bg-milk p-5 shadow-sm transition-all open:bg-honey/15"
            >
              <summary className="font-plush text-lg sm:text-xl font-bold text-cocoa cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <span className="size-8 rounded-full bg-honey/30 group-open:bg-toffee group-open:text-milk flex items-center justify-center font-bold text-sm transition-colors shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm sm:text-base text-cocoa-soft leading-relaxed border-t border-cocoa/10 pt-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/faq" className="btn btn-ghost text-sm">
            Read all frequently asked questions →
          </Link>
        </div>
      </section>

      {/* SECTION 8: READY TO MEET YOUR NEW BEST FRIEND? */}
      <section className="gutter mx-auto max-w-[110rem]">
        <div className="rounded-3xl border-3 border-cocoa bg-honey p-10 sm:p-16 text-center text-cocoa shadow-xl relative overflow-hidden">
          <span aria-hidden="true" className="tp-hero__sun -bottom-20 -right-20 opacity-40" />
          <span className="font-scrawl text-xl text-toffee-deep font-bold">your story begins here</span>
          <h2 className="font-plush text-4xl sm:text-5xl md:text-6xl text-cocoa font-black mt-2">
            Ready to meet your new best friend?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-cocoa-soft">
            Message us on WhatsApp to check today&#39;s showroom puppies, or schedule a cozy visit in Downtown Dubai.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-base px-8 py-4"
            >
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-primary text-base px-8 py-4 !bg-cocoa !text-milk hover:!bg-cocoa-soft">
              Visit Downtown Dubai showroom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
