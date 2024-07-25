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
  applicationName: "Poker Squares",
  authors: {
    name: "Robert Zetterlund",
    url: "https://robertzetterlund.github.io/",
  },
  colorScheme: "dark",
  creator: "Robert Zetterlund",
  keywords: "Poker Squares, Pokerpatiens, Poker Solitaire",
  appleWebApp: {
    capable: true,
    title: "Poker Squares",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        media:
          "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-1136x640.png",
      },
      {
        media:
          "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-2436x1125.png",
      },
      {
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-1792x828.png",
      },
      {
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-828x1792.png",
      },
      {
        media:
          "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-1334x750.png",
      },
      {
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-1242x2688.png",
      },
      {
        media:
          "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-2208x1242.png",
      },
      {
        media:
          "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-1125x2436.png",
      },
      {
        media:
          "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-1242x2208.png",
      },
      {
        media:
          "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-2732x2048.png",
      },
      {
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-2688x1242.png",
      },
      {
        media:
          "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-2224x1668.png",
      },
      {
        media:
          "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-750x1334.png",
      },
      {
        media:
          "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-2048x2732.png",
      },
      {
        media:
          "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-2388x1668.png",
      },
      {
        media:
          "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-1668x2224.png",
      },
      {
        media:
          "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-640x1136.png",
      },
      {
        media:
          "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-1668x2388.png",
      },
      {
        media:
          "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "https://poker-squares.vercel.app/ios/launch-2048x1536.png",
      },
      {
        media:
          "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "https://poker-squares.vercel.app/ios/launch-1536x2048.png",
      },
    ],
  },
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
