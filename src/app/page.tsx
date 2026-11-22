import React from "react";
import Link from "next/link";
import Image from "next/image";
import puppiesData from "@/data/puppies.json";
import familiesData from "@/data/happy_families.json";
import faqsData from "@/data/faqs.json";
import { Puppy } from "@/components/PuppyCard";
import { TeddyBuddy } from "@/components/TeddyBuddy";
import { HallOfDoors } from "@/components/HallOfDoors";

export default function HomePage() {
  const allPuppies = puppiesData as Puppy[];
  const availablePuppies = allPuppies.filter((p) => p.status === "available");
  const heroPuppies = availablePuppies.slice(0, 6);
  const polaroids = familiesData.slice(0, 10);
  const homeFaqs = faqsData.slice(0, 3);

  return (
    <div className="relative">
      {/* =========================================================================
          SCENE 1: tp-hero (Morning Dawn: #fffdf8 -> #fff1d8)
          ========================================================================= */}
      <div data-section="hero">
        <section
          data-pup-scene="true"
          data-tone="light"
          className="tp-scene tp-hero"
          style={
            {
              "--sky-top": "#fffdf8",
              "--sky-bottom": "#fff1d8",
              "--quilt": "#fff1d8",
            } as React.CSSProperties
          }
          aria-labelledby="hero-title"
        >
          {/* Radiant decorative sun */}
          <span aria-hidden="true" className="tp-hero__sun" />

          {/* Hero Copy */}
          <div className="tp-hero__copy gutter">
            <p className="tp-hero__note font-scrawl relative inline-block">
              every puppy is family
              <svg
                viewBox="0 0 220 24"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
                aria-hidden="true"
              >
                <path
                  d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>

            <h1 id="hero-title" className="tp-hero__title font-plush">
              <span className="tp-hero__line">Premium teacup</span>
              <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
            </h1>

            <p className="tp-hero__lede">
              Meet your new best friend in our Dubai showroom, or order a rare miniature breed from
              trusted breeders worldwide.
            </p>

            <div className="tp-hero__actions">
              <Link className="btn btn-primary" href="/puppies">
                View available puppies
              </Link>
              <a
                href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I%27d%20like%20to%20discuss%20a%20puppy."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Peeking Puppies Lineup atop Quilt */}
          <div className="tp-hero__stage">
            <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
              {heroPuppies.map((pup, i) => {
                const seatConfigs = [
                  { x: "9%", w: "8.6rem", peek: 0.62, tilt: "-5deg" },
                  { x: "22.5%", w: "10.4rem", peek: 0.8, tilt: "3deg" },
                  { x: "35%", w: "9.2rem", peek: 0.7, tilt: "-2deg" },
                  { x: "65%", w: "9.4rem", peek: 0.74, tilt: "3deg" },
                  { x: "77.5%", w: "10.6rem", peek: 0.82, tilt: "-3deg" },
                  { x: "91%", w: "8.4rem", peek: 0.6, tilt: "4deg" },
                ];
                const cfg = seatConfigs[i % seatConfigs.length];
                const imgUrl = pup.media[0]?.url || "/brand/logo.png";

                return (
                  <li
                    key={pup.id}
                    className="tp-lineup__seat"
                    style={
                      {
                        "--x": cfg.x,
                        "--w": cfg.w,
                        "--peek": cfg.peek,
                        "--tilt": cfg.tilt,
                        "--i": i,
                      } as React.CSSProperties
                    }
                  >
                    <Link
                      className="tp-lineup__pup"
                      data-pup-friend="true"
                      aria-label={`Meet ${pup.name}, ${pup.breed}`}
                      href={`/puppies/${pup.slug}`}
                    >
                      <span className="tp-lineup__photo">
                        <Image
                          src={imgUrl}
                          alt={`${pup.name}, ${pup.gender} ${pup.breed}`}
                          fill
                          priority={i < 3}
                          className="object-cover"
                          sizes="(max-width: 768px) 30vw, 15rem"
                        />
                      </span>
                      <span className="tp-lineup__name font-scrawl">{pup.breed || pup.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mascot Teddy Peeking Center atop Quilt */}
            <div
              data-pup-stop="true"
              data-pose="peek"
              data-facing="right"
              data-act="peekaboo"
              data-behind="true"
              data-lane="true"
              className="pup-stop tp-hero__teddy"
            >
              <TeddyBuddy pose="peek" facing="right" ariaLabel="Teddy, the TeddyPups puppy, peeking over the quilt" />
            </div>

            {/* Scalloped Quilt Border with Stitches */}
            <div aria-hidden="true" className="tp-quilt">
              <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
                <defs>
                  <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }} />
                    <path
                      d="M0 27A38 25 0 0 1 76 27"
                      fill="none"
                      stroke="#2a170e"
                      strokeWidth="3"
                    />
                    <path
                      d="M11 33A27 19 0 0 1 65 33"
                      fill="none"
                      stroke="#2a170e"
                      strokeWidth="1.6"
                      strokeDasharray="3.5 5.5"
                      strokeLinecap="round"
                      opacity="0.42"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="40" fill="url(#tp-scallop)" />
              </svg>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SCENE 2: tp-meet (Warm Butter: #fff1d8 -> #fbe3b4)
          The Hall of Doors Metaphor
          ========================================================================= */}
      <HallOfDoors />

      {/* =========================================================================
          SCENE 3: tp-paths (Midday Honey: #fbe3b4 -> #f7d18d)
          Two Ways: Local Showroom vs. Imported for you
          ========================================================================= */}
      <div data-section="paths">
        <section
          data-pup-scene="true"
          data-tone="light"
          className="tp-scene tp-paths"
          style={
            {
              "--sky-top": "#fbe3b4",
              "--sky-bottom": "#f7d18d",
            } as React.CSSProperties
          }
          aria-labelledby="paths-title"
        >
          <div className="gutter mx-auto max-w-[110rem]">
            <h2 id="paths-title" className="tp-paths__title font-plush text-huge">
              Two ways to meet your puppy
            </h2>

            <div className="tp-fork">
              <div aria-hidden="true" className="tp-fork__post" />

              {/* Way 1: Puppies in Dubai */}
              <article className="tp-way tp-way--left" aria-labelledby="way-local">
                <h3 id="way-local" className="tp-sign tp-sign--left font-plush">
                  Puppies in Dubai
                </h3>
                <div className="tp-way__scene" data-pup-look="true">
                  {/* Dubai Burj Skyline Outline SVG */}
                  <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                    <path
                      d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <figure className="tp-window">
                    <span className="tp-window__glass">
                      <Image
                        alt="A tiny puppy held up in our Dubai showroom"
                        src="/brand/showroom-preview.jpg"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 16rem, 60vw"
                      />
                    </span>
                    <figcaption className="font-scrawl">In our showroom</figcaption>
                  </figure>
                </div>
                <p className="tp-way__text">
                  See them, love them, take them home today. Visit our Downtown Dubai showroom to
                  bond in person.
                </p>
                <Link className="btn btn-primary" href="/puppies?origin=local">
                  See local puppies
                </Link>
              </article>

              {/* Way 2: Imported for you */}
              <article className="tp-way tp-way--right" aria-labelledby="way-imported">
                <h3 id="way-imported" className="tp-sign tp-sign--right font-plush">
                  Imported for you
                </h3>
                <div className="tp-way__scene" data-pup-look="true">
                  <div className="tp-flight">
                    <svg
                      viewBox="0 0 660 300"
                      role="img"
                      aria-label="A plane bringing a puppy from Korea to Dubai"
                    >
                      <path
                        d="M40 250 C 170 40, 470 20, 620 168"
                        className="tp-flight__route"
                      />
                      <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
                      <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
                      <text x="40" y="284" textAnchor="middle" className="tp-flight__label">
                        Korea
                      </text>
                      <text x="620" y="202" textAnchor="middle" className="tp-flight__label">
                        Dubai
                      </text>
                      <g transform="translate(410 70)" className="tp-postcard__plane">
                        <g transform="translate(-126 -78)">
                          <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
                          <path
                            d="M108 112 L142 156 L172 156 L158 112 Z"
                            className="tp-flight__wing tp-flight__wing--far"
                          />
                          <path
                            d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                            className="tp-flight__body"
                          />
                          <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
                          <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
                        </g>
                        <circle r="25" className="tp-flight__porthole" />
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="tp-way__text">
                  Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable
                  breeders and let us handle the import.
                </p>
                <Link className="btn btn-primary" href="/puppies?origin=imported">
                  See imported puppies
                </Link>
              </article>

              <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-fork__teddy">
                <TeddyBuddy pose="sit" facing="right" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SCENE 4: tp-chat (Afternoon Gold: #f7d18d -> #f0b866)
          Your Puppy Journey & WhatsApp Simulator
          ========================================================================= */}
      <div data-section="journey">
        <section
          data-pup-scene="true"
          data-tone="light"
          className="tp-scene tp-chat"
          style={
            {
              "--sky-top": "#f7d18d",
              "--sky-bottom": "#f0b866",
            } as React.CSSProperties
          }
          aria-labelledby="journey-title"
        >
          <div className="tp-chat__grid gutter" data-pin-range="true">
            <div className="tp-chat__story">
              <h2 id="journey-title" className="font-plush text-huge">
                Your puppy journey
              </h2>
              <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
                A premium, step-by-step concierge service from your first question to your puppy&apos;s
                first night home.
              </p>

              <ol className="tp-chat__steps">
                <li className="tp-chat__step" data-done="true">
                  <span className="tp-chat__num font-plush" aria-hidden="true">
                    1
                  </span>
                  <h3 className="font-plush tp-chat__title">Choose your breed</h3>
                  <p className="tp-chat__text">
                    Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide
                    you based on availability and your lifestyle.
                  </p>
                </li>
                <li className="tp-chat__step" data-done="true">
                  <span className="tp-chat__num font-plush" aria-hidden="true">
                    2
                  </span>
                  <h3 className="font-plush tp-chat__title">Get photos &amp; details</h3>
                  <p className="tp-chat__text">
                    Our team will share real photos, health details, and all necessary information
                    directly on WhatsApp.
                  </p>
                </li>
                <li className="tp-chat__step" data-active="true">
                  <span className="tp-chat__num font-plush" aria-hidden="true">
                    3
                  </span>
                  <h3 className="font-plush tp-chat__title">Secure &amp; safe delivery</h3>
                  <p className="tp-chat__text">
                    Once confirmed, we handle everything professionally and ensure your puppy reaches
                    you safely and stress-free.
                  </p>
                </li>
              </ol>

              <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
                How it works
              </Link>
            </div>

            {/* Simulated WhatsApp Phone */}
            <div className="tp-chat__side">
              <div
                className="tp-phone"
                aria-label="A WhatsApp conversation with TeddyPups U.A.E."
                role="group"
              >
                <div className="tp-phone__bar">
                  <Image
                    alt=""
                    width={40}
                    height={40}
                    className="tp-phone__avatar rounded-full"
                    src="/brand/logo.png"
                  />
                  <div>
                    <span className="tp-phone__title font-semibold text-sm">TeddyPups U.A.E.</span>
                    <span className="tp-phone__status text-xs flex items-center gap-1.5 text-emerald-600">
                      <span className="size-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      online
                    </span>
                  </div>
                </div>

                <div className="tp-phone__screen p-4 space-y-3">
                  <div className="tp-phone__msg tp-phone__msg--in bg-white rounded-2xl rounded-tl-sm p-3.5 shadow-sm text-sm">
                    <p className="font-medium text-cocoa">
                      Hello! Welcome to TeddyPups U.A.E. Which puppy caught your eye today? 🐾
                    </p>
                    <span className="text-[10px] text-cocoa/50 mt-1 block text-right">10:42 AM</span>
                  </div>

                  <div className="tp-phone__msg tp-phone__msg--out bg-honey-soft/70 rounded-2xl rounded-tr-sm p-3.5 shadow-sm text-sm ml-auto max-w-[85%]">
                    <p className="font-medium text-cocoa">
                      Hi! I saw Max the Maltipoo on your site. Is he available to meet in Downtown Dubai?
                    </p>
                    <span className="text-[10px] text-cocoa/50 mt-1 block text-right">10:44 AM ✓✓</span>
                  </div>

                  <div className="tp-phone__msg tp-phone__msg--in bg-white rounded-2xl rounded-tl-sm p-3.5 shadow-sm text-sm">
                    <p className="font-medium text-cocoa">
                      Yes! Max is right here in our showroom. We can arrange a private bonding visit today or send you his newest video! ✨
                    </p>
                    <span className="text-[10px] text-cocoa/50 mt-1 block text-right">10:45 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SCENE 5: tp-passport (Caramel: #f0b866 -> #a65a30)
          The Puppy Passport Stitched Book
          ========================================================================= */}
      <div data-section="trust">
        <section
          data-pup-scene="true"
          data-tone="light"
          className="tp-scene tp-passport"
          style={
            {
              "--sky-top": "#f0b866",
              "--sky-bottom": "#a65a30",
            } as React.CSSProperties
          }
          aria-labelledby="trust-title"
        >
          <div className="gutter mx-auto max-w-[96rem]">
            <div className="tp-book">
              {/* Left Page */}
              <div className="tp-book__page tp-book__page--left">
                <p aria-hidden="true" className="tp-book__kicker font-scrawl">
                  puppy passport
                </p>
                <h2 id="trust-title" className="font-plush tp-book__title">
                  Why families trust TeddyPups
                </h2>
                <div className="tp-book__seal mt-6">
                  <Image
                    src="/brand/logo.png"
                    alt="Official TeddyPups wax seal"
                    width={80}
                    height={80}
                    className="size-20 rounded-full opacity-90 shadow-md"
                  />
                </div>
              </div>

              {/* Right Page */}
              <ul className="tp-book__page tp-book__page--right">
                <li className="tp-entry" style={{ "--ink-stamp": "#a24a1a", "--tilt": "-8deg" } as React.CSSProperties}>
                  <span className="tp-stamp tp-stamp--round">
                    <span className="tp-stamp__title font-plush">Vet-checked &amp; healthy</span>
                  </span>
                  <p className="tp-entry__text">
                    Every puppy comes vaccinated, dewormed, and with a verified health certificate
                    from licensed veterinary doctors.
                  </p>
                </li>

                <li className="tp-entry" style={{ "--ink-stamp": "#1f6b45", "--tilt": "5deg" } as React.CSSProperties}>
                  <span className="tp-stamp tp-stamp--ticket">
                    <span className="tp-stamp__title font-plush">Korea to Dubai, safely</span>
                  </span>
                  <p className="tp-entry__text">
                    Direct flight concierge with temperature-controlled pet travel and dedicated
                    handlers from origin to Dubai.
                  </p>
                </li>

                <li className="tp-entry" style={{ "--ink-stamp": "#5a3a28", "--tilt": "-4deg" } as React.CSSProperties}>
                  <span className="tp-stamp tp-stamp--oval">
                    <span className="tp-stamp__title font-plush">Lifetime Support 24/7</span>
                  </span>
                  <p className="tp-entry__text">
                    Guidance on nutrition, puppy proofing, training, and care for your puppy&apos;s
                    whole life journey.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Sunset Horizon Transition between Passport & Dusk */}
          <div aria-hidden="true" className="tp-horizon">
            <span className="tp-horizon__sun" />
            <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="tp-horizon__city">
              <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
            </svg>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SCENE 6: tp-dusk (Sunset Dusk: #a65a30 -> #4d2b19, Tone: Dark)
          Happy Families & Polaroids Photowall
          ========================================================================= */}
      <div data-section="families">
        <section
          data-pup-scene="true"
          data-tone="dark"
          className="tp-scene tp-dusk"
          style={
            {
              "--sky-top": "#a65a30",
              "--sky-bottom": "#4d2b19",
            } as React.CSSProperties
          }
          aria-labelledby="dusk-title"
        >
          <div className="tp-dusk__sky gutter">
            <div className="tp-dusk__head">
              <h2 id="dusk-title" className="font-plush text-huge">
                Happy families &amp; puppies
              </h2>
              <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
                We are truly honored to see our puppies become cherished members of loving families.
                These heartwarming moments have been shared by our valued clients.
              </p>
            </div>

            {/* Pinned Quote Note */}
            <figure className="tp-dusk__note">
              <blockquote className="font-plush-text text-cocoa text-base leading-relaxed">
                “TeddyPups truly made our dream a reality. They supported us at every step of the
                journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7
                support gave us complete peace of mind.”
              </blockquote>
              <figcaption className="font-scrawl text-toffee text-sm mt-3 font-semibold">
                Sarah M., Dubai, UAE
              </figcaption>
            </figure>
          </div>

          {/* Photowall with Taped Polaroids */}
          <div className="tp-photowall mt-12 overflow-x-auto pb-10">
            <div className="tp-photowall__wall px-6">
              <ul className="tp-photowall__prints flex gap-6" aria-label="Photos from TeddyPups families">
                {polaroids.map((fam, i) => {
                  const tilts = ["-2.2deg", "1.8deg", "-1.4deg", "2.5deg", "-2.8deg"];
                  const tilt = tilts[i % tilts.length];
                  return (
                    <li key={fam.id} className="shrink-0">
                      <div
                        className="tp-polaroid block w-60 bg-white p-3 pb-6 rounded-md shadow-2xl relative"
                        style={{ "--tilt": tilt } as React.CSSProperties}
                      >
                        <span aria-hidden="true" className="tp-tape tp-tape--center" />
                        <span className="tp-polaroid__photo block relative aspect-square overflow-hidden rounded">
                          <Image
                            alt={fam.caption || "Happy TeddyPups family"}
                            src={fam.url}
                            fill
                            className="object-cover"
                            sizes="240px"
                          />
                        </span>
                        {fam.caption && (
                          <p className="font-scrawl text-cocoa text-center text-xs mt-3 truncate px-1">
                            {fam.caption}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Sunset Horizon Transition between Passport & Dusk */}
          <div aria-hidden="true" className="tp-horizon">
            <span className="tp-horizon__sun" />
            <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="tp-horizon__city">
              <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
            </svg>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SCENE 7: tp-night (Starlight Night: #4d2b19 -> #2f1a10, Tone: Dark)
          Twinkling Stars & Questions Answered
          ========================================================================= */}
      <div data-section="questions">
        <section
          data-pup-scene="true"
          data-tone="dark"
          className="tp-scene tp-night"
          style={
            {
              "--sky-top": "#4d2b19",
              "--sky-bottom": "#2f1a10",
            } as React.CSSProperties
          }
          aria-labelledby="questions-title"
        >
          {/* Twinkling Starfield SVGs */}
          <div aria-hidden="true" className="pointer-events-none tp-night__stars">
            {[
              { left: "8%", top: "12%", width: 16.2, delay: "0.00s" },
              { left: "22%", top: "30%", width: 9.0, delay: "0.40s" },
              { left: "41%", top: "8%", width: 12.6, delay: "0.80s" },
              { left: "57%", top: "22%", width: 8.1, delay: "1.20s" },
              { left: "72%", top: "6%", width: 14.4, delay: "1.60s" },
              { left: "88%", top: "18%", width: 10.8, delay: "2.00s" },
              { left: "95%", top: "42%", width: 9.0, delay: "2.40s" },
              { left: "4%", top: "58%", width: 10.8, delay: "2.80s" },
              { left: "34%", top: "70%", width: 7.2, delay: "3.20s" },
            ].map((star, i) => (
              <svg
                key={i}
                viewBox="0 0 40 40"
                className="tp-twinkle absolute text-honey"
                style={{
                  left: star.left,
                  top: star.top,
                  width: `${star.width}px`,
                  animationDelay: star.delay,
                }}
                aria-hidden="true"
              >
                <path
                  d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </div>

          <div className="tp-night__grid gutter">
            <div className="tp-night__intro">
              <h2 id="questions-title" className="font-plush text-huge">
                Questions, answered
              </h2>
              <span aria-hidden="true" className="tp-night__wonder font-plush">?</span>
              <div data-pup-stop="true" data-pose="sit" data-facing="right" data-act="tilt" className="pup-stop tp-night__teddy">
                <TeddyBuddy pose="sit" facing="right" />
              </div>
              <Link className="btn btn-ghost tp-night__cta mt-6 inline-block" href="/faq">
                Read all questions
              </Link>
            </div>

            {/* Questions List */}
            <dl className="tp-night__list space-y-6">
              {homeFaqs.map((faq) => (
                <div key={faq.question} className="tp-qa">
                  <dt className="font-plush tp-qa__q flex items-center gap-3">
                    <svg viewBox="0 0 40 40" className="tp-qa__star size-5 text-honey shrink-0" aria-hidden="true">
                      <path
                        d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{faq.question}</span>
                  </dt>
                  <dd className="tp-qa__a mt-3 pl-8 text-milk/80 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SCENE 8: tp-home (Midnight Hearth: #2f1a10 -> #24130b, Tone: Dark)
          Ready to meet your new best friend?
          ========================================================================= */}
      <div data-section="cta">
        <section
          data-pup-scene="true"
          data-tone="dark"
          className="tp-scene tp-home"
          style={
            {
              "--sky-top": "#2f1a10",
              "--sky-bottom": "#24130b",
            } as React.CSSProperties
          }
          aria-labelledby="cta-title"
        >
          <div className="tp-home__copy gutter">
            <h2 id="cta-title" className="font-plush text-huge">
              Ready to meet your new best friend?
            </h2>
            <p className="tp-home__lede">
              Bring home a healthy, happy teacup or designer puppy with expert guidance every step
              of the way. We help you find the right match and ensure a smooth, safe delivery across
              the UAE.
            </p>
          </div>

          {/* Cozy House Doorway Illustration */}
          <div className="tp-house mt-12 relative max-w-sm mx-auto">
            <span aria-hidden="true" className="tp-house__plant tp-house__plant--left" />
            <span aria-hidden="true" className="tp-house__lamp" />

            <div className="tp-house__doorway relative aspect-[3/4] w-48 mx-auto rounded-t-full border-4 border-amber-950 overflow-hidden shadow-2xl bg-amber-900/30">
              <span className="tp-house__inside block relative w-full h-full">
                <Image
                  alt="A waiting puppy inside the warm home"
                  src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                  fill
                  className="object-cover"
                  sizes="16rem"
                />
              </span>
            </div>

            <span aria-hidden="true" className="tp-house__mat font-scrawl block text-center mt-3 text-honey/90 text-sm">
              welcome home
            </span>
            <div data-pup-stop="true" data-pose="bow" data-facing="right" className="pup-stop tp-house__teddy">
              <TeddyBuddy pose="bow" facing="right" />
            </div>
          </div>

          <div className="tp-home__actions mt-10 pb-20 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I%27d%20like%20to%20discuss%20a%20puppy."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-base px-8 py-4"
            >
              Enquire on WhatsApp
            </a>
            <Link className="btn btn-ghost text-base px-8 py-4" href="/contact">
              Visit our showroom
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
