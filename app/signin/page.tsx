import { Suspense } from "react";
import { SignInForm } from "@/components/voyex/sign-in-form";

export const metadata = {
  title: "Sign in — Voyex",
};

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
