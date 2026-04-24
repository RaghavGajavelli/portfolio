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
    "Tech × Creativity × Human Story. Senior Business Solutions Architect based in Amsterdam. Building AI tools at scale. Advisory. Systems thinking.",
  keywords: [
    "Raghav Gajavelli",
    "raghavgajavelli",
    "Product Manager Amsterdam",
    "Lead Systems Architect",
    "AI Product Manager Netherlands",
    "Digital Transformation Advisory",
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
      "Senior Business Solutions Architect based in Amsterdam. Building AI tools at scale. Advisory. Systems thinking.",
    siteName: "Raghav Gajavelli",
    images: [
      {
        url: "/portraits/portrait-bw.jpg",
        width: 800,
        height: 1000,
        alt: "Raghav Gajavelli",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Raghav Gajavelli — Tech × Creativity × Human Story",
    description:
      "Senior Business Solutions Architect based in Amsterdam. Building AI tools at scale.",
    images: ["/portraits/portrait-bw.jpg"],
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
  image: "https://raghavgajavelli.com/portraits/portrait-bw.jpg",
  jobTitle: "Senior Business Solutions Architect",
  description:
    "Tech × Creativity × Human Story. Senior Business Solutions Architect based in Amsterdam, Netherlands. Building AI tools at scale. Advisory. Systems thinking.",
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
    "Digital Transformation Advisory",
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
