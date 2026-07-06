import type { Metadata } from "next";
import Link from "next/link";
import { Radio, Search } from "lucide-react";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/results", label: "Results" },
  { href: "/table", label: "Table" },
  { href: "/clubs", label: "Clubs" },
  { href: "/players", label: "Players" },
  { href: "/matches", label: "Matches" },
  { href: "/news", label: "News" }
];

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[#07090d]/95 backdrop-blur">
          <div className="border-b border-[var(--line)] bg-[#0d1118]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-[var(--muted)] sm:px-6 lg:px-8">
              <span className="inline-flex items-center gap-2">
                <Radio size={14} className="gold-text" aria-hidden="true" />
                Cypriot football coverage, built for live data
              </span>
              <span className="hidden sm:inline">API-Football primary feed</span>
            </div>
          </div>
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--brand)] bg-[var(--brand)] text-sm font-black text-[#080a0f]">
                  CY
                </span>
                <span className="text-xl font-black tracking-normal text-white">
                  CYsportnews <span className="gold-text">Football</span>
                </span>
              </Link>
              <button
                className="hidden rounded-md border border-[var(--line)] p-2 text-[var(--muted)] hover:border-[var(--brand)] hover:text-white sm:inline-flex"
                type="button"
                aria-label="Search"
              >
                <Search size={18} aria-hidden="true" />
              </button>
            </div>
            <nav
              aria-label="Primary navigation"
              className="flex gap-2 overflow-x-auto"
            >
              {navItems.map((item) => (
                <Link
                  className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-white"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-[var(--line)] bg-[#080b11]">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
            <div>
              <Link href="/" className="text-lg font-black text-white">
                CYsportnews <span className="gold-text">Football</span>
              </Link>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Premium Cypriot football coverage with automated fixtures,
                results, tables and statistics planned through API-Football.
              </p>
            </div>
            <p className="text-sm text-[var(--muted)]">
              © 2026 CYsportnews Football
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
