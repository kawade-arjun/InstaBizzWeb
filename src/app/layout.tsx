import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree, Shantell_Sans } from "next/font/google";
import "./globals.css";
import "./reference.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RevealScope } from "@/components/RevealScope";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puppy.instabizweb.com"),
  title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
  description:
    "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
  applicationName: "TeddyPups U.A.E.",
  openGraph: {
    title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
    description:
      "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
    url: "https://puppy.instabizweb.com",
    siteName: "TeddyPups U.A.E.",
    images: [
      {
        url: "/brand/logo.png",
        width: 800,
        height: 800,
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fffdf8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${shantellSans.variable}`}
    >
      <body className="bg-milk text-cocoa antialiased min-h-screen flex flex-col font-sans selection:bg-honey selection:text-cocoa">
        <SmoothScroll>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 pt-[var(--header-h)] outline-none">
            <RevealScope>{children}</RevealScope>
          </main>
          <Footer />
          <MobileBottomBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
