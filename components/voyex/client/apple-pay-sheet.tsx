"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, X, ChevronRight } from "lucide-react";
import { formatUsd } from "@/lib/mock-data";

/**
 * Mock Apple Pay sheet — a faithful-looking demo of the iOS payment sheet.
 * Not a real payment integration. Double-click-to-confirm is simulated with
 * a press-and-hold "side button" affordance.
 */
export function ApplePaySheet({
  open,
  amount,
  merchant,
  onClose,
  onPaid,
}: {
  open: boolean;
  amount: number;
  merchant: string;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [phase, setPhase] = useState<"ready" | "processing" | "done">("ready");

  function confirm() {
    if (phase !== "ready") return;
    setPhase("processing");
    setTimeout(() => {
      setPhase("done");
      setTimeout(() => {
        onPaid();
      }, 900);
    }, 1500);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={phase === "ready" ? onClose : undefined}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative w-full sm:max-w-[400px] bg-[#1c1c1e] text-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
            style={{ fontFamily: "-apple-system, system-ui, sans-serif" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <div className="flex items-center gap-1.5">
                <AppleLogo className="h-5 w-5 text-white" />
                <span className="text-[17px] font-semibold tracking-tight">
                  Pay
                </span>
              </div>
              {phase === "ready" && (
                <button
                  onClick={onClose}
                  className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="h-px bg-white/10" />

            {/* Card row */}
            <div className="px-5 py-4 flex items-center gap-3">
              <div className="h-10 w-14 rounded-md bg-gradient-to-br from-[#3a3a3c] to-[#1c1c1e] border border-white/15 flex items-center justify-center">
                <span className="text-[9px] font-semibold tracking-wide text-white/80">
                  VISA
                </span>
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-medium">Voyex Platinum</div>
                <div className="text-[13px] text-white/50">•••• 4419</div>
              </div>
              <ChevronRight className="h-4 w-4 text-white/30" />
            </div>

            <div className="h-px bg-white/10 mx-5" />

            {/* Pay to */}
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-[15px] text-white/60">Pay {merchant}</span>
              <span className="text-[15px] font-medium">
                {formatUsd(amount)}
              </span>
            </div>

            <div className="px-5 py-3 flex items-center justify-between">
              <span className="text-[15px] text-white/60">Deposit total</span>
              <span className="text-[17px] font-semibold">
                {formatUsd(amount)}
              </span>
            </div>

            {/* Confirm zone */}
            <div className="px-5 pb-7 pt-3">
              {phase === "done" ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-2 py-2"
                >
                  <div className="h-12 w-12 rounded-full bg-[#34c759] flex items-center justify-center">
                    <Check className="h-7 w-7 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-medium text-white">
                    Done
                  </span>
                </motion.div>
              ) : phase === "processing" ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <Loader2 className="h-7 w-7 text-white/70 animate-spin" />
                  <span className="text-[13px] text-white/50">
                    Processing…
                  </span>
                </div>
              ) : (
                <>
                  <button
                    onClick={confirm}
                    className="w-full rounded-xl bg-white text-black py-3.5 text-[16px] font-semibold flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
                  >
                    Confirm with side button
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-white/40">
                    <span className="inline-block h-3 w-3 rounded-full border border-white/40" />
                    Double-click to pay · demo only
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
