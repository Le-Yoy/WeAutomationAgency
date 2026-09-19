import type { SiteLocale } from '@/lib/i18n';

export interface StartDict {
  eyebrow: string;
  h1a: string; h1accent: string; h1b: string;
  sub: string;
  benefits: string[];
  form: {
    name: string; namePh: string;
    email: string; emailPh: string;
    phone: string; phonePh: string;
    source: string; sourceSelect: string; sourceOptions: string[];
    message: string; optional: string; messagePh: string;
    submit: string; sending: string;
    sentTitle: string; sentSub: string; backHome: string;
    error: string; privacyNote: string;
  };
}

export const START: Record<SiteLocale, StartDict> = {
  en: {
    eyebrow: 'Get Your Demo',
    h1a: 'Let’s automate the', h1accent: ' boring parts', h1b: ' of your business.',
    sub: 'Drop your details and we’ll show you exactly how AI can save you time and win you more customers — tailored to what you do.',
    benefits: ['A reply from our team within 24 hours', 'A custom plan built around your business — no templates', 'No commitment, no pressure, no jargon'],
    form: {
      name: 'Full name', namePh: 'Jane Doe',
      email: 'Email', emailPh: 'your@email.com',
      phone: 'Phone number', phonePh: '+1 (646) 980-2446',
      source: 'Where did you find us?', sourceSelect: 'Select an option',
      sourceOptions: ['Google Search', 'Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube', 'WhatsApp', 'Referral / Word of mouth', 'Other'],
      message: 'Anything we should know?', optional: '(optional)', messagePh: 'Tell us a bit about your business or what you need...',
      submit: 'Book My Free Demo', sending: 'Sending...',
      sentTitle: 'You’re in.', sentSub: 'Thanks for reaching out. Our team will get back to you within 24 hours.', backHome: 'Back to homepage',
      error: 'Something went wrong. Please try again.', privacyNote: 'We’ll only use your details to reach out about your demo. No spam.',
    },
  },
  fr: {
    eyebrow: 'Obtenez votre démo',
    h1a: 'Automatisons les', h1accent: ' tâches pénibles', h1b: ' de votre entreprise.',
    sub: 'Laissez vos coordonnées et on vous montre exactement comment l’IA peut vous faire gagner du temps et vous amener plus de clients — adapté à votre activité.',
    benefits: ['Une réponse de notre équipe sous 24 heures', 'Un plan sur mesure pensé pour votre entreprise — pas de modèles', 'Sans engagement, sans pression, sans jargon'],
    form: {
      name: 'Nom complet', namePh: 'Jean Dupont',
      email: 'E-mail', emailPh: 'votre@email.com',
      phone: 'Numéro de téléphone', phonePh: '+212 ...',
      source: 'Comment nous avez-vous trouvés ?', sourceSelect: 'Choisissez une option',
      sourceOptions: ['Recherche Google', 'Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube', 'WhatsApp', 'Recommandation / Bouche à oreille', 'Autre'],
      message: 'Quelque chose à nous dire ?', optional: '(facultatif)', messagePh: 'Parlez-nous un peu de votre entreprise ou de vos besoins...',
      submit: 'Réserver ma démo gratuite', sending: 'Envoi...',
      sentTitle: 'C’est noté.', sentSub: 'Merci de nous avoir contactés. Notre équipe vous répond sous 24 heures.', backHome: 'Retour à l’accueil',
      error: 'Une erreur est survenue. Veuillez réessayer.', privacyNote: 'Nous n’utilisons vos coordonnées que pour vous recontacter au sujet de votre démo. Pas de spam.',
    },
  },
  es: {
    eyebrow: 'Consigue tu demo',
    h1a: 'Automaticemos las', h1accent: ' tareas aburridas', h1b: ' de tu negocio.',
    sub: 'Déjanos tus datos y te enseñamos exactamente cómo la IA puede ahorrarte tiempo y traerte más clientes — a la medida de lo que haces.',
    benefits: ['Una respuesta de nuestro equipo en 24 horas', 'Un plan a medida pensado para tu negocio — sin plantillas', 'Sin compromiso, sin presión, sin tecnicismos'],
    form: {
      name: 'Nombre completo', namePh: 'Juan Pérez',
      email: 'E-mail', emailPh: 'tu@email.com',
      phone: 'Número de teléfono', phonePh: '+212 ...',
      source: '¿Cómo nos encontraste?', sourceSelect: 'Elige una opción',
      sourceOptions: ['Búsqueda de Google', 'Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube', 'WhatsApp', 'Recomendación / Boca a boca', 'Otro'],
      message: '¿Algo que debamos saber?', optional: '(opcional)', messagePh: 'Cuéntanos un poco sobre tu negocio o lo que necesitas...',
      submit: 'Reservar mi demo gratis', sending: 'Enviando...',
      sentTitle: 'Listo.', sentSub: 'Gracias por escribirnos. Nuestro equipo te responderá en 24 horas.', backHome: 'Volver al inicio',
      error: 'Algo salió mal. Inténtalo de nuevo.', privacyNote: 'Solo usaremos tus datos para contactarte sobre tu demo. Sin spam.',
    },
  },
};
