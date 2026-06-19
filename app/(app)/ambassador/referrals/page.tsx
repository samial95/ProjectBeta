import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";
import { referrals } from "@/lib/ambassador-data";
import { formatUsd } from "@/lib/mock-data";

export default function AmbassadorReferralsPage() {
  const flying = referrals.filter((r) => r.status === "flying").length;
  const flights = referrals.reduce((s, r) => s + r.flights, 0);

  return (
    <PageContainer>
      <PageHeading
        eyebrow="Ambassador"
        title="Referrals"
        sub={`${referrals.length} referred · ${flying} flying · ${flights} flights tracked`}
      />
      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH className="pl-6">Traveller</TH>
              <TH>Region</TH>
              <TH>Joined</TH>
              <TH className="text-right">Flights</TH>
              <TH className="text-right">Flight value</TH>
              <TH className="text-right">Your royalty</TH>
              <TH className="pl-6 pr-6">Status</TH>
            </TR>
          </THead>
          <TBody>
            {referrals.map((r) => (
              <TR key={r.id} className="last:border-b-0">
                <TD className="pl-6 text-sm text-white">{r.traveller}</TD>
                <TD className="text-sm text-[var(--color-fg-2)]">{r.region}</TD>
                <TD className="font-mono text-[12px] text-[var(--color-fg-2)]">
                  {r.joined}
                </TD>
                <TD className="font-mono text-[13px] text-[var(--color-fg)] text-right">
                  {r.flights}
                </TD>
                <TD className="font-mono text-[13px] text-[var(--color-fg-2)] text-right">
                  {r.gmv ? formatUsd(r.gmv) : "—"}
                </TD>
                <TD className="font-mono text-[13px] text-[var(--color-accent)] text-right">
                  {r.royalty ? formatUsd(r.royalty) : "—"}
                </TD>
                <TD className="pl-6 pr-6">
                  <Badge variant={r.status === "flying" ? "ok" : "default"}>
                    {r.status === "flying" ? "Flying" : "Joined"}
                  </Badge>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
      <p className="mt-4 text-xs text-[var(--color-fg-3)]">
        Royalties accrue at 1.5% of each flight&apos;s all-in value, tracked
        automatically whenever a referred traveller flies.
      </p>
    </PageContainer>
  );
}
