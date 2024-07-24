import { Metadata } from "next";
import "./globals.css";
import balatroFont from "next/font/local";
import Head from "next/head";

const myFont = balatroFont({
  src: "../public/balatro.ttf",
  preload: true,
});

export const metadata: Metadata = {
  title: "Poker Squares",
  description:
    "Play Poker Squares online and compare your daily score to others",
  metadataBase: new URL("https://poker-squares.vercel.app/"),
  openGraph: {
    type: "website",
    images: [
      {
        url: "https://poker-squares.vercel.app/opengraph-image.png",
      },
    ],
    siteName: "Poker Squares",
    description:
      "Play Poker Squares online and compare your daily score to others",
    url: "https://poker-squares.vercel.app",
    title: "Poker Squares",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Play Poker Squares online and compare your daily score to others",
    images: new URL("https://poker-squares.vercel.app/opengraph-image.png"),
    title: "Poker Squares",
    site: "https://poker-squares.vercel.app/",
  },
  themeColor: "#0b2b83",
  manifest: "https://poker-squares.vercel.app/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0b2b83" />
        <meta name="msapplication-TileColor" content="#0b2b83" />
      </Head>
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
