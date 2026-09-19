import type { SiteLocale } from '@/lib/i18n';

export interface EmailDict {
  back: string;
  hero: { h1a: string; h1b: string; sub: string; cta: string };
  metrics: { label: string; value: string; benchmark: string }[];
  features: { title: string; sub: string; items: { title: string; description: string; metric: string; label: string }[] };
  sequences: { title: string; sub: string; emailsWord: string; avgConversion: string; goalLabel: string; items: { name: string; emails: number; duration: string; goal: string; conversion: string }[] };
  timeline: { title: string; opensLabel: string; items: { day: string; time: string; subject: string; open: string }[] };
  finalCta: { h1a: string; h1b: string; sub: string; cta: string };
}

export const EMAIL: Record<SiteLocale, EmailDict> = {
  en: {
    back: 'Back to Home',
    hero: { h1a: 'Email Automation', h1b: 'That Converts', sub: 'Smart email sequences that adapt to user behavior, delivering the right message at the right time to maximize conversions. Personalized at scale.', cta: 'Build Your Sequences' },
    metrics: [
      { label: 'Average Open Rate', value: '42%', benchmark: 'vs 18% industry avg' },
      { label: 'Click-Through Rate', value: '8.5%', benchmark: 'vs 2.6% industry avg' },
      { label: 'Revenue Per Email', value: '$2.14', benchmark: 'vs $0.38 industry avg' },
      { label: 'List Growth Rate', value: '+12%', benchmark: 'monthly compound' },
    ],
    features: {
      title: 'Intelligent Automation', sub: 'Our email systems learn from every interaction, continuously optimizing for better performance.',
      items: [
        { title: 'Behavioral Triggers', description: 'Emails sent based on user actions: cart abandonment, page visits, downloads, form submissions.', metric: '4.2x', label: 'Higher Engagement' },
        { title: 'Dynamic Personalization', description: 'Content adapts to each recipient: name, company, industry, previous interactions, preferences.', metric: '6x', label: 'Better Conversion' },
        { title: 'A/B Testing', description: 'Automatically test subject lines, content, CTAs, and send times to optimize performance.', metric: '+35%', label: 'Open Rates' },
        { title: 'Sequence Optimization', description: 'AI adjusts timing, frequency, and content based on recipient engagement patterns.', metric: '92%', label: 'Deliverability' },
      ],
    },
    sequences: {
      title: 'Pre-Built Sequences', sub: 'Start with proven templates, then customize for your business and audience.',
      emailsWord: 'emails', avgConversion: 'avg conversion', goalLabel: 'Goal',
      items: [
        { name: 'Welcome Series', emails: 5, duration: '7 days', goal: 'Onboard new subscribers', conversion: '28%' },
        { name: 'Cart Abandonment', emails: 3, duration: '3 days', goal: 'Recover lost sales', conversion: '15%' },
        { name: 'Re-engagement', emails: 4, duration: '14 days', goal: 'Win back inactive users', conversion: '12%' },
        { name: 'Lead Nurture', emails: 8, duration: '30 days', goal: 'Convert prospects to customers', conversion: '22%' },
      ],
    },
    timeline: {
      title: 'Example: Welcome Series', opensLabel: 'opens',
      items: [
        { day: 'Day 1', time: 'Immediate', subject: 'Welcome! Here’s what to expect', open: '68%' },
        { day: 'Day 2', time: '+24 hours', subject: 'Your first steps to success', open: '52%' },
        { day: 'Day 4', time: '+72 hours', subject: 'Quick question about your goals', open: '44%' },
        { day: 'Day 7', time: '+6 days', subject: 'Here’s how we can help you achieve [goal]', open: '38%' },
        { day: 'Day 14', time: '+13 days', subject: 'Special offer just for new members', open: '35%' },
      ],
    },
    finalCta: { h1a: 'Ready to Automate', h1b: 'Your Email Marketing', sub: 'Launch automated email sequences that nurture leads and drive revenue while you sleep.', cta: 'Get Your Custom Sequences' },
  },
  fr: {
    back: 'Retour à l’accueil',
    hero: { h1a: 'Automatisation d’e-mails', h1b: 'qui convertit', sub: 'Des séquences d’e-mails intelligentes qui s’adaptent au comportement des utilisateurs, en délivrant le bon message au bon moment pour maximiser les conversions. Personnalisées à grande échelle.', cta: 'Construire mes séquences' },
    metrics: [
      { label: 'Taux d’ouverture moyen', value: '42%', benchmark: 'vs 18% en moyenne' },
      { label: 'Taux de clic', value: '8,5%', benchmark: 'vs 2,6% en moyenne' },
      { label: 'Revenu par e-mail', value: '$2.14', benchmark: 'vs 0,38 $ en moyenne' },
      { label: 'Croissance de la liste', value: '+12%', benchmark: 'par mois, cumulé' },
    ],
    features: {
      title: 'Automatisation intelligente', sub: 'Nos systèmes d’e-mail apprennent de chaque interaction et optimisent en continu la performance.',
      items: [
        { title: 'Déclencheurs comportementaux', description: 'Des e-mails envoyés selon les actions : panier abandonné, visites de pages, téléchargements, formulaires.', metric: '4,2x', label: 'Plus d’engagement' },
        { title: 'Personnalisation dynamique', description: 'Le contenu s’adapte à chaque destinataire : nom, entreprise, secteur, interactions passées, préférences.', metric: '6x', label: 'Meilleure conversion' },
        { title: 'Tests A/B', description: 'Testez automatiquement objets, contenus, CTA et horaires d’envoi pour optimiser la performance.', metric: '+35%', label: 'Taux d’ouverture' },
        { title: 'Optimisation des séquences', description: 'L’IA ajuste le timing, la fréquence et le contenu selon l’engagement de chaque destinataire.', metric: '92%', label: 'Délivrabilité' },
      ],
    },
    sequences: {
      title: 'Séquences prêtes à l’emploi', sub: 'Partez de modèles éprouvés, puis personnalisez selon votre activité et votre audience.',
      emailsWord: 'e-mails', avgConversion: 'conversion moy.', goalLabel: 'Objectif',
      items: [
        { name: 'Série de bienvenue', emails: 5, duration: '7 jours', goal: 'Accueillir les nouveaux abonnés', conversion: '28%' },
        { name: 'Panier abandonné', emails: 3, duration: '3 jours', goal: 'Récupérer les ventes perdues', conversion: '15%' },
        { name: 'Réengagement', emails: 4, duration: '14 jours', goal: 'Reconquérir les inactifs', conversion: '12%' },
        { name: 'Nurturing de leads', emails: 8, duration: '30 jours', goal: 'Convertir les prospects en clients', conversion: '22%' },
      ],
    },
    timeline: {
      title: 'Exemple : série de bienvenue', opensLabel: 'ouvertures',
      items: [
        { day: 'Jour 1', time: 'Immédiat', subject: 'Bienvenue ! Voici ce qui vous attend', open: '68%' },
        { day: 'Jour 2', time: '+24 heures', subject: 'Vos premiers pas vers le succès', open: '52%' },
        { day: 'Jour 4', time: '+72 heures', subject: 'Une petite question sur vos objectifs', open: '44%' },
        { day: 'Jour 7', time: '+6 jours', subject: 'Comment on peut vous aider à atteindre [objectif]', open: '38%' },
        { day: 'Jour 14', time: '+13 jours', subject: 'Offre spéciale réservée aux nouveaux membres', open: '35%' },
      ],
    },
    finalCta: { h1a: 'Prêt à automatiser', h1b: 'votre e-mail marketing', sub: 'Lancez des séquences d’e-mails automatisées qui nourrissent vos leads et génèrent du chiffre pendant que vous dormez.', cta: 'Obtenir mes séquences sur mesure' },
  },
  es: {
    back: 'Volver al inicio',
    hero: { h1a: 'Automatización de e-mails', h1b: 'que convierte', sub: 'Secuencias de e-mail inteligentes que se adaptan al comportamiento del usuario, enviando el mensaje correcto en el momento justo para maximizar las conversiones. Personalizadas a escala.', cta: 'Construir mis secuencias' },
    metrics: [
      { label: 'Tasa de apertura media', value: '42%', benchmark: 'vs 18% de media' },
      { label: 'Tasa de clics', value: '8,5%', benchmark: 'vs 2,6% de media' },
      { label: 'Ingresos por e-mail', value: '$2.14', benchmark: 'vs 0,38 $ de media' },
      { label: 'Crecimiento de la lista', value: '+12%', benchmark: 'mensual compuesto' },
    ],
    features: {
      title: 'Automatización inteligente', sub: 'Nuestros sistemas de e-mail aprenden de cada interacción y optimizan continuamente el rendimiento.',
      items: [
        { title: 'Disparadores por comportamiento', description: 'E-mails enviados según las acciones: carrito abandonado, visitas de página, descargas, formularios.', metric: '4,2x', label: 'Más interacción' },
        { title: 'Personalización dinámica', description: 'El contenido se adapta a cada destinatario: nombre, empresa, sector, interacciones previas, preferencias.', metric: '6x', label: 'Mejor conversión' },
        { title: 'Tests A/B', description: 'Prueba automáticamente asuntos, contenidos, CTA y horas de envío para optimizar el rendimiento.', metric: '+35%', label: 'Aperturas' },
        { title: 'Optimización de secuencias', description: 'La IA ajusta el timing, la frecuencia y el contenido según la interacción de cada destinatario.', metric: '92%', label: 'Entregabilidad' },
      ],
    },
    sequences: {
      title: 'Secuencias listas para usar', sub: 'Empieza con plantillas probadas y luego personalízalas para tu negocio y tu audiencia.',
      emailsWord: 'e-mails', avgConversion: 'conversión media', goalLabel: 'Objetivo',
      items: [
        { name: 'Serie de bienvenida', emails: 5, duration: '7 días', goal: 'Dar la bienvenida a nuevos suscriptores', conversion: '28%' },
        { name: 'Carrito abandonado', emails: 3, duration: '3 días', goal: 'Recuperar ventas perdidas', conversion: '15%' },
        { name: 'Reactivación', emails: 4, duration: '14 días', goal: 'Recuperar usuarios inactivos', conversion: '12%' },
        { name: 'Nurturing de leads', emails: 8, duration: '30 días', goal: 'Convertir prospectos en clientes', conversion: '22%' },
      ],
    },
    timeline: {
      title: 'Ejemplo: serie de bienvenida', opensLabel: 'aperturas',
      items: [
        { day: 'Día 1', time: 'Inmediato', subject: '¡Bienvenido! Esto es lo que puedes esperar', open: '68%' },
        { day: 'Día 2', time: '+24 horas', subject: 'Tus primeros pasos hacia el éxito', open: '52%' },
        { day: 'Día 4', time: '+72 horas', subject: 'Una pregunta rápida sobre tus objetivos', open: '44%' },
        { day: 'Día 7', time: '+6 días', subject: 'Cómo podemos ayudarte a lograr [objetivo]', open: '38%' },
        { day: 'Día 14', time: '+13 días', subject: 'Oferta especial solo para nuevos miembros', open: '35%' },
      ],
    },
    finalCta: { h1a: '¿Listo para automatizar', h1b: 'tu e-mail marketing?', sub: 'Lanza secuencias de e-mail automatizadas que nutren leads y generan ingresos mientras duermes.', cta: 'Conseguir mis secuencias a medida' },
  },
};
