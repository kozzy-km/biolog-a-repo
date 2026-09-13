import { motion, useScroll, useSpring } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Sangre from "./components/Sangre";
import Vasos from "./components/Vasos";
import Corazon from "./components/Corazon";
import Circulacion from "./components/Circulacion";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import Ordenar from "./components/Ordenar";
import Resumen from "./components/Resumen";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="min-h-screen">
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500" />
      <Nav />
      <main>
        <Hero />
        <Sangre />
        <Vasos />
        <Corazon />
        <Circulacion />
        <Flashcards />
        <Quiz />
        <Ordenar />
        <Resumen />
      </main>
      <footer className="border-t border-slate-200 bg-white py-10 text-center text-sm text-slate-500">
        <p>Guía de estudio · Sistema Circulatorio · Basada en el apunte de clase.</p>
        <p className="mt-1">🔴 Sangre oxigenada · 🔵 Sangre desoxigenada</p>
      </footer>
    </div>
  );
}
