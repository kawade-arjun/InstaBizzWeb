"use client";

import React, { useState } from "react";
import Link from "next/link";
import faqsData from "@/data/faqs.json";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqsData.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const pinColors = [
    "var(--color-toffee)",
    "var(--color-sky-deep)",
    "var(--color-honey)",
    "#a24a1a",
    "#1f6b45",
  ];
  const tilts = ["-1.6deg", "1.2deg", "-0.8deg", "1.5deg", "-1.2deg", "0.9deg"];

  return (
    <div data-page="faq" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-faqroom overflow-hidden"
        style={
          {
            "--sky-top": "#a95e32",
            "--sky-bottom": "#331c11",
          } as React.CSSProperties
        }
        aria-labelledby="faq-title"
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="max-w-4xl">
            <h1 id="faq-title" className="font-plush text-giant text-milk">
              Questions &amp; answers
            </h1>
            <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)]">
              Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available
              24/7.
            </p>
          </header>

          <div className="mt-12 md:mt-16">
            <div className="tp-notes flex flex-col lg:flex-row gap-12 items-start">
              {/* Search Aside */}
              <aside className="tp-notes__side w-full lg:w-80 shrink-0 space-y-6" aria-label="Find a question">
                <div>
                  <label htmlFor="faq-search" className="font-scrawl tp-notes__label text-honey text-lg block mb-2">
                    sniff out a question
                  </label>
                  <div className="tp-notes__search relative">
                    <input
                      id="faq-search"
                      type="search"
                      placeholder="delivery, Korea, vaccinated…"
                      autoComplete="off"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-full border-2 border-milk/30 bg-milk/10 px-5 py-3 text-sm text-milk placeholder:text-milk/50 focus:border-honey focus:outline-none"
                    />
                  </div>
                  <p className="tp-notes__count font-scrawl text-sm text-honey/80 mt-3" aria-live="polite">
                    {filteredFaqs.length} notes on the board
                  </p>
                </div>

                <a
                  href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I%20have%20a%20question%20about%20a%20puppy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full text-center inline-block"
                >
                  Ask your own question
                </a>
              </aside>

              {/* Notes Board */}
              <div className="tp-notes__board flex-1 w-full">
                <ul className="tp-notes__list space-y-6">
                  {filteredFaqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    const tilt = tilts[i % tilts.length];
                    const pin = pinColors[i % pinColors.length];

                    return (
                      <li
                        key={faq.question}
                        className="tp-note relative bg-milk text-cocoa p-6 sm:p-8 rounded-2xl shadow-xl transition-transform"
                        style={
                          {
                            "--tilt": tilt,
                            "--pin": pin,
                            transform: `rotate(${tilt})`,
                          } as React.CSSProperties
                        }
                      >
                        <span aria-hidden="true" className="tp-note__pin" />
                        <h2 className="tp-note__q">
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className="w-full text-left font-plush text-xl sm:text-2xl font-bold flex items-center justify-between gap-4 cursor-pointer"
                          >
                            <span className="font-plush-text text-cocoa">{faq.question}</span>
                            <span
                              className={`size-8 rounded-full flex items-center justify-center font-bold text-lg transition-transform ${
                                isOpen ? "rotate-45 bg-toffee text-milk" : "bg-honey/30 text-cocoa"
                              }`}
                            >
                              +
                            </span>
                          </button>
                        </h2>

                        {isOpen && (
                          <div className="tp-note__answer mt-4 pt-4 border-t border-cocoa/10">
                            <p className="text-cocoa-soft text-base leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
