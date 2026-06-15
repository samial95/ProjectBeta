import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/voyex/sidebar";
import { SESSION_COOKIE, decodeSession } from "@/lib/session";

export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const session = decodeSession(store.get(SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar session={session} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
