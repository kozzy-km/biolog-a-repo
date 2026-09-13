export type Leucocito = {
  nombre: string;
  asociado: string;
  detalle: string;
  color: string;
  emoji: string;
};

export const leucocitos: Leucocito[] = [
  { nombre: "Neutrófilos", asociado: "Bacterias", detalle: "Se asocian con la defensa contra bacterias.", color: "from-sky-400 to-blue-500", emoji: "🦠" },
  { nombre: "Eosinófilos", asociado: "Parásitos", detalle: "Se asocian con la defensa contra parásitos.", color: "from-rose-400 to-pink-500", emoji: "🪱" },
  { nombre: "Basófilos", asociado: "Alergias", detalle: "Se asocian con las reacciones alérgicas.", color: "from-violet-400 to-purple-500", emoji: "🤧" },
  { nombre: "Linfocitos", asociado: "Antígenos y anticuerpos", detalle: "Reconocen antígenos y producen anticuerpos.", color: "from-emerald-400 to-teal-500", emoji: "🛡️" },
  { nombre: "Monocitos", asociado: "Macrófagos", detalle: "Se convierten en macrófagos.", color: "from-amber-400 to-orange-500", emoji: "🍽️" },
];

export type Vaso = {
  nombre: string;
  direccion: string;
  sangre: string;
  excepcion?: string;
  caracteristicas: string[];
  color: string;
  bg: string;
  ring: string;
};

export const vasos: Vaso[] = [
  {
    nombre: "Arterias",
    direccion: "Llevan la sangre desde el corazón hacia el cuerpo.",
    sangre: "Generalmente oxigenada 🔴",
    excepcion: "La arteria pulmonar lleva sangre desoxigenada hacia los pulmones.",
    caracteristicas: [
      "Paredes gruesas y elásticas",
      "Soportan el pulso y la presión arterial",
      "Tienen paredes musculares",
      "Su calibre disminuye a medida que se ramifican (hasta llegar a las arteriolas)",
    ],
    color: "text-red-600",
    bg: "bg-red-50",
    ring: "ring-red-200",
  },
  {
    nombre: "Venas",
    direccion: "Llevan la sangre desde los tejidos hacia el corazón.",
    sangre: "Generalmente desoxigenada 🔵",
    excepcion: "Las venas pulmonares llevan sangre oxigenada desde los pulmones hacia el corazón.",
    caracteristicas: [
      "Paredes más delgadas que las arterias",
      "Tienen menor presión",
      "Algunas poseen válvulas que impiden que la sangre retroceda",
    ],
    color: "text-blue-600",
    bg: "bg-blue-50",
    ring: "ring-blue-200",
  },
  {
    nombre: "Capilares",
    direccion: "Comunican las arterias/arteriolas con las vénulas de los tejidos.",
    sangre: "Zona de intercambio 🟣",
    caracteristicas: [
      "Vasos sanguíneos muy pequeños",
      "Permiten el intercambio de sustancias entre la sangre y los tejidos",
      "Intercambian gases, nutrientes, hormonas y desechos con las células",
    ],
    color: "text-purple-600",
    bg: "bg-purple-50",
    ring: "ring-purple-200",
  },
];

export const recorridoVasos = [
  { nombre: "Corazón", detalle: "Bombea la sangre", tipo: "corazon" },
  { nombre: "Arterias elásticas", detalle: "Aorta y ramas principales", tipo: "arteria" },
  { nombre: "Arterias musculares", detalle: "De medio calibre", tipo: "arteria" },
  { nombre: "Arteriolas", detalle: "Pequeñas arterias que regulan el flujo", tipo: "arteria" },
  { nombre: "Capilares", detalle: "Intercambio de sustancias con los tejidos", tipo: "capilar" },
  { nombre: "Vénulas", detalle: "Pequeñas venas que reciben la sangre", tipo: "vena" },
  { nombre: "Venas", detalle: "De medio a gran calibre", tipo: "vena" },
  { nombre: "Venas cavas", detalle: "Devuelven la sangre al corazón", tipo: "vena" },
  { nombre: "Corazón", detalle: "Vuelve a empezar", tipo: "corazon" },
];

