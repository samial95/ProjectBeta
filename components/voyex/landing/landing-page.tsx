"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Globe2,
  ShieldCheck,
  Crown,
  ConciergeBell,
  Plane,
  Tag,
  FileText,
  Repeat,
  Cross,
  Package,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/voyex/landing/landing-nav";
import { JetIllustration } from "@/components/voyex/landing/jet-illustration";

const STATS = [
  { value: "500+", label: "Aircraft Worldwide" },
  { value: "1,200+", label: "Destinations" },
  { value: "360°", label: "Lifestyle Service" },
  { value: "24/7", label: "Private Concierge" },
];

const VALUES = [
  {
    icon: Globe2,
    title: "Your access to the world",
    body: "From a single call to wheels-up — intercontinental travel arranged around your schedule, never the other way around.",
  },
  {
    icon: ShieldCheck,
    title: "Voyage with confidence",
    body: "Every operator is vetted and verified, every aircraft compliant, every journey insured and escrow-secured.",
  },
  {
    icon: Crown,
    title: "The ultimate experience in the sky",
    body: "Bespoke cabins, curated catering and personalized aviation experiences crafted for the most discerning traveler.",
  },
];

const SERVICES = [
  { icon: Tag, label: "Sales" },
  { icon: FileText, label: "Lease" },
  { icon: Plane, label: "Helicopter" },
  { icon: Package, label: "Cargo" },
  { icon: Cross, label: "Air Ambulance" },
  { icon: Route, label: "Flight Program" },
];

const FLEET = [
  { tier: "Light Jet", range: "1,500 nm", pax: "5–7 pax" },
  { tier: "Midsize", range: "2,800 nm", pax: "7–8 pax" },
  { tier: "Super Midsize", range: "3,600 nm", pax: "8–9 pax" },
  { tier: "Heavy", range: "4,800 nm", pax: "10–14 pax" },
  { tier: "Ultra Long Range", range: "7,700 nm", pax: "12–19 pax" },
  { tier: "VIP Airliner", range: "Global", pax: "19–50 pax" },
];

