import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, Reveal, Pill, Callout } from "./ui";
import { leucocitos } from "../data";

type Comp = "plasma" | "rojos" | "blancos" | "plaquetas";

const comps: Record<Comp, { titulo: string; sub: string; color: string; desc: string[]; pill: string }> = {
  plasma: {
    titulo: "Plasma", sub: "Parte líquida", color: "#fbbf24", pill: "Líquido",
    desc: ["Es la parte líquida de la sangre.", "Permite transportar diferentes sustancias."],
  },
  rojos: {
    titulo: "Glóbulos rojos", sub: "Parte sólida", color: "#e11d48", pill: "Sólido",
    desc: ["Son las células más abundantes de la sangre.", "Su función principal es transportar oxígeno.", "Contienen hemoglobina, una proteína que les da el color rojo y permite transportar O₂.", "También transportan parte del dióxido de carbono (CO₂)."],
  },
  blancos: {
    titulo: "Glóbulos blancos", sub: "Parte sólida · Leucocitos", color: "#a78bfa", pill: "Sólido",
    desc: ["Células nucleadas.", "Se encargan de la defensa del organismo.", "Hay 5 tipos: neutrófilos, eosinófilos, basófilos, linfocitos y monocitos."],
  },
  plaquetas: {
    titulo: "Plaquetas", sub: "Parte sólida", color: "#f59e0b", pill: "Sólido",
    desc: ["Son fragmentos de células asociados a la cicatrización.", "Se unen a una proteína llamada fibrina, con la que forman el coágulo y detienen el sangrado.", "Este proceso se llama coagulación."],
  },
};

function TubeDiagram({ sel, onSel }: { sel: Comp; onSel: (c: Comp) => void }) {
  const layers: { id: Comp; h: number; color: string; label: string }[] = [
    { id: "plasma", h: 44, color: "#fde68a", label: "Plasma" },
    { id: "blancos", h: 8, color: "#ddd6fe", label: "Glóbulos blancos + plaquetas" },
    { id: "rojos", h: 48, color: "#e11d48", label: "Glóbulos rojos" },
  ];
  return (
    <div className="flex items-end justify-center gap-6">
      <div className="relative h-80 w-28 overflow-hidden rounded-b-[3rem] rounded-t-xl border-[3px] border-slate-300 bg-white/60 shadow-inner">
        <div className="flex h-full flex-col">
          {layers.map((l, i) => {
            const active = sel === l.id || (l.id === "blancos" && sel === "plaquetas");
            return (
              <motion.button
                key={l.id}
                onClick={() => onSel(l.id)}
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{ height: `${l.h}%`, background: l.color, transformOrigin: "bottom" }}
                className={`relative w-full transition-all ${active ? "brightness-100 ring-2 ring-inset ring-slate-900/40" : "brightness-95 hover:brightness-100"}`}
                aria-label={l.label}
              />
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-2 w-3 rounded-full bg-white/40" />
      </div>
      <div className="space-y-6 text-sm">
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-200" /> Plasma <span className="text-slate-400">(líquido)</span></div>
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-violet-200" /> Blancos + plaquetas</div>
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-600" /> Glóbulos rojos <span className="text-slate-400">(más abundantes)</span></div>
      </div>
    </div>
  );
}

export default function Sangre() {
  const [sel, setSel] = useState<Comp>("rojos");
  const c = comps[sel];

  return (
    <Section id="sangre" eyebrow="Capítulo 1" title="La sangre" subtitle="La sangre está formada por una parte líquida (plasma) y una parte sólida (glóbulos rojos, glóbulos blancos y plaquetas). Tocá cada componente para explorarlo.">
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="card p-6 lg:col-span-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Tubo de sangre (esquema)</p>
          <TubeDiagram sel={sel} onSel={setSel} />
        </Reveal>

        <Reveal delay={0.1} className="card flex flex-col p-6 lg:col-span-3">
          <div className="mb-5 flex flex-wrap gap-2">
            {(Object.keys(comps) as Comp[]).map((k) => (
              <button key={k} onClick={() => setSel(k)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${sel === k ? "bg-slate-900 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                {comps[k].titulo}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="flex-1">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full shadow-inner" style={{ background: c.color }} />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{c.titulo}</h3>
                  <p className="text-sm text-slate-500">{c.sub}</p>
                </div>
                <span className="ml-auto"><Pill tone={sel === "plasma" ? "amber" : "slate"}>{c.pill}</Pill></span>
              </div>
              <ul className="mt-6 space-y-3">
                {c.desc.map((d, i) => (
                  <motion.li key={d} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }} className="flex gap-3 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />{d}
                  </motion.li>
                ))}
              </ul>
              {sel === "plaquetas" && (
                <div className="mt-6"><Callout title="Secuencia para recordar" tone="amber">Herida → plaquetas + <strong>fibrina</strong> → coágulo → se detiene el sangrado.</Callout></div>
              )}
              {sel === "rojos" && (
                <div className="mt-6"><Callout title="Clave" tone="rose">Glóbulo rojo → <strong>hemoglobina</strong> → color rojo + transporte de O₂.</Callout></div>
              )}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>

      {/* Leucocitos */}
      <div className="mt-16">
        <Reveal>
          <h3 className="text-2xl font-bold text-slate-900">Los 5 tipos de glóbulos blancos</h3>
          <p className="mt-2 text-slate-600">Cada uno se asocia a algo distinto. Esta es una de las cosas que <strong>sí o sí</strong> tenés que saber.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {leucocitos.map((l, i) => (
            <Reveal key={l.nombre} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6 }} className="card group relative h-full overflow-hidden p-5">
                <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${l.color} opacity-20 transition-transform group-hover:scale-150`} />
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${l.color} text-2xl shadow-md`}>{l.emoji}</div>
                <h4 className="mt-4 text-lg font-bold text-slate-900">{l.nombre}</h4>
                <p className="mt-1 text-sm font-semibold text-rose-600">→ {l.asociado}</p>
                <p className="mt-2 text-sm text-slate-600">{l.detalle}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-6">
          <Callout title="Truco para memorizar" tone="sky">
            <strong>N</strong>eutrófilos → bacterias · <strong>E</strong>osinófilos → parásitos · <strong>B</strong>asófilos → alergias · <strong>L</strong>infocitos → anticuerpos · <strong>M</strong>onocitos → macrófagos. Pensá en <em>"Nunca Enfermes, Buscá Linfocitos y Macrófagos"</em>.
          </Callout>
        </Reveal>
      </div>
    </Section>
  );
}
