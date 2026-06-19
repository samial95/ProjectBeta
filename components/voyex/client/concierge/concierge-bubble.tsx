"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Sparkles } from "lucide-react";
import { ConciergeChat } from "@/components/voyex/client/concierge/concierge-chat";

export function ConciergeBubble() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The request page already shows the concierge inline — no need for the bubble.
  if (pathname === "/client/request") return null;

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-2rem))] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="h-[560px] max-h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-[var(--color-border)] navy-panel panel-shadow backdrop-blur-md">
            <ConciergeChat variant="bubble" onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close concierge" : "Chat with the Voyex concierge"}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full gold-gradient-3 text-[#1c0a33] shadow-[0_10px_40px_-8px_rgba(139,92,196,0.85)] transition-transform hover:-translate-y-0.5"
      >
        {open ? (
          <MessageCircle className="h-6 w-6" />
        ) : (
          <Sparkles className="h-6 w-6" />
        )}
      </button>
    </>
  );
}
