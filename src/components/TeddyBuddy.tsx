import React from "react";

export interface TeddyBuddyProps {
  pose?: "sit" | "bow" | "snug" | "peek";
  facing?: "left" | "right";
  className?: string;
  ariaLabel?: string;
}

export function TeddyBuddy({
  pose = "sit",
  facing = "right",
  className = "",
  ariaLabel = "Teddy, the TeddyPups puppy",
}: TeddyBuddyProps) {
  // Config based on pose
  let shadowOpacity = 0.12;
  let bodyTransform = "translate(0 -2) rotate(-24 196 206) translate(196 0) scale(1 1) translate(-196 0)";
  let bodyOpacity = 1;
  let bfOpacity = 0;
  let ledgeOpacity = 0;

  if (pose === "bow") {
    bodyTransform = "translate(0 2) rotate(15 196 206) translate(196 0) scale(1 1) translate(-196 0)";
    bfOpacity = 1;
  } else if (pose === "snug") {
    shadowOpacity = 0;
    bodyOpacity = 0;
    ledgeOpacity = 1;
  } else if (pose === "peek") {
    shadowOpacity = 0;
    bodyOpacity = 0;
    ledgeOpacity = 1;
  }

  return (
    <div className={`pup-buddy ${className}`} data-facing={facing}>
      <svg
        viewBox="0 0 300 240"
        style={{ overflow: "visible" }}
        aria-label={ariaLabel}
        role="img"
      >
        <g data-p="root">
          <ellipse
            data-p="shadow"
            cx="150"
            cy="230"
            rx="92"
            ry="7"
            fill="#2a170e"
            opacity={shadowOpacity}
            transform="translate(0 0) scale(1 1)"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <g
            data-p="body"
            transform={bodyTransform}
            opacity={bodyOpacity}
          >
            <g data-p="bf" transform="translate(94 192) rotate(0)" opacity={bfOpacity}>
              <path
                d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z"
                fill="#e4a352"
              />
              <path
                d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M-3.5 29 v5 M4.5 29 v5"
                stroke="#2a170e"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            </g>
            <g data-p="ff" transform="translate(168 192) rotate(24)">
              <path
                d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
                fill="#e4a352"
              />
              <path
                d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M-3.5 29 v5 M4.5 29 v5"
                stroke="#2a170e"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            </g>
            <g data-p="tail" transform="translate(74 158) rotate(-16)">
              <path
                d="M0 0 C-10 -16 -8 -34 6 -42 C16 -48 24 -40 20 -28 C16 -16 6 -2 0 0Z"
                fill="#f2be6b"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>
            <path
              data-p="torso"
              d="M102 184 C84 176 80 156 86 136 C94 112 116 102 144 106 C176 110 196 134 196 168 C196 196 178 214 148 214 C126 214 112 200 102 184Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              data-p="chest"
              d="M142 120 C156 122 170 134 174 152 C178 168 174 184 164 194 C154 182 152 164 148 150 C144 136 138 126 142 120Z"
              fill="#fff9ee"
              opacity="0.85"
            />
            <g data-p="br" transform="translate(108 196) rotate(-8)">
              <path
                d="M-13 -14 C-13 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 13 4 13 -14Z"
                fill="#f2be6b"
              />
              <path
                d="M-13 -14 C-13 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 13 4 13 -14"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M-3.5 29 v5 M4.5 29 v5"
                stroke="#2a170e"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            </g>
            <g data-p="fr" transform="translate(182 196) rotate(16)">
              <path
                d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
                fill="#f2be6b"
              />
              <path
                d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M-3.5 29 v5 M4.5 29 v5"
                stroke="#2a170e"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
          <g data-p="head" transform="translate(196 112) rotate(0)">
            <g data-p="earR" transform="translate(42 -22) rotate(-8)">
              <path
                d="M-16 -8 C-22 8 -26 28 -20 46 C-14 62 -2 72 10 72 C22 72 28 58 26 42 C24 26 16 6 6 -8 Z"
                fill="#e4a352"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M-8 6 C-12 18 -14 32 -10 44 C-6 54 2 60 8 58"
                stroke="#c2622b"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
            <g data-p="earL" transform="translate(-42 -22) rotate(8)">
              <path
                d="M16 -8 C22 8 26 28 20 46 C14 62 2 72 -10 72 C-22 72 -28 58 -26 42 C-24 26 -16 6 -6 -8 Z"
                fill="#e4a352"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M8 6 C12 18 14 32 10 44 C6 54 -2 60 -8 58"
                stroke="#c2622b"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
            <ellipse
              data-p="skull"
              cx="0"
              cy="0"
              rx="54"
              ry="48"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              data-p="muzzle"
              d="M-26 12 C-26 -2 -14 -10 0 -10 C14 -10 26 -2 26 12 C26 26 14 34 0 34 C-14 34 -26 26 -26 12 Z"
              fill="#fff9ee"
              stroke="#2a170e"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              data-p="nose"
              d="M-8 4 C-8 0 -4 -3 0 -3 C4 -3 8 0 8 4 C8 9 3 12 0 12 C-3 12 -8 9 -8 4 Z"
              fill="#2a170e"
            />
            <path
              data-p="philtrum"
              d="M0 12 L0 18 M-6 18 Q0 22 0 18 Q0 22 6 18"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <g data-p="eyes">
              <g data-p="eyeL" transform="translate(-20 -4)">
                <circle cx="0" cy="0" r="6" fill="#2a170e" />
                <circle cx="-1.8" cy="-1.8" r="2.2" fill="#fff" />
              </g>
              <g data-p="eyeR" transform="translate(20 -4)">
                <circle cx="0" cy="0" r="6" fill="#2a170e" />
                <circle cx="-1.8" cy="-1.8" r="2.2" fill="#fff" />
              </g>
            </g>
            <ellipse cx="-28" cy="14" rx="6" ry="4" fill="#f9cdbf" opacity="0.6" />
            <ellipse cx="28" cy="14" rx="6" ry="4" fill="#f9cdbf" opacity="0.6" />
          </g>
          <g data-p="ledge" opacity={ledgeOpacity}>
            <path
              d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
      <span aria-hidden="true" className="pup-bubble" data-show="false" />
    </div>
  );
}
