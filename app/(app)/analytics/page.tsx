import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";
import { StatCards } from "@/components/voyex/stat-cards";
import { brokerStats, brokerRouteBreakdown } from "@/lib/extra-data";

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow="Broker workspace"
        title="Analytics"
        sub="Your booking performance across principals and routes"
      />

      <StatCards stats={brokerStats} />

      <Card className="mt-6">
        <div className="px-6 py-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
              Top routes
            </h2>
            <span className="text-xs text-[var(--color-fg-3)]">
              Trips booked · last 12 months
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {brokerRouteBreakdown.map((r) => (
              <div key={r.route}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm text-[var(--color-fg)]">
                    {r.route}
                  </span>
                  <span className="font-mono text-sm text-[var(--color-fg-2)]">
                    {r.trips} trips
                  </span>
                </div>
                <div className="h-2 w-full bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                  <div
                    className="h-full gold-gradient rounded-full"
                    style={{ width: `${r.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
