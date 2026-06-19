"use client";

import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// A live "time left to respond" countdown for an RFQ. Operators have a 30-minute
// SLA, brokers 1 hour — pass the cap via capMinutes for the sublabel.
export function SlaCountdown({
  seconds,
  capMinutes,
  className,
}: {
  seconds: number;
  capMinutes: number;
  className?: string;
}) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const overdue = left <= 0;
  const urgent = !overdue && left <= 300; // under 5 minutes
  const mm = Math.floor(left / 60);
  const ss = left % 60;

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      {overdue ? (
        <AlertTriangle className="h-3.5 w-3.5 text-[var(--color-bad)]" />
      ) : (
        <Clock
          className={cn(
            "h-3.5 w-3.5",
            urgent ? "text-[var(--color-warn)]" : "text-[var(--color-accent)]"
          )}
        />
      )}
      <span
        className={cn(
          "font-mono text-sm",
          overdue
            ? "text-[var(--color-bad)]"
            : urgent
              ? "text-[var(--color-warn)]"
              : "text-[var(--color-fg)]"
        )}
      >
        {overdue ? "Overdue" : `${mm}:${String(ss).padStart(2, "0")}`}
      </span>
      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
        {overdue ? `${capMinutes}m SLA exceeded` : `left · ${capMinutes}m SLA`}
      </span>
    </div>
  );
}
