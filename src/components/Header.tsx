"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
];

const PawSvg = () => (
  <svg viewBox="0 0 64 64" className="tp-nav-link__paw" aria-hidden="true" fill="currentColor">
    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
  </svg>
);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 90 && y > lastY && !menuOpen) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        id="site-header"
        data-scrolled={scrolled ? "true" : "false"}
        data-hidden={hidden ? "true" : "false"}
        data-home={isHome ? "true" : "false"}
        className="tp-header fixed inset-x-0 top-0 z-50"
      >
        <div className="tp-header__bar gutter">
          <Link className="tp-header__brand" aria-label="TeddyPups U.A.E. — home" href="/">
            <Image
              alt="TeddyPups logo"
              width={56}
              height={56}
              priority
              className="tp-header__logo"
              src="/brand/logo.png"
            />
            <span className="font-plush tp-header__name">TeddyPups</span>
          </Link>

          <nav aria-label="Main" className="tp-header__nav">
            <ul>
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      data-active={isActive ? "true" : "false"}
                      aria-current={isActive ? "page" : undefined}
                      className="tp-nav-link"
                      href={link.href}
                    >
                      <span>{link.label}</span>
                      <PawSvg />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="tp-header__actions">
            <a
              href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I%27d%20like%20to%20discuss%20a%20puppy."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp tp-header__cta"
            >
              WhatsApp us
            </a>

            <button
              type="button"
              className="tp-header__burger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="tp-header__burger-bar" />
              <span className="tp-header__burger-bar" />
              <span className="tp-header__burger-bar" />
            </button>
          </div>
        </div>

        {/* Scalloped hem SVG */}
        <svg aria-hidden="true" className="tp-header__hem" width="100%" height="14" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
              <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill" />
              <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line" />
            </pattern>
          </defs>
          <rect width="100%" height="14" fill="url(#tp-hem)" />
        </svg>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-milk px-6 pt-[calc(var(--header-h)+1.5rem)] pb-8 overflow-y-auto"
        >
          <nav aria-label="Mobile" className="flex-1">
            <p className="font-scrawl text-lg text-toffee mb-4">where to, friend?</p>
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      data-active={isActive ? "true" : "false"}
                      className="tp-menu-link font-plush flex items-center justify-between py-2 text-[clamp(2.2rem,9vw,3.2rem)] font-bold text-cocoa hover:text-toffee transition-colors"
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <PawSvg />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-6 border-t border-cocoa/10 space-y-3">
            <a
              href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I%27d%20like%20to%20discuss%20a%20puppy."
              className="btn btn-whatsapp w-full text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
            <p className="text-center text-sm font-medium text-cocoa-soft">
              Downtown Dubai, United Arab Emirates
            </p>
          </div>
        </div>
      )}
    </>
  );
}
