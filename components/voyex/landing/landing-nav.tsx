"use client";

import Link from "next/link";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

export function LandingNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[rgba(40,18,64,0.35)] backdrop-blur-md">
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        <Link href="#home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/voyex-horizontal.svg"
            alt="Voyex"
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="hidden sm:inline text-[12px] uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors"
          >
            Enquire
          </Link>
          <Link
            href="/signin"
            className="inline-flex items-center rounded-full border border-white/50 px-5 py-2 text-[12px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-[#4e2178]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
