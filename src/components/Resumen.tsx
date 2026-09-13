import { motion } from "framer-motion";
import { Section, Reveal } from "./ui";

const puntos = [
  { n: "1", t: "Función del sistema circulatorio", d: "Transportar sangre, oxígeno, nutrientes, hormonas y desechos por el cuerpo." },
  { n: "2", t: "Componentes de la sangre", d: "Plasma + glóbulos rojos + glóbulos blancos + plaquetas." },
  { n: "3", t: "Glóbulos blancos", d: "Neutrófilos → bacterias · Eosinófilos → parásitos · Basófilos → alergias · Linfocitos → antígenos y anticuerpos · Monocitos → macrófagos." },
  { n: "4", t: "Vasos sanguíneos", d: "Arterias (salen del corazón) → capilares (intercambio) → venas (vuelven al corazón)." },
  { n: "5", t: "Corazón", d: "AD → VD → pulmones → AI → VI → cuerpo → AD. Ese recorrido es CLAVE." },
  { n: "6", t: "Circulación pulmonar", d: "VD → arteria pulmonar → pulmones → venas pulmonares → AI.  🔵 → 🔴" },
  { n: "7", t: "Circulación sistémica", d: "VI → aorta → cuerpo → venas cavas → AD.  🔴 → 🔵" },
  { n: "8", t: "Las dos excepciones", d: "Arteria pulmonar = desoxigenada 🔵 · Venas pulmonares = oxigenada 🔴." },
];

export default function Resumen() {
  return (
    <Section id="resumen" eyebrow="Para el final" title="Lo que tenés que saber sí o sí" subtitle="Si tenés poco tiempo, concentrate en estos 8 puntos.">
      <div className="grid gap-4 md:grid-cols-2">
        {puntos.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.05}>
            <motion.div whileHover={{ x: 4 }} className="card flex h-full gap-4 p-5">
              <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-lg font-bold text-white shadow-md shadow-rose-200">{p.n}</span>
              <div>
                <h4 className="font-bold text-slate-900">{p.t}</h4>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.d}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">⭐ Mini resumen para memorizar</span>
          <p className="font-display mt-4 max-w-3xl text-xl leading-relaxed md:text-2xl">
            El <strong className="text-rose-300">corazón</strong> bombea la sangre. Las <strong className="text-rose-300">arterias</strong> la llevan desde el corazón, los <strong className="text-purple-300">capilares</strong> permiten el intercambio de sustancias y las <strong className="text-sky-300">venas</strong> la devuelven al corazón. En la <strong>circulación pulmonar</strong>, la sangre va del corazón a los pulmones para oxigenarse. En la <strong>circulación sistémica</strong>, va del corazón al resto del cuerpo para entregar oxígeno y nutrientes y recoger desechos.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
