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
  title: "Jay Purohit · GTM engineering and demand generation",
  description:
    "Jay Purohit builds the GTM engine that fills the pipeline: 9+ years of B2B SaaS demand from zero, SEO and AEO, event-led and signal-based outbound, built with Claude and Claude Code.",
  openGraph: {
    title: "Jay Purohit · I build the GTM engine that fills your pipeline",
    description:
      "324 booked meetings and 30 paying customers fed with no paid ads, 33,525 AI-answer citations, and the systems behind them.",
    type: "website",
    url: "https://jay-purohit-portfolio.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
