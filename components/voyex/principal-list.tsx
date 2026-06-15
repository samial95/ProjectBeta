"use client";

import { cn } from "@/lib/utils";
import type { Principal } from "@/types";

const STATUS_DOT: Record<Principal["status"], string> = {
  green: "bg-[var(--color-ok)]",
  amber: "bg-[var(--color-warn)]",
  red: "bg-[var(--color-bad)]",
};

export function PrincipalList({
  principals,
  selectedId,
  onSelect,
}: {
  principals: Principal[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="w-[320px] shrink-0 border-r border-[var(--color-border)] h-[calc(100vh-0px)] overflow-y-auto">
      <div className="px-6 pt-8 pb-3">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
          Principals
        </div>
        <div className="mt-1 font-mono text-xs text-[var(--color-fg-2)]">
          {principals.length} active
        </div>
      </div>

      <ul>
        {principals.map((p) => {
          const active = p.id === selectedId;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={cn(
                  "relative w-full text-left px-6 py-4 flex items-center gap-3 border-b border-[var(--color-border)] transition-colors",
                  active
                    ? "bg-[var(--color-accent-soft)]"
                    : "hover:bg-[var(--color-surface)]"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-3 bottom-3 w-[2px] bg-[var(--color-accent)] rounded-full" />
                )}
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] text-[12px] tracking-wider">
                    {p.initials}
                  </div>
                  <span
                    className={cn(
                      "absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full",
                      STATUS_DOT[p.status]
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-[var(--color-fg)] truncate">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-[var(--color-fg-3)] truncate">
                    {p.role}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-sm text-[var(--color-fg)]">
                    {p.ytdHours}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                    hrs YTD
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
