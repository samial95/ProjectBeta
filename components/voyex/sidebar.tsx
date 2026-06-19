"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  PlaneTakeoff,
  Users,
  Building2,
  BarChart3,
  Settings,
  Plane,
  ClipboardList,
  LogOut,
  Search,
  Heart,
  CreditCard,
  LayoutDashboard,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Session } from "@/lib/session";
import { useAuthActions } from "@/lib/use-session";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  match?: (pathname: string) => boolean;
};

const BROKER_NAV: NavItem[] = [
  {
    label: "Trip Requests",
    href: "/trips",
    icon: Inbox,
    match: (p) => p === "/trips" || p.startsWith("/trips/") || p.startsWith("/checkout"),
  },
  { label: "Active Bookings", href: "/active", icon: PlaneTakeoff },
  {
    label: "Principals",
    href: "/principals",
    icon: Users,
    match: (p) => p === "/principals" || p.startsWith("/principals/"),
  },
  { label: "Operators", href: "/operators", icon: Building2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

const OPERATOR_NAV: NavItem[] = [
  {
    label: "Inbound RFQs",
    href: "/operator",
    icon: ClipboardList,
    match: (p) => p === "/operator" || p.startsWith("/operator/rfq"),
  },
  { label: "Active Bookings", href: "/operator/bookings", icon: PlaneTakeoff },
  {
    label: "My Fleet",
    href: "/operator/fleet",
    icon: Plane,
    match: (p) => p === "/operator/fleet" || p.startsWith("/operator/fleet/"),
  },
  { label: "Performance", href: "/operator/analytics", icon: BarChart3 },
  { label: "Settings", href: "/operator/settings", icon: Settings },
];

const CUSTOMER_NAV: NavItem[] = [
  {
    label: "My Trips",
    href: "/client",
    icon: PlaneTakeoff,
    match: (p) =>
      p === "/client" || p.startsWith("/client/deposit"),
  },
  { label: "New Request", href: "/client/request", icon: Search },
  { label: "Saved", href: "/client/saved", icon: Heart },
  { label: "Payments", href: "/client/payments", icon: CreditCard },
  { label: "Settings", href: "/client/settings", icon: Settings },
];

const AMBASSADOR_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/ambassador",
    icon: LayoutDashboard,
    match: (p) => p === "/ambassador",
  },
  { label: "Referrals", href: "/ambassador/referrals", icon: Users },
  { label: "Earnings", href: "/ambassador/payouts", icon: Wallet },
  { label: "Settings", href: "/ambassador/settings", icon: Settings },
];

const WORKSPACE_LABEL: Record<Session["role"], string> = {
  broker: "Broker workspace",
  operator: "Operator workspace",
  customer: "Traveler",
  ambassador: "Ambassador",
};

const DOT_COLOR: Record<Session["role"], string> = {
  broker: "bg-[var(--color-accent)]",
  operator: "bg-[var(--color-info)]",
  customer: "bg-[var(--color-ok)]",
  ambassador: "bg-[var(--color-warn)]",
};

export function Sidebar({ session }: { session: Session }) {
  const pathname = usePathname();
  const { signOut } = useAuthActions();
  const nav =
    session.role === "broker"
      ? BROKER_NAV
      : session.role === "operator"
        ? OPERATOR_NAV
        : session.role === "ambassador"
          ? AMBASSADOR_NAV
          : CUSTOMER_NAV;

  const isActive = (item: NavItem) => {
    if (item.match) return item.match(pathname);
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  return (
    <aside className="w-[240px] shrink-0 border-r border-[var(--color-border)] flex flex-col h-screen sticky top-0 bg-[rgba(22,10,38,0.55)] backdrop-blur-md">
      <div className="px-6 pt-8 pb-4">
        <Link href="/" className="flex items-center group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/voyex-horizontal.svg" alt="Voyex" className="h-6 w-auto" />
        </Link>
        <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--color-border)] rounded-full">
          <span
            className={cn("h-1.5 w-1.5 rounded-full", DOT_COLOR[session.role])}
          />
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-2)]">
            {WORKSPACE_LABEL[session.role]}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-4 flex flex-col gap-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all",
                active
                  ? "bg-[var(--color-accent-soft)] text-[var(--color-fg)]"
                  : "text-[var(--color-fg-2)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface)]"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] gold-gradient rounded-full" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-fg-3)] group-hover:text-[var(--color-fg-2)]"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-3 border border-[var(--color-border)] rounded-xl navy-panel overflow-hidden">
        <div className="p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--color-bg)] border border-[var(--color-accent-border)] flex items-center justify-center text-[var(--color-accent)] text-[13px] font-semibold tracking-wider">
            {session.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-[var(--color-fg)] truncate">
              {session.name}
            </div>
            <div className="text-[11px] text-[var(--color-fg-3)] truncate">
              {session.subtitle}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="w-full border-t border-[var(--color-border)] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-colors flex items-center gap-2 justify-center"
        >
          <LogOut className="h-3 w-3" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
