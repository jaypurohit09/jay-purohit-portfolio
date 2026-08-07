import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Jay Purohit · Growth marketer who builds the systems he markets with",
  description:
    "Zero-to-one growth operator, 9+ years in B2B SaaS. AI-augmented GTM systems, AEO, CRO, and lifecycle marketing with real numbers attached.",
  openGraph: {
    title: "Jay Purohit · Growth Marketing Portfolio",
    description:
      "Zero-to-one growth operator, 9+ years in B2B SaaS. AI-augmented GTM systems, AEO, CRO, and lifecycle marketing with real numbers attached.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
