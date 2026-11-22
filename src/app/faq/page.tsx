import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import faqsData from "@/data/faqs.json";

export const metadata: Metadata = {
  title: "Questions & answers | TeddyPups U.A.E.",
  description:
    "Answers about TeddyPups puppies: health checks and vaccinations, meeting local puppies, imported teacup breeds and delivery.",
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="gutter mx-auto max-w-[96rem] py-12 md:py-16 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div>
        <p className="font-scrawl text-toffee text-lg">everything you need to know</p>
        <h1 className="font-plush text-4xl sm:text-5xl md:text-6xl text-cocoa font-bold mt-1">
          Questions &amp; answers
        </h1>
        <p className="mt-3 max-w-2xl text-cocoa-soft text-base sm:text-lg">
          Answers about TeddyPups puppies: health checks, vaccinations, visiting our showroom, imported breeds, and delivery options across the UAE and worldwide.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-4 max-w-4xl">
        {faqsData.map((faq, idx) => (
          <details
            key={idx}
            open={idx === 0}
            className="group rounded-2xl border-2 border-cocoa bg-milk p-6 shadow-sm transition-all open:bg-honey/15"
          >
            <summary className="font-plush text-xl sm:text-2xl font-bold text-cocoa cursor-pointer list-none flex items-center justify-between gap-4">
              <span>{faq.question}</span>
              <span className="size-9 rounded-full bg-honey/30 group-open:bg-toffee group-open:text-milk flex items-center justify-center font-bold text-base transition-colors shrink-0">
                +
              </span>
            </summary>
            <p className="mt-4 text-sm sm:text-base text-cocoa-soft leading-relaxed border-t border-cocoa/10 pt-4">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      {/* Still have questions CTA */}
      <div className="rounded-3xl border-2 border-cocoa bg-[#fff9ee] p-8 max-w-4xl text-center space-y-4">
        <h2 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa">
          Have a different question?
        </h2>
        <p className="text-cocoa-soft text-sm sm:text-base max-w-xl mx-auto">
          Our puppy concierge is available around the clock to assist you with breed recommendations, upcoming litters, or care guidance.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I%20have%20a%20question%20about%20your%20puppies."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp text-sm"
          >
            Message us on WhatsApp
          </a>
          <Link href="/contact" className="btn btn-ghost text-sm">
            Write us a letter
          </Link>
        </div>
      </div>
    </div>
  );
}
