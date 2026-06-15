"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  decodeSession,
  encodeSession,
  homeForRole,
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

// Cache the parsed session keyed by the raw cookie string. useSyncExternalStore
// compares snapshots by identity, so we must return a stable reference until the
// cookie actually changes — otherwise decodeSession would allocate a new object
// every render and trigger an infinite update loop.
let cachedRaw: string | undefined;
let cachedSession: Session | null = null;

function getClientSnapshot(): Session | null {
  const raw = readCookie(SESSION_COOKIE);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSession = decodeSession(raw);
  }
  return cachedSession;
}

// The cookie is only set/cleared by signIn/signOut, which both call
// router.refresh() to re-render consumers — there is no external event to
// subscribe to, so this is a no-op.
function subscribe(): () => void {
  return () => {};
}

export function useSession(): Session | null {
  return useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    () => null, // server snapshot — the session cookie is only readable on the client
  );
}

export function useAuthActions() {
  const router = useRouter();

  function signIn(role: Role, redirectTo?: string) {
    const session = sessionFor(role);
    document.cookie = `${SESSION_COOKIE}=${encodeSession(session)}; path=/; max-age=${SESSION_MAX_AGE_SECONDS}; samesite=lax`;
    router.push(redirectTo ?? homeForRole(role));
    router.refresh();
  }

  function signOut() {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
    router.push("/signin");
    router.refresh();
  }

  return { signIn, signOut };
}
