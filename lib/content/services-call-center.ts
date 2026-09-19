import type { SiteLocale } from '@/lib/i18n';

export interface CallCenterDict {
  back: string;
  hero: { h1a: string; h1b: string; sub: string; cta: string };
  stats: { value: string; label: string; description: string }[];
  capabilities: { title: string; sub: string; items: { title: string; description: string; impact: string }[] };
  flow: { title: string; sub: string; steps: { step: string; detail: string }[] };
  industries: { title: string; items: { name: string; useCases: string[] }[] };
  finalCta: { h1a: string; h1b: string; sub: string; cta: string };
}

export const CALLCENTER: Record<SiteLocale, CallCenterDict> = {
  en: {
    back: 'Back to Home',
    hero: { h1a: 'AI Call Center', h1b: 'Human-Like Quality', sub: 'Voice AI that answers calls, schedules appointments, and handles customer inquiries with the quality of your best human agent. Includes analytics and real-time reporting.', cta: 'Try Voice AI Demo' },
    stats: [
      { value: '24/7', label: 'Availability', description: 'Never miss a call' },
      { value: '<3s', label: 'Response Time', description: 'Instant pickup' },
      { value: '95%', label: 'Call Resolution', description: 'First contact' },
      { value: '$0.08', label: 'Cost Per Call', description: 'vs $6 human agent' },
    ],
    capabilities: {
      title: 'What It Can Do', sub: 'Our voice AI handles the full spectrum of customer interactions, from simple inquiries to complex multi-step processes.',
      items: [
        { title: 'Inbound Call Handling', description: 'AI answers customer calls, understands intent, provides information, and routes complex issues to human agents.', impact: '-75% wait times' },
        { title: 'Appointment Scheduling', description: 'Automatically books appointments, sends confirmations, handles rescheduling, and syncs with your calendar.', impact: '+60% bookings' },
        { title: 'Order Status & Tracking', description: 'Provides real-time order updates, shipping information, and delivery estimates without human intervention.', impact: '-80% status inquiries' },
        { title: 'Voice Analytics', description: 'Tracks sentiment, identifies trends, analyzes conversation quality, and provides actionable insights.', impact: '100% call analysis' },
      ],
    },
    flow: {
      title: 'Smart Call Routing', sub: 'AI determines intent, handles what it can, and escalates complex issues to the right human agent.',
      steps: [
        { step: 'Call Received', detail: 'AI answers instantly, no wait time' },
        { step: 'Intent Recognition', detail: 'Understands what caller needs in 2-3 seconds' },
        { step: 'Automated Resolution', detail: '85% of calls resolved without human agent' },
        { step: 'Smart Escalation', detail: 'Complex issues routed to specialist with context' },
        { step: 'Analytics & Learning', detail: 'Every call improves the system' },
      ],
    },
    industries: {
      title: 'Built For Your Industry',
      items: [
        { name: 'Healthcare', useCases: ['Appointment scheduling', 'Insurance verification', 'Prescription refills', 'Patient intake'] },
        { name: 'E-commerce', useCases: ['Order tracking', 'Return requests', 'Product availability', 'Customer support'] },
        { name: 'Real Estate', useCases: ['Property inquiries', 'Showing schedules', 'Buyer qualification', 'Lead routing'] },
        { name: 'Professional Services', useCases: ['Consultation booking', 'Client onboarding', 'Billing questions', 'Service requests'] },
      ],
    },
    finalCta: { h1a: 'Ready to Transform', h1b: 'Your Call Center', sub: 'Launch your AI call center in 2-3 weeks. Handle unlimited calls at a fraction of the cost.', cta: 'Schedule Consultation' },
  },
  fr: {
    back: 'Retour à l’accueil',
    hero: { h1a: 'Centre d’appels IA', h1b: 'qualité quasi humaine', sub: 'Une IA vocale qui répond aux appels, prend des rendez-vous et gère les demandes clients avec la qualité de votre meilleur agent. Analyses et reporting en temps réel inclus.', cta: 'Essayer la démo vocale' },
    stats: [
      { value: '24/7', label: 'Disponibilité', description: 'Ne ratez plus un appel' },
      { value: '<3s', label: 'Temps de réponse', description: 'Décroché instantané' },
      { value: '95%', label: 'Résolution', description: 'Dès le 1er contact' },
      { value: '$0.08', label: 'Coût par appel', description: 'vs 6 $ pour un agent' },
    ],
    capabilities: {
      title: 'Ce qu’elle sait faire', sub: 'Notre IA vocale gère toute la gamme des interactions clients, des simples demandes aux processus complexes en plusieurs étapes.',
      items: [
        { title: 'Gestion des appels entrants', description: 'L’IA répond aux appels, comprend l’intention, informe et oriente les cas complexes vers des agents humains.', impact: '-75% d’attente' },
        { title: 'Prise de rendez-vous', description: 'Réserve automatiquement les rendez-vous, envoie les confirmations, gère les reports et se synchronise à votre agenda.', impact: '+60% de rendez-vous' },
        { title: 'Statut & suivi de commande', description: 'Fournit des mises à jour en temps réel, les infos de livraison et les délais estimés sans intervention humaine.', impact: '-80% de demandes de statut' },
        { title: 'Analyse vocale', description: 'Suit le sentiment, repère les tendances, analyse la qualité des conversations et fournit des insights actionnables.', impact: '100% des appels analysés' },
      ],
    },
    flow: {
      title: 'Routage intelligent des appels', sub: 'L’IA détermine l’intention, traite ce qu’elle peut et escalade les cas complexes vers le bon agent humain.',
      steps: [
        { step: 'Appel reçu', detail: 'L’IA répond instantanément, sans attente' },
        { step: 'Reconnaissance de l’intention', detail: 'Comprend le besoin de l’appelant en 2-3 secondes' },
        { step: 'Résolution automatisée', detail: '85 % des appels résolus sans agent humain' },
        { step: 'Escalade intelligente', detail: 'Les cas complexes sont routés vers un spécialiste avec le contexte' },
        { step: 'Analyse & apprentissage', detail: 'Chaque appel améliore le système' },
      ],
    },
    industries: {
      title: 'Conçu pour votre secteur',
      items: [
        { name: 'Santé', useCases: ['Prise de rendez-vous', 'Vérification d’assurance', 'Renouvellement d’ordonnances', 'Accueil des patients'] },
        { name: 'E-commerce', useCases: ['Suivi de commande', 'Demandes de retour', 'Disponibilité produit', 'Support client'] },
        { name: 'Immobilier', useCases: ['Demandes de biens', 'Planning des visites', 'Qualification des acheteurs', 'Routage des leads'] },
        { name: 'Services professionnels', useCases: ['Réservation de consultations', 'Onboarding client', 'Questions de facturation', 'Demandes de service'] },
      ],
    },
    finalCta: { h1a: 'Prêt à transformer', h1b: 'votre centre d’appels', sub: 'Lancez votre centre d’appels IA en 2-3 semaines. Gérez un nombre illimité d’appels pour une fraction du coût.', cta: 'Planifier une consultation' },
  },
  es: {
    back: 'Volver al inicio',
    hero: { h1a: 'Centro de llamadas IA', h1b: 'con calidad casi humana', sub: 'IA de voz que contesta llamadas, agenda citas y gestiona consultas con la calidad de tu mejor agente. Incluye analítica e informes en tiempo real.', cta: 'Probar la demo de voz' },
    stats: [
      { value: '24/7', label: 'Disponibilidad', description: 'No pierdas ni una llamada' },
      { value: '<3s', label: 'Tiempo de respuesta', description: 'Descuelgue instantáneo' },
      { value: '95%', label: 'Resolución', description: 'Al primer contacto' },
      { value: '$0.08', label: 'Coste por llamada', description: 'vs 6 $ de un agente' },
    ],
    capabilities: {
      title: 'Lo que puede hacer', sub: 'Nuestra IA de voz gestiona todo el espectro de interacciones con clientes, de consultas simples a procesos complejos de varios pasos.',
      items: [
        { title: 'Gestión de llamadas entrantes', description: 'La IA contesta llamadas, entiende la intención, da información y deriva los casos complejos a agentes humanos.', impact: '-75% de espera' },
        { title: 'Agenda de citas', description: 'Reserva citas automáticamente, envía confirmaciones, gestiona reprogramaciones y se sincroniza con tu agenda.', impact: '+60% de citas' },
        { title: 'Estado y seguimiento de pedidos', description: 'Da actualizaciones en tiempo real, datos de envío y plazos estimados sin intervención humana.', impact: '-80% de consultas de estado' },
        { title: 'Analítica de voz', description: 'Mide el sentimiento, detecta tendencias, analiza la calidad de las conversaciones y aporta insights accionables.', impact: '100% de llamadas analizadas' },
      ],
    },
    flow: {
      title: 'Enrutamiento inteligente de llamadas', sub: 'La IA determina la intención, resuelve lo que puede y escala los casos complejos al agente humano adecuado.',
      steps: [
        { step: 'Llamada recibida', detail: 'La IA contesta al instante, sin espera' },
        { step: 'Reconocimiento de intención', detail: 'Entiende qué necesita quien llama en 2-3 segundos' },
        { step: 'Resolución automatizada', detail: '85 % de las llamadas se resuelven sin agente humano' },
        { step: 'Escalado inteligente', detail: 'Los casos complejos se derivan a un especialista con contexto' },
        { step: 'Analítica y aprendizaje', detail: 'Cada llamada mejora el sistema' },
      ],
    },
    industries: {
      title: 'Hecho para tu sector',
      items: [
        { name: 'Salud', useCases: ['Agenda de citas', 'Verificación de seguro', 'Renovación de recetas', 'Admisión de pacientes'] },
        { name: 'E-commerce', useCases: ['Seguimiento de pedidos', 'Solicitudes de devolución', 'Disponibilidad de producto', 'Atención al cliente'] },
        { name: 'Inmobiliaria', useCases: ['Consultas de propiedades', 'Agenda de visitas', 'Cualificación de compradores', 'Enrutamiento de leads'] },
        { name: 'Servicios profesionales', useCases: ['Reserva de consultas', 'Onboarding de clientes', 'Dudas de facturación', 'Solicitudes de servicio'] },
      ],
    },
    finalCta: { h1a: '¿Listo para transformar', h1b: 'tu centro de llamadas?', sub: 'Lanza tu centro de llamadas con IA en 2-3 semanas. Gestiona llamadas ilimitadas por una fracción del coste.', cta: 'Agendar una consulta' },
  },
};