export const cavidades = [
  { sigla: "AD", nombre: "Aurícula derecha", funcion: "Recibe la sangre desoxigenada que viene del cuerpo (por las venas cavas).", tipo: "desox" },
  { sigla: "VD", nombre: "Ventrículo derecho", funcion: "Envía la sangre hacia los pulmones mediante la arteria pulmonar.", tipo: "desox" },
  { sigla: "AI", nombre: "Aurícula izquierda", funcion: "Recibe la sangre oxigenada que viene de los pulmones (por las venas pulmonares).", tipo: "ox" },
  { sigla: "VI", nombre: "Ventrículo izquierdo", funcion: "Envía la sangre hacia todo el cuerpo mediante la arteria aorta.", tipo: "ox" },
];

export const valvulas = [
  { nombre: "Válvula tricúspide", ubicacion: "Entre la aurícula derecha y el ventrículo derecho." },
  { nombre: "Válvula mitral (o bicúspide)", ubicacion: "Entre la aurícula izquierda y el ventrículo izquierdo." },
];

export const circulacionPulmonar = [
  { paso: "Ventrículo derecho", ox: false },
  { paso: "Arteria pulmonar", ox: false },
  { paso: "Pulmones", ox: null },
  { paso: "Capilares pulmonares", ox: null },
  { paso: "Venas pulmonares", ox: true },
  { paso: "Aurícula izquierda", ox: true },
];

export const circulacionSistemica = [
  { paso: "Ventrículo izquierdo", ox: true },
  { paso: "Arteria aorta", ox: true },
  { paso: "Arterias", ox: true },
  { paso: "Arteriolas", ox: true },
  { paso: "Capilares de los tejidos", ox: null },
  { paso: "Vénulas", ox: false },
  { paso: "Venas", ox: false },
  { paso: "Venas cavas", ox: false },
  { paso: "Aurícula derecha", ox: false },
];

export const vasosImportantes = [
  { nombre: "Aorta", desc: "Principal arteria del cuerpo. Sale del corazón (VI) y distribuye sangre oxigenada a todo el organismo.", tipo: "ox" },
  { nombre: "Arterias pulmonares", desc: "Llevan sangre desoxigenada desde el corazón (VD) hacia los pulmones. ⚠️ Excepción.", tipo: "desox" },
  { nombre: "Venas pulmonares", desc: "Llevan sangre oxigenada desde los pulmones hasta el corazón (AI). ⚠️ Excepción.", tipo: "ox" },
  { nombre: "Venas cavas", desc: "Devuelven la sangre desoxigenada al corazón (AD). Hay vena cava superior e inferior.", tipo: "desox" },
  { nombre: "Vena yugular", desc: "Transporta / drena la sangre de la cabeza y el cuello.", tipo: "desox" },
  { nombre: "Vena safena", desc: "Vena superficial de la pierna.", tipo: "desox" },
];

export type Pregunta = {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
};

