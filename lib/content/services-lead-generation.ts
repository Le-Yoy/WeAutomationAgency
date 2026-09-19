import type { SiteLocale } from '@/lib/i18n';

export interface LeadGenDict {
  back: string;
  hero: { h1a: string; h1b: string; sub: string; cta: string };
  funnel: { title: string; sub: string; stages: string[]; counts: string[]; note: string };
  strategies: { title: string; items: { title: string; description: string; metric: string; label: string }[] };
  channels: { title: string; sub: string; items: { name: string; icon: string; effectiveness: number }[] };
  finalCta: { h1a: string; h1b: string; sub: string; cta: string };
}

const COUNTS = ['10,000', '3,500', '850', '170'];
const ICONS = ['📧', '💼', '🎯', '📝', '📊', '🎥'];
const EFF = [85, 78, 92, 73, 68, 88];

export const LEADGEN: Record<SiteLocale, LeadGenDict> = {
  en: {
    back: 'Back to Home',
    hero: { h1a: 'Lead Generation', h1b: 'On Autopilot', sub: 'AI-powered systems that find, qualify, and nurture your ideal customers through automated outreach, smart funnels, and data-driven targeting.', cta: 'Build Your Pipeline' },
    funnel: {
      title: 'Turn Traffic Into Revenue', sub: 'Our systems optimize every stage of your funnel, from first touch to closed deal.',
      stages: ['Visitors', 'Engaged', 'Qualified', 'Customers'], counts: COUNTS,
      note: '1.7% conversion rate → 17 customers per 1,000 visitors',
    },
    strategies: {
      title: 'How We Generate Leads',
      items: [
        { title: 'Automated Outreach', description: 'Multi-channel campaigns across email, LinkedIn, and social media. Personalized at scale.', metric: '3x', label: 'More Leads' },
        { title: 'Smart Qualification', description: 'AI scores and prioritizes leads based on behavior, engagement, and fit.', metric: '70%', label: 'Higher Quality' },
        { title: 'Nurture Sequences', description: 'Automated workflows that adapt to each lead’s journey and engagement level.', metric: '5x', label: 'Better Conversion' },
        { title: 'Data Enrichment', description: 'Automatically find and fill missing contact info, company data, and firmographics.', metric: '90%', label: 'Data Accuracy' },
      ],
    },
    channels: {
      title: 'Multi-Channel Approach', sub: 'We deploy across every channel where your ideal customers spend time.',
      items: [
        { name: 'Email Campaigns', icon: ICONS[0], effectiveness: EFF[0] },
        { name: 'LinkedIn Outreach', icon: ICONS[1], effectiveness: EFF[1] },
        { name: 'Landing Pages', icon: ICONS[2], effectiveness: EFF[2] },
        { name: 'Content Marketing', icon: ICONS[3], effectiveness: EFF[3] },
        { name: 'Paid Ads', icon: ICONS[4], effectiveness: EFF[4] },
        { name: 'Webinars', icon: ICONS[5], effectiveness: EFF[5] },
      ],
    },
    finalCta: { h1a: 'Ready to Scale', h1b: 'Your Lead Flow', sub: 'Let us build a custom lead generation system that runs 24/7 and fills your pipeline with qualified prospects.', cta: 'Get Started Today' },
  },
  fr: {
    back: 'Retour à l’accueil',
    hero: { h1a: 'Génération de leads', h1b: 'en pilote automatique', sub: 'Des systèmes propulsés par l’IA qui trouvent, qualifient et nourrissent vos clients idéaux via la prospection automatisée, des tunnels intelligents et un ciblage basé sur la donnée.', cta: 'Construire mon pipeline' },
    funnel: {
      title: 'Transformez le trafic en chiffre d’affaires', sub: 'Nos systèmes optimisent chaque étape de votre tunnel, du premier contact à la vente conclue.',
      stages: ['Visiteurs', 'Engagés', 'Qualifiés', 'Clients'], counts: COUNTS,
      note: '1,7 % de taux de conversion → 17 clients pour 1 000 visiteurs',
    },
    strategies: {
      title: 'Comment nous générons des leads',
      items: [
        { title: 'Prospection automatisée', description: 'Des campagnes multicanales par e-mail, LinkedIn et réseaux sociaux. Personnalisées à grande échelle.', metric: '3x', label: 'Plus de leads' },
        { title: 'Qualification intelligente', description: 'L’IA note et priorise les leads selon leur comportement, leur engagement et leur adéquation.', metric: '70%', label: 'Meilleure qualité' },
        { title: 'Séquences de nurturing', description: 'Des workflows automatisés qui s’adaptent au parcours et au niveau d’engagement de chaque lead.', metric: '5x', label: 'Meilleure conversion' },
        { title: 'Enrichissement des données', description: 'Trouvez et complétez automatiquement les coordonnées, données d’entreprise et firmographies manquantes.', metric: '90%', label: 'Exactitude des données' },
      ],
    },
    channels: {
      title: 'Approche multicanale', sub: 'Nous déployons sur chaque canal où vos clients idéaux passent du temps.',
      items: [
        { name: 'Campagnes e-mail', icon: ICONS[0], effectiveness: EFF[0] },
        { name: 'Prospection LinkedIn', icon: ICONS[1], effectiveness: EFF[1] },
        { name: 'Landing pages', icon: ICONS[2], effectiveness: EFF[2] },
        { name: 'Marketing de contenu', icon: ICONS[3], effectiveness: EFF[3] },
        { name: 'Publicité payante', icon: ICONS[4], effectiveness: EFF[4] },
        { name: 'Webinaires', icon: ICONS[5], effectiveness: EFF[5] },
      ],
    },
    finalCta: { h1a: 'Prêt à faire passer', h1b: 'vos leads à l’échelle', sub: 'Laissez-nous construire un système de génération de leads sur mesure qui tourne 24h/24 et remplit votre pipeline de prospects qualifiés.', cta: 'Commencer aujourd’hui' },
  },
  es: {
    back: 'Volver al inicio',
    hero: { h1a: 'Generación de leads', h1b: 'en piloto automático', sub: 'Sistemas con IA que encuentran, califican y nutren a tus clientes ideales mediante prospección automatizada, embudos inteligentes y segmentación basada en datos.', cta: 'Construir mi pipeline' },
    funnel: {
      title: 'Convierte el tráfico en ingresos', sub: 'Nuestros sistemas optimizan cada etapa de tu embudo, del primer contacto al cierre.',
      stages: ['Visitantes', 'Interesados', 'Cualificados', 'Clientes'], counts: COUNTS,
      note: '1,7 % de conversión → 17 clientes por cada 1000 visitantes',
    },
    strategies: {
      title: 'Cómo generamos leads',
      items: [
        { title: 'Prospección automatizada', description: 'Campañas multicanal por e-mail, LinkedIn y redes sociales. Personalizadas a escala.', metric: '3x', label: 'Más leads' },
        { title: 'Cualificación inteligente', description: 'La IA puntúa y prioriza los leads según su comportamiento, interacción y encaje.', metric: '70%', label: 'Mayor calidad' },
        { title: 'Secuencias de nurturing', description: 'Flujos automatizados que se adaptan al recorrido y al nivel de interacción de cada lead.', metric: '5x', label: 'Mejor conversión' },
        { title: 'Enriquecimiento de datos', description: 'Encuentra y completa automáticamente los contactos, datos de empresa y firmografía que faltan.', metric: '90%', label: 'Precisión de datos' },
      ],
    },
    channels: {
      title: 'Enfoque multicanal', sub: 'Desplegamos en cada canal donde tus clientes ideales pasan su tiempo.',
      items: [
        { name: 'Campañas de e-mail', icon: ICONS[0], effectiveness: EFF[0] },
        { name: 'Prospección en LinkedIn', icon: ICONS[1], effectiveness: EFF[1] },
        { name: 'Landing pages', icon: ICONS[2], effectiveness: EFF[2] },
        { name: 'Marketing de contenidos', icon: ICONS[3], effectiveness: EFF[3] },
        { name: 'Publicidad de pago', icon: ICONS[4], effectiveness: EFF[4] },
        { name: 'Webinars', icon: ICONS[5], effectiveness: EFF[5] },
      ],
    },
    finalCta: { h1a: '¿Listo para escalar', h1b: 'tu flujo de leads?', sub: 'Déjanos construir un sistema de generación de leads a medida que funciona 24/7 y llena tu pipeline de prospectos cualificados.', cta: 'Empezar hoy' },
  },
};
