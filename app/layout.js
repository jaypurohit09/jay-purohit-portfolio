import "@fontsource-variable/plus-jakarta-sans";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const description =
  "Jay Purohit builds the GTM engine that fills the pipeline. Last build: 324 booked meetings and 30 paying customers at nRev, with no paid ads.";

export const metadata = {
  metadataBase: new URL("https://jay-purohit-portfolio.vercel.app"),
  title: "Jay Purohit · GTM engineering and demand generation",
  description,
  openGraph: {
    title: "Jay Purohit · I build the GTM engine that fills your pipeline",
    description,
    url: "https://jay-purohit-portfolio.vercel.app",
    siteName: "Jay Purohit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Purohit · I build the GTM engine that fills your pipeline",
    description,
  },
};

export const viewport = {
  themeColor: "#0a0e17",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