export const preguntas: Pregunta[] = [
  {
    pregunta: "¿Cuál es la función principal del sistema circulatorio?",
    opciones: ["Producir hormonas", "Transportar sustancias por todo el cuerpo", "Digerir los alimentos", "Filtrar el aire"],
    correcta: 1,
    explicacion: "Transporta oxígeno, nutrientes, hormonas y desechos metabólicos por todo el cuerpo.",
  },
  {
    pregunta: "¿Cuál es la parte líquida de la sangre?",
    opciones: ["Hemoglobina", "Fibrina", "Plasma", "Linfa"],
    correcta: 2,
    explicacion: "El plasma es la parte líquida y permite transportar diferentes sustancias.",
  },
  {
    pregunta: "¿Qué proteína les da el color rojo a los glóbulos rojos y transporta oxígeno?",
    opciones: ["Fibrina", "Hemoglobina", "Anticuerpo", "Antígeno"],
    correcta: 1,
    explicacion: "La hemoglobina da el color rojo y permite transportar oxígeno.",
  },
  {
    pregunta: "¿Qué glóbulo blanco se asocia con los parásitos?",
    opciones: ["Neutrófilos", "Basófilos", "Eosinófilos", "Monocitos"],
    correcta: 2,
    explicacion: "Eosinófilos → parásitos. Neutrófilos → bacterias. Basófilos → alergias.",
  },
  {
    pregunta: "¿Qué glóbulos blancos reconocen antígenos y producen anticuerpos?",
    opciones: ["Linfocitos", "Monocitos", "Neutrófilos", "Plaquetas"],
    correcta: 0,
    explicacion: "Los linfocitos reconocen antígenos y producen anticuerpos.",
  },
  {
    pregunta: "¿En qué se convierten los monocitos?",
    opciones: ["En plaquetas", "En macrófagos", "En glóbulos rojos", "En anticuerpos"],
    correcta: 1,
    explicacion: "Monocitos → se convierten en macrófagos.",
  },
  {
    pregunta: "¿A qué proteína se unen las plaquetas para formar el coágulo?",
    opciones: ["Hemoglobina", "Colágeno", "Fibrina", "Plasma"],
    correcta: 2,
    explicacion: "Las plaquetas se unen a la fibrina, forman el coágulo y detienen el sangrado (coagulación).",
  },
  {
    pregunta: "¿Qué vasos llevan la sangre DESDE el corazón hacia el cuerpo?",
    opciones: ["Venas", "Capilares", "Arterias", "Vénulas"],
    correcta: 2,
    explicacion: "Las arterias salen del corazón; las venas vuelven al corazón.",
  },
  {
    pregunta: "¿Cuál es la excepción: una arteria que lleva sangre DESOXIGENADA?",
    opciones: ["Aorta", "Arteria pulmonar", "Arteria carótida", "Arteria femoral"],
    correcta: 1,
    explicacion: "La arteria pulmonar lleva sangre desoxigenada del corazón a los pulmones.",
  },
  {
    pregunta: "¿Cuál es la excepción: venas que llevan sangre OXIGENADA?",
    opciones: ["Venas cavas", "Vena yugular", "Vena safena", "Venas pulmonares"],
    correcta: 3,
    explicacion: "Las venas pulmonares llevan sangre oxigenada de los pulmones al corazón.",
  },
  {
    pregunta: "¿Dónde se produce el intercambio de sustancias entre la sangre y los tejidos?",
    opciones: ["En las arterias", "En las venas", "En los capilares", "En el corazón"],
    correcta: 2,
    explicacion: "Los capilares permiten el intercambio de gases, nutrientes, hormonas y desechos.",
  },
  {
    pregunta: "¿Qué característica tienen algunas venas para impedir que la sangre retroceda?",
    opciones: ["Paredes gruesas", "Válvulas", "Mayor presión", "Paredes musculares"],
    correcta: 1,
    explicacion: "Algunas venas poseen válvulas que evitan el retroceso de la sangre.",
  },
  {
    pregunta: "¿Qué cavidad del corazón envía sangre a todo el cuerpo por la aorta?",
    opciones: ["Aurícula derecha", "Ventrículo derecho", "Aurícula izquierda", "Ventrículo izquierdo"],
    correcta: 3,
    explicacion: "El ventrículo izquierdo (VI) envía la sangre hacia todo el cuerpo mediante la aorta.",
  },
  {
    pregunta: "¿Qué cavidad recibe la sangre oxigenada que viene de los pulmones?",
    opciones: ["Aurícula izquierda", "Aurícula derecha", "Ventrículo derecho", "Ventrículo izquierdo"],
    correcta: 0,
    explicacion: "La aurícula izquierda (AI) recibe sangre oxigenada por las venas pulmonares.",
  },
  {
    pregunta: "¿Entre qué cavidades está la válvula tricúspide?",
    opciones: ["AI y VI", "AD y VD", "VD y arteria pulmonar", "VI y aorta"],
    correcta: 1,
    explicacion: "Tricúspide: entre aurícula derecha y ventrículo derecho. Mitral: entre AI y VI.",
  },
  {
    pregunta: "¿Dónde empieza la circulación pulmonar?",
    opciones: ["Ventrículo izquierdo", "Aurícula derecha", "Ventrículo derecho", "Aurícula izquierda"],
    correcta: 2,
    explicacion: "VD → arteria pulmonar → pulmones → venas pulmonares → AI.",
  },
  {
    pregunta: "¿Qué pasa con la sangre en los pulmones?",
    opciones: ["Elimina O₂ e incorpora CO₂", "Elimina CO₂ e incorpora O₂", "Pierde plasma", "Gana nutrientes"],
    correcta: 1,
    explicacion: "Intercambio gaseoso: la sangre elimina CO₂ e incorpora O₂.",
  },
  {
    pregunta: "¿Qué vasos devuelven la sangre desoxigenada a la aurícula derecha?",
    opciones: ["Venas pulmonares", "Aorta", "Venas cavas", "Arterias pulmonares"],
    correcta: 2,
    explicacion: "Las venas cavas (superior e inferior) devuelven la sangre a la AD.",
  },
  {
    pregunta: "¿Qué vena drena la sangre de la cabeza y el cuello?",
    opciones: ["Vena safena", "Vena cava inferior", "Vena yugular", "Vena pulmonar"],
    correcta: 2,
    explicacion: "La vena yugular transporta/drena la sangre de la cabeza y el cuello.",
  },
  {
    pregunta: "¿Cuál es el orden correcto del recorrido de los vasos?",
    opciones: [
      "Arterias → vénulas → capilares → venas",
      "Arterias → arteriolas → capilares → vénulas → venas",
      "Venas → capilares → arterias",
      "Capilares → arterias → venas",
    ],
    correcta: 1,
    explicacion: "Corazón → arterias elásticas → arterias musculares → arteriolas → capilares → vénulas → venas → venas cavas → corazón.",
  },
];

