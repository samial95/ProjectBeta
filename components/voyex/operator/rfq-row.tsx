import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/lib/mock-data";
import type { InboundRfq } from "@/lib/operator-data";

const STATUS: Record<
  InboundRfq["status"],
  { label: string; variant: "gold" | "ok" | "warn" | "info" | "default" }
> = {
  needs_quote: { label: "Needs quote", variant: "warn" },
  quote_sent: { label: "Quote sent", variant: "info" },
  won: { label: "Won", variant: "ok" },
  lost: { label: "Lost", variant: "default" },
  expired: { label: "Expired", variant: "default" },
};

function rankLabel(r: InboundRfq) {
  if (r.rank == null) return null;
  if (r.rank === 1) return "Ranked #1";
  return `Ranked #${r.rank}`;
}

export function RfqRow({ r }: { r: InboundRfq }) {
  const status = STATUS[r.status];
  const isLeading = r.rank === 1 && r.status === "quote_sent";

  return (
    <Link
      href={`/operator/rfq/${r.id}`}
      className="block border-b border-[var(--color-border)] hover:bg-[var(--color-surface-2)]/50 transition-colors"
    >
      <div className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-12 lg:col-span-4 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm text-[var(--color-fg)]">
              {r.id}
            </span>
            <Badge variant={status.variant}>{status.label}</Badge>
            {isLeading && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                <ArrowUpRight className="h-3 w-3" />
                Leading
              </span>
            )}
          </div>
          <div className="text-xs text-[var(--color-fg-3)] mt-1">
            {r.clientCode} · {r.clientTier} · received {r.receivedAgo}
          </div>
        </div>

        <div className="col-span-6 lg:col-span-3">
          <div className="font-mono text-sm text-[var(--color-fg)]">
            {r.route}
          </div>
          <div className="text-xs text-[var(--color-fg-3)] mt-1">{r.date}</div>
        </div>

        <div className="col-span-3 lg:col-span-1 text-sm text-[var(--color-fg-2)]">
          <div className="font-mono">{r.pax} pax</div>
          <div className="text-[11px] text-[var(--color-fg-3)] mt-0.5">
            {r.aircraftPref}
          </div>
        </div>

        <div className="col-span-3 lg:col-span-2 text-right">
          {r.yourQuote ? (
            <>
              <div className="font-mono text-sm text-[var(--color-fg)]">
                {formatUsd(r.yourQuote)}
              </div>
              <div className="text-[11px] text-[var(--color-fg-3)] mt-0.5">
                {rankLabel(r)}
                {r.competitors != null && ` of ${r.competitors + 1}`}
              </div>
            </>
          ) : (
            <>
              <div className="font-mono text-sm text-[var(--color-fg-2)]">
                {formatUsd(r.budgetMin)}–{formatUsd(r.budgetMax)}
              </div>
              <div className="text-[11px] text-[var(--color-fg-3)] mt-0.5">
                client budget
              </div>
            </>
          )}
        </div>

        <div className="col-span-12 lg:col-span-2 flex items-center justify-end gap-3">
          {r.expiresIn &&
            (r.status === "needs_quote" || r.status === "quote_sent") && (
              <div className="text-right">
                <div
                  className={cn(
                    "font-mono text-[11px]",
                    r.status === "needs_quote"
                      ? "text-[var(--color-warn)]"
                      : "text-[var(--color-fg-2)]"
                  )}
                >
                  {r.expiresIn}
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                  {r.status === "needs_quote" ? "Respond by" : "Bid expires"}
                </div>
              </div>
            )}
          <ChevronRight className="h-4 w-4 text-[var(--color-fg-3)]" />
        </div>
      </div>
    </Link>
  );
}
