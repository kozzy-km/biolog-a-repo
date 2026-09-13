import { motion } from "framer-motion";
import { ArrowDown, Droplets, Wind, FlaskConical, Trash2 } from "lucide-react";

const sustancias = [
  { icon: Wind, label: "Oxígeno (O₂)", tone: "bg-sky-100 text-sky-700" },
  { icon: FlaskConical, label: "Nutrientes", tone: "bg-emerald-100 text-emerald-700" },
  { icon: Droplets, label: "Hormonas", tone: "bg-violet-100 text-violet-700" },
  { icon: Trash2, label: "Desechos metabólicos", tone: "bg-amber-100 text-amber-700" },
];

function BeatingHeart() {
  return (
    <div className="relative grid place-items-center">
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute h-56 w-56 rounded-full border-2 border-rose-300/60"
          initial={{ scale: 0.7, opacity: 0.8 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}
      <motion.svg
        viewBox="0 0 200 200"
        className="relative h-64 w-64 drop-shadow-[0_20px_40px_rgba(225,29,72,0.35)]"
        animate={{ scale: [1, 1.08, 1, 1.04, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 0.45, 1] }}
      >
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="60%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>
          <radialGradient id="shine" cx="0.3" cy="0.25" r="0.5">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M100 178 C 40 130, 10 100, 18 62 C 24 30, 68 20, 100 56 C 132 20, 176 30, 182 62 C 190 100, 160 130, 100 178 Z" fill="url(#hg)" />
        <path d="M100 178 C 40 130, 10 100, 18 62 C 24 30, 68 20, 100 56 C 132 20, 176 30, 182 62 C 190 100, 160 130, 100 178 Z" fill="url(#shine)" />
      </motion.svg>
      {/* ECG line */}
      <svg viewBox="0 0 300 60" className="absolute -bottom-8 w-80 opacity-80">
        <motion.path
          d="M0 30 L60 30 L75 30 L85 10 L95 50 L105 30 L130 30 L145 30 L155 15 L165 45 L175 30 L300 30"
          fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-rose-100 via-rose-50/50 to-transparent blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
        <div>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Guía de estudio interactiva
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl"
          >
            El Sistema <span className="bg-gradient-to-r from-rose-600 to-red-500 bg-clip-text text-transparent">Circulatorio</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="mt-6 text-lg leading-relaxed text-slate-600">
            Es el encargado de <strong className="text-slate-900">transportar sustancias por todo el cuerpo</strong>. La sangre circula por una extensa red de vasos sanguíneos que la llevan desde el corazón hacia todo el cuerpo y luego la devuelven al corazón.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-7 flex flex-wrap gap-2">
            {sustancias.map((s, i) => (
              <motion.span key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08 }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${s.tone}`}>
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </motion.span>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#sangre" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800">
              Empezar a estudiar <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#quiz" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400">
              Ir directo al quiz
            </a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex justify-center py-8">
          <BeatingHeart />
        </motion.div>
      </div>
    </section>
  );
}
