"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Globe2,
  ShieldCheck,
  Route,
  MessageSquare,
  Tag,
  Lock,
  PlaneTakeoff,
  UserRound,
  Inbox,
  Building2,
  Megaphone,
  Plane,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/voyex/landing/landing-nav";

const STATS = [
  { value: "500+", label: "Verified aircraft" },
  { value: "1,200+", label: "Destinations" },
  { value: "30 min", label: "Operator response SLA" },
  { value: "24/7", label: "AI concierge" },
];

const VALUES = [
  {
    icon: Globe2,
    title: "One request, competing offers",
    body: "Tell us your trip once — or just chat with our concierge. Vetted brokers and operators come back with their best all-in offers for you to compare.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & escrow-secured",
    body: "Every broker and operator is vetted and verified. Your payment is held in escrow and released only when your aircraft is confirmed.",
  },
  {
    icon: Route,
    title: "Orchestrated end-to-end",
    body: "From offer to wheels-up: message your broker or operator, share passports in a secure vault, and track every step of the trip.",
  },
];

const STEPS = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Tell us your trip",
    body: "Post a request or chat with the Voyex concierge — route, dates, guests and preferences.",
  },
  {
    icon: Tag,
    step: "02",
    title: "Compare offers",
    body: "Vetted operators respond within 30 minutes, brokers within an hour — with all-in pricing.",
  },
  {
    icon: Lock,
    step: "03",
    title: "Pay into escrow",
    body: "Card, Apple Pay or crypto. Funds are held safely until your aircraft is confirmed.",
  },
  {
    icon: PlaneTakeoff,
    step: "04",
    title: "Fly & track",
    body: "Chat with your broker or operator, share documents securely, and track the whole trip.",
  },
];

const PERSONAS = [
  {
    icon: UserRound,
    title: "Travellers",
    body: "Compare competing offers, pay into escrow, and manage your trip in one place.",
  },
  {
    icon: Inbox,
    title: "Brokers",
    body: "Receive traveller requests directly, send all-in offers, and manage your principals.",
  },
  {
    icon: Building2,
    title: "Operators",
    body: "Win charters by responding to live requests from travellers — no middle-man markup.",
  },
  {
    icon: Megaphone,
    title: "Ambassadors",
    body: "Refer travellers with your code or link and earn royalties on every flight they take.",
  },
];

const FLEET = [
  { tier: "Light Jet", range: "1,500 nm", pax: "5–7 pax", image: "/fleet/light-jet.jpg" },
  { tier: "Midsize", range: "2,800 nm", pax: "7–8 pax", image: "/fleet/midsize.jpg" },
  { tier: "Super Midsize", range: "3,600 nm", pax: "8–9 pax", image: "/fleet/super-midsize.jpg" },
  { tier: "Heavy", range: "4,800 nm", pax: "10–14 pax", image: "/fleet/heavy.jpg" },
  { tier: "Ultra Long Range", range: "7,700 nm", pax: "12–19 pax", image: "/fleet/ultra-long-range.jpg" },
  { tier: "VIP Airliner", range: "Global", pax: "19–50 pax", image: "/fleet/vip-airliner.jpg" },
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
        className="hero-purple relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden"
      >
        {/* Side-profile jet backdrop, recolored to the brand purple */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-side.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(16,7,28,0.92)] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,6,24,1)] via-[rgba(22,10,38,0.82)] to-[rgba(20,9,34,0.15)]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center"
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
          className="relative z-10 mt-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/5"
        >
          <Sparkles className="h-3.5 w-3.5 text-white/80" />
          <span className="text-[11px] uppercase tracking-[0.24em] text-white/80">
            The private aviation marketplace
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative z-10 mt-8 font-serif font-light text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.08] text-white tracking-[0.01em]"
        >
          Private aviation, on your terms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative z-10 mt-6 mx-auto max-w-[600px] text-base sm:text-lg text-white/75 leading-relaxed"
        >
          Post one request — or just tell our concierge. Vetted brokers and
          operators respond directly with competing all-in offers. Compare, pay
          into escrow, and we orchestrate the trip end-to-end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="relative z-10 mt-12 flex items-center justify-center gap-5 flex-wrap"
        >
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-9 py-3.5 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#4e2178]"
          >
            Get competing offers
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#how"
            className="text-sm uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
          >
            See how it works
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
            “Chartering a jet shouldn&apos;t mean{" "}
            <span className="text-[var(--color-fg-3)]">endless phone calls.</span>{" "}
            One request. <span className="gold-text font-normal">Every jet competes.</span>”
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

      {/* HOW IT WORKS */}
      <section id="how" className="relative px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-14">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              How it works
            </div>
            <h2 className="mt-3 font-serif font-light text-[clamp(2rem,4vw,3rem)] text-white">
              From request to wheels-up
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="rounded-2xl border border-[var(--color-border)] navy-panel p-6 transition-colors hover:border-[var(--color-accent-border)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)]">
                      <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <span className="font-mono text-sm text-[var(--color-fg-3)]">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif font-normal text-lg text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-[var(--color-fg-2)] leading-relaxed">
                    {s.body}
                  </p>
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
                <div className="h-32 relative border-b border-[var(--color-border)] bg-[rgba(10,10,10,0.5)] overflow-hidden">
                  <Image
                    src={f.image}
                    alt={`${f.tier} private jet`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.55)] to-transparent" />
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

      {/* WHO IT'S FOR */}
      <section id="personas" className="relative px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-14">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Who it&apos;s for
            </div>
            <h2 className="mt-3 font-serif font-light text-[clamp(2rem,4vw,3rem)] text-white">
              One platform, every side of the trip
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERSONAS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  className="rounded-2xl border border-[var(--color-border)] navy-panel p-7 transition-all hover:border-[var(--color-accent-border)] hover:-translate-y-1"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)]">
                    <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="mt-5 font-serif font-normal text-lg text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-[var(--color-fg-2)] leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="membership" className="relative px-6 py-24">
        <div className="mx-auto max-w-[900px] text-center rounded-3xl border border-[var(--color-accent-border)] navy-panel gold-glow px-8 py-16">
          <div className="inline-flex items-center gap-2 text-[var(--color-accent)]">
            <Crown className="h-4 w-4" />
            <span className="text-[11px] uppercase tracking-[0.24em]">
              Get started
            </span>
          </div>
          <h2 className="mt-5 font-serif font-light text-[clamp(2rem,4.5vw,3.25rem)] text-white leading-tight">
            Enter the marketplace
          </h2>
          <p className="mt-4 mx-auto max-w-[560px] text-[var(--color-fg-2)]">
            Sign in as a traveller, broker, operator or ambassador — one platform
            that connects every side of private aviation.
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
            © 2026 Voyex · The private aviation marketplace · Investor demo
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
