import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface Puppy {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  breed: string;
  gender: string;
  age: string;
  origin: string;
  location?: string;
  status: "available" | "gone-home";
  hasVideo?: boolean;
  media: Array<{
    id: string;
    url: string;
    kind: string;
    width: number;
    height: number;
    alt: string;
  }>;
  specs?: Record<string, string>;
}

interface PuppyCardProps {
  puppy: Puppy;
  tiltIndex?: number;
}

const WASH_COLORS = ["#f2be6b", "#f9cdbf", "#bfddf5", "#fbe3b4", "#f4b183"];

export function PuppyCard({ puppy, tiltIndex = 0 }: PuppyCardProps) {
  const tilts = ["0.36deg", "-0.45deg", "0.52deg", "-0.6deg", "0.28deg", "-0.38deg"];
  const tilt = tilts[tiltIndex % tilts.length];
  const wash = WASH_COLORS[tiltIndex % WASH_COLORS.length];

  const primaryImage = puppy.media[0] || {
    url: "/brand/logo.png",
    alt: puppy.name,
    width: 600,
    height: 700,
  };

  const isGoneHome = puppy.status === "gone-home";

  return (
    <li>
      <Link
        className="tp-sketch"
        data-reveal="true"
        style={
          {
            "--tilt": tilt,
            "--d": `${(tiltIndex % 6) * 60}ms`,
            "--wash": wash,
          } as React.CSSProperties
        }
        aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.gender}, ${puppy.age}, ${puppy.status}`}
        href={`/puppies/${puppy.slug}`}
      >
        <span className="tp-sketch__frame">
          {/* Handcrafted wash svg */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="tp-sketch__wash"
            style={{ translate: "-4.0% 4.9%" }}
          >
            <path
              d="M96.73 50.00C96.38 52.37 95.89 54.67 95.32 56.94C94.75 59.21 94.09 61.43 93.30 63.61C92.50 65.78 91.61 67.93 90.55 69.98C89.49 72.04 88.29 74.06 86.92 75.94C85.55 77.83 84.00 79.63 82.33 81.27C80.66 82.92 78.82 84.44 76.90 85.81C74.98 87.18 72.93 88.41 70.82 89.52C68.71 90.62 66.51 91.60 64.26 92.44C62.01 93.29 59.68 94.03 57.30 94.59C54.92 95.15 52.47 95.59 50.00 95.80C47.53 96.01 44.98 96.06 42.49 95.83C40.01 95.61 37.47 95.15 35.07 94.45C32.66 93.75 30.28 92.78 28.07 91.64C25.85 90.49 23.73 89.09 21.76 87.60C19.78 86.10 17.95 84.41 16.22 82.67C14.49 80.93 12.89 79.06 11.38 77.13C9.88 75.20 8.47 73.19 7.20 71.09C5.94 68.99 4.75 66.7"
              fill={wash}
            />
          </svg>

          {/* Photo */}
          <span className="tp-sketch__photo">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || `${puppy.name}, ${puppy.gender} ${puppy.breed}`}
              fill
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 44vw, 88vw"
              className="object-cover"
              unoptimized={primaryImage.url.startsWith("http")}
            />
          </span>

          {/* Status sticker */}
          <span className="tp-sketch__sticker font-scrawl">
            {isGoneHome ? "Gone home" : "Available"}
          </span>

          {puppy.hasVideo && <span className="tp-sketch__video">▶ video</span>}
        </span>

        {/* Card info */}
        <span className="tp-sketch__name font-plush">{puppy.name}</span>
        <span className="tp-sketch__meta">
          {puppy.breed} · {puppy.gender} · {puppy.age}
        </span>
      </Link>
    </li>
  );
}
