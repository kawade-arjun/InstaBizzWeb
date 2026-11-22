"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    num: 1,
    title: "Choose your breed",
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    num: 2,
    title: "Get photos & details",
    text: "Our team will share real photos, health details, vaccination records, and all necessary information directly on WhatsApp.",
  },
  {
    num: 3,
    title: "Secure & safe delivery",
    text: "Once you fall in love, meet your puppy in our Downtown Dubai showroom or have your imported baby delivered safely to your door.",
  },
];

export function PhoneSimulator() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="tp-chat__grid gutter grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-20">
      {/* Left Column: Journey Steps */}
      <div className="lg:col-span-6 space-y-8">
        <div>
          <h2 id="journey-title" className="font-plush text-4xl sm:text-5xl lg:text-6xl text-cocoa leading-tight">
            Your puppy journey
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cocoa-soft max-w-[42ch]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>
        </div>

        <ol className="tp-chat__steps space-y-6">
          {steps.map((step, idx) => (
            <li
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`tp-chat__step flex gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                activeStep === idx
                  ? "border-toffee bg-honey/15 shadow-md scale-[1.01]"
                  : "border-cocoa/10 hover:border-cocoa/30 hover:bg-honey/5"
              }`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full font-plush text-xl font-bold transition-colors ${
                  activeStep === idx ? "bg-toffee text-milk" : "bg-honey/30 text-cocoa"
                }`}
                aria-hidden="true"
              >
                {step.num}
              </span>
              <div>
                <h3 className="font-plush text-xl font-bold text-cocoa">{step.title}</h3>
                <p className="mt-1 text-sm text-cocoa-soft leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="pt-2">
          <Link href="/how-it-works" className="btn btn-ghost inline-flex">
            How it works
          </Link>
        </div>
      </div>

      {/* Right Column: Simulated WhatsApp Phone */}
      <div className="lg:col-span-6 flex justify-center">
        <div
          className="tp-phone w-full max-w-sm rounded-[2.8rem] border-4 border-cocoa bg-cocoa p-2 shadow-2xl overflow-hidden"
          role="group"
          aria-label="A WhatsApp conversation with TeddyPups U.A.E."
        >
          {/* Phone Header */}
          <div className="flex items-center gap-3 rounded-[2.2rem] rounded-b-md bg-milk px-4 py-3 border-b border-cocoa/10">
            <Image
              src="/brand/logo.png"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full border border-cocoa/15 object-contain"
            />
            <div>
              <p className="text-sm font-bold text-cocoa leading-none">TeddyPups U.A.E.</p>
              <p className="text-[11px] text-[#25D366] font-semibold mt-1">online</p>
            </div>
          </div>

          {/* Screen Message Feed */}
          <div className="bg-[#e5ddd5]/30 p-4 space-y-3 min-h-[360px] flex flex-col justify-end text-xs">
            {/* User Message */}
            <div className="self-end max-w-[85%] rounded-2xl rounded-tr-none bg-[#dcf8c6] p-3 text-cocoa shadow-sm">
              <p>Hi TeddyPups! I&#39;d love to know more about your puppies.</p>
              <span className="block text-right text-[10px] text-cocoa-soft/70 mt-1">10:42 AM</span>
            </div>

            {/* Step 0: Breed Options */}
            <div className="self-start max-w-[90%] rounded-2xl rounded-tl-none bg-milk p-3 text-cocoa shadow-sm border border-cocoa/5">
              <p className="leading-relaxed">
                Hello! We&#39;d be delighted to help you find your dream puppy. Which breed are you looking for?
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Maltipoo", "Pomeranian", "Poodle", "Cavapoo", "Shih Tzu"].map((breed) => (
                  <Link
                    key={breed}
                    href={`/puppies?breed=${breed.toLowerCase()}`}
                    className="rounded-full bg-honey/30 px-2.5 py-1 text-[11px] font-bold text-cocoa hover:bg-toffee hover:text-milk transition-colors"
                  >
                    {breed}
                  </Link>
                ))}
              </div>
              <span className="block text-right text-[10px] text-cocoa-soft/70 mt-1">10:43 AM</span>
            </div>

            {/* Step 1 & 2: Active details */}
            {activeStep >= 1 && (
              <div className="self-start max-w-[90%] rounded-2xl rounded-tl-none bg-milk p-3 text-cocoa shadow-sm border border-cocoa/5 transition-all">
                <p className="font-semibold text-toffee">Here are details &amp; health checks:</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] bg-honey/15 p-2 rounded-xl">
                  <span>✓ Microchipped</span>
                  <span>✓ Vaccinated</span>
                  <span>✓ Vet certified</span>
                  <span>✓ 1-Yr guarantee</span>
                </div>
                <span className="block text-right text-[10px] text-cocoa-soft/70 mt-1">10:44 AM</span>
              </div>
            )}

            {/* Step 2: Safe delivery */}
            {activeStep >= 2 && (
              <div className="self-start max-w-[90%] rounded-2xl rounded-tl-none bg-milk p-3 text-cocoa shadow-sm border border-cocoa/5 transition-all">
                <p className="leading-relaxed">
                  Your puppy is prepared for VIP travel or immediate showroom pickup in Downtown Dubai!
                </p>
                <span className="block text-right text-[10px] text-cocoa-soft/70 mt-1">10:45 AM</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
