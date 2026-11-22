import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/components/PuppyCard";
import { PuppyMediaGallery } from "@/components/PuppyMediaGallery";
import { LetterForm } from "@/components/LetterForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allPuppies = puppiesData as Puppy[];
  return allPuppies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const allPuppies = puppiesData as Puppy[];
  const puppy = allPuppies.find((p) => p.slug === slug);

  if (!puppy) return { title: "Puppy Not Found | TeddyPups U.A.E." };

  return {
    title: `${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`,
    description: `Meet ${puppy.name}: ${puppy.breed}, ${puppy.gender.toLowerCase()}, ${puppy.age} old, ${puppy.origin.toLowerCase()}. Real photos and video from TeddyPups U.A.E.`,
    openGraph: {
      title: `${puppy.name}, ${puppy.breed} puppy`,
      description: `Meet ${puppy.name}: ${puppy.breed}, ${puppy.gender.toLowerCase()}, ${puppy.age} old. Real photos from TeddyPups U.A.E.`,
      images: puppy.media[0] ? [puppy.media[0].url] : ["/brand/logo.png"],
    },
  };
}

export default async function PuppyDetailPage({ params }: Props) {
  const { slug } = await params;
  const allPuppies = puppiesData as Puppy[];
  const index = allPuppies.findIndex((p) => p.slug === slug);

  if (index === -1) notFound();

  const puppy = allPuppies[index];
  const prevPup = index > 0 ? allPuppies[index - 1] : allPuppies[allPuppies.length - 1];
  const nextPup = index < allPuppies.length - 1 ? allPuppies[index + 1] : allPuppies[0];

  const whatsappHref = `https://wa.me/919898124987?text=Hi%20TeddyPups%2C%20I'm%20interested%20in%20${encodeURIComponent(
    puppy.name
  )}%20(${encodeURIComponent(puppy.breed)}).%20Could%20you%20please%20share%20more%20details%3F`;

  const puppyOptions = [
    {
      id: puppy.id,
      label: `${puppy.name} (${puppy.breed}, ${puppy.gender})`,
    },
  ];

  return (
    <div className="gutter mx-auto max-w-[110rem] pb-24 pt-8 md:pt-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-cocoa-soft flex items-center gap-2">
        <Link href="/puppies" className="hover:text-toffee hover:underline">
          Available puppies
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-cocoa font-bold">
          {puppy.name}
        </span>
      </nav>

      {/* Chapter 1: hello, it's me */}
      <div>
        <p className="tp-chapter flex items-center gap-2">
          <span className="tp-chapter__n font-plush text-xl font-bold text-toffee">1</span>
          <span className="font-scrawl text-lg text-cocoa-soft">hello, it&#39;s me</span>
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-7">
            <PuppyMediaGallery media={puppy.media} name={puppy.name} />
          </div>

          {/* Right Column: Dog Tag Specs Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div data-reveal="true" className="tp-tag tp-board relative rounded-[2.2rem_2.2rem_2.2rem_0.6rem] border-3 border-cocoa bg-[#fff9ee] p-7 md:p-9 shadow-xl">
              {/* Top collar tag ring */}
              <span aria-hidden="true" className="tp-tag__ring" />

              {/* Status Chip */}
              <div className="flex items-center gap-2">
                {puppy.status === "available" ? (
                  <span className="chip !bg-honey !text-cocoa font-bold text-xs">
                    ✓ Available
                  </span>
                ) : (
                  <span className="chip !bg-cocoa !text-milk font-bold text-xs">
                    Gone home
                  </span>
                )}
                <span className="text-xs font-semibold text-cocoa-soft capitalize">
                  {puppy.origin}
                </span>
              </div>

              {/* Puppy Name & Breed Title */}
              <h1 className="font-plush mt-4 text-4xl sm:text-5xl font-black text-cocoa tracking-tight">
                {puppy.name}
              </h1>
              <p className="mt-1 text-lg font-bold text-toffee">{puppy.breed}</p>

              {/* Specifications List */}
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cocoa/10 pt-6">
                <div>
                  <dt className="font-scrawl text-xs text-cocoa-soft">Breed</dt>
                  <dd className="mt-0.5 text-base font-bold text-cocoa">{puppy.breed}</dd>
                </div>
                <div>
                  <dt className="font-scrawl text-xs text-cocoa-soft">Boy or girl</dt>
                  <dd className="mt-0.5 text-base font-bold text-cocoa capitalize">{puppy.gender}</dd>
                </div>
                <div>
                  <dt className="font-scrawl text-xs text-cocoa-soft">Age</dt>
                  <dd className="mt-0.5 text-base font-bold text-cocoa">{puppy.age}</dd>
                </div>
                <div>
                  <dt className="font-scrawl text-xs text-cocoa-soft">Where from</dt>
                  <dd className="mt-0.5 text-base font-bold text-cocoa">{puppy.origin}</dd>
                </div>
                <div>
                  <dt className="font-scrawl text-xs text-cocoa-soft">Location</dt>
                  <dd className="mt-0.5 text-base font-bold text-cocoa">{puppy.location || "Dubai"}</dd>
                </div>
                <div>
                  <dt className="font-scrawl text-xs text-cocoa-soft">Health status</dt>
                  <dd className="mt-0.5 text-base font-bold text-toffee-deep">Vet verified</dd>
                </div>
              </dl>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp text-center"
                >
                  Ask about {puppy.name} on WhatsApp
                </a>
                <a
                  href={`#enquire-${puppy.slug}`}
                  className="btn btn-ghost text-center text-sm"
                >
                  Write an inquiry letter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter 2: what comes with [Name] */}
      <section className="rounded-3xl border-3 border-cocoa bg-milk p-8 sm:p-12 shadow-md">
        <p className="tp-chapter flex items-center gap-2">
          <span className="tp-chapter__n font-plush text-xl font-bold text-toffee">2</span>
          <span className="font-scrawl text-lg text-cocoa-soft">what comes with {puppy.name}</span>
        </p>
        <h2 className="font-plush text-3xl sm:text-4xl font-bold text-cocoa mt-2">
          Every Teddy Pup comes
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div className="flex gap-3 items-start">
            <span className="text-toffee font-bold text-lg">✓</span>
            <div>
              <strong className="block text-cocoa font-bold">1-Year Genetic Health Guarantee</strong>
              <span className="text-cocoa-soft">Complete written warranty covering hereditary and congenital wellness.</span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-toffee font-bold text-lg">✓</span>
            <div>
              <strong className="block text-cocoa font-bold">Vaccinations Up to Date</strong>
              <span className="text-cocoa-soft">Complete age-appropriate core vaccines &amp; multiple deworming cycles.</span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-toffee font-bold text-lg">✓</span>
            <div>
              <strong className="block text-cocoa font-bold">ISO Standard Microchip</strong>
              <span className="text-cocoa-soft">Implanted 15-digit microchip with official registration paperwork.</span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-toffee font-bold text-lg">✓</span>
            <div>
              <strong className="block text-cocoa font-bold">Passport &amp; Health Record Card</strong>
              <span className="text-cocoa-soft">Signed by licensed veterinarians with full clinical inspection log.</span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-toffee font-bold text-lg">✓</span>
            <div>
              <strong className="block text-cocoa font-bold">Starter Welcome Kit</strong>
              <span className="text-cocoa-soft">Transition food, baby blanket, favorite chew toy, and training pads.</span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-toffee font-bold text-lg">✓</span>
            <div>
              <strong className="block text-cocoa font-bold">Lifelong Concierge Support</strong>
              <span className="text-cocoa-soft">24/7 direct guidance on WhatsApp for feeding, training, and care advice.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: how [Name] comes home */}
      <section className="rounded-3xl border-3 border-cocoa bg-[#fff9ee] p-8 sm:p-12 shadow-md">
        <p className="tp-chapter flex items-center gap-2">
          <span className="tp-chapter__n font-plush text-xl font-bold text-toffee">3</span>
          <span className="font-scrawl text-lg text-cocoa-soft">how {puppy.name} comes home</span>
        </p>
        <h2 className="font-plush text-3xl sm:text-4xl font-bold text-cocoa mt-2">
          Coming home from abroad or showroom
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div className="p-5 rounded-2xl border-2 border-cocoa/20 bg-milk space-y-2">
            <span className="font-plush text-2xl font-bold text-toffee">1</span>
            <h3 className="font-bold text-cocoa">Reserve your puppy</h3>
            <p className="text-cocoa-soft text-xs leading-relaxed">Confirm availability with our team and secure {puppy.name}.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-cocoa/20 bg-milk space-y-2">
            <span className="font-plush text-2xl font-bold text-toffee">2</span>
            <h3 className="font-bold text-cocoa">Personalized consultation</h3>
            <p className="text-cocoa-soft text-xs leading-relaxed">Receive preparation tips, diet guidelines, and video updates.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-cocoa/20 bg-milk space-y-2">
            <span className="font-plush text-2xl font-bold text-toffee">3</span>
            <h3 className="font-bold text-cocoa">Import &amp; arrival</h3>
            <p className="text-cocoa-soft text-xs leading-relaxed">Safe flight in temperature-controlled VIP travel cargo to Dubai.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-cocoa/20 bg-milk space-y-2">
            <span className="font-plush text-2xl font-bold text-toffee">4</span>
            <h3 className="font-bold text-cocoa">Welcome home</h3>
            <p className="text-cocoa-soft text-xs leading-relaxed">Meet {puppy.name} in Downtown Dubai or enjoy safe home delivery.</p>
          </div>
        </div>
      </section>

      {/* Chapter 4: Inquiry Letterform */}
      <section id={`enquire-${puppy.slug}`} className="scroll-mt-28 rounded-3xl border-3 border-cocoa bg-milk p-6 sm:p-10 shadow-lg relative">
        <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ "--tape": "#fbe3b4" } as React.CSSProperties} />
        <p className="tp-chapter flex items-center gap-2">
          <span className="tp-chapter__n font-plush text-xl font-bold text-toffee">4</span>
          <span className="font-scrawl text-lg text-cocoa-soft">ask us anything</span>
        </p>
        <h2 className="font-plush text-3xl sm:text-4xl font-bold text-cocoa mt-2 mb-8">
          Ask about {puppy.name}
        </h2>
        <LetterForm
          puppies={puppyOptions}
          initialPuppyId={puppy.id}
          whatsappHref={whatsappHref}
          success={{
            heading: `Your letter about ${puppy.name} is on its way!`,
            body: `We have received your enquiry regarding ${puppy.name}. Our concierge will reply promptly with additional photos and next steps.`,
          }}
        />
      </section>

      {/* Previous / Next Pup Navigation */}
      <nav aria-label="Puppy pagination" className="border-t border-cocoa/15 pt-8 flex items-center justify-between gap-4">
        <Link
          href={`/puppies/${prevPup.slug}`}
          className="group flex items-center gap-3 text-sm font-bold text-cocoa hover:text-toffee transition-colors"
        >
          <span className="size-10 rounded-full border-2 border-cocoa flex items-center justify-center group-hover:bg-honey-soft">
            ←
          </span>
          <div>
            <span className="block text-xs font-normal text-cocoa-soft">Previous pup</span>
            <span>{prevPup.name}</span>
          </div>
        </Link>

        <Link
          href={`/puppies/${nextPup.slug}`}
          className="group flex items-center gap-3 text-sm font-bold text-cocoa hover:text-toffee transition-colors text-right"
        >
          <div>
            <span className="block text-xs font-normal text-cocoa-soft">Next pup</span>
            <span>{nextPup.name}</span>
          </div>
          <span className="size-10 rounded-full border-2 border-cocoa flex items-center justify-center group-hover:bg-honey-soft">
            →
          </span>
        </Link>
      </nav>
    </div>
  );
}
