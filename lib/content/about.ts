import type { SiteLocale } from '@/lib/i18n';

// About page copy. Real facts only (given by Houssam, 2026-10-22): founded 2022, software engineering +
// e-commerce background, automated his own work with Python and n8n long before LLMs, 3 partners,
// 50+ clients/projects, presence in France and the US, works in EN/FR/ES/AR.
type Block = { title: string; text: string; link?: { label: string; href: string } };
export type AboutDict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  answer: string;
  stats: { value: string; label: string }[];
  storyTitle: string;
  story: string[];
  founderName: string;
  founderRole: string;
  founderLinkedin: string;
  builtTitle: string;
  built: Block[];
  howTitle: string;
  how: Block[];
  whereTitle: string;
  where: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  cta: string;
};

export const ABOUT: Record<SiteLocale, AboutDict> = {
  en: {
    metaTitle: 'About WeAutomationAgency: AI Automation Since 2022',
    metaDescription:
      'Who we are: an AI automation agency founded in 2022 by Houssam Boutaleb. 50+ clients and projects, chatbots, voice agents, lead generation, in 4 languages.',
    eyebrow: 'About us',
    h1: 'We automate the work nobody should be doing by hand',
    answer:
      'WeAutomationAgency is an AI automation agency founded in 2022 by Houssam Boutaleb, a software engineer with an e-commerce background. With three partners, we have delivered 50+ client projects: AI chatbots for websites and WhatsApp, AI voice agents, automated lead generation, email automation and AI search visibility. We work remotely from France and the United States, in English, French, Spanish and Arabic.',
    stats: [
      { value: '2022', label: 'Founded' },
      { value: '50+', label: 'Clients and projects' },
      { value: '4', label: 'Languages: EN, FR, ES, AR' },
      { value: '2,000', label: 'Contacts per day on our own lead-gen pipeline' },
    ],
    storyTitle: 'How it started',
    story: [
      'I come from software engineering and e-commerce. And for as long as I can remember, I have had the same reflex: if I do something twice by hand, I look for a way to never do it a third time.',
      'Long before ChatGPT, that meant Python scripts written late at night. Cleaning order files. Syncing a store with a spreadsheet. Sending the follow-up emails nobody had time to send. When the scripts got too many, I moved some of them to n8n. AI was narrow back then, so every automation was a pile of rules and a lot of patience. But each one gave me hours back, every single week.',
      'People around me started asking how I did it. Store owners, small teams, other founders. They all had the same problem I had: capable people losing their days to copy-paste work. In 2022 I turned the habit into an agency.',
      'Then language models became good enough to read, write and decide. Suddenly the automations could answer a customer, qualify a lead or pick up the phone, not just move data around. That is the work we do today, and the reason a small business can now run like a much bigger one.',
      'WeAutomationAgency is now me and three partners, with more than 50 clients and projects behind us. We still build everything the way I built my first scripts: for real use, tested on our own business first.',
    ],
    founderName: 'Houssam Boutaleb',
    founderRole: 'Founder & CEO',
    founderLinkedin: 'https://www.linkedin.com/in/houssam-boutaleb-677a9723b',
    builtTitle: 'What we have built',
    built: [
      {
        title: 'Our own lead generation machine',
        text: 'Built on Make for our own prospecting first: LinkedIn Sales Navigator targeting, verified work emails, an opening line written by AI for each prospect, sequences and tracking. Up to 2,000 people contacted a day with a reply rate around 5.5%, when the B2B average sits around 2–3.5%.',
        link: { label: 'How the pipeline works', href: '/blog/ai-lead-generation' },
      },
      {
        title: 'The same machine, for clients',
        text: 'We then rebuilt it for clients, including a company selling digital products, and on n8n for a higher-volume project: several data sources, AI scoring of every profile, multichannel follow-ups and AI sorting of the replies.',
        link: { label: 'Our lead generation service', href: '/services/lead-generation' },
      },
      {
        title: 'Websites and e-commerce',
        text: 'Our roots: websites and online stores, built and connected to the tools behind them (orders, CRM, email, WhatsApp).',
        link: { label: 'See the portfolio', href: '/portfolio' },
      },
      {
        title: 'This website',
        text: 'Every week an AI workflow researches, writes, fact-checks and links our articles in three languages, and a human reviews the result. We also log every AI assistant that reads our pages. We test on ourselves before we sell it.',
        link: { label: 'Our AI search visibility service', href: '/services/ai-search-visibility' },
      },
    ],
    howTitle: 'How we work',
    how: [
      { title: 'Make first, code when it matters', text: 'Most automations run on Make: fast to build, easy for you to see and change. When volume, long workflows or data privacy require it, we use n8n or custom code.' },
      { title: 'You own what we build', text: 'Your accounts, your data, your automations. We document everything and stay on to maintain it if you want.' },
      { title: 'Real numbers only', text: 'Every figure we publish comes from our own work or a named source. No invented case studies, no fake reviews.' },
      { title: 'Small steps, quick proof', text: 'A free demo first, then one automation that pays for itself, then the next one.' },
    ],
    whereTitle: 'Where we work',
    where:
      'We are a remote team with a presence in France and the United States. We work with clients across Europe, North America, Latin America and North Africa, in English, French, Spanish and Arabic.',
    faqTitle: 'Quick answers',
    faq: [
      { q: 'Who founded WeAutomationAgency?', a: 'Houssam Boutaleb, a software engineer with an e-commerce background, founded the agency in 2022. He runs it with three partners.' },
      { q: 'Where is WeAutomationAgency based?', a: 'We work remotely, with a presence in France and the United States, and serve clients across Europe, North America, Latin America and North Africa.' },
      { q: 'What does WeAutomationAgency do?', a: 'We build AI automation for businesses: AI chatbots for websites and WhatsApp, AI voice agents, automated lead generation, email automation, and we help companies get cited by ChatGPT, Perplexity and Google AI.' },
      { q: 'Which languages do you work in?', a: 'English, French, Spanish and Arabic, for the projects and for the chatbots and voice agents we build.' },
    ],
    ctaTitle: 'Tell us what you want to automate',
    ctaText: 'A short form, then a free demo built around your business.',
    cta: 'Get my free demo',
  },
  fr: {
    metaTitle: "À propos : WeAutomationAgency, l'automatisation IA",
    metaDescription:
      "Qui nous sommes : une agence d'automatisation IA fondée en 2022 par Houssam Boutaleb. 50+ clients et projets : chatbots, agents vocaux, prospection.",
    eyebrow: 'À propos',
    h1: "On automatise le travail que personne ne devrait faire à la main",
    answer:
      "WeAutomationAgency est une agence d'automatisation IA fondée en 2022 par Houssam Boutaleb, ingénieur logiciel venu du e-commerce. Avec trois associés, nous avons livré plus de 50 projets clients : chatbots IA pour site et WhatsApp, agents vocaux IA, prospection automatisée, automatisation des e-mails et visibilité dans les moteurs IA. Nous travaillons à distance depuis la France et les États-Unis, en français, anglais, espagnol et arabe.",
    stats: [
      { value: '2022', label: 'Création' },
      { value: '50+', label: 'Clients et projets' },
      { value: '4', label: 'Langues : FR, EN, ES, AR' },
      { value: '2 000', label: 'Contacts par jour sur notre propre pipeline de prospection' },
    ],
    storyTitle: "Comment tout a commencé",
    story: [
      "Je viens de l'ingénierie logicielle et du e-commerce. Et depuis toujours, j'ai le même réflexe : si je fais une tâche deux fois à la main, je cherche le moyen de ne jamais la faire une troisième fois.",
      "Bien avant ChatGPT, ça voulait dire des scripts Python écrits tard le soir. Nettoyer des fichiers de commandes. Synchroniser une boutique avec un tableur. Envoyer les relances que personne n'avait le temps d'envoyer. Quand les scripts sont devenus trop nombreux, j'en ai passé une partie sur n8n. L'IA était encore très limitée, chaque automatisation était un empilement de règles et beaucoup de patience. Mais chacune me rendait des heures, chaque semaine.",
      "Autour de moi, on a commencé à me demander comment je faisais. Des e-commerçants, des petites équipes, d'autres fondateurs. Tous avaient le même problème que moi : des gens compétents qui perdaient leurs journées en copier-coller. En 2022, j'ai transformé l'habitude en agence.",
      "Puis les modèles de langage sont devenus capables de lire, d'écrire et de décider. Les automatisations pouvaient enfin répondre à un client, qualifier un prospect ou décrocher le téléphone, pas seulement déplacer des données. C'est ce qu'on fait aujourd'hui, et c'est pour ça qu'une petite entreprise peut désormais tourner comme une beaucoup plus grande.",
      "WeAutomationAgency, c'est aujourd'hui moi et trois associés, avec plus de 50 clients et projets derrière nous. On construit toujours comme j'ai construit mes premiers scripts : pour un vrai usage, testé d'abord sur notre propre activité.",
    ],
    founderName: 'Houssam Boutaleb',
    founderRole: 'Fondateur & CEO',
    founderLinkedin: 'https://www.linkedin.com/in/houssam-boutaleb-677a9723b',
    builtTitle: "Ce qu'on a construit",
    built: [
      {
        title: 'Notre propre machine de prospection',
        text: "Construite sur Make pour notre propre prospection d'abord : ciblage LinkedIn Sales Navigator, e-mails pro vérifiés, une phrase d'accroche écrite par l'IA pour chaque prospect, séquences et suivi. Jusqu'à 2 000 personnes contactées par jour avec environ 5,5 % de réponses, quand la moyenne B2B tourne autour de 2 à 3,5 %.",
        link: { label: 'Comment fonctionne le pipeline', href: '/blog/ai-lead-generation' },
      },
      {
        title: 'La même machine, pour nos clients',
        text: "On l'a ensuite reconstruite pour des clients, dont une entreprise qui vend des produits digitaux, et sur n8n pour un projet à plus gros volume : plusieurs sources de données, un score IA sur chaque profil, des relances multicanales et un tri des réponses par l'IA.",
        link: { label: 'Notre service de prospection automatisée', href: '/services/lead-generation' },
      },
      {
        title: 'Sites web et e-commerce',
        text: "Nos racines : des sites et des boutiques en ligne, construits et connectés aux outils derrière (commandes, CRM, e-mails, WhatsApp).",
        link: { label: 'Voir le portfolio', href: '/portfolio' },
      },
      {
        title: 'Ce site',
        text: "Chaque semaine, un workflow IA recherche, écrit, vérifie et relie nos articles en trois langues, et un humain relit le résultat. On enregistre aussi chaque assistant IA qui lit nos pages. On teste sur nous avant de le vendre.",
        link: { label: 'Notre service de visibilité IA', href: '/services/ai-search-visibility' },
      },
    ],
    howTitle: 'Comment on travaille',
    how: [
      { title: "Make d'abord, du code quand il le faut", text: "La plupart des automatisations tournent sur Make : rapides à construire, faciles à voir et à modifier pour vous. Quand le volume, des scénarios très longs ou la confidentialité des données l'exigent, on passe sur n8n ou du code sur mesure." },
      { title: 'Ce qu’on construit vous appartient', text: "Vos comptes, vos données, vos automatisations. On documente tout et on reste pour la maintenance si vous le souhaitez." },
      { title: 'Uniquement des vrais chiffres', text: "Chaque chiffre qu'on publie vient de notre travail ou d'une source citée. Pas d'études de cas inventées, pas de faux avis." },
      { title: 'Petits pas, preuves rapides', text: "D'abord une démo gratuite, puis une automatisation qui se rembourse vite, puis la suivante." },
    ],
    whereTitle: 'Où on travaille',
    where:
      "Nous sommes une équipe à distance, présente en France et aux États-Unis. Nous travaillons avec des clients en Europe, en Amérique du Nord, en Amérique latine et en Afrique du Nord, en français, anglais, espagnol et arabe.",
    faqTitle: 'Réponses rapides',
    faq: [
      { q: 'Qui a fondé WeAutomationAgency ?', a: "Houssam Boutaleb, ingénieur logiciel venu du e-commerce, a fondé l'agence en 2022. Il la dirige avec trois associés." },
      { q: 'Où est basée WeAutomationAgency ?', a: "Nous travaillons à distance, avec une présence en France et aux États-Unis, pour des clients en Europe, en Amérique du Nord, en Amérique latine et en Afrique du Nord." },
      { q: 'Que fait WeAutomationAgency ?', a: "Nous construisons des automatisations IA pour les entreprises : chatbots IA pour site et WhatsApp, agents vocaux IA, prospection automatisée, automatisation des e-mails, et nous aidons les entreprises à être citées par ChatGPT, Perplexity et l'IA de Google." },
      { q: 'Dans quelles langues travaillez-vous ?', a: "Français, anglais, espagnol et arabe, pour les projets comme pour les chatbots et agents vocaux que nous construisons." },
    ],
    ctaTitle: 'Dites-nous ce que vous voulez automatiser',
    ctaText: 'Un formulaire rapide, puis une démo gratuite construite autour de votre activité.',
    cta: 'Obtenir ma démo gratuite',
  },
  es: {
    metaTitle: 'Sobre WeAutomationAgency: automatización con IA desde 2022',
    metaDescription:
      'Quiénes somos: agencia de automatización con IA fundada en 2022 por Houssam Boutaleb. Más de 50 clientes y proyectos: chatbots, agentes de voz y más.',
    eyebrow: 'Sobre nosotros',
    h1: 'Automatizamos el trabajo que nadie debería hacer a mano',
    answer:
      'WeAutomationAgency es una agencia de automatización con IA fundada en 2022 por Houssam Boutaleb, ingeniero de software con experiencia en e-commerce. Con tres socios, hemos entregado más de 50 proyectos: chatbots con IA para web y WhatsApp, agentes de voz con IA, captación de leads automatizada, automatización de e-mails y visibilidad en buscadores con IA. Trabajamos en remoto desde Francia y Estados Unidos, en español, inglés, francés y árabe.',
    stats: [
      { value: '2022', label: 'Fundación' },
      { value: '50+', label: 'Clientes y proyectos' },
      { value: '4', label: 'Idiomas: ES, EN, FR, AR' },
      { value: '2.000', label: 'Contactos al día en nuestro propio sistema de captación' },
    ],
    storyTitle: 'Cómo empezó todo',
    story: [
      'Vengo de la ingeniería de software y del e-commerce. Y desde siempre tengo el mismo reflejo: si hago algo dos veces a mano, busco la forma de no hacerlo nunca una tercera.',
      'Mucho antes de ChatGPT, eso significaba scripts de Python escritos de madrugada. Limpiar archivos de pedidos. Sincronizar una tienda con una hoja de cálculo. Enviar los recordatorios que nadie tenía tiempo de enviar. Cuando los scripts se multiplicaron, pasé parte de ellos a n8n. La IA todavía era muy limitada, así que cada automatización era un montón de reglas y mucha paciencia. Pero cada una me devolvía horas, todas las semanas.',
      'La gente a mi alrededor empezó a preguntarme cómo lo hacía. Dueños de tiendas, equipos pequeños, otros fundadores. Todos tenían el mismo problema que yo: personas capaces perdiendo sus días en copiar y pegar. En 2022 convertí esa costumbre en una agencia.',
      'Luego los modelos de lenguaje empezaron a leer, escribir y decidir lo bastante bien. Las automatizaciones por fin podían responder a un cliente, calificar un lead o contestar el teléfono, no solo mover datos. Ese es el trabajo que hacemos hoy, y la razón por la que una pequeña empresa ya puede funcionar como una mucho más grande.',
      'Hoy WeAutomationAgency somos yo y tres socios, con más de 50 clientes y proyectos a nuestras espaldas. Seguimos construyendo como construí mis primeros scripts: para un uso real, probado primero en nuestro propio negocio.',
    ],
    founderName: 'Houssam Boutaleb',
    founderRole: 'Fundador y CEO',
    founderLinkedin: 'https://www.linkedin.com/in/houssam-boutaleb-677a9723b',
    builtTitle: 'Lo que hemos construido',
    built: [
      {
        title: 'Nuestra propia máquina de captación',
        text: 'Construida en Make primero para nuestra propia prospección: segmentación con LinkedIn Sales Navigator, e-mails profesionales verificados, una frase de apertura escrita por IA para cada prospecto, secuencias y seguimiento. Hasta 2.000 personas contactadas al día con una tasa de respuesta de alrededor del 5,5 %, cuando la media B2B ronda el 2–3,5 %.',
        link: { label: 'Cómo funciona el sistema', href: '/blog/ai-lead-generation' },
      },
      {
        title: 'La misma máquina, para clientes',
        text: 'Después la reconstruimos para clientes, entre ellos una empresa que vende productos digitales, y en n8n para un proyecto de mayor volumen: varias fuentes de datos, una puntuación con IA para cada perfil, seguimientos multicanal y clasificación de respuestas con IA.',
        link: { label: 'Nuestro servicio de captación de leads', href: '/services/lead-generation' },
      },
      {
        title: 'Webs y e-commerce',
        text: 'Nuestras raíces: webs y tiendas online, construidas y conectadas a las herramientas que hay detrás (pedidos, CRM, e-mail, WhatsApp).',
        link: { label: 'Ver el portfolio', href: '/portfolio' },
      },
      {
        title: 'Esta web',
        text: 'Cada semana, un flujo con IA investiga, escribe, verifica y enlaza nuestros artículos en tres idiomas, y una persona revisa el resultado. También registramos cada asistente de IA que lee nuestras páginas. Lo probamos en nosotros antes de venderlo.',
        link: { label: 'Nuestro servicio de visibilidad en IA', href: '/services/ai-search-visibility' },
      },
    ],
    howTitle: 'Cómo trabajamos',
    how: [
      { title: 'Make primero, código cuando hace falta', text: 'La mayoría de automatizaciones funcionan en Make: rápidas de construir, fáciles de ver y modificar para ti. Cuando el volumen, flujos muy largos o la privacidad de los datos lo exigen, usamos n8n o código a medida.' },
      { title: 'Lo que construimos es tuyo', text: 'Tus cuentas, tus datos, tus automatizaciones. Lo documentamos todo y seguimos con el mantenimiento si quieres.' },
      { title: 'Solo cifras reales', text: 'Cada cifra que publicamos viene de nuestro trabajo o de una fuente citada. Sin casos inventados ni reseñas falsas.' },
      { title: 'Pasos pequeños, pruebas rápidas', text: 'Primero una demo gratis, luego una automatización que se paga sola, luego la siguiente.' },
    ],
    whereTitle: 'Dónde trabajamos',
    where:
      'Somos un equipo en remoto con presencia en Francia y Estados Unidos. Trabajamos con clientes en Europa, Norteamérica, Latinoamérica y el norte de África, en español, inglés, francés y árabe.',
    faqTitle: 'Respuestas rápidas',
    faq: [
      { q: '¿Quién fundó WeAutomationAgency?', a: 'Houssam Boutaleb, ingeniero de software con experiencia en e-commerce, fundó la agencia en 2022. La dirige con tres socios.' },
      { q: '¿Dónde está WeAutomationAgency?', a: 'Trabajamos en remoto, con presencia en Francia y Estados Unidos, para clientes en Europa, Norteamérica, Latinoamérica y el norte de África.' },
      { q: '¿Qué hace WeAutomationAgency?', a: 'Construimos automatizaciones con IA para empresas: chatbots con IA para web y WhatsApp, agentes de voz con IA, captación de leads automatizada, automatización de e-mails, y ayudamos a las empresas a aparecer en ChatGPT, Perplexity y la IA de Google.' },
      { q: '¿En qué idiomas trabajan?', a: 'Español, inglés, francés y árabe, tanto en los proyectos como en los chatbots y agentes de voz que construimos.' },
    ],
    ctaTitle: 'Cuéntanos qué quieres automatizar',
    ctaText: 'Un formulario corto y después una demo gratis pensada para tu negocio.',
    cta: 'Quiero mi demo gratis',
  },
};
