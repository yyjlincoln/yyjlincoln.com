"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-svh flex items-center justify-center bg-black text-white p-4 font-mono">
      <div className="w-full max-w-lg space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-1"
        >
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <span>~</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="text-zinc-500 select-none">$</span>
            <span className="text-green-400">bun i</span>
            <span className="text-white">lincoln@next</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block w-2 h-5 bg-white ml-0.5 translate-y-px"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-zinc-400 text-sm leading-relaxed">
            Lincoln&apos;s new website is coming soon.
          </p>
          <p className="text-zinc-500 text-sm">
            In the meantime, check out{" "}
            <Link
              href="https://linkedin.com/in/yyjlincoln"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
            >
              LinkedIn
            </Link>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
          className="h-px bg-zinc-800 origin-left"
        />
      </div>
    </main>
  );
}
