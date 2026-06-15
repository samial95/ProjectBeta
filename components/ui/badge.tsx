import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "gold" | "ok" | "warn" | "info" | "outline";

const styles: Record<Variant, string> = {
  default:
    "bg-[var(--color-surface-2)] text-[var(--color-fg-2)] border border-[var(--color-border)]",
  gold: "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent-border)]",
  ok: "bg-[rgba(110,231,183,0.08)] text-[var(--color-ok)] border border-[rgba(110,231,183,0.25)]",
  warn: "bg-[rgba(245,158,11,0.08)] text-[var(--color-warn)] border border-[rgba(245,158,11,0.3)]",
  info: "bg-[rgba(147,197,253,0.08)] text-[var(--color-info)] border border-[rgba(147,197,253,0.25)]",
  outline:
    "bg-transparent text-[var(--color-fg-2)] border border-[var(--color-border)]",
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] rounded-full font-medium",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
