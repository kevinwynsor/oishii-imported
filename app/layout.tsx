import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Shippori_Mincho_B1 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const shippori = Shippori_Mincho_B1({
  variable: "--font-shippori",
  weight: ["600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oishii Imported Goodies",
  description: "Imported japanese, korean snacks & ramen 🍜",
  openGraph: {
    title: "Oishii Imported Goodies",
    description: "Imported japanese, korean snacks & ramen 🍜",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Oishii Imported Goodies Logo",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#120d0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSansJP.variable} ${shippori.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
