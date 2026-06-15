import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { operatorKpis } from "@/lib/operator-data";

export function KpiStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {operatorKpis.map((k) => (
        <Card key={k.label} className="px-5 py-4">
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
            {k.label}
          </div>
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-2xl text-[var(--color-fg)] tracking-tight">
              {k.value}
            </span>
            {k.delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-[11px] font-mono",
                  k.positive
                    ? "text-[var(--color-ok)]"
                    : "text-[var(--color-bad)]"
                )}
              >
                {k.positive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {k.delta}
              </span>
            )}
          </div>
          {k.context && (
            <div className="text-[11px] text-[var(--color-fg-3)] mt-1">
              {k.context}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
