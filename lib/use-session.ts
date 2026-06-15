"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  decodeSession,
  encodeSession,
  type Role,
  type Session,
  sessionFor,
} from "./session";

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match?.split("=")[1];
}

export function useSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(decodeSession(readCookie(SESSION_COOKIE)));
  }, []);

  return session;
}

export function useAuthActions() {
  const router = useRouter();

  function signIn(role: Role, redirectTo?: string) {
    const session = sessionFor(role);
    document.cookie = `${SESSION_COOKIE}=${encodeSession(session)}; path=/; max-age=${SESSION_MAX_AGE_SECONDS}; samesite=lax`;
    const target =
      redirectTo ??
      (role === "broker"
        ? "/trips"
        : role === "operator"
          ? "/operator"
          : "/client");
    router.push(target);
    router.refresh();
  }

  function signOut() {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
    router.push("/signin");
    router.refresh();
  }

  return { signIn, signOut };
}
