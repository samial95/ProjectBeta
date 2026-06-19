"use client";

import { useState } from "react";
import {
  TripVault,
  type VaultDoc,
} from "@/components/voyex/client/trip/trip-vault";

// A document vault that manages its own upload state — drop into any page that
// doesn't need to lift the state (broker principal view, operator workspace).
export function SelfVault({
  counterparty,
  myDocs,
  theirDocs,
}: {
  counterparty: string;
  myDocs: VaultDoc[];
  theirDocs: VaultDoc[];
}) {
  const [uploaded, setUploaded] = useState<string[]>([]);
  return (
    <TripVault
      counterparty={counterparty}
      travelerDocs={myDocs}
      counterpartyDocs={theirDocs}
      uploaded={uploaded}
      onUpload={(id) =>
        setUploaded((prev) => (prev.includes(id) ? prev : [...prev, id]))
      }
    />
  );
}
