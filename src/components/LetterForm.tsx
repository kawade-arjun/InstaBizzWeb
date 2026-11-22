"use client";

import React, { useState, useRef, useId, useTransition, useActionState, useEffect } from "react";
import { sendEnquiry, EnquiryState } from "@/app/actions";

interface LetterFormProps {
  puppies?: Array<{ id: string; label: string }>;
  initialPuppyId?: string;
  success?: {
    heading: string;
    body: string;
  };
  whatsappHref?: string;
}

export function LetterForm({
  puppies = [],
  initialPuppyId = "",
  success = {
    heading: "Your letter is on its way!",
    body: "We have received your note and will get back to you with all details and photos. For instant replies, feel free to WhatsApp us anytime.",
  },
  whatsappHref = "https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy.",
}: LetterFormProps) {
  const [state, formAction, isPending] = useActionState(sendEnquiry, { ok: false });
  const [, startTransition] = useTransition();

  const [phase, setPhase] = useState<"writing" | "sealing" | "posting" | "sent">("writing");
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  const selectId = useId();
  const noteId = useId();

  // Handle phase animation sequence upon successful submission
  useEffect(() => {
    if (!state.ok) return;

    setPhase("sealing");
    const t1 = setTimeout(() => {
      setPhase("posting");
    }, 750);

    const t2 = setTimeout(() => {
      setPhase("sent");
    }, 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [state.ok]);

  useEffect(() => {
    if (phase === "sent" && sentRef.current) {
      sentRef.current.focus({ preventScroll: true });
      sentRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [phase]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  const errors = state.errors || {};

  return (
    <div ref={containerRef} className="tp-post relative" data-phase={phase}>
      {phase !== "sent" && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="tp-letterform"
          aria-hidden={phase !== "writing"}
        >
          {/* Paw wax stamp */}
          <span aria-hidden="true" className="tp-letter__stamp">
            <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </span>

          <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

          {/* Validation Alert */}
          {state.message && !state.ok && (
            <div role="alert" className="tp-letterform__alert mb-4 rounded-xl border border-toffee bg-honey/20 p-3 text-toffee-deep">
              <p className="font-semibold">{state.message}</p>
              {Object.keys(errors).length > 0 && (
                <ul className="mt-1 list-inside list-disc text-sm">
                  {Object.entries(errors).map(([key, err]) => (
                    <li key={key}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Line 1: Name & Phone & Email */}
          <p className="tp-letterform__line">
            my name is{" "}
            <span className="tp-blank" style={{ "--size": "16ch" } as React.CSSProperties}>
              <input
                aria-label="Your name (required)"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                name="name"
                aria-invalid={!!errors.name}
              />
            </span>
            , and you can reach me on{" "}
            <span className="tp-blank" style={{ "--size": "15ch" } as React.CSSProperties}>
              <input
                aria-label="Phone or WhatsApp number with country code (required)"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="+971 50 123 4567"
                name="phone"
                aria-invalid={!!errors.phone}
              />
            </span>{" "}
            or by email at{" "}
            <span className="tp-blank" style={{ "--size": "20ch" } as React.CSSProperties}>
              <input
                aria-label="Email (optional)"
                type="email"
                autoComplete="email"
                placeholder="optional"
                name="email"
                aria-invalid={!!errors.email}
              />
            </span>
            .
          </p>

          {/* Line 2: Area & Puppy selection */}
          <p className="tp-letterform__line">
            I live in{" "}
            <span className="tp-blank" style={{ "--size": "13ch" } as React.CSSProperties}>
              <input
                aria-label="Your area (optional)"
                autoComplete="address-level2"
                maxLength={80}
                placeholder="e.g. Dubai Marina"
                name="area"
              />
            </span>
            , and I&#39;m curious about{" "}
            <span className="tp-blank tp-blank--select">
              <label htmlFor={selectId} className="sr-only">
                Puppy you&#39;re interested in (optional)
              </label>
              <select id={selectId} name="puppyId" defaultValue={initialPuppyId}>
                <option value="">any puppy (not sure yet)</option>
                {puppies.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </span>
            .
          </p>

          {/* Message Area */}
          <label htmlFor={noteId} className="sr-only">
            Your message (optional)
          </label>
          <textarea
            id={noteId}
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="Anything else you'd like to tell us…"
            className="tp-letterform__note mt-3 w-full"
          />

          {/* Anti-spam Honeypot */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" name="website" defaultValue="" />
            </label>
          </div>

          {/* Signoff & Submit button */}
          <div className="tp-letterform__sign mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-scrawl text-lg text-cocoa-soft">with love, a future puppy parent</p>
            <button
              type="submit"
              disabled={isPending || phase !== "writing"}
              className="btn btn-primary disabled:opacity-70"
            >
              {isPending ? "Sealing the envelope…" : "Post my letter"}
            </button>
          </div>
        </form>
      )}

      {/* Sealing & Posting Animated Envelope Scene */}
      {(phase === "sealing" || phase === "posting") && (
        <div aria-hidden="true" className="tp-post__scene py-12 text-center">
          <svg viewBox="0 0 160 112" className="tp-post__envelope mx-auto w-40">
            <rect x="4" y="18" width="152" height="90" rx="6" fill="#fffdf8" stroke="#2a170e" strokeWidth="4" />
            <path d="M6 104 64 62M154 104 96 62" fill="none" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" />
            <path className="tp-post__flap" d="M6 22 80 74 154 22" fill="#fbe3b4" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
          </svg>
          <p className="font-scrawl mt-4 text-xl text-cocoa">
            {phase === "sealing" ? "Sealing with wax…" : "Dropping into the postbox…"}
          </p>
        </div>
      )}

      {/* Sent State with Raised Mailbox Flag */}
      {phase === "sent" && (
        <div ref={sentRef} tabIndex={-1} role="status" className="tp-post__sent py-12 text-center">
          <svg viewBox="0 0 200 150" aria-hidden="true" className="tp-post__box tp-post__box--sent mx-auto w-48">
            <rect x="86" y="96" width="28" height="52" fill="#5a3a28" stroke="#2a170e" strokeWidth="4" />
            <path d="M30 50a70 44 0 0 1 140 0v52H30z" fill="#c2622b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
            <rect x="58" y="58" width="84" height="12" rx="6" fill="#2a170e" />
            <path d="M170 92V22" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
            <path d="M170 22h22v16h-22" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
          </svg>
          <p className="font-plush mt-4 text-[2rem] text-cocoa">{success.heading}</p>
          <p className="mx-auto mt-2 max-w-[40ch] text-cocoa-soft">{success.body}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-6 inline-flex"
          >
            WhatsApp us
          </a>
        </div>
      )}
    </div>
  );
}