const LIFESTYLE = [
  {
    icon: ConciergeBell,
    title: "Lifestyle & Concierge",
    body: "Yachts, residences, dining, security and the details in between — handled.",
  },
  {
    icon: Globe2,
    title: "Travel & Experiences",
    body: "Curated journeys and once-in-a-lifetime experiences across every continent.",
  },
  {
    icon: Crown,
    title: "Events & Partnerships",
    body: "Access to the world's most exclusive events through our partner network.",
  },
  {
    icon: Repeat,
    title: "Membership",
    body: "Guaranteed availability and preferred pricing for our members.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <LandingNav />

      {/* Decorative star field */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.4]">
        {STAR_POSITIONS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* HERO */}
      <section
        id="home"
        className="hero-purple relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/voyex-stacked.svg"
            alt="Voyex — Where your dreams take flight"
            className="w-44 sm:w-52 h-auto float-slow"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/5"
        >
          <Sparkles className="h-3.5 w-3.5 text-white/80" />
          <span className="text-[11px] uppercase tracking-[0.24em] text-white/80">
            Private Jet &amp; Luxury Lifestyle
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 font-serif font-light text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.08] text-white tracking-[0.01em]"
        >
          Where Your Dreams Take Flight
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 mx-auto max-w-[560px] text-base sm:text-lg text-white/75 leading-relaxed"
        >
          A private jet company and luxury solutions lifestyle brand —
          your access to the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 flex items-center justify-center gap-5 flex-wrap"
        >
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-9 py-3.5 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#4e2178]"
          >
            Book your voyage
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/signin"
            className="text-sm uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
          >
            Enquire here
          </Link>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="relative px-6 pb-8">
        <div className="mx-auto max-w-[1100px] grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[var(--color-border)] navy-panel">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="px-6 py-8 text-center bg-[rgba(10,10,10,0.4)]"
            >
              <div className="font-serif font-light text-4xl sm:text-5xl gold-text">
                {s.value}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section id="about" className="relative px-6 py-24">
        <div className="mx-auto max-w-[820px] text-center">
          <Sparkles className="h-5 w-5 text-[var(--color-accent)] mx-auto" />
          <blockquote className="mt-6 font-serif font-light text-[clamp(1.6rem,3.4vw,2.6rem)] leading-snug text-white">
            “Most people say, <span className="text-[var(--color-fg-3)]">the sky&apos;s the limit.</span>{" "}
            We say, <span className="gold-text font-normal">it starts from there.</span>”
          </blockquote>
          <div className="mt-6 text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-3)]">
            The Voyex Philosophy
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative px-6 pb-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className="group rounded-2xl border border-[var(--color-border)] navy-panel p-8 transition-all hover:border-[var(--color-accent-border)] hover:-translate-y-1"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)]">
                    <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="mt-5 font-serif font-normal text-xl text-white">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--color-fg-2)] leading-relaxed">
                    {f.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-14">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Private Jet Services
            </div>
            <h2 className="mt-3 font-serif font-light text-[clamp(2rem,4vw,3rem)] text-white">
              One partner, every requirement
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] navy-panel py-6 px-3 text-center transition-colors hover:border-[var(--color-accent-border)]"
                >
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-fg-2)]">
                    {s.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" className="relative px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-14">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              The Fleet
            </div>
            <h2 className="mt-3 font-serif font-light text-[clamp(2rem,4vw,3rem)] text-white">
              A category for every voyage
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET.map((f, i) => (
              <motion.div
                key={f.tier}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-2xl border border-[var(--color-border)] navy-panel overflow-hidden"
              >
                <div className="h-32 relative flex items-center justify-center border-b border-[var(--color-border)] bg-[rgba(10,10,10,0.5)] overflow-hidden">
                  <JetIllustration className="w-[150%] h-auto opacity-80" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-[var(--color-accent)]" />
                    <h3 className="font-serif font-normal text-lg text-white">
                      {f.tier}
                    </h3>
                  </div>
                  <div className="text-right font-mono text-[12px] text-[var(--color-fg-2)]">
                    <div>{f.range}</div>
                    <div className="text-[var(--color-fg-3)]">{f.pax}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section id="lifestyle" className="relative px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-14">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              360° Lifestyle
            </div>
            <h2 className="mt-3 font-serif font-light text-[clamp(2rem,4vw,3rem)] text-white">
              Beyond the flight
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LIFESTYLE.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  className="rounded-2xl border border-[var(--color-border)] navy-panel p-6"
                >
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  <h3 className="mt-4 font-serif font-normal text-base text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-[var(--color-fg-2)] leading-relaxed">
                    {f.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP CTA */}
      <section id="membership" className="relative px-6 py-24">
        <div className="mx-auto max-w-[900px] text-center rounded-3xl border border-[var(--color-accent-border)] navy-panel gold-glow px-8 py-16">
          <div className="inline-flex items-center gap-2 text-[var(--color-accent)]">
            <Crown className="h-4 w-4" />
            <span className="text-[11px] uppercase tracking-[0.24em]">
              Membership
            </span>
          </div>
          <h2 className="mt-5 font-serif font-light text-[clamp(2rem,4.5vw,3.25rem)] text-white leading-tight">
            Voyage with confidence
          </h2>
          <p className="mt-4 mx-auto max-w-[560px] text-[var(--color-fg-2)]">
            Sign in to source verified quotes, manage your principals, or
            respond to inbound charter requests — your entire operation in one
            orchestration layer.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="gap-2">
              <Link href="/signin">
                Enter the platform
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="relative border-t border-[var(--color-border)] px-6 py-12"
      >
        <div className="mx-auto max-w-[1100px] flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md gold-gradient">
              <Plane className="h-3.5 w-3.5 text-[#0a0a0a]" />
            </span>
            <span
              className="font-serif font-light gold-text text-lg"
              style={{ letterSpacing: "0.3em" }}
            >
              VOYEX
            </span>
          </div>
          <div className="text-xs text-[var(--color-fg-3)]">
            © 2026 Voyex · Where your dreams take flight · Investor demo
          </div>
          <Link
            href="/signin"
            className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            Sign in →
          </Link>
        </div>
      </footer>
    </div>
  );
}

const STAR_POSITIONS = [
  { left: "8%", top: "12%", size: "2px", opacity: 0.6 },
  { left: "22%", top: "26%", size: "1px", opacity: 0.4 },
  { left: "35%", top: "8%", size: "2px", opacity: 0.5 },
  { left: "48%", top: "20%", size: "1px", opacity: 0.35 },
  { left: "63%", top: "10%", size: "2px", opacity: 0.55 },
  { left: "78%", top: "24%", size: "1px", opacity: 0.4 },
  { left: "88%", top: "14%", size: "2px", opacity: 0.5 },
  { left: "15%", top: "40%", size: "1px", opacity: 0.3 },
  { left: "92%", top: "38%", size: "1px", opacity: 0.35 },
  { left: "5%", top: "55%", size: "2px", opacity: 0.4 },
  { left: "70%", top: "44%", size: "1px", opacity: 0.3 },
  { left: "40%", top: "52%", size: "1px", opacity: 0.3 },
];
