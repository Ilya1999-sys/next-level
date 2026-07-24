"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type MotionPageProps = {
  children: ReactNode;
};

export function MotionPage({ children }: MotionPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
