import { CheckCircle2, Clock } from "lucide-react";
import { verificationChecklist } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function VerificationList() {
  return (
    <ul className="divide-y divide-[var(--color-border)]">
      {verificationChecklist.map((row) => {
        const Icon = row.status === "ok" ? CheckCircle2 : Clock;
        const color =
          row.status === "ok"
            ? "text-[var(--color-ok)]"
            : "text-[var(--color-warn)]";
        return (
          <li
            key={row.label}
            className="flex items-start gap-3 py-3.5"
          >
            <Icon
              className={cn(
                "h-4 w-4 mt-0.5 shrink-0",
                color,
                row.status === "pending" && "amber-pulse rounded-full"
              )}
            />
            <div className="flex-1 min-w-0 flex items-baseline justify-between gap-6 flex-wrap">
              <span className="text-sm text-[var(--color-fg)]">
                {row.label}
              </span>
              <span className="font-mono text-[12px] text-[var(--color-fg-3)] text-right">
                {row.detail}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
