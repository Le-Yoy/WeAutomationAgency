import type { SiteLocale } from '@/lib/i18n';

export interface ChatbotDict {
  back: string;
  hero: { h1a: string; h1b: string; sub: string; ctaPrimary: string; ctaDemo: string };
  features: { title: string; sub: string; items: { title: string; description: string; stat: string; label: string }[] };
  chat: { title1: string; title2: string; messages: { from: 'user' | 'bot'; text: string }[] };
  useCases: { title: string; sub: string; challenge: string; solution: string; results: string; items: { industry: string; problem: string; solution: string; result: string }[] };
  finalCta: { h1a: string; h1b: string; sub: string; cta: string; blogPre: string; blogGuide: string; blogMid: string; blogCost: string };
}

export const CHATBOT: Record<SiteLocale, ChatbotDict> = {
  en: {
    back: 'Back to Home',
    hero: {
      h1a: 'AI Chatbot', h1b: 'That Actually Works',
      sub: 'Custom conversational AI that handles support, qualifies leads, and drives sales across your website, WhatsApp, and social channels. Built from scratch for your business.',
      ctaPrimary: 'Get Your Custom Chatbot', ctaDemo: 'See Demo',
    },
    features: {
      title: 'Built Different', sub: 'No templates. No cookie-cutter solutions. Every chatbot is custom-built for your exact needs.',
      items: [
        { title: 'Natural Conversations', description: 'AI that understands context, remembers previous interactions, and responds like a human team member.', stat: '98%', label: 'User Satisfaction' },
        { title: 'Instant Deployment', description: 'Launch across website, WhatsApp, Instagram, Messenger, and custom channels in 24-48 hours.', stat: '24/7', label: 'Always Available' },
        { title: 'Smart Learning', description: 'Continuously improves from every conversation, adapting to your business and customer needs.', stat: '10x', label: 'Faster Responses' },
        { title: 'Multilingual Support', description: 'Communicate in 95+ languages automatically, breaking down barriers with global customers.', stat: '95+', label: 'Languages' },
      ],
    },
    chat: {
      title1: 'Conversations', title2: 'That Convert',
      messages: [
        { from: 'user', text: 'Do you have this product in stock?' },
        { from: 'bot', text: 'Yes! We have 47 units available. Would you like to see similar products or place an order?' },
        { from: 'user', text: 'What are the shipping options?' },
        { from: 'bot', text: 'Free standard shipping (3-5 days) or express delivery (1-2 days) for $12. Which works better for you?' },
      ],
    },
    useCases: {
      title: 'Real Results', sub: 'See how businesses across industries use AI chatbots to scale support and increase revenue.',
      challenge: 'Challenge', solution: 'Solution', results: 'Results',
      items: [
        { industry: 'E-commerce', problem: 'Cart abandonment, product questions, order tracking', solution: 'AI guides purchases, answers product questions instantly, provides order status 24/7', result: '+32% conversion rate, -60% support tickets' },
        { industry: 'Banking', problem: 'Account inquiries, transaction disputes, loan applications', solution: 'Secure AI handles sensitive data, qualifies leads, routes complex issues to specialists', result: '85% of inquiries resolved instantly, +40% lead quality' },
        { industry: 'Healthcare', problem: 'Appointment scheduling, insurance verification, patient intake', solution: 'HIPAA-compliant AI collects information, schedules appointments, verifies coverage', result: '-70% admin time, +50% appointment bookings' },
        { industry: 'Real Estate', problem: 'Property inquiries, showing requests, lead qualification', solution: 'AI qualifies buyers, schedules tours, answers listing questions with property data', result: '+45% qualified leads, -80% response time' },
      ],
    },
    finalCta: {
      h1a: 'Ready to Automate', h1b: 'Your Conversations', sub: 'Get a custom AI chatbot built for your business. No templates, no compromises.', cta: 'Start Your Project',
      blogPre: 'New to chatbots? Read our', blogGuide: 'complete guide to AI chatbots', blogMid: 'or see', blogCost: 'how much an AI chatbot costs',
    },
  },

  fr: {
    back: 'Retour à l’accueil',
    hero: {
      h1a: 'Un chatbot IA', h1b: 'qui fonctionne vraiment',
      sub: 'Une IA conversationnelle sur mesure qui gère le support, qualifie les prospects et génère des ventes sur votre site, WhatsApp et vos réseaux. Construite de A à Z pour votre entreprise.',
      ctaPrimary: 'Obtenir mon chatbot sur mesure', ctaDemo: 'Voir la démo',
    },
    features: {
      title: 'Vraiment différent', sub: 'Pas de modèles. Pas de solutions génériques. Chaque chatbot est construit sur mesure pour vos besoins exacts.',
      items: [
        { title: 'Conversations naturelles', description: 'Une IA qui comprend le contexte, se souvient des échanges précédents et répond comme un membre de votre équipe.', stat: '98%', label: 'Satisfaction client' },
        { title: 'Déploiement immédiat', description: 'Lancé sur votre site, WhatsApp, Instagram, Messenger et vos canaux sur mesure en 24 à 48 heures.', stat: '24/7', label: 'Toujours disponible' },
        { title: 'Apprentissage intelligent', description: 'S’améliore en continu à chaque conversation, en s’adaptant à votre activité et à vos clients.', stat: '10x', label: 'Réponses plus rapides' },
        { title: 'Support multilingue', description: 'Communique automatiquement dans plus de 95 langues, pour lever les barrières avec vos clients partout dans le monde.', stat: '95+', label: 'Langues' },
      ],
    },
    chat: {
      title1: 'Des conversations', title2: 'qui convertissent',
      messages: [
        { from: 'user', text: 'Avez-vous ce produit en stock ?' },
        { from: 'bot', text: 'Oui ! Nous avons 47 unités disponibles. Voulez-vous voir des produits similaires ou passer commande ?' },
        { from: 'user', text: 'Quelles sont les options de livraison ?' },
        { from: 'bot', text: 'Livraison standard gratuite (3-5 jours) ou express (1-2 jours) pour 12 $. Que préférez-vous ?' },
      ],
    },
    useCases: {
      title: 'De vrais résultats', sub: 'Découvrez comment des entreprises de tous secteurs utilisent les chatbots IA pour développer leur support et augmenter leur chiffre d’affaires.',
      challenge: 'Problème', solution: 'Solution', results: 'Résultats',
      items: [
        { industry: 'E-commerce', problem: 'Paniers abandonnés, questions produit, suivi de commande', solution: 'L’IA guide les achats, répond instantanément aux questions produit et donne le statut des commandes 24h/24', result: '+32 % de taux de conversion, -60 % de tickets support' },
        { industry: 'Banque', problem: 'Demandes de compte, litiges de transaction, demandes de prêt', solution: 'Une IA sécurisée gère les données sensibles, qualifie les prospects et oriente les cas complexes vers des spécialistes', result: '85 % des demandes résolues instantanément, +40 % de qualité des leads' },
        { industry: 'Santé', problem: 'Prise de rendez-vous, vérification d’assurance, accueil des patients', solution: 'Une IA conforme HIPAA collecte les informations, prend les rendez-vous et vérifie la couverture', result: '-70 % de temps administratif, +50 % de rendez-vous' },
        { industry: 'Immobilier', problem: 'Demandes de biens, visites, qualification des prospects', solution: 'L’IA qualifie les acheteurs, planifie les visites et répond aux questions grâce aux données des biens', result: '+45 % de leads qualifiés, -80 % de temps de réponse' },
      ],
    },
    finalCta: {
      h1a: 'Prêt à automatiser', h1b: 'vos conversations', sub: 'Obtenez un chatbot IA construit sur mesure pour votre entreprise. Pas de modèles, pas de compromis.', cta: 'Lancer mon projet',
      blogPre: 'Nouveau dans les chatbots ? Lisez notre', blogGuide: 'guide complet des chatbots IA', blogMid: 'ou voyez', blogCost: 'combien coûte un chatbot IA',
    },
  },

  es: {
    back: 'Volver al inicio',
    hero: {
      h1a: 'Un chatbot con IA', h1b: 'que de verdad funciona',
      sub: 'IA conversacional a medida que gestiona el soporte, califica leads y genera ventas en tu web, WhatsApp y redes sociales. Construida desde cero para tu negocio.',
      ctaPrimary: 'Conseguir mi chatbot a medida', ctaDemo: 'Ver demo',
    },
    features: {
      title: 'Realmente diferente', sub: 'Sin plantillas. Sin soluciones genéricas. Cada chatbot se construye a medida para tus necesidades exactas.',
      items: [
        { title: 'Conversaciones naturales', description: 'IA que entiende el contexto, recuerda interacciones anteriores y responde como un miembro más de tu equipo.', stat: '98%', label: 'Satisfacción del cliente' },
        { title: 'Despliegue inmediato', description: 'En marcha en tu web, WhatsApp, Instagram, Messenger y canales a medida en 24-48 horas.', stat: '24/7', label: 'Siempre disponible' },
        { title: 'Aprendizaje inteligente', description: 'Mejora continuamente con cada conversación, adaptándose a tu negocio y a tus clientes.', stat: '10x', label: 'Respuestas más rápidas' },
        { title: 'Soporte multilingüe', description: 'Se comunica automáticamente en más de 95 idiomas, eliminando barreras con clientes de todo el mundo.', stat: '95+', label: 'Idiomas' },
      ],
    },
    chat: {
      title1: 'Conversaciones', title2: 'que convierten',
      messages: [
        { from: 'user', text: '¿Tenéis este producto en stock?' },
        { from: 'bot', text: '¡Sí! Tenemos 47 unidades disponibles. ¿Quieres ver productos similares o hacer un pedido?' },
        { from: 'user', text: '¿Qué opciones de envío hay?' },
        { from: 'bot', text: 'Envío estándar gratis (3-5 días) o exprés (1-2 días) por 12 $. ¿Cuál te viene mejor?' },
      ],
    },
    useCases: {
      title: 'Resultados reales', sub: 'Descubre cómo empresas de distintos sectores usan chatbots con IA para escalar el soporte y aumentar sus ingresos.',
      challenge: 'Reto', solution: 'Solución', results: 'Resultados',
      items: [
        { industry: 'E-commerce', problem: 'Carritos abandonados, dudas de producto, seguimiento de pedidos', solution: 'La IA guía las compras, responde dudas de producto al instante y da el estado del pedido 24/7', result: '+32 % de conversión, -60 % de tickets de soporte' },
        { industry: 'Banca', problem: 'Consultas de cuenta, disputas de transacciones, solicitudes de préstamo', solution: 'Una IA segura gestiona datos sensibles, califica leads y deriva los casos complejos a especialistas', result: '85 % de consultas resueltas al instante, +40 % de calidad de leads' },
        { industry: 'Salud', problem: 'Agenda de citas, verificación de seguro, admisión de pacientes', solution: 'Una IA conforme con HIPAA recoge información, agenda citas y verifica la cobertura', result: '-70 % de tiempo administrativo, +50 % de citas' },
        { industry: 'Inmobiliaria', problem: 'Consultas de propiedades, visitas, calificación de leads', solution: 'La IA califica compradores, agenda visitas y responde dudas con los datos de cada propiedad', result: '+45 % de leads cualificados, -80 % de tiempo de respuesta' },
      ],
    },
    finalCta: {
      h1a: '¿Listo para automatizar', h1b: 'tus conversaciones?', sub: 'Consigue un chatbot con IA construido a medida para tu negocio. Sin plantillas, sin concesiones.', cta: 'Empezar mi proyecto',
      blogPre: '¿Nuevo en los chatbots? Lee nuestra', blogGuide: 'guía completa de chatbots con IA', blogMid: 'o mira', blogCost: 'cuánto cuesta un chatbot con IA',
    },
  },
};