export const flashcards = [
  { frente: "Plasma", dorso: "Parte líquida de la sangre. Transporta diferentes sustancias." },
  { frente: "Glóbulos rojos", dorso: "Células más abundantes de la sangre. Transportan O₂ gracias a la hemoglobina (y parte del CO₂)." },
  { frente: "Hemoglobina", dorso: "Proteína de los glóbulos rojos. Les da el color rojo y permite transportar oxígeno." },
  { frente: "Glóbulos blancos (leucocitos)", dorso: "Células nucleadas encargadas de la defensa del cuerpo." },
  { frente: "Neutrófilos", dorso: "→ Bacterias" },
  { frente: "Eosinófilos", dorso: "→ Parásitos" },
  { frente: "Basófilos", dorso: "→ Alergias" },
  { frente: "Linfocitos", dorso: "→ Reconocen antígenos y producen anticuerpos" },
  { frente: "Monocitos", dorso: "→ Se convierten en macrófagos" },
  { frente: "Plaquetas", dorso: "Fragmentos de células. Se unen a la fibrina, forman el coágulo y detienen el sangrado (coagulación)." },
  { frente: "Arterias", dorso: "Llevan sangre DESDE el corazón. Paredes gruesas, elásticas y musculares. Soportan el pulso y la presión." },
  { frente: "Venas", dorso: "Llevan sangre HACIA el corazón. Paredes delgadas, menor presión, algunas con válvulas." },
  { frente: "Capilares", dorso: "Vasos muy pequeños. Intercambio de gases, nutrientes, hormonas y desechos entre sangre y células." },
  { frente: "Aurícula derecha (AD)", dorso: "Recibe la sangre que viene del cuerpo." },
  { frente: "Aurícula izquierda (AI)", dorso: "Recibe la sangre oxigenada que viene de los pulmones." },
  { frente: "Ventrículo derecho (VD)", dorso: "Envía la sangre a los pulmones por la arteria pulmonar." },
  { frente: "Ventrículo izquierdo (VI)", dorso: "Envía la sangre a todo el cuerpo por la arteria aorta." },
  { frente: "Válvula tricúspide", dorso: "Entre AD y VD." },
  { frente: "Válvula mitral / bicúspide", dorso: "Entre AI y VI." },
  { frente: "Circulación pulmonar", dorso: "VD → arteria pulmonar → pulmones → capilares pulmonares → venas pulmonares → AI.  🔵 → 🔴" },
  { frente: "Circulación sistémica", dorso: "VI → aorta → arterias → arteriolas → capilares → vénulas → venas → venas cavas → AD.  🔴 → 🔵" },
  { frente: "Arteria pulmonar (excepción)", dorso: "Arteria que lleva sangre DESOXIGENADA 🔵 del corazón a los pulmones." },
  { frente: "Venas pulmonares (excepción)", dorso: "Venas que llevan sangre OXIGENADA 🔴 de los pulmones al corazón." },
  { frente: "Aorta", dorso: "Principal arteria del cuerpo. Distribuye sangre oxigenada a todo el organismo." },
  { frente: "Venas cavas", dorso: "Superior e inferior. Devuelven la sangre desoxigenada al corazón (AD)." },
  { frente: "Vena yugular", dorso: "Drena la sangre de la cabeza y el cuello." },
  { frente: "Vena safena", dorso: "Vena superficial de la pierna." },
];
