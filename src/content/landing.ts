import type { Locale } from "@/i18n/locale";

export type LandingLink = { label: string; href: string };

export type LandingCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    motto: string;
    primary: LandingLink;
    secondary: LandingLink;
    panelKicker: string;
    panelLabel: string;
    highlights: { title: string; body: string }[];
  };
  problem: {
    eyebrow: string;
    title: string;
    painTitle: string;
    pain: string;
    solutionTitle: string;
    solution: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { id: string; title: string; body: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    diagramLabel: string;
    diagramAlt: string;
    zoom: string;
    close: string;
    zoomHint: string;
    loopTitle: string;
    loopBody: string;
    selfDocTitle: string;
    selfDocBody: string;
    loop: string;
    steps: { id: string; name: string; body: string }[];
  };
  improve: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { id: string; title: string; body: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    body: string;
    motto: string;
    roles: { id: string; title: string; body: string }[];
  };
  cases: {
    eyebrow: string;
    title: string;
    note: string;
    items: { id: string; title: string; body: string }[];
  };
  closing: { title: string; body: string; cta: string };
  contact: { eyebrow: string; title: string; intro: string };
};

const es: LandingCopy = {
  meta: {
    title: "intellerX · Fábrica de software con AI",
    description:
      "Fábrica de software con AI para que tu empresa se adapte: automatizaciones, desarrollo ágil y una operación más efectiva. La calidad va primero.",
  },
  hero: {
    eyebrow: "Fábrica de software potenciada por AI",
    headline: "Tu empresa ya tiene AI. Le falta una fábrica.",
    subhead:
      "Contamos con todas las herramientas y modelos de trabajo para que tu empresa se adapte a la AI: automatizaciones, desarrollo ágil y una operación mucho más efectiva.",
    motto: "La calidad siempre está por encima de todo.",
    primary: { label: "Quiero hablar con el equipo", href: "/#contacto" },
    secondary: { label: "Ver cómo trabajamos", href: "/#proceso" },
    panelKicker: "Lo que cambia",
    panelLabel: "Tres cambios que trae la fábrica",
    highlights: [
      {
        title: "Automatizaciones",
        body: "La AI entra en el trabajo de todos los días, no en una demo que se apaga el lunes.",
      },
      {
        title: "Desarrollo ágil",
        body: "Primero se escribe qué se va a construir y cómo se acepta. Después se produce.",
      },
      {
        title: "Operación efectiva",
        body: "Tu equipo sabe qué hace la AI, qué decide una persona y cómo se sigue.",
      },
    ],
  },
  problem: {
    eyebrow: "El problema",
    title: "Probaron herramientas. La operación sigue igual.",
    painTitle: "Lo que vemos al llegar",
    pain: "Hay licencias, chats y pilotos sueltos. La gente escribe más rápido y, aun así, entregar cuesta lo mismo. Nadie dejó escrito el contexto, el costo ni el criterio de calidad. La AI quedó al lado de la empresa, no dentro.",
    solutionTitle: "Lo que armamos",
    solution:
      "Una fábrica que no improvisa. Parte de una especificación, trabaja con agentes bajo criterio de ingeniería, exige calidad antes de entregar y se mejora en cada ciclo. Te acompañamos en un camino nuevo, de cambio constante.",
  },
  benefits: {
    eyebrow: "Beneficios",
    title: "Adaptarse a la AI, con los pies en la operación.",
    intro:
      "No vendemos una lista de promesas. Dejamos una forma de trabajar que tu empresa puede sostener.",
    items: [
      {
        id: "auto",
        title: "Automatizaciones que se quedan",
        body: "Flujos reales, con una persona en los puntos que importan. Lo que se automatiza se puede explicar y se puede apagar si no sirve.",
      },
      {
        id: "agile",
        title: "Desarrollo ágil con rumbo",
        body: "El spec va primero. El equipo avanza rápido porque el alcance, lo que queda fuera y el criterio de aceptación ya están escritos.",
      },
      {
        id: "ops",
        title: "Una operación más efectiva",
        body: "Menos ida y vuelta, menos contexto perdido. Dirección y equipo miran el mismo trabajo, no dos versiones de la verdad.",
      },
      {
        id: "quality",
        title: "La calidad manda",
        body: "Nada sale porque un modelo lo dijo. Sale cuando pasa revisión, se sostiene y se puede defender.",
      },
    ],
  },
  process: {
    eyebrow: "Cómo trabajamos",
    title: "De la conversación a un ciclo que se mejora.",
    intro:
      "Este es el mapa de la fábrica: de las ideas al valor entregado, con un orquestador y personas en el medio. El Bucle de Auto-Mejora devuelve feedback, aprendizaje e innovación. La fábrica se autodocumenta y se mejora sola. Abajo, el recorrido con el que lo hacemos.",
    diagramLabel: "Fábrica de Software",
    diagramAlt:
      "Diagrama de la Fábrica de Software. El recorrido va de ideas y requerimientos a valor entregado, pasando por planeación, desarrollo, revisión de código, pruebas, despliegue y observabilidad. Un orquestador de IA coordina patrones de agentes, con personas en el medio. El Bucle de Auto-Mejora cierra el ciclo: feedback, aprendizaje e innovación.",
    zoom: "Ampliar diagrama",
    close: "Cerrar",
    zoomHint:
      "Toca el diagrama para verlo más grande. En el teléfono puedes deslizar para leer cada etapa.",
    loopTitle: "Bucle de Auto-Mejora",
    loopBody:
      "Feedback, aprendizaje e innovación vuelven al trabajo. La fábrica se mejora sola: aprende del resultado, ajusta el contexto y entra al siguiente ciclo más precisa.",
    selfDocTitle: "Se autodocumenta",
    selfDocBody:
      "Cada ciclo deja escrito lo que se decidió, lo que funcionó y lo que hay que cambiar. El siguiente paso no depende de la memoria de alguien.",
    loop: "La automejora no es el cierre: el aprendizaje vuelve al descubrimiento, al spec y al contexto del ciclo que sigue.",
    steps: [
      {
        id: "discover",
        name: "Descubrimiento",
        body: "Escuchamos el negocio, el dolor y el cambio que necesitan. Salimos con el problema bien puesto, no con una lista de herramientas.",
      },
      {
        id: "spec",
        name: "Spec (SDD)",
        body: "Spec-driven development: antes de construir queda escrito qué se hace, por qué, cómo se acepta y qué queda fuera. El spec es el contrato. Si el diseño cambia, el spec cambia en el mismo movimiento.",
      },
      {
        id: "agents",
        name: "Agentes",
        body: "Patrones agénticos con roles claros. La AI ejecuta dentro de ese marco. Arquitectos AI y seniors deciden lo que no se delega.",
      },
      {
        id: "qa",
        name: "QA calidad",
        body: "La calidad está por encima de la prisa. Hay verificación, criterio humano y el estándar de la fábrica. Si no da la talla, no sale.",
      },
      {
        id: "delivery",
        name: "Entrega",
        body: "Software listo para operar, con tu equipo en el camino. No entregamos una caja cerrada: entregamos una forma de seguir.",
      },
      {
        id: "improve",
        name: "Automejora continua",
        body: "Cada ciclo deja la fábrica más precisa: menos costo inútil, mejor contexto y specs que aprenden de lo que ya funcionó.",
      },
    ],
  },
  improve: {
    eyebrow: "Automejora",
    title: "La fábrica se documenta y se mejora sola.",
    intro:
      "El Bucle de Auto-Mejora —feedback, aprendizaje e innovación— no se queda en una reunión. Vuelve al spec, al contexto y a la operación. La fábrica se autodocumenta en ese mismo movimiento.",
    items: [
      {
        id: "loop",
        title: "Bucle de Auto-Mejora",
        body: "Feedback de lo que pasó, aprendizaje que queda escrito e innovación que entra al ciclo siguiente. Así la fábrica se mejora sola, sin empezar de cero.",
      },
      {
        id: "docs",
        title: "Autodocumentación",
        body: "Decisiones, specs y lo aprendido viven en el trabajo. Nadie tiene que reconstruir el contexto de memoria.",
      },
      {
        id: "cost",
        title: "Optimización de tokens y costos",
        body: "Cada ciclo busca decir menos y lograr lo mismo. Baja el esfuerzo de usar modelos —lo que se envía y lo que se recibe— sin recortar criterio ni calidad.",
      },
      {
        id: "context",
        title: "Mejora de contexto",
        body: "Decisiones, límites y specs se conservan. La AI no reinicia la conversación ni se contradice con lo que ya estaba acordado.",
      },
      {
        id: "sdd",
        title: "SDD",
        body: "El desarrollo sigue al spec. El código no se adelanta al acuerdo, y el acuerdo se actualiza cuando el diseño cambia.",
      },
      {
        id: "agentic",
        title: "Patrones agénticos",
        body: "Roles, handoffs y puntos de aprobación humana. La autonomía tiene borde. La responsabilidad también.",
      },
      {
        id: "workflows",
        title: "Flujos de optimización de AI",
        body: "No es un encargo suelto. Es un flujo que se observa, se ajusta y se vuelve a correr con el mismo estándar.",
      },
      {
        id: "enterprise",
        title: "AI enterprise",
        body: "La empresa adopta AI con gobierno: qué se automatiza, quién aprueba, cómo se cuida la información y cómo se sostiene en el tiempo.",
      },
    ],
  },
  team: {
    eyebrow: "El equipo",
    title: "Gente para lo cotidiano y para lo sumamente complejo.",
    body: "Contamos con expertos en ingeniería, Arquitectos AI y AI Seniors. No te dejamos solo con una herramienta. Te guiamos en un camino nuevo y de cambio constante.",
    motto: "La calidad siempre está por encima de todo.",
    roles: [
      {
        id: "eng",
        title: "Expertos en ingeniería",
        body: "Bajan el problema a un sistema que se puede operar, mantener y explicar.",
      },
      {
        id: "architects",
        title: "Arquitectos AI",
        body: "Diseñan cómo entra la AI en la empresa: límites, contexto, costo y gobierno.",
      },
      {
        id: "seniors",
        title: "AI Seniors",
        body: "Toman los desarrollos complejos y los llevan con criterio, sin atajos de calidad.",
      },
    ],
  },
  cases: {
    eyebrow: "Casos de éxito",
    title: "Sectores donde ya acompañamos el cambio.",
    note: "Contamos el tipo de trabajo, también con empresas en Estados Unidos, India y México. No publicamos nombres de clientes ni cifras.",
    items: [
      {
        id: "education",
        title: "Educación",
        body: "Ordenamos la experiencia de aprendizaje y la gestión académica. Los flujos quedan especificados para que docentes y equipos operen sin depender de un especialista en cada paso.",
      },
      {
        id: "trading",
        title: "Trading",
        body: "Ordenamos la lectura del mercado y las decisiones operativas. Lo que propone la AI queda trazado, y una persona aprueba lo que no se delega.",
      },
      {
        id: "certs",
        title: "Certificaciones",
        body: "La emisión y el seguimiento dejan de vivir en la memoria de alguien. Cada requisito queda escrito y la calidad del trámite se sostiene de un ciclo a otro.",
      },
      {
        id: "inventory",
        title: "Inventario",
        body: "Entradas, salidas y excepciones se vuelven visibles. La operación de existencias se entiende y se puede actuar a tiempo, sin perseguir planillas.",
      },
      {
        id: "taxes",
        title: "Taxes en Estados Unidos",
        body: "Acompañamos la preparación y la revisión de obligaciones fiscales en Estados Unidos. El criterio queda escrito, la revisión es humana y la información sensible se trata con cuidado.",
      },
      {
        id: "calc",
        title: "Optimización de cálculos empresariales",
        body: "Los cálculos dejan de estar repartidos en hojas sueltas. La lógica queda especificada, revisada y se puede repetir con el mismo criterio.",
      },
      {
        id: "dashboards",
        title: "Dashboards de reportes",
        body: "Los tableros cuentan la operación con claridad. Dirección y equipo miran el mismo relato y deciden sobre lo que de verdad está pasando.",
      },
      {
        id: "intl",
        title: "Estados Unidos, India y México",
        body: "El mismo modo de trabajar acompaña a empresas en esos tres países. El alcance es internacional y el criterio se adapta a cada operación.",
      },
      {
        id: "opex",
        title: "Costos operativos",
        body: "Acompañamos la reducción y la optimización del costo de operar. Menos esfuerzo repetido y una operación que se sostiene sin inflarse.",
      },
      {
        id: "cloud",
        title: "Gasto en la nube",
        body: "El gasto en la nube se minimiza cuando se revisa qué corre de más y qué no aporta. La operación queda más simple de cuidar.",
      },
      {
        id: "deps",
        title: "Dependencias y librerías",
        body: "Se eliminan dependencias y librerías que ya no hacen falta. El sistema queda más claro y más liviano, sin arrastrar lo que nadie usa.",
      },
    ],
  },
  closing: {
    title: "Si tu empresa va a trabajar con AI, que sea con un camino.",
    body: "Cuéntanos el cambio que necesitas. Respondemos con una forma de trabajar, no con una lista de herramientas.",
    cta: "Contactar a intellerX",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Conversemos",
    intro:
      "Cuéntanos el cambio que buscas. Respondemos en dos días hábiles. Tus datos se tratan según el aviso de privacidad.",
  },
};

