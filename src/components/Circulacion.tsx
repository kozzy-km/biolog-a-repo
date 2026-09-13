import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Reveal, Callout, Pill } from "./ui";
import { circulacionPulmonar, circulacionSistemica, vasosImportantes } from "../data";

const RED = "#ef4444", BLUE = "#3b82f6";

function DobleCircuito({ modo }: { modo: "pulmonar" | "sistemica" | "ambas" }) {
  const showP = modo !== "sistemica", showS = modo !== "pulmonar";
  // Paths: pulmonary loop (top), systemic loop (bottom). Heart centered.
  const pulmOut = "M180 200 L180 120 C180 80, 140 60, 100 60 C60 60, 40 90, 40 120"; // VD -> lungs (blue)
  const pulmIn = "M40 120 C40 150, 70 180, 110 180 C160 180, 200 190, 220 200"; // lungs -> AI (red)
  const sysOut = "M220 260 L220 340 C220 380, 260 400, 300 400 C340 400, 360 370, 360 340"; // VI -> body (red)
  const sysIn = "M360 340 C360 310, 330 280, 290 280 C240 280, 200 270, 180 260"; // body -> AD (blue)

  const Dot = ({ path, color, delay, show }: { path: string; color: string; delay: number; show: boolean }) =>
    show ? (
      <motion.circle r="6" fill={color} stroke="#fff" strokeWidth="2"
        animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay }}
        style={{ offsetPath: `path("${path}")` }} />
    ) : null;

  return (
    <svg viewBox="0 0 400 460" className="mx-auto w-full max-w-md">
      {/* lungs */}
      <g opacity={showP ? 1 : 0.25} className="transition-opacity">
        <ellipse cx="40" cy="120" rx="34" ry="46" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2" />
        <text x="40" y="116" textAnchor="middle" className="fill-sky-800 text-[11px] font-bold">Pulmones</text>
        <text x="40" y="132" textAnchor="middle" className="fill-sky-700 text-[9px]">CO₂ sale · O₂ entra</text>
      </g>
      {/* body */}
      <g opacity={showS ? 1 : 0.25} className="transition-opacity">
        <ellipse cx="360" cy="340" rx="36" ry="48" fill="#fef3c7" stroke="#fcd34d" strokeWidth="2" />
        <text x="360" y="334" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">Tejidos</text>
        <text x="360" y="348" textAnchor="middle" className="fill-amber-700 text-[9px]">O₂ y nutrientes ↓</text>
        <text x="360" y="360" textAnchor="middle" className="fill-amber-700 text-[9px]">CO₂ y desechos ↑</text>
      </g>

      {/* pulmonary paths */}
      <g opacity={showP ? 1 : 0.15} className="transition-opacity">
        <path d={pulmOut} stroke={BLUE} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d={pulmIn} stroke={RED} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d={pulmOut} stroke="#fff" strokeWidth="2" fill="none" className="flow-dash" />
        <path d={pulmIn} stroke="#fff" strokeWidth="2" fill="none" className="flow-dash" />
        <text x="130" y="40" textAnchor="middle" className="fill-blue-700 text-[10px] font-bold">Arteria pulmonar 🔵</text>
        <text x="120" y="215" textAnchor="middle" className="fill-red-700 text-[10px] font-bold">Venas pulmonares 🔴</text>
      </g>
      {/* systemic paths */}
      <g opacity={showS ? 1 : 0.15} className="transition-opacity">
        <path d={sysOut} stroke={RED} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d={sysIn} stroke={BLUE} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d={sysOut} stroke="#fff" strokeWidth="2" fill="none" className="flow-dash" />
        <path d={sysIn} stroke="#fff" strokeWidth="2" fill="none" className="flow-dash" />
        <text x="270" y="425" textAnchor="middle" className="fill-red-700 text-[10px] font-bold">Aorta 🔴</text>
        <text x="280" y="268" textAnchor="middle" className="fill-blue-700 text-[10px] font-bold">Venas cavas 🔵</text>
      </g>

      {/* heart */}
      <motion.g animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 1.1, repeat: Infinity }} style={{ transformOrigin: "200px 230px" }}>
        <rect x="150" y="190" width="50" height="40" rx="8" fill="#60a5fa" />
        <rect x="150" y="232" width="50" height="48" rx="8" fill={BLUE} />
        <rect x="202" y="190" width="50" height="40" rx="8" fill="#f87171" />
        <rect x="202" y="232" width="50" height="48" rx="8" fill={RED} />
        <g className="fill-white text-[13px] font-extrabold">
          <text x="175" y="215" textAnchor="middle">AD</text>
          <text x="175" y="261" textAnchor="middle">VD</text>
          <text x="227" y="215" textAnchor="middle">AI</text>
          <text x="227" y="261" textAnchor="middle">VI</text>
        </g>
      </motion.g>

      <Dot path={pulmOut} color={BLUE} delay={0} show={showP} />
      <Dot path={pulmIn} color={RED} delay={1.2} show={showP} />
      <Dot path={sysOut} color={RED} delay={0} show={showS} />
      <Dot path={sysIn} color={BLUE} delay={1.2} show={showS} />
    </svg>
  );
}

