"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Quick, intentional route transition: a thin cobalt sweep and a short fade-rise. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <>
      <motion.span aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-cobalt" initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1, opacity: 0 }} transition={{ scaleX: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }, opacity: { delay: 0.4, duration: 0.25 } }} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </>
  );
}
