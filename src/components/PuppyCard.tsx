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

const WASH_COLORS = ["#f2be6b", "#f9cdbf", "#bfddf5", "#fbe3b4"];

export function PuppyCard({ puppy, tiltIndex = 0 }: PuppyCardProps) {
  // Deterministic slight tilt based on tiltIndex
  const tilts = ["-0.8deg", "1.2deg", "-1.5deg", "0.6deg", "-0.4deg", "1.6deg"];
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
    <li className="list-none">
      <Link
        href={`/puppies/${puppy.slug}`}
        className="tp-sketch group block relative p-3 sm:p-4 rounded-3xl bg-milk border-2 border-cocoa shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        style={
          {
            "--tilt": tilt,
            "--wash": wash,
            transform: `rotate(${tilt})`,
          } as React.CSSProperties
        }
        aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.gender}, ${puppy.age}, ${puppy.status}`}
      >
        <span className="tp-sketch__frame block relative overflow-hidden rounded-2xl bg-honey/20 aspect-[4/5]">
          {/* Decorative background wash */}
          <span
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{ backgroundColor: wash }}
            aria-hidden="true"
          />

          {/* Photo */}
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || puppy.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={primaryImage.url.startsWith("http")}
          />

          {/* Origin / Status Badge Ribbon */}
          <span className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {isGoneHome ? (
              <span className="chip !bg-cocoa !text-milk text-xs font-bold shadow-sm">
                Gone home
              </span>
            ) : puppy.origin?.toLowerCase().includes("local") || puppy.location?.toLowerCase().includes("showroom") ? (
              <span className="chip !bg-honey !text-cocoa text-xs font-bold shadow-sm">
                Dubai showroom
              </span>
            ) : (
              <span className="chip !bg-toffee !text-milk text-xs font-bold shadow-sm">
                Imported for you
              </span>
            )}
          </span>
        </span>

        {/* Card Metadata */}
        <div className="mt-3.5 px-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-plush text-xl font-bold text-cocoa group-hover:text-toffee transition-colors truncate">
              {puppy.name}
            </h3>
            <span className="font-scrawl text-xs font-semibold text-cocoa-soft whitespace-nowrap">
              {puppy.age}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between text-xs text-cocoa-soft font-medium">
            <span>{puppy.breed}</span>
            <span className="capitalize">{puppy.gender}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
