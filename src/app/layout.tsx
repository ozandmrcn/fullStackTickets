/**
 * @file layout.tsx
 * @description Root layout component for the entire Next.js application.
 *              Wraps every page with the shared Sidebar and Header, applies
 *              global fonts, and injects page-level metadata (title, description).
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Smooch } from "next/font/google";
import "./globals.css";

// Relative import — Header lives one level up from the app directory.
import Header from "../components/header";

// Absolute import using the `@/` path alias configured in tsconfig.json.
import Sidebar from "@/components/sidebar";

/**
 * Geist Sans — primary sans-serif typeface.
 * Exposed as a CSS custom property (`--font-geist-sans`) for use in Tailwind.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono — monospace typeface used for code snippets and IDs.
 * Exposed as `--font-geist-mono`.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Smooch — decorative display font used for the brand/logo wordmark.
 * Exposed as `--font-smooch`.
 */
const smooch = Smooch({
  weight: "400",
  variable: "--font-smooch",
  subsets: ["latin"],
});

/**
 * Static metadata applied to every page in the application.
 * Next.js merges page-level metadata on top of these defaults.
 */
export const metadata: Metadata = {
  title: "Rudder",
  description: "A support ticket management application",
};

/**
 * RootLayout
 *
 * Wraps all page content with the persistent Sidebar and Header.
 * The main content area is scrollable and constrained to the viewport height
 * minus the combined height of the header and statistics bar.
 *
 * @param {{ children: React.ReactNode }} props - Page content injected by Next.js.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${smooch.variable} antialiased`}>
        {/* Full-height flex container: sidebar on the left, content on the right */}
        <div className="flex h-full">
          <Sidebar />

          <div className="min-h-screen w-full">
            {/* Sticky top bar with search, icons, user avatar, and statistics */}
            <Header />

            {/* Scrollable page content area */}
            <main className="h-[calc(100vh-189px)] overflow-y-auto p-4 md:px-8 pb-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
