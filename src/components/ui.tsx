import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({ id, eyebrow, title, subtitle, children, className = "" }: {
  id: string; eyebrow: string; title: string; subtitle?: string; children: ReactNode; className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            {eyebrow}
          </span>
          <h2 className="section-title mt-3">{title}</h2>
          {subtitle && <p className="mt-4 text-lg leading-relaxed text-slate-600">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Pill({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "red" | "blue" | "purple" | "amber" | "green" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    amber: "bg-amber-100 text-amber-800",
    green: "bg-emerald-100 text-emerald-700",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function Callout({ title, children, tone = "amber" }: { title: string; children: ReactNode; tone?: "amber" | "rose" | "sky" }) {
  const t = {
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    rose: "border-rose-200 bg-rose-50 text-rose-900",
    sky: "border-sky-200 bg-sky-50 text-sky-900",
  }[tone];
  return (
    <div className={`rounded-xl border p-4 ${t}`}>
      <p className="text-sm font-bold">{title}</p>
      <div className="mt-1 text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
}
