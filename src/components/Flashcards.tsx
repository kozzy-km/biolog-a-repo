import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from "lucide-react";
import { Section, Reveal } from "./ui";
import { flashcards } from "../data";

export default function Flashcards() {
  const [order, setOrder] = useState<number[]>(() => flashcards.map((_, i) => i));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const card = flashcards[order[idx]];
  const progress = useMemo(() => Math.round((known.size / flashcards.length) * 100), [known]);

  const go = (d: number) => { setFlipped(false); setTimeout(() => setIdx((i) => (i + d + order.length) % order.length), 120); };
  const shuffle = () => { setOrder([...order].sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); };
  const mark = (ok: boolean) => {
    const s = new Set(known);
    ok ? s.add(order[idx]) : s.delete(order[idx]);
    setKnown(s); go(1);
  };

  return (
    <Section id="flashcards" eyebrow="Actividad 1" title="Flashcards" subtitle="Leé el concepto, intentá recordar la respuesta y después tocá la tarjeta para darla vuelta. Marcá si la sabías o no.">
      <Reveal>
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
            <span>Tarjeta <strong className="text-slate-900">{idx + 1}</strong> / {order.length}</span>
            <span>Dominadas: <strong className="text-emerald-600">{known.size}</strong> ({progress}%)</span>
          </div>
          <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 80 }} />
          </div>

          <div className="perspective">
            <AnimatePresence mode="wait">
              <motion.div key={order[idx]} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
                <motion.button
                  onClick={() => setFlipped(!flipped)}
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="preserve-3d relative block h-72 w-full cursor-pointer text-left"
                >
                  <div className="backface-hidden card absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-50 p-8 text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">Concepto</span>
                    <p className="font-display mt-4 text-3xl font-bold text-slate-900 md:text-4xl">{card.frente}</p>
                    <span className="mt-6 text-xs text-slate-400">Tocá para ver la respuesta</span>
                  </div>
                  <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center text-white shadow-xl" style={{ transform: "rotateY(180deg)" }}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-rose-300">Respuesta</span>
                    <p className="mt-4 text-lg leading-relaxed md:text-xl">{card.dorso}</p>
                  </div>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button onClick={() => go(-1)} className="rounded-full border border-slate-300 bg-white p-2.5 transition hover:bg-slate-50"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} className="rounded-full border border-slate-300 bg-white p-2.5 transition hover:bg-slate-50"><ChevronRight className="h-5 w-5" /></button>
              <button onClick={shuffle} className="rounded-full border border-slate-300 bg-white p-2.5 transition hover:bg-slate-50" title="Mezclar"><Shuffle className="h-5 w-5" /></button>
              <button onClick={() => { setKnown(new Set()); setIdx(0); setFlipped(false); }} className="rounded-full border border-slate-300 bg-white p-2.5 transition hover:bg-slate-50" title="Reiniciar"><RotateCcw className="h-5 w-5" /></button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => mark(false)} className="rounded-full bg-rose-100 px-5 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-200">Todavía no 😅</button>
              <button onClick={() => mark(true)} className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-600">¡La sé! ✓</button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
