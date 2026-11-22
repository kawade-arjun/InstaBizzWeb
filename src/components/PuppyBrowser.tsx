"use client";

import React, { useState, useMemo } from "react";
import { Puppy, PuppyCard } from "./PuppyCard";

interface PuppyBrowserProps {
  initialPuppies: Puppy[];
}

export function PuppyBrowser({ initialPuppies }: PuppyBrowserProps) {
  const [selectedOrigin, setSelectedOrigin] = useState<string>("all");
  const [selectedBreed, setSelectedBreed] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique breeds
  const breeds = useMemo(() => {
    const set = new Set<string>();
    initialPuppies.forEach((p) => {
      if (p.breed) {
        // Clean simplified breed names
        const b = p.breed.toLowerCase();
        if (b.includes("maltipoo")) set.add("Maltipoo");
        else if (b.includes("pomeranian")) set.add("Pomeranian");
        else if (b.includes("poodle")) set.add("Poodle");
        else if (b.includes("cavapoo")) set.add("Cavapoo");
        else if (b.includes("shih tzu") || b.includes("shitzu")) set.add("Shih Tzu");
        else if (b.includes("pomsky") || b.includes("pomski")) set.add("Pomsky");
        else if (b.includes("bichon")) set.add("Bichon");
        else set.add(p.breed);
      }
    });
    return Array.from(set).sort();
  }, [initialPuppies]);

  // Filtered puppies
  const filteredPuppies = useMemo(() => {
    return initialPuppies.filter((p) => {
      // 1. Origin filter
      if (selectedOrigin === "local") {
        const isLocal =
          p.origin?.toLowerCase().includes("local") ||
          p.location?.toLowerCase().includes("showroom") ||
          p.origin?.toLowerCase().includes("dubai");
        if (!isLocal) return false;
      } else if (selectedOrigin === "imported") {
        const isImported = p.origin?.toLowerCase().includes("imported");
        if (!isImported) return false;
      }

      // 2. Breed filter
      if (selectedBreed !== "all") {
        if (!p.breed.toLowerCase().includes(selectedBreed.toLowerCase())) {
          return false;
        }
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.breed.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [initialPuppies, selectedOrigin, selectedBreed, searchQuery]);

  return (
    <div>
      {/* Filters Section */}
      <div className="space-y-6">
        {/* Origin Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cocoa/10 pb-6">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Puppy origin">
            <button
              type="button"
              role="tab"
              aria-selected={selectedOrigin === "all"}
              onClick={() => setSelectedOrigin("all")}
              className={`chip cursor-pointer text-sm px-5 py-2.5 rounded-full font-bold transition-all ${
                selectedOrigin === "all"
                  ? "!bg-cocoa !text-milk shadow-md"
                  : "!bg-milk !text-cocoa border border-cocoa/20 hover:!bg-honey-soft"
              }`}
            >
              All puppies ({initialPuppies.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedOrigin === "local"}
              onClick={() => setSelectedOrigin("local")}
              className={`chip cursor-pointer text-sm px-5 py-2.5 rounded-full font-bold transition-all ${
                selectedOrigin === "local"
                  ? "!bg-cocoa !text-milk shadow-md"
                  : "!bg-milk !text-cocoa border border-cocoa/20 hover:!bg-honey-soft"
              }`}
            >
              In Dubai showroom
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedOrigin === "imported"}
              onClick={() => setSelectedOrigin("imported")}
              className={`chip cursor-pointer text-sm px-5 py-2.5 rounded-full font-bold transition-all ${
                selectedOrigin === "imported"
                  ? "!bg-cocoa !text-milk shadow-md"
                  : "!bg-milk !text-cocoa border border-cocoa/20 hover:!bg-honey-soft"
              }`}
            >
              Imported for you
            </button>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-auto">
            <label htmlFor="puppy-search" className="sr-only">
              Search puppies
            </label>
            <input
              id="puppy-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, breed…"
              className="w-full sm:w-64 rounded-full border border-cocoa/20 bg-milk px-4 py-2 text-sm text-cocoa placeholder:text-cocoa-soft/60 focus:border-toffee focus:outline-none focus:ring-2 focus:ring-toffee/20"
            />
          </div>
        </div>

        {/* Breed Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-scrawl text-sm text-cocoa-soft mr-2">Breed:</span>
          <button
            type="button"
            onClick={() => setSelectedBreed("all")}
            className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
              selectedBreed === "all"
                ? "bg-toffee text-milk shadow-sm"
                : "bg-honey/20 text-cocoa hover:bg-honey/40"
            }`}
          >
            All breeds
          </button>
          {breeds.map((breed) => (
            <button
              key={breed}
              type="button"
              onClick={() => setSelectedBreed(breed)}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                selectedBreed === breed
                  ? "bg-toffee text-milk shadow-sm"
                  : "bg-honey/20 text-cocoa hover:bg-honey/40"
              }`}
            >
              {breed}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Puppies */}
      {filteredPuppies.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredPuppies.map((puppy, idx) => (
            <PuppyCard key={puppy.id} puppy={puppy} tiltIndex={idx} />
          ))}
        </ul>
      ) : (
        <div className="my-20 rounded-3xl border-2 border-dashed border-cocoa/20 p-12 text-center bg-honey/10">
          <p className="font-plush text-2xl text-cocoa">No puppies found</p>
          <p className="mt-2 text-cocoa-soft text-sm">
            Try adjusting your filters or search query, or message us on WhatsApp to inquire about upcoming litters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedOrigin("all");
              setSelectedBreed("all");
              setSearchQuery("");
            }}
            className="btn btn-ghost mt-6 text-sm"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