const en: LandingCopy = {
  meta: {
    title: "intellerX · AI software factory",
    description:
      "An AI software factory that helps your company adapt: automation, agile delivery, and a more effective operation. Quality comes first.",
  },
  hero: {
    eyebrow: "AI-powered software factory",
    headline: "Your company already has AI. It needs a factory.",
    subhead:
      "We have the working models for your company to adapt to AI: automation, agile delivery, and a much more effective operation.",
    motto: "Quality always comes before everything else.",
    primary: { label: "Talk with the team", href: "/#contacto" },
    secondary: { label: "See how we work", href: "/#proceso" },
    panelKicker: "What changes",
    panelLabel: "Three shifts the factory brings",
    highlights: [
      {
        title: "Automation",
        body: "AI shows up in everyday work, not in a demo that is gone by Monday.",
      },
      {
        title: "Agile delivery",
        body: "We write what will be built and how it is accepted. Then we produce it.",
      },
      {
        title: "A sharper operation",
        body: "Your team knows what AI does, what a person decides, and how the work continues.",
      },
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "The tools arrived. The operation did not move.",
    painTitle: "What we find",
    pain: "Licenses, chats, and one-off pilots. People write faster, and delivery still costs the same. Nobody wrote down the context, the cost, or the quality bar. AI sat next to the company, not inside it.",
    solutionTitle: "What we build",
    solution:
      "A factory that does not improvise. It starts from a spec, runs agents under engineering judgment, demands quality before anything ships, and gets sharper every cycle. We walk with you through a new path of constant change.",
  },
  benefits: {
    eyebrow: "Benefits",
    title: "Adapt to AI with both feet in the operation.",
    intro: "We do not sell a list of promises. We leave a way of working your company can keep.",
    items: [
      {
        id: "auto",
        title: "Automation that stays",
        body: "Real flows, with a person at the points that matter. What gets automated can be explained, and stopped if it does not help.",
      },
      {
        id: "agile",
        title: "Agile delivery with a direction",
        body: "The spec comes first. The team moves faster because scope, exclusions, and acceptance are already written.",
      },
      {
        id: "ops",
        title: "A more effective operation",
        body: "Less back-and-forth and less lost context. Leadership and the team look at the same work.",
      },
      {
        id: "quality",
        title: "Quality leads",
        body: "Nothing ships because a model said so. It ships when it has been reviewed, holds up, and can be defended.",
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "From the first conversation to a cycle that improves.",
    intro:
      "This is the map of the factory: from ideas to value delivered, with an orchestrator and people in the middle. The Auto-Improve Loop brings back feedback, learning, and enhancement. The factory documents itself and gets better on its own. Below, the path we walk.",
    diagramLabel: "Software Factory",
    diagramAlt:
      "Software Factory diagram. The path runs from ideas and requirements to value delivery, through planning, development, code review, testing, deployment, and observability. An AI orchestrator coordinates agent patterns, with people in the middle. The Auto-Improve Loop closes the cycle: feedback, learning, and enhancement.",
    zoom: "Enlarge diagram",
    close: "Close",
    zoomHint:
      "Tap the diagram to see it larger. On a phone you can scroll sideways to read each stage.",
    loopTitle: "Auto-Improve Loop",
    loopBody:
      "Feedback, learning, and enhancement go back into the work. The factory improves on its own: it learns from the result, adjusts the context, and enters the next cycle sharper.",
    selfDocTitle: "It documents itself",
    selfDocBody:
      "Each cycle writes down what was decided, what worked, and what has to change. The next step does not depend on someone's memory.",
    loop: "Self-improvement is not the ending. What the cycle learns goes back into discovery, the spec, and the context of the next one.",
    steps: [
      {
        id: "discover",
        name: "Discovery",
        body: "We listen to the business, the pain, and the change you need. We leave with the problem clearly framed, not with a tool list.",
      },
      {
        id: "spec",
        name: "Spec (SDD)",
        body: "Spec-driven development: before we build, we write what will be done, why, how it is accepted, and what is out. The spec is the contract. If the design changes, the spec changes in the same move.",
      },
      {
        id: "agents",
        name: "Agents",
        body: "Agentic patterns with clear roles. AI executes inside that frame. AI architects and seniors decide what is not delegated.",
      },
      {
        id: "qa",
        name: "Quality QA",
        body: "Quality sits above speed. Verification, human judgment, and the factory standard. If it is not good enough, it does not ship.",
      },
      {
        id: "delivery",
        name: "Delivery",
        body: "Software ready to run, with your team on the path. We do not hand over a closed box. We hand over a way to continue.",
      },
      {
        id: "improve",
        name: "Continuous self-improvement",
        body: "Every cycle leaves the factory sharper: less wasted cost, better context, and specs that learn from what already worked.",
      },
    ],
  },
  improve: {
    eyebrow: "Self-improvement",
    title: "The factory documents itself and improves on its own.",
    intro:
      "The Auto-Improve Loop — feedback, learning, and enhancement — does not stay in a meeting. It goes back into the spec, the context, and the operation. The factory documents itself in that same move.",
    items: [
      {
        id: "loop",
        title: "Auto-Improve Loop",
        body: "Feedback on what happened, learning that gets written down, and enhancement that enters the next cycle. That is how the factory improves on its own, without starting from zero.",
      },
      {
        id: "docs",
        title: "Self-documentation",
        body: "Decisions, specs, and what was learned live in the work. Nobody has to rebuild the context from memory.",
      },
      {
        id: "cost",
        title: "Token and cost optimization",
        body: "Each cycle aims to say less and achieve the same. The effort of using models — what is sent and what comes back — goes down without cutting judgment or quality.",
      },
      {
        id: "context",
        title: "Context improvement",
        body: "Decisions, limits, and specs are kept. AI does not restart the conversation or contradict what was already agreed.",
      },
      {
        id: "sdd",
        title: "SDD",
        body: "Development follows the spec. Code does not run ahead of the agreement, and the agreement is updated when the design changes.",
      },
      {
        id: "agentic",
        title: "Agentic patterns",
        body: "Roles, handoffs, and human approval points. Autonomy has an edge. Responsibility does too.",
      },
      {
        id: "workflows",
        title: "AI optimization workflows",
        body: "Not a one-off request. A flow that is watched, adjusted, and run again to the same standard.",
      },
      {
        id: "enterprise",
        title: "Enterprise AI",
        body: "The company adopts AI with governance: what is automated, who approves, how information is cared for, and how it lasts.",
      },
    ],
  },
  team: {
    eyebrow: "The team",
    title: "People for everyday work and for deeply complex builds.",
    body: "Engineering experts, AI Architects, and AI Seniors. We do not leave you alone with a tool. We guide the company on a new path of constant change.",
    motto: "Quality always comes before everything else.",
    roles: [
      {
        id: "eng",
        title: "Engineering experts",
        body: "Turn the problem into a system that can be operated, maintained, and explained.",
      },
      {
        id: "architects",
        title: "AI Architects",
        body: "Design how AI enters the company: limits, context, cost, and governance.",
      },
      {
        id: "seniors",
        title: "AI Seniors",
        body: "Take on highly complex builds and carry them with judgment, without quality shortcuts.",
      },
    ],
  },
  cases: {
    eyebrow: "Selected work",
    title: "Sectors where we already walk the change.",
    note: "We describe the kind of work, including companies in the United States, India, and Mexico. We do not publish client names or figures.",
    items: [
      {
        id: "education",
        title: "Education",
        body: "We bring order to learning experiences and academic operations. Flows are specified so teachers and staff can run them without a specialist at every step.",
      },
      {
        id: "trading",
        title: "Trading",
        body: "We bring order to how the market is read and how operating decisions are made. What AI proposes is traceable, and a person approves what is not delegated.",
      },
      {
        id: "certs",
        title: "Certifications",
        body: "Issuance and follow-up stop living in someone's memory. Each requirement is written, and the quality of the process holds from one cycle to the next.",
      },
      {
        id: "inventory",
        title: "Inventory",
        body: "Inbound, outbound, and exceptions become visible. Stock operations can be understood and acted on in time, without chasing spreadsheets.",
      },
      {
        id: "taxes",
        title: "US taxes",
        body: "We support preparation and review of tax obligations in the United States. The criteria are written, review stays human, and sensitive information is handled with care.",
      },
      {
        id: "calc",
        title: "Business calculation optimization",
        body: "Calculations stop living across loose spreadsheets. The logic is specified, reviewed, and can be repeated with the same criteria.",
      },
      {
        id: "dashboards",
        title: "Reporting dashboards",
        body: "Boards tell the operation clearly. Leadership and the team see the same story and decide on what is actually happening.",
      },
      {
        id: "intl",
        title: "United States, India, and Mexico",
        body: "The same way of working walks with companies in those three countries. The reach is international, and the judgment adapts to each operation.",
      },
      {
        id: "opex",
        title: "Operating costs",
        body: "We help reduce and optimize the cost of running the operation. Less repeated effort, and an operation that holds without swelling.",
      },
      {
        id: "cloud",
        title: "Cloud spend",
        body: "Cloud spend is minimized by reviewing what is running without earning its place. The operation becomes simpler to care for.",
      },
      {
        id: "deps",
        title: "Dependencies and libraries",
        body: "Dependencies and libraries that are no longer needed come out. The system gets clearer and lighter, without carrying what nobody uses.",
      },
    ],
  },
  closing: {
    title: "If your company is going to work with AI, give it a path.",
    body: "Tell us the change you need. We answer with a way of working, not a tool list.",
    cta: "Contact intellerX",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    intro:
      "Tell us the change you are after. We reply within two business days. Your data is handled according to our privacy notice.",
  },
};

export function getLanding(locale: Locale): LandingCopy {
  return locale === "en" ? en : es;
}
