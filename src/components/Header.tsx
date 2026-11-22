"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-[var(--header-h)] border-b border-cocoa/10 bg-milk/85 backdrop-blur-md transition-all">
        <div className="gutter mx-auto flex h-full max-w-[110rem] items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/brand/logo.png"
              alt="TeddyPups U.A.E."
              width={42}
              height={42}
              className="size-10 object-contain rounded-full transition-transform group-hover:scale-105"
              priority
            />
            <span className="font-plush text-xl font-bold tracking-tight text-cocoa">
              TeddyPups <span className="font-sans text-xs tracking-wider uppercase text-toffee font-semibold">U.A.E.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-honey/30 text-toffee-ink font-bold"
                      : "text-cocoa/80 hover:bg-honey/15 hover:text-cocoa"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn btn-whatsapp text-xs sm:text-sm !py-2.5 !px-4"
            >
              WhatsApp us
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden inline-flex items-center justify-center rounded-full border-2 border-cocoa px-4 py-1.5 text-sm font-bold text-cocoa hover:bg-honey-soft transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Dialog */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
