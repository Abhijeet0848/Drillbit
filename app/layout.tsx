import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DrillBit | India's Preferred Plagiarism & AI Text Detection",
  description: "Advanced plagiarism detection and AI text analysis for academic and research excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
