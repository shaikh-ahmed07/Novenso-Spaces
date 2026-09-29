import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactDock from "@/components/layout/ContactDock";
import MotionProvider from "@/components/motion/MotionProvider";

// Variable fonts: one file per style covers every weight we use.
const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Novenso Spaces | Interior Design, PMC & Execution",
    template: "%s | Novenso Spaces",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "interior design",
    "interior PMC",
    "interior project management",
    "interior execution",
    "interior contracting",
    "turnkey interiors",
    "custom sofa manufacturing",
    "bespoke furniture",
    "luxury interiors",
    "Novenso Spaces",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Novenso Spaces | Interior Design, PMC & Execution",
    description: site.description,
    url: "/",
    locale: "en_IN",
    images: [
      {
        url: "/images/hero/home-hero.jpg",
        width: 2400,
        height: 1600,
        alt: "Contemporary living room designed by Novenso Spaces",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novenso Spaces | Interior Design, PMC & Execution",
    description: site.description,
    images: ["/images/hero/home-hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0d",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone.tel,
  logo: `${site.url}/brand/novenso-logo-full.jpg`,
  image: `${site.url}/images/hero/home-hero.jpg`,
  description: site.description,
  slogan: site.tagline,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh bg-ivory">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <ContactDock />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
