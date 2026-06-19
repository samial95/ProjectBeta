import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";
import { StatCards } from "@/components/voyex/stat-cards";
import { operatorPerfStats, operatorWinLoss } from "@/lib/extra-data";

export default function OperatorPerformancePage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow="Operator workspace"
        title="Performance"
        sub="Your quote win rate and fleet utilization on Voyex"
      />

      <StatCards stats={operatorPerfStats} />

      <Card className="mt-6">
        <div className="px-6 py-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
              Win rate by cabin class
            </h2>
            <span className="text-xs text-[var(--color-fg-3)]">
              Quotes won · last 90 days
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {operatorWinLoss.map((r) => {
              const pct = Math.round((r.won / r.total) * 100);
              return (
                <div key={r.label}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-sm text-[var(--color-fg)]">
                      {r.label}
                    </span>
                    <span className="font-mono text-sm text-[var(--color-fg-2)]">
                      {r.won}/{r.total} won · {pct}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                    <div
                      className="h-full gold-gradient rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
