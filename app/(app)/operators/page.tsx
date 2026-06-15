import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PageContainer } from "@/components/voyex/page-header";
import { PageHeading } from "@/components/voyex/page-heading";
import { operatorDirectory } from "@/lib/extra-data";
import { cn } from "@/lib/utils";

export default function OperatorsPage() {
  const verified = operatorDirectory.filter((o) => o.verified).length;

  return (
    <PageContainer>
      <PageHeading
        eyebrow="Broker workspace"
        title="Operators"
        sub={`${verified} verified · ${operatorDirectory.length} in network`}
      />
      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH className="pl-6">Operator</TH>
              <TH>AOC</TH>
              <TH>Fleet</TH>
              <TH>Safety</TH>
              <TH className="text-right">Trust</TH>
              <TH className="text-right">Trips</TH>
              <TH className="pr-6">Status</TH>
            </TR>
          </THead>
          <TBody>
            {operatorDirectory.map((o) => (
              <TR key={o.name} className="last:border-b-0">
                <TD className="pl-6 text-sm text-white">{o.name}</TD>
                <TD className="font-mono text-[12px] text-[var(--color-fg-2)]">
                  {o.aocId}
                  <span className="text-[var(--color-fg-3)]"> · {o.jurisdiction}</span>
                </TD>
                <TD className="text-sm text-[var(--color-fg-2)]">{o.fleet}</TD>
                <TD className="text-[12px] text-[var(--color-fg-2)]">{o.safety}</TD>
                <TD className="text-right">
                  <span
                    className={cn(
                      "font-mono text-sm",
                      o.trustScore >= 90
                        ? "text-[var(--color-accent)]"
                        : o.trustScore >= 80
                          ? "text-[var(--color-fg)]"
                          : "text-[var(--color-warn)]"
                    )}
                  >
                    {o.trustScore}
                  </span>
                </TD>
                <TD className="font-mono text-[13px] text-[var(--color-fg-2)] text-right">
                  {o.trips}
                </TD>
                <TD className="pr-6">
                  {o.verified ? (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--color-ok)]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--color-warn)]">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Review
                    </span>
                  )}
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </PageContainer>
  );
}
