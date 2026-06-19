import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";
import { StatCards } from "@/components/voyex/stat-cards";
import { ReferralCard } from "@/components/voyex/ambassador/referral-card";
import {
  ambassadorProfile,
  ambassadorStats,
  referrals,
} from "@/lib/ambassador-data";
import { formatUsd } from "@/lib/mock-data";

export default function AmbassadorDashboardPage() {
  const top = referrals.filter((r) => r.flights > 0).slice(0, 5);

  return (
    <PageContainer>
      <PageHeading
        eyebrow="Ambassador"
        title={ambassadorProfile.name}
        sub={`${ambassadorProfile.handle} · ${ambassadorProfile.since}`}
        right={<Badge variant="gold">{ambassadorProfile.tier}</Badge>}
      />

      <div className="space-y-6">
        <ReferralCard
          code={ambassadorProfile.code}
          link={ambassadorProfile.link}
        />

        <StatCards stats={ambassadorStats} />

        <Card className="overflow-hidden">
          <div className="flex items-baseline justify-between px-6 pt-5 pb-3">
            <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
              Top referrals
            </h2>
            <Link
              href="/ambassador/referrals"
              className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <Table>
            <THead>
              <TR>
                <TH className="pl-6">Traveller</TH>
                <TH>Region</TH>
                <TH className="text-right">Flights</TH>
                <TH className="text-right">Flight value</TH>
                <TH className="pr-6 text-right">Your royalty</TH>
              </TR>
            </THead>
            <TBody>
              {top.map((r) => (
                <TR key={r.id} className="last:border-b-0">
                  <TD className="pl-6 text-sm text-white">{r.traveller}</TD>
                  <TD className="text-sm text-[var(--color-fg-2)]">{r.region}</TD>
                  <TD className="font-mono text-[13px] text-[var(--color-fg)] text-right">
                    {r.flights}
                  </TD>
                  <TD className="font-mono text-[13px] text-[var(--color-fg-2)] text-right">
                    {formatUsd(r.gmv)}
                  </TD>
                  <TD className="pr-6 font-mono text-[13px] text-[var(--color-accent)] text-right">
                    {formatUsd(r.royalty)}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>
      </div>
    </PageContainer>
  );
}
