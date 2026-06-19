import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";
import { payouts, referrals } from "@/lib/ambassador-data";
import { formatUsd } from "@/lib/mock-data";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card className="px-5 py-4">
      <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
        {label}
      </div>
      <div className="mt-2 font-mono text-2xl text-white tracking-tight">
        {value}
      </div>
      {sub && <div className="text-[11px] text-[var(--color-fg-3)] mt-1">{sub}</div>}
    </Card>
  );
}

export default function AmbassadorPayoutsPage() {
  const lifetime = referrals.reduce((s, r) => s + r.royalty, 0);
  const paid = payouts
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.amount, 0);
  const pending = payouts
    .filter((p) => p.status === "scheduled")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <PageContainer>
      <PageHeading
        eyebrow="Ambassador"
        title="Earnings"
        sub="Royalties earned from flights your referrals take"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Lifetime royalties" value={formatUsd(lifetime)} sub="all referrals" />
        <Stat label="Paid out" value={formatUsd(paid)} sub="to date" />
        <Stat label="Pending payout" value={formatUsd(pending)} sub="next on 01 Jul 2026" />
        <Stat label="Royalty rate" value="1.5%" sub="of every flight" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="px-6 pt-5 pb-3 text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
          Payout history
        </div>
        <Table>
          <THead>
            <TR>
              <TH className="pl-6">Date</TH>
              <TH>Method</TH>
              <TH className="text-right">Amount</TH>
              <TH className="pl-6 pr-6">Status</TH>
            </TR>
          </THead>
          <TBody>
            {payouts.map((p) => (
              <TR key={p.date} className="last:border-b-0">
                <TD className="pl-6 font-mono text-[13px] text-white">{p.date}</TD>
                <TD className="text-sm text-[var(--color-fg-2)]">{p.method}</TD>
                <TD className="font-mono text-[13px] text-[var(--color-fg)] text-right">
                  {formatUsd(p.amount)}
                </TD>
                <TD className="pl-6 pr-6">
                  <Badge variant={p.status === "paid" ? "ok" : "info"}>
                    {p.status === "paid" ? "Paid" : "Scheduled"}
                  </Badge>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </PageContainer>
  );
}
