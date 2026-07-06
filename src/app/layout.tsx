import type { Metadata } from "next";
import Link from "next/link";
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
    default: "Cyprus First Division",
    template: "%s | Cyprus First Division"
  },
  description:
    "Fixtures, results, league table, clubs, players and news for the Cyprus First Division.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  )
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-normal">
              Cyprus First Division
            </Link>
            <nav aria-label="Primary navigation" className="flex gap-2 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  className="rounded-md px-3 py-2 text-sm font-medium text-[var(--muted)] hover:bg-[#edf3ef] hover:text-[var(--foreground)]"
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
      </body>
    </html>
  );
}
