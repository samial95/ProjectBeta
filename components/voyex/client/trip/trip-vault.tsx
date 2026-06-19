"use client";

import { FileText, Lock, Check, Upload, ShieldCheck } from "lucide-react";

export interface VaultDoc {
  id: string;
  name: string;
  meta: string;
}

function DocRow({
  doc,
  shared,
  onUpload,
}: {
  doc: VaultDoc;
  shared: boolean;
  onUpload?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <FileText className="h-4 w-4 shrink-0 text-[var(--color-fg-3)]" />
      <div className="min-w-0 flex-1">
        <div className="text-sm text-[var(--color-fg)]">{doc.name}</div>
        <div className="text-[11px] text-[var(--color-fg-3)]">{doc.meta}</div>
      </div>
      {shared ? (
        <span className="inline-flex items-center gap-1 text-[11px] text-[var(--color-ok)]">
          <Check className="h-3.5 w-3.5" />
          Shared
        </span>
      ) : onUpload ? (
        <button
          type="button"
          onClick={onUpload}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent-border)] px-3 py-1.5 text-[11px] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-soft)]"
        >
          <Upload className="h-3 w-3" />
          Upload
        </button>
      ) : null}
    </div>
  );
}

export function TripVault({
  counterparty,
  travelerDocs,
  counterpartyDocs,
  uploaded,
  onUpload,
}: {
  counterparty: string;
  travelerDocs: VaultDoc[];
  counterpartyDocs: VaultDoc[];
  uploaded: string[];
  onUpload: (id: string) => void;
}) {
  const pending = travelerDocs.filter((d) => !uploaded.includes(d.id)).length;

  return (
    <div className="flex h-[460px] flex-col overflow-hidden rounded-xl border border-[var(--color-border)] navy-panel">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
        <Lock className="h-4 w-4 text-[var(--color-ok)]" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-white">Document vault</div>
          <div className="text-[11px] text-[var(--color-fg-3)]">
            Encrypted · visible only to you and {counterparty}
          </div>
        </div>
        {pending > 0 && (
          <span className="rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
            {pending} to add
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="pt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
          Your documents
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {travelerDocs.map((d) => (
            <DocRow
              key={d.id}
              doc={d}
              shared={uploaded.includes(d.id)}
              onUpload={() => onUpload(d.id)}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 pt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-ok)]" />
          From {counterparty}
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {counterpartyDocs.map((d) => (
            <DocRow key={d.id} doc={d} shared />
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] px-4 py-2.5 text-[11px] text-[var(--color-fg-3)]">
        Demo · uploads are simulated and no real documents are stored.
      </div>
    </div>
  );
}
