import * as React from "react";

export function PageHeading({
  eyebrow,
  title,
  sub,
  right,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
      <div>
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-1 font-serif text-[32px] leading-tight text-white">
          {title}
        </h1>
        {sub && (
          <div className="mt-2 text-sm text-[var(--color-fg-2)]">{sub}</div>
        )}
      </div>
      {right}
    </header>
  );
}
