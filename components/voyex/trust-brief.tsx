import { CheckCircle2, ShieldCheck, FileCheck2, LifeBuoy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { tripRequest } from "@/lib/mock-data";

function TrustRow({
  icon: Icon,
  label,
  value,
  ok,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  ok?: boolean;
}) {
  return (
    <div className="py-3">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1.5 text-sm text-[var(--color-fg)] flex items-start gap-2">
        {ok && (
          <CheckCircle2 className="h-4 w-4 text-[var(--color-ok)] mt-0.5 shrink-0" />
        )}
        <span>{value}</span>
      </div>
    </div>
  );
}

export function TrustBrief() {
  const t = tripRequest.trust;
  return (
    <aside className="w-full xl:w-[320px] shrink-0 xl:sticky xl:top-0 h-fit">
      <div className="border border-[var(--color-border)] rounded-xl navy-panel panel-shadow backdrop-blur-sm">
        <div className="px-5 pt-5 pb-3">
          <div className="font-serif text-[var(--color-fg)] text-lg leading-tight">
            Trip Trust Brief
          </div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mt-1">
            Pre-flight intelligence
          </div>
        </div>

        <Separator />

        <div className="px-5 py-2 divide-y divide-[var(--color-border)]">
          <TrustRow
            icon={ShieldCheck}
            label="Client risk"
            value={t.clientRisk}
          />
          <TrustRow
            icon={FileCheck2}
            label="Escrow"
            value={t.escrow}
            ok
          />
          <TrustRow
            icon={CheckCircle2}
            label="Compliance"
            value={t.compliance}
          />
          <TrustRow
            icon={LifeBuoy}
            label="Recovery options"
            value={t.recovery}
          />
        </div>

        <Separator />

        <div className="px-5 py-4">
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)] mb-3">
            Activity log
          </div>
          <ul className="space-y-2">
            {tripRequest.activity.map((a) => (
              <li
                key={a.time + a.text}
                className="flex items-baseline gap-3 font-mono text-xs"
              >
                <span className="text-[var(--color-fg-3)]">{a.time}</span>
                <span className="text-[var(--color-fg-2)]">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
