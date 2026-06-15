import { Suspense } from "react";
import { DepositClient } from "@/components/voyex/client/deposit-client";

export default function DepositPage() {
  return (
    <Suspense fallback={null}>
      <DepositClient />
    </Suspense>
  );
}
