import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raghavgajavelli.com"),
  title: {
    default: "Raghav Gajavelli",
    template: "%s | Raghav Gajavelli",
  },
  description:
    "Tech × Creativity × Human Story. Senior Product Manager and Lead Systems Architect based in Amsterdam. Building AI tools at scale. Photography. Systems thinking.",
  keywords: [
    "Raghav Gajavelli",
    "raghavgajavelli",
    "Product Manager Amsterdam",
    "Lead Systems Architect",
    "AI Product Manager Netherlands",
    "Portrait Photographer Amsterdam",
    "Tech Creativity Human Story",
    "Senior PM Netherlands",
  ],
  authors: [{ name: "Raghav Gajavelli", url: "https://raghavgajavelli.com" }],
  creator: "Raghav Gajavelli",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://raghavgajavelli.com",
    title: "Raghav Gajavelli — Tech × Creativity × Human Story",
    description:
      "Senior Product Manager and Lead Systems Architect based in Amsterdam. Building AI tools at scale. Photography. Systems thinking.",
    siteName: "Raghav Gajavelli",
    images: [
      {
        url: "/portraits/portrait-689.jpg",
        width: 900,
        height: 900,
        alt: "Raghav Gajavelli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Gajavelli — Tech × Creativity × Human Story",
    description:
      "Senior Product Manager and Lead Systems Architect based in Amsterdam. Building AI tools at scale.",
    images: ["/portraits/portrait-689.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Raghav Gajavelli",
  url: "https://raghavgajavelli.com",
  image: "https://raghavgajavelli.com/portraits/portrait-689.jpg",
  jobTitle: "Senior Product Manager & Lead Systems Architect",
  description:
    "Tech × Creativity × Human Story. Senior Product Manager and Lead Systems Architect based in Amsterdam, Netherlands. Building AI tools at scale. Portrait photographer. Writer.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hoofddorp",
    addressRegion: "North Holland",
    addressCountry: "NL",
  },
  sameAs: [
    "https://www.linkedin.com/in/raghav-gajavelli/",
    "https://www.instagram.com/raghavgajavelli/",
    "https://www.youtube.com/@RaghavGajavelli",
    "https://github.com/RaghavGajavelli",
    "https://raghavgajavelli.substack.com/",
    "https://hashtagraghav.com/",
  ],
  knowsAbout: [
    "Product Management",
    "AI Systems",
    "Lead Systems Architecture",
    "Portrait Photography",
    "Content Creation",
    "Systems Thinking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
