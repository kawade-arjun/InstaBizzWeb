import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-cocoa text-milk pt-20 pb-16">
      <div className="gutter mx-auto max-w-[110rem]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt="TeddyPups U.A.E."
                width={48}
                height={48}
                className="size-12 rounded-full object-contain"
              />
              <span className="font-plush text-2xl font-bold tracking-tight text-milk">
                TeddyPups <span className="text-honey text-sm uppercase">U.A.E.</span>
              </span>
            </Link>
            <p className="font-scrawl text-lg text-honey">every puppy is family</p>
            <p className="text-milk/75 text-sm max-w-[38ch] leading-relaxed">
              Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders worldwide.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h2 className="font-scrawl text-lg text-honey">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-milk/90 text-sm">
              <li>
                <Link href="/puppies" className="hover:text-honey transition-colors">
                  Available puppies
                </Link>
              </li>
              <li>
                <Link href="/gone-home" className="hover:text-honey transition-colors">
                  Gone home
                </Link>
              </li>
              <li>
                <Link href="/happy-families" className="hover:text-honey transition-colors">
                  Happy families
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-honey transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#delivery" className="hover:text-honey transition-colors">
                  Delivery &amp; collection
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-honey transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-honey transition-colors">
                  Visit &amp; contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info & Socials */}
          <div className="md:col-span-4 lg:col-span-4">
            <h2 className="font-scrawl text-lg text-honey">Say hello</h2>
            <ul className="mt-4 space-y-2.5 text-milk/90 text-sm">
              <li>
                <a
                  href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-honey transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp:</span>
                  <span className="text-honey">+971 50 000 0000</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@instabizweb.com"
                  className="hover:text-honey transition-colors break-all"
                >
                  info@instabizweb.com
                </a>
              </li>
              <li className="text-milk/75">
                Downtown Dubai, United Arab Emirates
              </li>
            </ul>

            {/* Social Media Pills */}
            <div className="mt-6">
              <p className="font-scrawl text-xs text-honey/80 mb-2">find us online</p>
              <ul className="flex flex-wrap gap-2.5" aria-label="Social media">
                <li>
                  <a
                    href="https://www.instabizweb.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border border-milk/30 px-3.5 text-xs font-semibold hover:border-honey hover:text-honey transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instabizweb.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border border-milk/30 px-3.5 text-xs font-semibold hover:border-honey hover:text-honey transition-colors"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instabizweb.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border border-milk/30 px-3.5 text-xs font-semibold hover:border-honey hover:text-honey transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-milk/15 pt-8 text-xs text-milk/60">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
            <span>&copy; {new Date().getFullYear()} TeddyPups U.A.E. All rights reserved.</span>
          </div>
          <span className="font-scrawl text-sm text-honey/80">every puppy is family</span>
        </div>
      </div>
    </footer>
  );
}
