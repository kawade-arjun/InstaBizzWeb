"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = "";
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label="Site menu"
      className="tp-menu m-0 h-dvh max-h-none w-screen max-w-none bg-honey p-0 text-cocoa backdrop:bg-cocoa/40 backdrop:backdrop-blur-sm fixed inset-0 z-50"
    >
      <div className="flex h-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
        {/* Top bar with greeting and close button */}
        <div className="flex items-center justify-between">
          <span className="font-scrawl text-xl text-cocoa font-bold">where to, friend?</span>
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk hover:bg-cocoa-soft transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav aria-label="Mobile" className="mt-8 flex-1">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-plush block text-3xl text-cocoa hover:text-toffee transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer info in menu */}
        <div className="border-t border-cocoa/20 pt-6">
          <p className="font-scrawl text-sm text-cocoa-soft">every puppy is family</p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full text-center"
            >
              WhatsApp concierge
            </a>
            <a
              href="tel:+971500000000"
              className="btn btn-ghost w-full text-center !border-cocoa !bg-transparent"
            >
              Call showroom
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
