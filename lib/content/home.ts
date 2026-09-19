// Full trilingual copy for the homepage + shared chrome (Navbar/Footer/Modal).
// Components read HOME[locale]; default locale is 'en' so existing pages are unaffected.
import type { SiteLocale } from '@/lib/i18n';

interface LinkItem { name: string; href: string }

export interface HomeDict {
  nav: { services: string; getStarted: string; getDemo: string; serviceLinks: LinkItem[]; actionLinks: LinkItem[] };
  hero: { line1: string; line2: string; rotating: string[]; description: string; cta: string };
  results: { eyebrow: string; line1: string; line2: string; description: string; learnMore: string; contactUs: string; statLabels: string[] };
  cta: { heading: string; description: string; startNow: string; learnMore: string };
  services: { title: string; items: { title: string; description: string }[] };
  scrollingText: string;
  build: { eyebrow: string; line1: string; line2: string; description: string; cards: { title: string; description: string; tags: string[] }[] };
  newsletter: { line1: string; line2: string; description: string; placeholder: string; book: string; sending: string; sent: string; termsPre: string; terms: string; and: string; privacy: string };
  footer: { tagline: string; services: string; legal: string; contact: string; subscribe: string; placeholder: string; serviceLinks: LinkItem[]; legalLinks: LinkItem[]; labels: { email: string; phone: string; hours: string }; hoursValue: string; rights: string };
  modal: { title: string; description: string; email: string; phone: string; optional: string; message: string; emailPh: string; phonePh: string; messagePh: string; send: string; sending: string; sentTitle: string; sentSub: string; error: string };
}

