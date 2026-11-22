# TeddyPups U.A.E. — Complete Website Replication

A complete, production-grade replication of **TeddyPups U.A.E.** (`https://puppy.instabizweb.com`) — a bespoke luxury puppy adoption showcase in Downtown Dubai.

---

## 🌟 Highlights & Capabilities

- **100% Page & Route Parity (53 Routes)**:
  - Homepage (`/`) with peeking hero lineup, 8 distinct sections, and interactive WhatsApp concierge simulator.
  - Available Puppies Catalog (`/puppies`) with real-time origin and breed filtering.
  - Gone Home Gallery (`/gone-home`) featuring 27 adopted puppy alumni.
  - Happy Families Wall (`/happy-families`) showcasing 64 client moments and an interactive full-screen photo lightbox.
  - How It Works Guide (`/how-it-works`) with sticky chapter jump navigation.
  - Frequently Asked Questions (`/faq`) with interactive accordion and valid `FAQPage` schema markup.
  - Visit & Contact Page (`/contact`) with showroom details and the interactive handwritten letterform.
  - 42 Dynamic Puppy Profiles (`/puppies/[slug]`) complete with photo/video carousels, veterinary certificates, and dedicated inquiry forms.
  - Full SEO suite: dynamic `sitemap.xml` and `robots.txt`.

- **Visual Fidelity & Handcrafted Design System**:
  - Exact font pairings: `Fraunces` (variable serif), `Figtree` (geometric sans), and `Shantell Sans` (handwritten cursive).
  - Exact color tokens: Toffee (`#c2622b`), Honey (`#f2be6b`), Milk (`#fffdf8`), Cocoa (`#2a170e`), Sky (`#bfddf5`), and Blush (`#f9cdbf`).
  - Polaroid `tp-sketch` tilted card physics with random degrees, drop shadows, and organic background wash blobs.
  - Lenis smooth inertial scrolling.

- **Interactive Concierge & Letterform**:
  - `tp-letterform` fill-in-the-blank letter with real wax seal stamp SVG.
  - Multi-stage submission animations: `writing` ➔ `sealing` (envelope fold) ➔ `posting` (mailbox flag raise) ➔ `sent`.
  - Hidden anti-spam honeypot protection (`website` field).

- **Full-Stack & Secure Backend**:
  - Built-in SQLite database powered by Node.js native `DatabaseSync` (`node:sqlite`).
  - Next.js Server Actions with strict validation.
  - Direct WhatsApp click-to-chat integration with pre-filled inquiries.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15+ App Router, React 19, TypeScript |
| **Styling** | Tailwind CSS + Custom CSS Variables |
| **Database** | SQLite (`node:sqlite`) |
| **Animations & Scroll** | Lenis Smooth Scroll + Keyframe animations |
| **Asset Delivery** | Next.js Image Optimization |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+`

### 2. Installation
```bash
git clone <repo-url>
cd InstaBizzWeb
npm install
```

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Start
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
InstaBizzWeb/
├── data/                       # Local SQLite database (auto-generated)
│   └── teddypups.db
├── public/                     # Static assets & brand logo
│   └── brand/logo.png
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── actions.ts          # Server actions (sendEnquiry)
│   │   ├── contact/page.tsx    # Contact & letterform page
│   │   ├── faq/page.tsx        # Questions & answers accordion
│   │   ├── globals.css         # Custom tokens, animations & tailwind
│   │   ├── gone-home/page.tsx  # Adopted alumni gallery
│   │   ├── happy-families/     # Client review wall
│   │   ├── how-it-works/       # Step-by-step adoption guide
│   │   ├── layout.tsx          # Shell with fonts, header, footer & scroll
│   │   ├── page.tsx            # Full-fidelity homepage
│   │   ├── puppies/            # Puppies catalog & dynamic [slug] pages
│   │   ├── robots.ts           # SEO robots.txt
│   │   └── sitemap.ts          # SEO sitemap.xml
│   ├── components/             # Reusable UI components
│   │   ├── Footer.tsx
│   │   ├── HappyFamiliesGallery.tsx
│   │   ├── Header.tsx
│   │   ├── LetterForm.tsx      # Wax seal & animated envelope letterform
│   │   ├── MobileBottomBar.tsx
│   │   ├── MobileMenu.tsx      # Fullscreen dialog drawer
│   │   ├── PhoneSimulator.tsx  # WhatsApp chat player
│   │   ├── PhotoLightbox.tsx   # Fullscreen photo modal
│   │   ├── PuppyBrowser.tsx    # Real-time origin & breed filters
│   │   ├── PuppyCard.tsx       # Polaroid sketch cards
│   │   ├── PuppyMediaGallery.tsx # Photo & MP4 video carousel
│   │   └── SmoothScroll.tsx    # Lenis smooth scrolling
│   ├── data/                   # Structured catalog datasets
│   │   ├── faqs.json           # 9 complete FAQs
│   │   ├── happy_families.json # 64 customer moment photos & metadata
│   │   └── puppies.json        # 42 puppies dataset
│   └── lib/
│       └── db.ts               # SQLite client & inquiry operations
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔒 Security Architecture

- **No Hardcoded Secrets**: Configuration managed via environment variables.
- **Honeypot Protection**: Automated bots filling the hidden `website` input are silently caught and discarded without processing.
- **Input Sanitization**: All contact submissions validate length, email syntax, and telephone formatting.
- **Prepared Statements**: All SQLite queries use parameter binding to prevent SQL injection vulnerabilities.
- **XSS & Content Security**: Next.js automatic React string escaping and strict component boundaries.

---

## 📄 License
MIT License.
