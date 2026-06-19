"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Fleet", href: "#fleet" },
  { label: "Who it's for", href: "#personas" },
  { label: "Get started", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[rgba(40,18,64,0.35)] backdrop-blur-md">
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        <Link href="#home" className="flex items-center" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/voyex-horizontal.svg"
            alt="Voyex"
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
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
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="lg:hidden border-t border-white/10 bg-[rgba(40,18,64,0.95)] backdrop-blur-md">
          <div className="mx-auto max-w-[1200px] px-6 py-4 flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[13px] uppercase tracking-[0.14em] text-white/80 hover:text-white border-b border-white/5 last:border-b-0 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/signin"
              onClick={() => setOpen(false)}
              className="py-3 text-[13px] uppercase tracking-[0.14em] text-white/80 hover:text-white transition-colors"
            >
              Enquire
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
