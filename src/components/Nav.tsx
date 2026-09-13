import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";

const links = [
  { href: "#sangre", label: "Sangre" },
  { href: "#vasos", label: "Vasos" },
  { href: "#corazon", label: "Corazón" },
  { href: "#circulacion", label: "Circulación" },
  { href: "#flashcards", label: "Flashcards" },
  { href: "#quiz", label: "Quiz" },
  { href: "#resumen", label: "Resumen" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => { const el = document.querySelector(l.href); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-sm" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-bold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-rose-200">
            <Heart className="h-4.5 w-4.5" fill="currentColor" />
          </span>
          <span className="hidden sm:block">Sistema Circulatorio</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${active === l.href ? "text-rose-600" : "text-slate-600 hover:text-slate-900"}`}>
              {active === l.href && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-rose-50" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-slate-700 md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-slate-200 bg-white px-5 py-3 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">{l.label}</a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}
