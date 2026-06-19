import { Sparkles, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/voyex/page-header";
import { KpiStrip } from "@/components/voyex/operator/kpi-strip";
import { RfqRow } from "@/components/voyex/operator/rfq-row";
import { inboundRfqs, operatorProfile } from "@/lib/operator-data";

export default function OperatorDashboardPage() {
  const needs = inboundRfqs.filter((r) => r.status === "needs_quote").length;
  const sent = inboundRfqs.filter((r) => r.status === "quote_sent").length;

  return (
    <PageContainer>
      <header className="mb-8">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
              Operator workspace
            </div>
            <h1 className="font-serif text-[32px] leading-tight text-[var(--color-fg)] mt-1">
              {operatorProfile.name}
            </h1>
            <div className="mt-2 text-sm text-[var(--color-fg-2)] flex items-center gap-3 flex-wrap">
              <span className="font-mono">AOC {operatorProfile.aocId}</span>
              <span className="text-[var(--color-fg-3)]">·</span>
              <span>{operatorProfile.base}</span>
              <span className="text-[var(--color-fg-3)]">·</span>
              <span>{operatorProfile.fleetSize} aircraft</span>
            </div>
          </div>
          <Badge variant="gold" className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            {operatorProfile.rating}
          </Badge>
        </div>
      </header>

      <KpiStrip />

      <section className="mt-10">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
            Inbound RFQs · direct from travellers
            <span className="ml-3 text-[var(--color-fg-2)] normal-case tracking-normal">
              {needs} need a quote · {sent} awaiting decision
            </span>
          </h2>
        </div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] text-[var(--color-accent)]">
          <Clock className="h-3 w-3" />
          Respond directly to the traveller within 30 minutes
        </div>
        <Separator />
        <div className="border-x border-b border-[var(--color-border)] rounded-b-sm bg-[var(--color-surface)]">
          {inboundRfqs.map((r) => (
            <RfqRow key={r.id} r={r} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
