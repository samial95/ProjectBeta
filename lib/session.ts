export type Role = "broker" | "operator" | "customer";

export interface Session {
  role: Role;
  email: string;
  name: string;
  org: string;
  initials: string;
  subtitle: string;
}

export const SESSION_COOKIE = "voyex_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const BROKER_SESSION: Session = {
  role: "broker",
  email: "sarah.chen@voyex.capital",
  name: "Sarah Chen",
  org: "Voyex Capital",
  initials: "SC",
  subtitle: "Senior Charter Broker · Voyex Capital",
};

export const OPERATOR_SESSION: Session = {
  role: "operator",
  email: "ops@sovereignjet.ae",
  name: "Rashid Al Maktoum",
  org: "Sovereign Jet Partners",
  initials: "RM",
  subtitle: "Head of Charter Sales · Sovereign Jet Partners",
};

export const CUSTOMER_SESSION: Session = {
  role: "customer",
  email: "catherine@westbourne.fo",
  name: "Catherine Westbourne",
  org: "Westbourne Family Office",
  initials: "CW",
  subtitle: "Principal · Westbourne Family Office",
};

export function sessionFor(role: Role): Session {
  if (role === "broker") return BROKER_SESSION;
  if (role === "operator") return OPERATOR_SESSION;
  return CUSTOMER_SESSION;
}

export function encodeSession(session: Session): string {
  return encodeURIComponent(JSON.stringify(session));
}

export function decodeSession(raw: string | undefined): Session | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Session;
    if (
      parsed.role !== "broker" &&
      parsed.role !== "operator" &&
      parsed.role !== "customer"
    )
      return null;
    return parsed;
  } catch {
    return null;
  }
}

export function homeForRole(role: Role): string {
  if (role === "broker") return "/trips";
  if (role === "operator") return "/operator";
  return "/client";
}
