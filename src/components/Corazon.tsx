import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Reveal, Callout, Pill } from "./ui";
import { cavidades, valvulas } from "../data";

type Parte = "AD" | "VD" | "AI" | "VI" | "tric" | "mitral" | "aorta" | "apulm" | "vpulm" | "cavas" | null;

const info: Record<NonNullable<Parte>, { titulo: string; texto: string; tipo: "ox" | "desox" | "valv" }> = {
  AD: { titulo: "Aurícula derecha (AD)", texto: "Recibe la sangre desoxigenada que viene del cuerpo por las venas cavas.", tipo: "desox" },
  VD: { titulo: "Ventrículo derecho (VD)", texto: "Envía la sangre hacia los pulmones mediante la arteria pulmonar.", tipo: "desox" },
  AI: { titulo: "Aurícula izquierda (AI)", texto: "Recibe la sangre oxigenada que viene de los pulmones por las venas pulmonares.", tipo: "ox" },
  VI: { titulo: "Ventrículo izquierdo (VI)", texto: "Envía la sangre hacia todo el cuerpo mediante la arteria aorta.", tipo: "ox" },
  tric: { titulo: "Válvula tricúspide", texto: "Está entre la aurícula derecha y el ventrículo derecho. Evita que la sangre retroceda.", tipo: "valv" },
  mitral: { titulo: "Válvula mitral (bicúspide)", texto: "Está entre la aurícula izquierda y el ventrículo izquierdo. Evita que la sangre retroceda.", tipo: "valv" },
  aorta: { titulo: "Arteria aorta", texto: "Principal arteria del cuerpo. Sale del VI y distribuye sangre oxigenada a todo el organismo.", tipo: "ox" },
  apulm: { titulo: "Arteria pulmonar", texto: "Sale del VD y lleva sangre DESOXIGENADA hacia los pulmones. ⚠️ Es la excepción entre las arterias.", tipo: "desox" },
  vpulm: { titulo: "Venas pulmonares", texto: "Llevan sangre OXIGENADA desde los pulmones hasta la AI. ⚠️ Es la excepción entre las venas.", tipo: "ox" },
  cavas: { titulo: "Venas cavas", texto: "Superior e inferior. Devuelven la sangre desoxigenada de todo el cuerpo a la AD.", tipo: "desox" },
};

const RED = "#ef4444", BLUE = "#3b82f6";

function HeartDiagram({ sel, onSel }: { sel: Parte; onSel: (p: Parte) => void }) {
  const op = (p: Parte) => (sel === null || sel === p ? 1 : 0.35);
  const stroke = (p: Parte) => (sel === p ? "#0f172a" : "#fff");
  const sw = (p: Parte) => (sel === p ? 4 : 3);
  const cls = "cursor-pointer transition-all duration-300";

  return (
    <svg viewBox="0 0 420 460" className="mx-auto w-full max-w-[440px]">
      {/* Nota: la vista es anatómica → el lado DERECHO del corazón se ve a la IZQUIERDA */}
      {/* Vessels */}
      <g onClick={() => onSel("cavas")} className={cls} opacity={op("cavas")}>
        <rect x="70" y="20" width="40" height="120" rx="20" fill={BLUE} />
        <rect x="70" y="330" width="40" height="110" rx="20" fill={BLUE} />
        <text x="90" y="14" textAnchor="middle" className="fill-blue-700 text-[11px] font-bold">Vena cava sup.</text>
        <text x="90" y="455" textAnchor="middle" className="fill-blue-700 text-[11px] font-bold">Vena cava inf.</text>
      </g>
      <g onClick={() => onSel("apulm")} className={cls} opacity={op("apulm")}>
        <path d="M150 150 L150 60 L40 60" stroke={BLUE} strokeWidth="34" fill="none" strokeLinecap="round" />
        <path d="M150 60 L260 60" stroke={BLUE} strokeWidth="34" fill="none" strokeLinecap="round" />
        <text x="205" y="45" textAnchor="middle" className="fill-blue-700 text-[11px] font-bold">Arteria pulmonar</text>
      </g>
      <g onClick={() => onSel("aorta")} className={cls} opacity={op("aorta")}>
        <path d="M250 180 L250 110 C250 70, 290 70, 320 70 L380 70" stroke={RED} strokeWidth="38" fill="none" strokeLinecap="round" />
        <text x="345" y="45" textAnchor="middle" className="fill-red-700 text-[11px] font-bold">Aorta</text>
      </g>
      <g onClick={() => onSel("vpulm")} className={cls} opacity={op("vpulm")}>
        <rect x="330" y="140" width="80" height="22" rx="11" fill={RED} />
        <rect x="330" y="175" width="80" height="22" rx="11" fill={RED} />
        <text x="372" y="130" textAnchor="middle" className="fill-red-700 text-[11px] font-bold">Venas pulmonares</text>
      </g>

      {/* Heart body */}
      <motion.g animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 1.1, repeat: Infinity }} style={{ transformOrigin: "210px 280px" }}>
        {/* AD */}
        <path onClick={() => onSel("AD")} className={cls} opacity={op("AD")} d="M60 140 L200 140 L200 240 L60 240 Q40 190 60 140 Z" fill="#60a5fa" stroke={stroke("AD")} strokeWidth={sw("AD")} />
        {/* VD */}
        <path onClick={() => onSel("VD")} className={cls} opacity={op("VD")} d="M60 250 L200 250 L200 360 Q180 400 130 400 Q70 380 60 300 Z" fill={BLUE} stroke={stroke("VD")} strokeWidth={sw("VD")} />
        {/* AI */}
        <path onClick={() => onSel("AI")} className={cls} opacity={op("AI")} d="M215 140 L340 140 Q360 190 340 240 L215 240 Z" fill="#f87171" stroke={stroke("AI")} strokeWidth={sw("AI")} />
        {/* VI */}
        <path onClick={() => onSel("VI")} className={cls} opacity={op("VI")} d="M215 250 L340 250 Q360 340 300 400 Q250 430 215 380 Z" fill={RED} stroke={stroke("VI")} strokeWidth={sw("VI")} />
        {/* valves */}
        <g onClick={() => onSel("tric")} className={cls} opacity={op("tric")}>
          <rect x="95" y="238" width="70" height="14" rx="7" fill="#fde68a" stroke={sel === "tric" ? "#0f172a" : "#f59e0b"} strokeWidth="2" />
        </g>
        <g onClick={() => onSel("mitral")} className={cls} opacity={op("mitral")}>
          <rect x="245" y="238" width="70" height="14" rx="7" fill="#fde68a" stroke={sel === "mitral" ? "#0f172a" : "#f59e0b"} strokeWidth="2" />
        </g>
        {/* labels */}
        <g className="pointer-events-none fill-white text-[20px] font-extrabold">
          <text x="130" y="200" textAnchor="middle">AD</text>
          <text x="130" y="320" textAnchor="middle">VD</text>
          <text x="278" y="200" textAnchor="middle">AI</text>
          <text x="278" y="320" textAnchor="middle">VI</text>
        </g>
        <g className="pointer-events-none fill-white/90 text-[10px] font-semibold">
          <text x="130" y="218" textAnchor="middle">Aurícula derecha</text>
          <text x="130" y="338" textAnchor="middle">Ventrículo derecho</text>
          <text x="278" y="218" textAnchor="middle">Aurícula izquierda</text>
          <text x="278" y="338" textAnchor="middle">Ventrículo izquierdo</text>
        </g>
        <g className="pointer-events-none fill-amber-800 text-[9px] font-bold">
          <text x="130" y="266" textAnchor="middle">tricúspide</text>
          <text x="280" y="266" textAnchor="middle">mitral</text>
        </g>
      </motion.g>
    </svg>
  );
}