export const HOME: Record<SiteLocale, HomeDict> = {
  en: {
    nav: {
      services: 'Services', getStarted: 'Get Started', getDemo: 'get demo',
      serviceLinks: [
        { name: 'AI Call Center', href: '/services/call-center' },
        { name: 'AI Leads Generation', href: '/services/lead-generation' },
        { name: 'AI E-mail Automation', href: '/services/email-automation' },
        { name: 'AI Chatbot', href: '/services/ai-chatbot' },
      ],
      actionLinks: [
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Get A Demo', href: '/#contact' },
        { name: 'Contact Us', href: '/#contact' },
      ],
    },
    hero: {
      line1: 'Transform Your', line2: 'Business with AI',
      rotating: ['Automation Solutions', 'Leads Generation', 'Chat Bot', 'Call Center'],
      description: 'At We Automation Agency, we empower businesses of all sizes with innovative AI automation services that drive efficiency and growth. Discover how our intelligent automation solutions can streamline your operations, enhance customer engagement, and unlock new levels of productivity.',
      cta: 'get demo',
    },
    results: {
      eyebrow: 'Results', line1: 'We Drive Real Results', line2: 'For Real Businesses',
      description: 'Our AI automation solutions have helped hundreds of businesses streamline operations, boost customer engagement, and significantly increase their revenue. Here’s what our track record looks like.',
      learnMore: 'Learn More', contactUs: 'Contact Us',
      statLabels: ['Client Satisfaction', 'Projects Completed', 'Revenue Generated'],
    },
    cta: {
      heading: 'Ready to Automate Your Business?',
      description: 'Join hundreds of businesses that have transformed their operations with our AI-powered solutions. From chatbots to lead generation, we build the systems that work while you sleep.',
      startNow: 'Start Now', learnMore: 'Learn More',
    },
    services: {
      title: 'Services',
      items: [
        { title: 'AI Chatbot', description: 'Custom-built conversational AI that handles customer support, qualifies leads, and drives sales 24/7 on your website, WhatsApp, and social channels.' },
        { title: 'Lead Generation', description: 'AI-powered systems that find, qualify, and nurture your ideal customers through automated outreach, smart funnels, and data-driven targeting.' },
        { title: 'Call Center', description: 'Intelligent voice AI that answers calls, schedules appointments, and handles customer inquiries — with the quality of a human agent.' },
        { title: 'Email Automation', description: 'Smart email sequences that adapt to user behavior, delivering the right message at the right time to maximize conversions.' },
      ],
    },
    scrollingText: 'We create custom AI chatbots for ecommerce and banking, enhance lead generation through marketing automation, and deliver intelligent call center solutions for seamless customer service.',
    build: {
      eyebrow: 'What We Build', line1: 'Get Smart', line2: 'Automation',
      description: 'We deliver end-to-end AI automation solutions tailored to your business. Each system is built from scratch — no templates, no cookie-cutter approaches.',
      cards: [
        { title: 'Enterprise-Grade AI Chatbot Solutions', description: 'Custom conversational AI that handles customer support, qualifies leads, and drives sales 24/7 across your website, WhatsApp, and social channels.', tags: ['Ecommerce', 'Multilingual', 'WhatsApp', 'Lead Gen', 'Banking'] },
        { title: 'Automated Lead Generation', description: 'AI-powered systems that find, qualify, and nurture your ideal customers through automated outreach, smart funnels, and data-driven targeting.', tags: ['Marketing Automation', 'Sales', 'Email', 'Funnel', 'Custom Dev'] },
        { title: 'Intelligent Call Center', description: 'Voice AI that answers calls, schedules appointments, and handles customer inquiries with human-like quality. Includes voice analytics and sales reports.', tags: ['AI Call Center', 'Voice Analytics', 'Customer Service', 'Support'] },
        { title: 'Advanced Multimedia Solutions', description: 'AI-generated product videos, voice synthesis, brand content, and training materials at scale with visual AI technology.', tags: ['Product Videos', 'Voice Gen', 'Brand Videos', 'Training', 'Visual AI'] },
      ],
    },
    newsletter: {
      line1: 'Ready to Take Your Project', line2: 'to the Next Level?',
      description: 'Schedule a free consultation and discover solutions tailored to your needs.',
      placeholder: 'Enter your email', book: 'Book A Call', sending: 'Sending...', sent: 'Sent!',
      termsPre: 'By submitting, you agree to our', terms: 'Terms', and: 'and', privacy: 'Privacy Policy',
    },
    footer: {
      tagline: 'Empowering businesses with intelligent AI automation solutions that drive efficiency and growth.',
      services: 'Services', legal: 'Legal', contact: 'Contact', subscribe: 'Subscribe', placeholder: 'Your email',
      serviceLinks: [
        { name: 'AI Chatbot', href: '/services/ai-chatbot' },
        { name: 'Lead Generation', href: '/services/lead-generation' },
        { name: 'Call Center', href: '/services/call-center' },
        { name: 'Email Automation', href: '/services/email-automation' },
        { name: 'Portfolio', href: '/portfolio' },
      ],
      legalLinks: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
      ],
      labels: { email: 'Email', phone: 'Phone', hours: 'Hours' },
      hoursValue: 'Mon-Fri 9AM - 5PM EST',
      rights: 'All rights reserved.',
    },
    modal: {
      title: 'Get Your Demo', description: 'Tell us about your project and we’ll get back to you within 24 hours.',
      email: 'Email', phone: 'Phone', optional: '(optional)', message: 'Tell us about your project',
      emailPh: 'your@email.com', phonePh: '+1 (646) 980-2446', messagePh: 'I need help with...',
      send: 'Send Message', sending: 'Sending...', sentTitle: 'Message Sent!', sentSub: 'We’ll be in touch soon.',
      error: 'Something went wrong. Please try again.',
    },
  },

  fr: {
    nav: {
      services: 'Services', getStarted: 'Commencer', getDemo: 'demander une démo',
      serviceLinks: [
        { name: 'Centre d’appels IA', href: '/services/call-center' },
        { name: 'Génération de leads IA', href: '/services/lead-generation' },
        { name: 'Automatisation d’e-mails IA', href: '/services/email-automation' },
        { name: 'Chatbot IA', href: '/services/ai-chatbot' },
      ],
      actionLinks: [
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Demander une démo', href: '/#contact' },
        { name: 'Nous contacter', href: '/#contact' },
      ],
    },
    hero: {
      line1: 'Transformez votre', line2: 'entreprise avec l’IA',
      rotating: ['Solutions d’automatisation', 'Génération de leads', 'Chatbot', 'Centre d’appels'],
      description: 'Chez We Automation Agency, nous aidons les entreprises de toutes tailles avec des services d’automatisation par IA qui font gagner en efficacité et en croissance. Découvrez comment nos solutions intelligentes peuvent fluidifier vos opérations, renforcer l’engagement client et débloquer de nouveaux niveaux de productivité.',
      cta: 'demander une démo',
    },
    results: {
      eyebrow: 'Résultats', line1: 'De vrais résultats', line2: 'pour de vraies entreprises',
      description: 'Nos solutions d’automatisation par IA ont aidé des centaines d’entreprises à fluidifier leurs opérations, renforcer l’engagement client et augmenter nettement leur chiffre d’affaires. Voici notre bilan.',
      learnMore: 'En savoir plus', contactUs: 'Nous contacter',
      statLabels: ['Satisfaction client', 'Projets réalisés', 'Chiffre d’affaires généré'],
    },
    cta: {
      heading: 'Prêt à automatiser votre entreprise ?',
      description: 'Rejoignez des centaines d’entreprises qui ont transformé leurs opérations grâce à nos solutions IA. Des chatbots à la génération de leads, nous construisons les systèmes qui travaillent pendant que vous dormez.',
      startNow: 'Commencer', learnMore: 'En savoir plus',
    },
    services: {
      title: 'Services',
      items: [
        { title: 'Chatbot IA', description: 'Une IA conversationnelle sur mesure qui gère le support client, qualifie les prospects et génère des ventes 24h/24 sur votre site, WhatsApp et vos réseaux.' },
        { title: 'Génération de leads', description: 'Des systèmes propulsés par l’IA qui trouvent, qualifient et nourrissent vos clients idéaux via la prospection automatisée, des tunnels intelligents et un ciblage basé sur la donnée.' },
        { title: 'Centre d’appels', description: 'Une IA vocale intelligente qui répond aux appels, prend des rendez-vous et gère les demandes — avec la qualité d’un agent humain.' },
        { title: 'Automatisation d’e-mails', description: 'Des séquences d’e-mails intelligentes qui s’adaptent au comportement des utilisateurs, en délivrant le bon message au bon moment pour maximiser les conversions.' },
      ],
    },
    scrollingText: 'Nous créons des chatbots IA sur mesure pour l’e-commerce et la banque, renforçons la génération de leads via l’automatisation marketing, et livrons des centres d’appels intelligents pour un service client fluide.',
    build: {
      eyebrow: 'Ce que nous construisons', line1: 'Passez à', line2: 'l’automatisation intelligente',
      description: 'Nous livrons des solutions d’automatisation IA de bout en bout, adaptées à votre entreprise. Chaque système est construit sur mesure — pas de modèles, pas de solutions génériques.',
      cards: [
        { title: 'Chatbots IA de niveau entreprise', description: 'Une IA conversationnelle sur mesure qui gère le support, qualifie les prospects et génère des ventes 24h/24 sur votre site, WhatsApp et vos réseaux.', tags: ['E-commerce', 'Multilingue', 'WhatsApp', 'Leads', 'Banque'] },
        { title: 'Génération de leads automatisée', description: 'Des systèmes propulsés par l’IA qui trouvent, qualifient et nourrissent vos clients idéaux via la prospection automatisée, des tunnels intelligents et un ciblage basé sur la donnée.', tags: ['Automatisation marketing', 'Ventes', 'E-mail', 'Tunnel', 'Développement sur mesure'] },
        { title: 'Centre d’appels intelligent', description: 'Une IA vocale qui répond aux appels, prend des rendez-vous et gère les demandes avec une qualité proche de l’humain. Analyse vocale et rapports de ventes inclus.', tags: ['Centre d’appels IA', 'Analyse vocale', 'Service client', 'Support'] },
        { title: 'Solutions multimédias avancées', description: 'Vidéos produit générées par IA, synthèse vocale, contenus de marque et supports de formation à grande échelle grâce à l’IA visuelle.', tags: ['Vidéos produit', 'Voix IA', 'Vidéos de marque', 'Formation', 'IA visuelle'] },
      ],
    },
    newsletter: {
      line1: 'Prêt à faire passer votre projet', line2: 'au niveau supérieur ?',
      description: 'Réservez une consultation gratuite et découvrez des solutions adaptées à vos besoins.',
      placeholder: 'Entrez votre e-mail', book: 'Réserver un appel', sending: 'Envoi...', sent: 'Envoyé !',
      termsPre: 'En soumettant, vous acceptez nos', terms: 'Conditions', and: 'et notre', privacy: 'Politique de confidentialité',
    },
    footer: {
      tagline: 'Nous aidons les entreprises avec des solutions d’automatisation IA intelligentes qui font gagner en efficacité et en croissance.',
      services: 'Services', legal: 'Légal', contact: 'Contact', subscribe: 'S’abonner', placeholder: 'Votre e-mail',
      serviceLinks: [
        { name: 'Chatbot IA', href: '/services/ai-chatbot' },
        { name: 'Génération de leads', href: '/services/lead-generation' },
        { name: 'Centre d’appels', href: '/services/call-center' },
        { name: 'Automatisation d’e-mails', href: '/services/email-automation' },
        { name: 'Portfolio', href: '/portfolio' },
      ],
      legalLinks: [
        { name: 'Politique de confidentialité', href: '/privacy' },
        { name: 'Conditions d’utilisation', href: '/terms' },
        { name: 'Politique de cookies', href: '/cookies' },
      ],
      labels: { email: 'E-mail', phone: 'Téléphone', hours: 'Horaires' },
      hoursValue: 'Lun-Ven 9h - 17h (EST)',
      rights: 'Tous droits réservés.',
    },
    modal: {
      title: 'Obtenez votre démo', description: 'Parlez-nous de votre projet et nous vous répondons sous 24 heures.',
      email: 'E-mail', phone: 'Téléphone', optional: '(facultatif)', message: 'Parlez-nous de votre projet',
      emailPh: 'votre@email.com', phonePh: '+212 ...', messagePh: 'J’ai besoin d’aide pour...',
      send: 'Envoyer le message', sending: 'Envoi...', sentTitle: 'Message envoyé !', sentSub: 'Nous vous recontactons vite.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
    },
  },

  es: {
    nav: {
      services: 'Servicios', getStarted: 'Empezar', getDemo: 'pedir una demo',
      serviceLinks: [
        { name: 'Centro de llamadas IA', href: '/services/call-center' },
        { name: 'Generación de leads IA', href: '/services/lead-generation' },
        { name: 'Automatización de e-mails IA', href: '/services/email-automation' },
        { name: 'Chatbot IA', href: '/services/ai-chatbot' },
      ],
      actionLinks: [
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Pedir una demo', href: '/#contact' },
        { name: 'Contáctanos', href: '/#contact' },
      ],
    },
    hero: {
      line1: 'Transforma tu', line2: 'negocio con IA',
      rotating: ['Soluciones de automatización', 'Generación de leads', 'Chatbot', 'Centro de llamadas'],
      description: 'En We Automation Agency ayudamos a empresas de todos los tamaños con servicios de automatización con IA que impulsan la eficiencia y el crecimiento. Descubre cómo nuestras soluciones inteligentes pueden agilizar tus operaciones, mejorar la relación con tus clientes y desbloquear nuevos niveles de productividad.',
      cta: 'pedir una demo',
    },
    results: {
      eyebrow: 'Resultados', line1: 'Resultados reales', line2: 'para negocios reales',
      description: 'Nuestras soluciones de automatización con IA han ayudado a cientos de empresas a agilizar operaciones, mejorar la relación con sus clientes y aumentar notablemente sus ingresos. Este es nuestro historial.',
      learnMore: 'Saber más', contactUs: 'Contáctanos',
      statLabels: ['Satisfacción del cliente', 'Proyectos completados', 'Ingresos generados'],
    },
    cta: {
      heading: '¿Listo para automatizar tu negocio?',
      description: 'Únete a cientos de empresas que han transformado sus operaciones con nuestras soluciones de IA. De los chatbots a la generación de leads, construimos los sistemas que trabajan mientras duermes.',
      startNow: 'Empezar ya', learnMore: 'Saber más',
    },
    services: {
      title: 'Servicios',
      items: [
        { title: 'Chatbot IA', description: 'IA conversacional a medida que gestiona la atención al cliente, califica leads y genera ventas 24/7 en tu web, WhatsApp y redes sociales.' },
        { title: 'Generación de leads', description: 'Sistemas con IA que encuentran, califican y nutren a tus clientes ideales mediante prospección automatizada, embudos inteligentes y segmentación basada en datos.' },
        { title: 'Centro de llamadas', description: 'IA de voz inteligente que contesta llamadas, agenda citas y gestiona consultas — con la calidad de un agente humano.' },
        { title: 'Automatización de e-mails', description: 'Secuencias de e-mail inteligentes que se adaptan al comportamiento del usuario, enviando el mensaje correcto en el momento justo para maximizar las conversiones.' },
      ],
    },
    scrollingText: 'Creamos chatbots con IA a medida para e-commerce y banca, potenciamos la generación de leads con automatización de marketing y ofrecemos centros de llamadas inteligentes para una atención al cliente impecable.',
    build: {
      eyebrow: 'Lo que construimos', line1: 'Consigue', line2: 'automatización inteligente',
      description: 'Entregamos soluciones de automatización con IA de principio a fin, adaptadas a tu negocio. Cada sistema se construye desde cero — sin plantillas, sin soluciones genéricas.',
      cards: [
        { title: 'Chatbots con IA de nivel empresarial', description: 'IA conversacional a medida que gestiona el soporte, califica leads y genera ventas 24/7 en tu web, WhatsApp y redes.', tags: ['E-commerce', 'Multilingüe', 'WhatsApp', 'Leads', 'Banca'] },
        { title: 'Generación de leads automatizada', description: 'Sistemas con IA que encuentran, califican y nutren a tus clientes ideales mediante prospección automatizada, embudos inteligentes y segmentación por datos.', tags: ['Automatización de marketing', 'Ventas', 'E-mail', 'Embudo', 'Desarrollo a medida'] },
        { title: 'Centro de llamadas inteligente', description: 'IA de voz que contesta llamadas, agenda citas y gestiona consultas con calidad casi humana. Incluye analítica de voz e informes de ventas.', tags: ['Centro de llamadas IA', 'Analítica de voz', 'Atención al cliente', 'Soporte'] },
        { title: 'Soluciones multimedia avanzadas', description: 'Vídeos de producto generados por IA, síntesis de voz, contenido de marca y materiales de formación a escala con IA visual.', tags: ['Vídeos de producto', 'Voz IA', 'Vídeos de marca', 'Formación', 'IA visual'] },
      ],
    },
    newsletter: {
      line1: '¿Listo para llevar tu proyecto', line2: 'al siguiente nivel?',
      description: 'Agenda una consulta gratuita y descubre soluciones a la medida de tus necesidades.',
      placeholder: 'Introduce tu e-mail', book: 'Agendar una llamada', sending: 'Enviando...', sent: '¡Enviado!',
      termsPre: 'Al enviar, aceptas nuestros', terms: 'Términos', and: 'y la', privacy: 'Política de privacidad',
    },
    footer: {
      tagline: 'Ayudamos a las empresas con soluciones de automatización con IA inteligentes que impulsan la eficiencia y el crecimiento.',
      services: 'Servicios', legal: 'Legal', contact: 'Contacto', subscribe: 'Suscribirse', placeholder: 'Tu e-mail',
      serviceLinks: [
        { name: 'Chatbot IA', href: '/services/ai-chatbot' },
        { name: 'Generación de leads', href: '/services/lead-generation' },
        { name: 'Centro de llamadas', href: '/services/call-center' },
        { name: 'Automatización de e-mails', href: '/services/email-automation' },
        { name: 'Portfolio', href: '/portfolio' },
      ],
      legalLinks: [
        { name: 'Política de privacidad', href: '/privacy' },
        { name: 'Términos del servicio', href: '/terms' },
        { name: 'Política de cookies', href: '/cookies' },
      ],
      labels: { email: 'E-mail', phone: 'Teléfono', hours: 'Horario' },
      hoursValue: 'Lun-Vie 9:00 - 17:00 (EST)',
      rights: 'Todos los derechos reservados.',
    },
    modal: {
      title: 'Consigue tu demo', description: 'Cuéntanos sobre tu proyecto y te respondemos en 24 horas.',
      email: 'E-mail', phone: 'Teléfono', optional: '(opcional)', message: 'Cuéntanos sobre tu proyecto',
      emailPh: 'tu@email.com', phonePh: '+212 ...', messagePh: 'Necesito ayuda con...',
      send: 'Enviar mensaje', sending: 'Enviando...', sentTitle: '¡Mensaje enviado!', sentSub: 'Te contactaremos pronto.',
      error: 'Algo salió mal. Inténtalo de nuevo.',
    },
  },
};