function Pasos({ pasos, titulo, desde, hacia }: { pasos: { paso: string; ox: boolean | null }[]; titulo: string; desde: string; hacia: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-900">{titulo}</h4>
        <span className="text-lg">{desde} → {hacia}</span>
      </div>
      <ol className="mt-3 flex flex-wrap items-center gap-2">
        {pasos.map((p, i) => (
          <motion.li key={p.paso} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-center gap-2">
            <span className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${p.ox === true ? "bg-red-100 text-red-800" : p.ox === false ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>{p.paso}</span>
            {i < pasos.length - 1 && <span className="text-slate-300">→</span>}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function Circulacion() {
  const [modo, setModo] = useState<"pulmonar" | "sistemica" | "ambas">("ambas");
  return (
    <Section id="circulacion" eyebrow="Capítulo 4" title="Circulación pulmonar y sistémica" subtitle="La sangre hace dos recorridos: uno corto hacia los pulmones (para oxigenarse) y uno largo hacia el resto del cuerpo (para entregar oxígeno y nutrientes)." className="bg-white">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="card p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {(["ambas", "pulmonar", "sistemica"] as const).map((m) => (
              <button key={m} onClick={() => setModo(m)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${modo === m ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                {m === "ambas" ? "Ver ambas" : m === "pulmonar" ? "🫁 Pulmonar" : "🧍 Sistémica"}
              </button>
            ))}
          </div>
          <DobleCircuito modo={modo} />
        </Reveal>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div key={modo} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {modo !== "sistemica" && (
                <Reveal className="card p-6">
                  <Pill tone="blue">🫁 Circulación pulmonar</Pill>
                  <p className="mt-3 text-slate-700">Recorrido de la sangre entre el <strong>corazón y los pulmones</strong>. Sale del VD desoxigenada; en los pulmones se produce el <strong>intercambio gaseoso</strong>: elimina CO₂ e incorpora O₂. Vuelve al corazón oxigenada por las venas pulmonares.</p>
                  <div className="mt-4"><Pasos pasos={circulacionPulmonar} titulo="Recorrido" desde="🔵" hacia="🔴" /></div>
                </Reveal>
              )}
              {modo !== "pulmonar" && (
                <Reveal delay={0.05} className="card p-6">
                  <Pill tone="red">🧍 Circulación sistémica</Pill>
                  <p className="mt-3 text-slate-700">Recorrido de la sangre entre el <strong>corazón y el resto del cuerpo</strong>. Sale del VI oxigenada; en los capilares <strong>entrega</strong> oxígeno y nutrientes y <strong>recoge</strong> dióxido de carbono y desechos metabólicos. Vuelve al corazón desoxigenada.</p>
                  <div className="mt-4"><Pasos pasos={circulacionSistemica} titulo="Recorrido" desde="🔴" hacia="🔵" /></div>
                </Reveal>
              )}
            </motion.div>
          </AnimatePresence>
          <Reveal delay={0.1}>
            <Callout title="⚠️ Las dos excepciones (¡siempre las toman!)" tone="amber">
              <strong>Arteria pulmonar</strong> = sangre desoxigenada 🔵 (única arteria con sangre "azul").<br />
              <strong>Venas pulmonares</strong> = sangre oxigenada 🔴 (únicas venas con sangre "roja").
            </Callout>
          </Reveal>
        </div>
      </div>

      <div className="mt-16">
        <Reveal>
          <h3 className="text-2xl font-bold text-slate-900">Vasos sanguíneos importantes</h3>
          <p className="mt-2 text-slate-600">Los nombres que tenés que reconocer.</p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vasosImportantes.map((v, i) => (
            <Reveal key={v.nombre} delay={i * 0.06}>
              <motion.div whileHover={{ y: -4 }} className={`card h-full border-l-4 p-5 ${v.tipo === "ox" ? "border-l-red-500" : "border-l-blue-500"}`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{v.nombre}</h4>
                  <span className={`h-3 w-3 rounded-full ${v.tipo === "ox" ? "bg-red-500" : "bg-blue-500"}`} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{v.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
