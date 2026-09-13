import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Repeat, CheckCircle2 } from "lucide-react";
import { Section, Reveal, Callout } from "./ui";
import { vasos, recorridoVasos } from "../data";

function VesselCross({ tipo }: { tipo: string }) {
  const cfg = {
    Arterias: { wall: 16, color: "#ef4444", inner: "#fecaca", label: "Pared gruesa y muscular" },
    Venas: { wall: 6, color: "#3b82f6", inner: "#bfdbfe", label: "Pared delgada, con válvulas" },
    Capilares: { wall: 2, color: "#a855f7", inner: "#e9d5ff", label: "Una sola capa: intercambio" },
  }[tipo]!;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 120" className="h-28 w-28">
        <motion.circle cx="60" cy="60" r="50" fill={cfg.color} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }} />
        <motion.circle cx="60" cy="60" r={50 - cfg.wall} fill={cfg.inner} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.15 }} />
        {[...Array(tipo === "Capilares" ? 3 : 8)].map((_, i) => (
          <motion.circle key={i} r="4" fill={tipo === "Venas" ? "#1e40af" : "#b91c1c"}
            animate={{ cx: 60 + Math.cos((i / 8) * Math.PI * 2) * (tipo === "Capilares" ? 0 : 25) * Math.random(), cy: 60 + Math.sin((i / 8) * Math.PI * 2) * (tipo === "Capilares" ? 0 : 25), scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </svg>
      <p className="text-xs font-medium text-slate-500">{cfg.label}</p>
    </div>
  );
}

function FlowAnimation() {
  return (
    <div className="card relative overflow-hidden p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cómo se conectan</p>
      <svg viewBox="0 0 700 180" className="mt-4 w-full">
        <defs>
          <linearGradient id="vg" x1="0" x2="1"><stop offset="0%" stopColor="#ef4444" /><stop offset="50%" stopColor="#a855f7" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
        </defs>
        {/* artery */}
        <path d="M20 90 C 120 90, 160 40, 250 40" stroke="#ef4444" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M20 90 C 120 90, 160 140, 250 140" stroke="#ef4444" strokeWidth="22" fill="none" strokeLinecap="round" />
        {/* capillaries */}
        {[40, 65, 90, 115, 140].map((y) => (
          <path key={y} d={`M250 ${y} C 320 ${y - 10}, 380 ${y + 10}, 450 ${y}`} stroke="#a855f7" strokeWidth="3" fill="none" />
        ))}
        <path d="M250 40 L250 140" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
        <path d="M450 40 L450 140" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
        {/* vein */}
        <path d="M450 40 C 540 40, 580 90, 680 90" stroke="#3b82f6" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M450 140 C 540 140, 580 90, 680 90" stroke="#3b82f6" strokeWidth="22" fill="none" strokeLinecap="round" />
        {/* moving blood cells */}
        {[0, 0.33, 0.66].map((d, i) => (
          <motion.circle key={i} r="7" fill="#fff" stroke="url(#vg)" strokeWidth="3"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: d * 4 }}
            style={{ offsetPath: `path("M20 90 C 120 90, 160 40, 250 40 C 320 30, 380 50, 450 40 C 540 40, 580 90, 680 90")` }}
          />
        ))}
        <text x="70" y="70" className="fill-red-600 text-[13px] font-bold">ARTERIA</text>
        <text x="305" y="22" className="fill-purple-600 text-[13px] font-bold">CAPILARES</text>
        <text x="590" y="70" className="fill-blue-600 text-[13px] font-bold">VENA</text>
        <text x="70" y="175" className="fill-slate-400 text-[11px]">sale del corazón →</text>
        <text x="530" y="175" className="fill-slate-400 text-[11px]">→ vuelve al corazón</text>
      </svg>
      <p className="mt-3 text-sm text-slate-600">
        <strong className="text-red-600">Arterias</strong> salen del corazón → <strong className="text-purple-600">capilares</strong> hacen el intercambio → <strong className="text-blue-600">venas</strong> vuelven al corazón.
      </p>
    </div>
  );
}

function Recorrido() {
  const [step, setStep] = useState(0);
  const colors: Record<string, string> = { corazon: "bg-rose-600", arteria: "bg-red-500", capilar: "bg-purple-500", vena: "bg-blue-500" };
  const cur = recorridoVasos[step];
  return (
    <div className="card p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">⭐ Recorrido de los vasos sanguíneos</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">Este recorrido conviene memorizarlo</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-full border border-slate-300 p-2 disabled:opacity-30"><ArrowLeft className="h-4 w-4" /></button>
          <button onClick={() => setStep((s) => Math.min(recorridoVasos.length - 1, s + 1))} disabled={step === recorridoVasos.length - 1} className="rounded-full bg-slate-900 p-2 text-white disabled:opacity-30"><ArrowRight className="h-4 w-4" /></button>
          <button onClick={() => setStep(0)} className="rounded-full border border-slate-300 p-2"><Repeat className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <ol className="relative space-y-1">
          <div className="absolute bottom-4 left-[15px] top-4 w-0.5 bg-slate-200" />
          <motion.div className="absolute left-[15px] top-4 w-0.5 bg-gradient-to-b from-rose-500 via-purple-500 to-blue-500" animate={{ height: `${(step / (recorridoVasos.length - 1)) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} style={{ maxHeight: "calc(100% - 2rem)" }} />
          {recorridoVasos.map((r, i) => (
            <li key={i}>
              <button onClick={() => setStep(i)} className={`relative flex w-full items-center gap-4 rounded-xl px-2 py-2 text-left transition ${i === step ? "bg-slate-50" : "hover:bg-slate-50/60"}`}>
                <motion.span animate={{ scale: i === step ? 1.25 : 1 }} className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white ring-4 ring-white ${i <= step ? colors[r.tipo] : "bg-slate-300"}`}>
                  {i <= step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </motion.span>
                <span className={`text-sm font-semibold ${i === step ? "text-slate-900" : "text-slate-500"}`}>{r.nombre}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="flex items-center">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} className={`w-full rounded-2xl p-8 text-white shadow-xl ${colors[cur.tipo]}`}>
              <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Paso {step + 1} de {recorridoVasos.length}</p>
              <h4 className="font-display mt-2 text-3xl font-bold">{cur.nombre}</h4>
              <p className="mt-3 text-lg opacity-95">{cur.detalle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Vasos() {
  return (
    <Section id="vasos" eyebrow="Capítulo 2" title="Vasos sanguíneos" subtitle="Una extensa red de conductos que transportan la sangre desde el corazón hacia todo el cuerpo y de regreso. Se clasifican en 3 grandes grupos." className="bg-white">
      <div className="grid gap-5 md:grid-cols-3">
        {vasos.map((v, i) => (
          <Reveal key={v.nombre} delay={i * 0.1}>
            <motion.div whileHover={{ y: -4 }} className={`card h-full p-6 ring-1 ${v.ring}`}>
              <VesselCross tipo={v.nombre} />
              <h3 className={`mt-4 text-2xl font-bold ${v.color}`}>{v.nombre}</h3>
              <p className="mt-2 font-medium text-slate-800">{v.direccion}</p>
              <p className={`mt-3 inline-block rounded-lg px-2.5 py-1 text-sm font-semibold ${v.bg} ${v.color}`}>{v.sangre}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {v.caracteristicas.map((c) => (
                  <li key={c} className="flex gap-2"><span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${v.bg.replace("50", "400")}`} />{c}</li>
                ))}
              </ul>
              {v.excepcion && (
                <div className="mt-4"><Callout title="⚠️ Excepción" tone="amber">{v.excepcion}</Callout></div>
              )}
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8"><FlowAnimation /></Reveal>
      <Reveal className="mt-8"><Recorrido /></Reveal>
    </Section>
  );
}
