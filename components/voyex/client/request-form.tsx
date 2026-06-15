"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CABINS = [
  "Light jet",
  "Mid-size",
  "Super-mid",
  "Heavy",
  "Ultra-long-range",
];

const EXTRAS = [
  "Halal catering",
  "Child seats",
  "Ground transport",
  "Pet-friendly",
  "Sustainable fuel (SAF)",
  "Wi-Fi required",
];

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-2">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-3)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";

export function RequestForm() {
  const [from, setFrom] = useState("Dubai (DXB)");
  const [to, setTo] = useState("London (LTN)");
  const [date, setDate] = useState("2026-03-14");
  const [pax, setPax] = useState("8");
  const [cabin, setCabin] = useState("Ultra-long-range");
  const [extras, setExtras] = useState<string[]>([
    "Halal catering",
    "Child seats",
    "Ground transport",
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function toggleExtra(x: string) {
    setExtras((prev) =>
      prev.includes(x) ? prev.filter((e) => e !== x) : [...prev, x]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-[560px] px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)]">
            <Sparkles className="h-6 w-6 text-[var(--color-accent)]" />
          </div>
          <h1 className="mt-6 font-serif text-[30px] leading-tight text-white">
            Request sent to our broker network
          </h1>
          <p className="mt-3 text-sm text-[var(--color-fg-2)]">
            Vetted brokers are preparing competing offers for{" "}
            <span className="text-[var(--color-fg)]">
              {from} → {to}
            </span>
            . You&apos;ll have offers to compare within minutes.
          </p>

          <div className="mt-8 border border-[var(--color-border)] rounded-xl navy-panel divide-y divide-[var(--color-border)] text-left">
            {[
              "Request broadcast to 6 brokers",
              "3 brokers reviewing now",
              "First offers expected in ~4 min",
            ].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.35 }}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--color-ok)]" />
                <span className="text-sm text-[var(--color-fg-2)]">{line}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.5 }}
            className="mt-8"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/client">
                View my offers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[680px] px-6 py-12">
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
          New request
        </div>
        <h1 className="mt-1 font-serif text-[32px] leading-tight text-white">
          Where would you like to fly?
        </h1>
        <p className="mt-2 text-sm text-[var(--color-fg-2)]">
          Tell us once. Vetted brokers compete to give you their best offer.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="px-7 py-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="From" icon={Plane}>
              <input
                className={inputCls}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="City or airport"
              />
            </Field>
            <Field label="To" icon={Plane}>
              <input
                className={inputCls}
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="City or airport"
              />
            </Field>
            <Field label="Departure date" icon={Calendar}>
              <input
                type="date"
                className={cn(inputCls, "[color-scheme:dark]")}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
            <Field label="Passengers" icon={Users}>
              <input
                type="number"
                min={1}
                className={inputCls}
                value={pax}
                onChange={(e) => setPax(e.target.value)}
              />
            </Field>
          </div>

          <Field label="Cabin class" icon={Plane}>
            <div className="flex flex-wrap gap-2">
              {CABINS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCabin(c)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs border transition-colors",
                    cabin === c
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-fg-2)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-2)]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Preferences" icon={Sparkles}>
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map((x) => {
                const on = extras.includes(x);
                return (
                  <button
                    key={x}
                    type="button"
                    onClick={() => toggleExtra(x)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs border transition-colors",
                      on
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        : "border-[var(--color-border)] text-[var(--color-fg-2)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-2)]"
                    )}
                  >
                    {x}
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Broadcasting to brokers…
                </>
              ) : (
                <>
                  Request offers
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
            <p className="text-[11px] text-[var(--color-fg-3)] text-center mt-3">
              Free to request · no obligation · brokers compete for your trip
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
