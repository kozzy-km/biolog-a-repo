import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { GripVertical, RotateCcw, Check } from "lucide-react";
import { Section, Reveal } from "./ui";

const ejercicios = [
  { titulo: "Recorrido dentro del corazón", correcto: ["Aurícula derecha", "Ventrículo derecho", "Pulmones", "Aurícula izquierda", "Ventrículo izquierdo", "Cuerpo"] },
  { titulo: "Circulación pulmonar", correcto: ["Ventrículo derecho", "Arteria pulmonar", "Pulmones", "Capilares pulmonares", "Venas pulmonares", "Aurícula izquierda"] },
  { titulo: "Recorrido de los vasos", correcto: ["Arterias elásticas", "Arterias musculares", "Arteriolas", "Capilares", "Vénulas", "Venas", "Venas cavas"] },
];

const shuffled = (a: string[]) => { let s = [...a]; do { s = [...a].sort(() => Math.random() - 0.5); } while (s.join() === a.join()); return s; };

export default function Ordenar() {
  const [ex, setEx] = useState(0);
  const [items, setItems] = useState(() => shuffled(ejercicios[0].correcto));
  const [checked, setChecked] = useState(false);

  const load = (n: number) => { setEx(n); setItems(shuffled(ejercicios[n].correcto)); setChecked(false); };
  const correct = ejercicios[ex].correcto;
  const allOk = items.every((it, i) => it === correct[i]);

  return (
    <Section id="ordenar" eyebrow="Actividad 3" title="Ordená el recorrido" subtitle="Arrastrá las tarjetas para ponerlas en el orden correcto y después verificá.">
      <Reveal>
        <div className="mx-auto max-w-xl">
          <div className="mb-5 flex flex-wrap gap-2">
            {ejercicios.map((e, n) => (
              <button key={e.titulo} onClick={() => load(n)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${ex === n ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{e.titulo}</button>
            ))}
          </div>
          <div className="card p-4 md:p-6">
            <Reorder.Group axis="y" values={items} onReorder={(v) => { setItems(v); setChecked(false); }} className="space-y-2">
              {items.map((it, i) => {
                const ok = checked && it === correct[i];
                const bad = checked && it !== correct[i];
                return (
                  <Reorder.Item key={it} value={it} whileDrag={{ scale: 1.03, boxShadow: "0 12px 30px rgba(15,23,42,0.15)" }}
                    className={`flex cursor-grab items-center gap-3 rounded-xl border-2 bg-white px-4 py-3 select-none active:cursor-grabbing ${ok ? "border-emerald-400 bg-emerald-50" : bad ? "border-rose-300 bg-rose-50" : "border-slate-200"}`}>
                    <GripVertical className="h-4 w-4 text-slate-400" />
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{i + 1}</span>
                    <span className="font-medium text-slate-800">{it}</span>
                    {ok && <Check className="ml-auto h-5 w-5 text-emerald-600" />}
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button onClick={() => load(ex)} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><RotateCcw className="h-4 w-4" /> Mezclar</button>
              <button onClick={() => setChecked(true)} className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Verificar</button>
            </div>
            <AnimatePresence>
              {checked && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`mt-4 rounded-xl p-3 text-center text-sm font-semibold ${allOk ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                  {allOk ? "🎉 ¡Perfecto! Ese es el orden correcto." : "Casi. Los que están en verde ya están bien; movete los otros."}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