export default function Corazon() {
  const [sel, setSel] = useState<Parte>(null);
  const cur = sel ? info[sel] : null;

  return (
    <Section id="corazon" eyebrow="Capítulo 3" title="El corazón" subtitle="Es un músculo cardíaco del tamaño aproximado del puño de la mano, situado en el pecho, ligeramente hacia la izquierda. Su función es bombear la sangre para que circule por todo el organismo.">
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="card p-4 md:p-6 lg:col-span-3">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Diagrama interactivo · tocá una parte</p>
            <div className="flex gap-2"><Pill tone="red">🔴 oxigenada</Pill><Pill tone="blue">🔵 desoxigenada</Pill></div>
          </div>
          <HeartDiagram sel={sel} onSel={(p) => setSel(p === sel ? null : p)} />
          <p className="mt-2 text-center text-xs text-slate-400">Vista anatómica: el lado derecho del corazón aparece a la izquierda del dibujo (como si mirases a una persona de frente).</p>
        </Reveal>

        <div className="space-y-4 lg:col-span-2">
          <Reveal delay={0.1}>
            <div className="card min-h-[180px] p-6">
              <AnimatePresence mode="wait">
                {cur ? (
                  <motion.div key={sel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Pill tone={cur.tipo === "ox" ? "red" : cur.tipo === "desox" ? "blue" : "amber"}>
                      {cur.tipo === "ox" ? "Sangre oxigenada" : cur.tipo === "desox" ? "Sangre desoxigenada" : "Válvula"}
                    </Pill>
                    <h3 className="mt-3 text-xl font-bold text-slate-900">{cur.titulo}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{cur.texto}</p>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col justify-center text-slate-500">
                    <p className="text-4xl">👆</p>
                    <p className="mt-2 font-medium">Seleccioná una cavidad, válvula o vaso del diagrama para ver qué hace.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="card p-6">
              <h4 className="font-bold text-slate-900">Las 4 cavidades</h4>
              <ul className="mt-3 space-y-2">
                {cavidades.map((c) => (
                  <li key={c.sigla}>
                    <button onClick={() => setSel(c.sigla as Parte)} className="flex w-full items-start gap-3 rounded-xl p-2 text-left transition hover:bg-slate-50">
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-extrabold text-white ${c.tipo === "ox" ? "bg-red-500" : "bg-blue-500"}`}>{c.sigla}</span>
                      <span><span className="block text-sm font-semibold text-slate-900">{c.nombre}</span><span className="text-xs text-slate-500">{c.funcion}</span></span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="card p-6">
              <h4 className="font-bold text-slate-900">🚪 Válvulas cardíacas</h4>
              <p className="mt-1 text-sm text-slate-600">Permiten que la sangre avance en la dirección correcta y evitan que retroceda.</p>
              <ul className="mt-3 space-y-2 text-sm">
                {valvulas.map((v) => (
                  <li key={v.nombre} className="rounded-lg bg-amber-50 p-3 text-amber-900"><strong>{v.nombre}:</strong> {v.ubicacion}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-8">
        <Callout title="🧠 Recorrido CLAVE dentro del corazón" tone="rose">
          <span className="text-base font-bold tracking-wide">AD → VD → pulmones → AI → VI → cuerpo → AD</span>
          <br />Truco: la sangre entra siempre por una <strong>aurícula</strong> y sale siempre por un <strong>ventrículo</strong>. El lado <strong>derecho</strong> trabaja con los pulmones 🔵, el lado <strong>izquierdo</strong> con el cuerpo 🔴.
        </Callout>
      </Reveal>
    </Section>
  );
}
