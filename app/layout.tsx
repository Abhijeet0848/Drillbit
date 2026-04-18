import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DrillBit | Professional Plagiarism & AI Detection",
    template: "%s | DrillBit"
  },
  description: "Advanced academic integrity platform featuring deep-scan plagiarism detection, Neural AI content analysis, and institutional report archiving.",
  keywords: ["plagiarism detection", "AI detection", "academic integrity", "turnitin alternative", "Drillbit India", "research ethics"],
  authors: [{ name: "Drillbit Team" }],
  creator: "Drillbit",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://drillbit.com",
    title: "DrillBit | Professional Plagiarism & AI Detection",
    description: "Secure your research with India's most trusted integrity platform.",
    siteName: "DrillBit Platinum",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrillBit | Academic Integrity Reimagined",
    description: "Detect Plagiarism and AI generated content with industrial precision.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
