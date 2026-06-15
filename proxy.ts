import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/lib/session";

// Public routes — no session required. "/" is the marketing landing page.
const PUBLIC_PATHS = ["/signin", "/"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_PATHS.some((p) =>
      p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(p + "/")
    )
  ) {
    return NextResponse.next();
  }

  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  const session = decodeSession(raw);

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  const home =
    session.role === "broker"
      ? "/trips"
      : session.role === "operator"
        ? "/operator"
        : "/client";

  const wantsOperator =
    pathname === "/operator" || pathname.startsWith("/operator/");
  const wantsCustomer =
    pathname === "/client" || pathname.startsWith("/client/");
  const wantsBroker =
    pathname === "/trips" ||
    pathname.startsWith("/trips/") ||
    pathname.startsWith("/principals") ||
    pathname.startsWith("/checkout");

  if (wantsOperator && session.role !== "operator") {
    return NextResponse.redirect(new URL(home, request.url));
  }
  if (wantsCustomer && session.role !== "customer") {
    return NextResponse.redirect(new URL(home, request.url));
  }
  if (wantsBroker && session.role !== "broker") {
    return NextResponse.redirect(new URL(home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match everything except:
     *  - api routes
     *  - _next internals (static, image, etc.)
     *  - favicon and public files with file extensions
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
