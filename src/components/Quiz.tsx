import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Section, Reveal } from "./ui";
import { preguntas } from "../data";

export default function Quiz() {
  const [i, setI] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);

  const q = preguntas[i];
  const answer = (o: number) => {
    if (sel !== null) return;
    setSel(o);
    const ok = o === q.correcta;
    if (ok) setScore((s) => s + 1);
    setHistory((h) => [...h, ok]);
  };
  const next = () => {
    if (i + 1 >= preguntas.length) { setDone(true); return; }
    setI(i + 1); setSel(null);
  };
  const reset = () => { setI(0); setSel(null); setScore(0); setDone(false); setHistory([]); };

  const pct = Math.round((score / preguntas.length) * 100);
  const msg = pct === 100 ? "¡Perfecto! Estás más que listo 🏆" : pct >= 80 ? "¡Muy bien! Repasá lo que fallaste y vas a rendir genial 💪" : pct >= 60 ? "Vas bien, pero volvé a leer las secciones que fallaste 📖" : "Tranqui, repasá las flashcards y el resumen, y volvé a intentar 🔁";

  return (
    <Section id="quiz" eyebrow="Actividad 2" title="Quiz de autoevaluación" subtitle={`${preguntas.length} preguntas de opción múltiple basadas en el apunte. Cada respuesta viene con su explicación.`} className="bg-white">
      <Reveal>
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
                <motion.div initial={{ rotate: -20, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-xl shadow-amber-200">
                  <Trophy className="h-10 w-10" />
                </motion.div>
                <p className="font-display mt-6 text-5xl font-bold text-slate-900">{score}<span className="text-2xl text-slate-400">/{preguntas.length}</span></p>
                <p className="mt-2 text-lg font-semibold text-slate-700">{pct}% de aciertos</p>
                <p className="mt-3 text-slate-600">{msg}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                  {history.map((h, k) => <span key={k} className={`h-3 w-3 rounded-full ${h ? "bg-emerald-500" : "bg-rose-400"}`} />)}
                </div>
                <button onClick={reset} className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"><RotateCcw className="h-4 w-4" /> Intentar de nuevo</button>
              </motion.div>
            ) : (
              <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="card p-6 md:p-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-rose-600">Pregunta {i + 1} de {preguntas.length}</span>
                  <span className="text-slate-500">Puntaje: <strong className="text-slate-900">{score}</strong></span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div className="h-full bg-rose-500" animate={{ width: `${((i) / preguntas.length) * 100}%` }} />
                </div>
                <h3 className="mt-6 text-xl font-bold leading-snug text-slate-900 md:text-2xl">{q.pregunta}</h3>
                <div className="mt-6 grid gap-3">
                  {q.opciones.map((o, k) => {
                    const isSel = sel === k, isOk = k === q.correcta;
                    let cls = "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50";
                    if (sel !== null) {
                      if (isOk) cls = "border-emerald-500 bg-emerald-50 text-emerald-900";
                      else if (isSel) cls = "border-rose-400 bg-rose-50 text-rose-900";
                      else cls = "border-slate-200 bg-white opacity-50";
                    }
                    return (
                      <motion.button key={k} whileTap={sel === null ? { scale: 0.98 } : {}} onClick={() => answer(k)} disabled={sel !== null}
                        className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left font-medium transition-all ${cls}`}>
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{"ABCD"[k]}</span>
                        <span className="flex-1">{o}</span>
                        {sel !== null && isOk && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                        {sel !== null && isSel && !isOk && <XCircle className="h-5 w-5 text-rose-500" />}
                      </motion.button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {sel !== null && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                      <div className={`mt-5 rounded-xl p-4 text-sm ${sel === q.correcta ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"}`}>
                        <p className="font-bold">{sel === q.correcta ? "✅ ¡Correcto!" : "❌ No era esa."}</p>
                        <p className="mt-1">{q.explicacion}</p>
                      </div>
                      <button onClick={next} className="mt-4 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                        {i + 1 >= preguntas.length ? "Ver resultado" : "Siguiente pregunta →"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
