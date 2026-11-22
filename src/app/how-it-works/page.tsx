import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works | TeddyPups U.A.E.",
  description:
    "Meet a local puppy in our Downtown Dubai showroom or reserve a premium teacup breed imported for you — every step, from choosing to coming home.",
};

export default function HowItWorksPage() {
  return (
    <div className="gutter mx-auto max-w-[110rem] py-12 md:py-16 space-y-20">
      {/* Header */}
      <div>
        <p className="font-scrawl text-toffee text-lg">the adoption process</p>
        <h1 className="font-plush text-4xl sm:text-5xl md:text-6xl text-cocoa font-bold mt-1">
          How it works
        </h1>
        <p className="mt-3 max-w-2xl text-cocoa-soft text-base sm:text-lg">
          Meet a local puppy in our Downtown Dubai showroom or reserve a premium teacup breed imported for you — every step, from choosing to coming home, designed to be joyful and seamless.
        </p>

        {/* Chapter Quick Jump Pills */}
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2.5">
          <a href="#two-ways" className="chip h-10 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft text-xs font-bold text-cocoa">
            <span className="font-plush text-toffee font-black mr-1.5">1</span> Two ways home
          </a>
          <a href="#promise" className="chip h-10 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft text-xs font-bold text-cocoa">
            <span className="font-plush text-toffee font-black mr-1.5">2</span> Our premium puppy promise
          </a>
          <a href="#delivery" className="chip h-10 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft text-xs font-bold text-cocoa">
            <span className="font-plush text-toffee font-black mr-1.5">3</span> Delivery &amp; collection
          </a>
          <a href="#why" className="chip h-10 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft text-xs font-bold text-cocoa">
            <span className="font-plush text-toffee font-black mr-1.5">4</span> Why choose us
          </a>
        </nav>
      </div>

      {/* CHAPTER 1: TWO WAYS HOME */}
      <section id="two-ways" className="scroll-mt-28 space-y-8">
        <div className="border-b border-cocoa/10 pb-4">
          <span className="font-plush text-toffee font-black text-lg">01</span>
          <h2 className="font-plush text-3xl sm:text-4xl text-cocoa mt-1">Two ways home</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Method A: Showroom Local */}
          <div className="rounded-3xl border-3 border-cocoa bg-[#fff9ee] p-8 sm:p-10 shadow-md">
            <span className="chip !bg-honey !text-cocoa font-bold text-xs">Option A</span>
            <h3 className="font-plush text-2xl sm:text-3xl text-cocoa mt-3">
              Meet your puppy in person
            </h3>
            <p className="mt-3 text-cocoa-soft text-sm sm:text-base leading-relaxed">
              Step into our Downtown Dubai showroom and experience the joy of holding and playing with our puppies before making your decision.
            </p>
            <ol className="mt-6 space-y-4 text-sm text-cocoa">
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-toffee text-milk text-xs font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="block text-cocoa font-bold">Showroom appointment</strong>
                  <span className="text-cocoa-soft">Message us to book a cozy viewing slot.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-toffee text-milk text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="block text-cocoa font-bold">Bonding &amp; Vet review</strong>
                  <span className="text-cocoa-soft">Hold, play, and review all health documents with our team.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-toffee text-milk text-xs font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="block text-cocoa font-bold">Take home same day</strong>
                  <span className="text-cocoa-soft">Leave with your new baby, starter kit, passport, and food.</span>
                </div>
              </li>
            </ol>
          </div>

          {/* Method B: Imported */}
          <div className="rounded-3xl border-3 border-cocoa bg-[#f7f0e7] p-8 sm:p-10 shadow-md">
            <span className="chip !bg-toffee !text-milk font-bold text-xs">Option B</span>
            <h3 className="font-plush text-2xl sm:text-3xl text-cocoa mt-3">
              Order upon request
            </h3>
            <p className="mt-3 text-cocoa-soft text-sm sm:text-base leading-relaxed">
              Reserve an exclusive miniature breed imported directly from verified ethical international partner breeders in Korea, Europe, and worldwide.
            </p>
            <ol className="mt-6 space-y-4 text-sm text-cocoa">
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-toffee text-milk text-xs font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="block text-cocoa font-bold">Breed matching</strong>
                  <span className="text-cocoa-soft">Share your preferences on size, coat color, and gender.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-toffee text-milk text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="block text-cocoa font-bold">Photos &amp; Video updates</strong>
                  <span className="text-cocoa-soft">Receive HD photos, play videos, and vet check milestones.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-toffee text-milk text-xs font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="block text-cocoa font-bold">VIP Arrival &amp; Delivery</strong>
                  <span className="text-cocoa-soft">Safe, climate-controlled flight travel with direct handover in Dubai.</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: OUR PROMISE */}
      <section id="promise" className="scroll-mt-28 space-y-8">
        <div className="border-b border-cocoa/10 pb-4">
          <span className="font-plush text-toffee font-black text-lg">02</span>
          <h2 className="font-plush text-3xl sm:text-4xl text-cocoa mt-1">Our premium puppy promise</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border-2 border-cocoa/20 bg-milk shadow-sm">
            <h3 className="font-plush text-xl font-bold text-cocoa">Licensed Veterinary Check</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Every puppy undergoes thorough clinical checks before leaving the breeder and upon arrival in Dubai.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-cocoa/20 bg-milk shadow-sm">
            <h3 className="font-plush text-xl font-bold text-cocoa">Core Vaccinations</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Complete age-appropriate DHPP/core vaccines, deworming cycles, and external parasite treatments.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-cocoa/20 bg-milk shadow-sm">
            <h3 className="font-plush text-xl font-bold text-cocoa">ISO Microchip &amp; Passport</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Standard 15-digit microchip injected with official international passport matching all health records.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-cocoa/20 bg-milk shadow-sm">
            <h3 className="font-plush text-xl font-bold text-cocoa">1-Year Genetic Guarantee</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Written guarantee protecting against congenital and hereditary health disorders for your complete assurance.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-cocoa/20 bg-milk shadow-sm">
            <h3 className="font-plush text-xl font-bold text-cocoa">Starter Welcome Kit</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Premium puppy food, transition feeding guide, cozy blanket, training pads, and favorite toys.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-cocoa/20 bg-milk shadow-sm">
            <h3 className="font-plush text-xl font-bold text-cocoa">24/7 Specialist Support</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Lifelong WhatsApp concierge to answer any feeding, potty-training, or behavioral questions.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: DELIVERY & COLLECTION */}
      <section id="delivery" className="scroll-mt-28 space-y-8">
        <div className="border-b border-cocoa/10 pb-4">
          <span className="font-plush text-toffee font-black text-lg">03</span>
          <h2 className="font-plush text-3xl sm:text-4xl text-cocoa mt-1">Delivery &amp; collection</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border-2 border-cocoa bg-honey/15">
            <h3 className="font-plush text-xl font-bold text-cocoa">Downtown Showroom Pickup</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Collect directly from our Downtown Dubai showroom, meet our team, and receive hands-on instructions.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-cocoa bg-honey/15">
            <h3 className="font-plush text-xl font-bold text-cocoa">Delivery within UAE</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Private, climate-controlled doorstep delivery across Dubai, Abu Dhabi, Sharjah, and all Emirates.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-cocoa bg-honey/15">
            <h3 className="font-plush text-xl font-bold text-cocoa">Safe International Cargo</h3>
            <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
              Worldwide travel with dedicated pet couriers, IATA approved crates, and direct flight connections.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 4: WHY CHOOSE US */}
      <section id="why" className="scroll-mt-28 space-y-8">
        <div className="border-b border-cocoa/10 pb-4">
          <span className="font-plush text-toffee font-black text-lg">04</span>
          <h2 className="font-plush text-3xl sm:text-4xl text-cocoa mt-1">Why choose us</h2>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl border-3 border-cocoa bg-honey text-cocoa space-y-6">
          <h3 className="font-plush text-3xl sm:text-4xl font-bold">
            Unique and high quality puppies
          </h3>
          <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-cocoa/90">
            We specialize exclusively in teddy bear and teacup breeds. Our puppies are raised in loving, clean environments with careful attention to genetics, short muzzles, big bright eyes, and affectionate, gentle temperaments.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link href="/puppies" className="btn btn-primary !bg-cocoa !text-milk hover:!bg-cocoa-soft">
              Browse available puppies
            </Link>
            <a
              href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Ask questions on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
