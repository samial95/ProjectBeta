"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Inbox, Building2, UserRound, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAuthActions } from "@/lib/use-session";
import {
  BROKER_SESSION,
  OPERATOR_SESSION,
  CUSTOMER_SESSION,
  sessionFor,
  type Role,
} from "@/lib/session";

const ROLES: {
  id: Role;
  label: string;
  org: string;
  icon: typeof Inbox;
  blurb: string;
}[] = [
  {
    id: "customer",
    label: "Traveler",
    org: CUSTOMER_SESSION.org,
    icon: UserRound,
    blurb:
      "Post a trip request, compare competing broker offers, and pay a deposit to confirm.",
  },
  {
    id: "broker",
    label: "Charter broker",
    org: BROKER_SESSION.org,
    icon: Inbox,
    blurb:
      "Source quotes, vet operators, and manage VIP principals on behalf of family offices.",
  },
  {
    id: "operator",
    label: "Operator",
    org: OPERATOR_SESSION.org,
    icon: Building2,
    blurb:
      "Respond to inbound RFQs, manage your fleet availability, and track quote win rate.",
  },
];

const ROLE_CTA: Record<Role, string> = {
  customer: "traveler",
  broker: "broker",
  operator: "operator",
};

export function SignInForm() {
  const [role, setRole] = useState<Role>("customer");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuthActions();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? undefined;

  const selected = sessionFor(role);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    signIn(role, next);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-[var(--color-bg)]">
      <div className="w-full max-w-[460px]">
        <div className="flex flex-col items-center mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/voyex-stacked.svg" alt="Voyex" className="w-28 h-auto" />
        </div>

        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-sm">
          <div className="px-8 pt-8 pb-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
              Sign in
            </div>
            <h1 className="font-serif text-[26px] leading-tight text-[var(--color-fg)] mt-1">
              Continue to Voyex
            </h1>
            <p className="text-sm text-[var(--color-fg-2)] mt-2">
              Select the workspace you want to enter.
            </p>
          </div>

          <Separator />

          <div className="px-8 py-6 space-y-3">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = r.id === role;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "w-full text-left p-4 border rounded-sm transition-colors flex items-start gap-4",
                    active
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                      : "border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
                  )}
                  aria-pressed={active}
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-sm flex items-center justify-center shrink-0 border",
                      active
                        ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-bg)]"
                        : "border-[var(--color-border)] text-[var(--color-fg-2)]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm text-[var(--color-fg)] font-medium">
                        {r.label}
                      </div>
                      {active && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[var(--color-fg-3)] mt-0.5">
                      {r.org}
                    </div>
                    <div className="text-xs text-[var(--color-fg-2)] mt-2 leading-relaxed">
                      {r.blurb}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={selected.email}
                readOnly
                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm px-3 py-2.5 text-sm font-mono text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-fg-3)]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="any password works"
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm pl-9 pr-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-3)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <>Signing in…</>
              ) : (
                <>
                  Sign in as {ROLE_CTA[role]}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-[11px] text-[var(--color-fg-3)] text-center">
              Investor demo · any password works
            </div>
          </form>
        </div>

        <div className="mt-8 text-[11px] text-[var(--color-fg-3)] text-center">
          Voyex · Private jet trip orchestration
        </div>
      </div>
    </div>
  );
}
