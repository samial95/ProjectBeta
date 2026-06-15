"use client";

import { useState } from "react";
import { principals, catherine } from "@/lib/mock-data";
import { PrincipalList } from "@/components/voyex/principal-list";
import { PrincipalDetailPane } from "@/components/voyex/principal-detail";

export default function PrincipalsPage() {
  const [selectedId, setSelectedId] = useState(catherine.id);

  // Only Catherine has a full detail object in this demo.
  const detail = catherine;

  return (
    <div className="flex items-stretch min-h-screen">
      <PrincipalList
        principals={principals}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <PrincipalDetailPane p={detail} />
    </div>
  );
}
