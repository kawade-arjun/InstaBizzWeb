import React from "react";
import Link from "next/link";

export function MobileBottomBar() {
  return (
    <aside
      aria-label="Quick contact"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-cocoa/15 bg-milk/95 backdrop-blur-md px-4 py-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <Link
          href="/puppies"
          className="flex-1 text-center py-2 px-3 rounded-full border border-cocoa/30 text-xs font-bold text-cocoa hover:bg-honey-soft transition-colors"
        >
          View Puppies
        </Link>
        <a
          href="tel:+971500000000"
          className="flex-1 text-center py-2 px-3 rounded-full border border-cocoa/30 text-xs font-bold text-cocoa hover:bg-honey-soft transition-colors"
        >
          Call Showroom
        </a>
        <a
          href="https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20a%20puppy."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-3 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-sm"
        >
          WhatsApp
        </a>
      </div>
    </aside>
  );
}
