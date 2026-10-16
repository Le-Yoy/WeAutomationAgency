import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';

// French-only landing page targeting "agence automatisation ia" (written natively in FR,
// no EN/ES equivalent, so no hreflang alternates).
export const dynamicParams = false;

const PATH = '/fr/agence-automatisation-ia';
const TITLE = "Agence d'automatisation IA pour PME | WeAutomationAgency";
const DESCRIPTION =
  "Agence d'automatisation IA : chatbots WhatsApp et site, agents vocaux, relances, CRM. On automatise vos tâches répétitives avec Make et l'IA. Démo gratuite.";

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (params.locale !== 'fr') return {};
  return {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: PATH },
    openGraph: { title: TITLE, description: DESCRIPTION, url: `https://weautomationagency.com${PATH}`, type: 'website', locale: 'fr_FR' },
    robots: { index: true, follow: true },
  };
}

const FAQ: { q: string; a: string }[] = [
  {
    q: "Qu'est-ce qu'une agence d'automatisation IA ?",
    a: "C'est une équipe qui relie vos outils (boutique, CRM, WhatsApp, e-mail, agenda…) et y ajoute de l'IA pour que les tâches répétitives se fassent toutes seules : répondre aux clients, confirmer des commandes, relancer des prospects, mettre à jour vos fichiers. Vous gardez la main, on construit et on maintient.",
  },
  {
    q: "Combien coûte une automatisation ?",
    a: "Ça dépend du nombre d'outils à connecter et du volume. Un petit scénario se chiffre en heures de travail, un chatbot WhatsApp connecté à vos systèmes en jours. On vous donne un devis précis et gratuit après un premier échange. Pour vous faire une idée, nos articles détaillent le coût d'un chatbot IA et d'un chatbot WhatsApp.",
  },
  {
    q: 'Combien de temps faut-il pour mettre en place une automatisation ?',
    a: "Un chatbot simple peut être en ligne en 24 à 48 h. Un projet connecté à plusieurs outils (WhatsApp Business, CRM, agenda) prend en général 1 à 2 semaines, tests compris. Les validations côté Meta pour WhatsApp peuvent ajouter quelques jours.",
  },
  {
    q: 'Vous utilisez Make ou n8n ?',
    a: "Nous construisons nos automatisations sur Make : rapide à livrer, facile à maintenir et facile à vous expliquer. n8n peut être plus intéressant pour des scénarios très longs ou des données qui doivent rester sur vos serveurs. On en parle en détail dans notre comparatif n8n vs Make.",
  },
  {
    q: 'Faut-il des compétences techniques de mon côté ?',
    a: "Non. On s'occupe de la mise en place, des tests et de la maintenance. On vous montre simplement comment ça fonctionne et quoi surveiller.",
  },
  {
    q: 'Vous travaillez dans quelles langues ?',
    a: 'En français, en anglais et en espagnol, pour les automatisations comme pour les chatbots et les agents vocaux.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: "Agence d'automatisation IA",
      serviceType: 'Automatisation IA pour entreprises',
      provider: { '@type': 'Organization', name: 'WeAutomationAgency', url: 'https://weautomationagency.com' },
      areaServed: 'FR',
      availableLanguage: ['fr', 'en', 'es'],
      url: `https://weautomationagency.com${PATH}`,
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

const H2 = 'text-2xl sm:text-3xl font-bold text-neutral-900 mt-14 mb-5';
const P = 'text-neutral-700 text-lg leading-relaxed mb-5';
const A = 'text-accent hover:text-darker-orange underline underline-offset-4';

export default function Page({ params }: { params: { locale: string } }) {
  if (params.locale !== 'fr') notFound();

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="px-5 sm:px-8">
        <div className="max-w-2xl mx-auto pt-28 pb-16">
          <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wide">Agence d&apos;automatisation IA</p>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight mb-6">
            Agence d&apos;automatisation IA : on automatise ce qui vous fait perdre du temps
          </h1>
          <blockquote className="border-l-4 border-accent pl-5 my-8 text-neutral-800 text-lg leading-relaxed">
            <strong>En bref :</strong> WeAutomationAgency est une agence d&apos;automatisation IA. On connecte vos outils
            (boutique, WhatsApp, CRM, e-mail, agenda) et on y ajoute de l&apos;IA pour que les tâches répétitives se
            fassent toutes seules : répondre aux clients, confirmer les commandes, relancer les prospects, prendre les
            appels. On construit, on teste et on maintient. Premier échange et devis gratuits.
          </blockquote>

          <p className={P}>
            Je suis Houssam Boutaleb, fondateur de WeAutomationAgency. La plupart des entreprises qu&apos;on accompagne
            n&apos;ont pas besoin d&apos;un « projet IA ». Elles ont besoin que les messages WhatsApp reçoivent une réponse
            le soir et le week-end, que chaque commande soit confirmée, que les prospects soient relancés sans que
            quelqu&apos;un y pense. C&apos;est exactement ce qu&apos;on automatise.
          </p>

          <h2 className={H2}>Qu&apos;est-ce qu&apos;on automatise pour vous ?</h2>
          <ul className="space-y-4 mb-5 text-neutral-700 text-lg leading-relaxed list-disc pl-6">
            <li>
              <strong>Chatbots IA sur WhatsApp et sur votre site</strong> : réponses aux questions fréquentes, prise de
              rendez-vous, qualification des prospects, 24 h/24. <Link className={A} href="/fr/services/ai-chatbot">Voir le service chatbot IA</Link>.
            </li>
            <li>
              <strong>Agents vocaux IA</strong> qui répondent au téléphone, prennent les rendez-vous et transmettent les
              demandes. <Link className={A} href="/fr/services/call-center">Voir le centre d&apos;appels IA</Link>.
            </li>
            <li>
              <strong>Génération et relance de prospects</strong> : formulaires, scoring, relances automatiques, CRM à
              jour. <Link className={A} href="/fr/services/lead-generation">Voir la génération de leads</Link>.
            </li>
            <li>
              <strong>Automatisation des e-mails</strong> : séquences qui s&apos;adaptent à ce que fait le client.{' '}
              <Link className={A} href="/fr/services/email-automation">Voir l&apos;automatisation e-mail</Link>.
            </li>
            <li>
              <strong>Visibilité dans ChatGPT et Google</strong> : faire en sorte que les IA vous connaissent et vous
              citent. <Link className={A} href="/fr/services/ai-search-visibility">Voir la visibilité IA</Link>.
            </li>
          </ul>

          <h2 className={H2}>Un exemple concret : la confirmation de commande sur WhatsApp</h2>
          <p className={P}>
            Prenons une boutique en ligne qui vend avec paiement à la livraison. Chaque commande non confirmée, c&apos;est
            un colis qui risque de revenir. Le scénario qu&apos;on met en place :
          </p>
          <ol className="space-y-2 mb-5 text-neutral-700 text-lg leading-relaxed list-decimal pl-6">
            <li>Une commande arrive dans la boutique.</li>
            <li>Le client reçoit tout de suite un message WhatsApp pour confirmer (adresse, créneau).</li>
            <li>Sa réponse met à jour la commande et le fichier de suivi.</li>
            <li>S&apos;il ne répond pas, une relance part, puis l&apos;équipe est prévenue.</li>
          </ol>
          <p className={P}>
            Personne n&apos;a à appeler chaque client un par un, et l&apos;équipe ne s&apos;occupe que des cas qui posent
            problème. On détaille les coûts de ce type de scénario (et le choix de l&apos;outil) dans notre{' '}
            <Link className={A} href="/fr/blog/n8n-vs-make">comparatif n8n vs Make</Link>.
          </p>

          <h2 className={H2}>Comment se passe un projet avec nous ?</h2>
          <ol className="space-y-3 mb-5 text-neutral-700 text-lg leading-relaxed list-decimal pl-6">
            <li><strong>Un premier échange</strong> : vous nous expliquez ce qui vous fait perdre du temps.</li>
            <li><strong>Une proposition claire</strong> : ce qu&apos;on automatise, avec quels outils, en combien de temps, à quel prix.</li>
            <li><strong>La construction</strong> sur vos outils existants, sans tout changer.</li>
            <li><strong>Les tests</strong> avec de vrais cas avant la mise en ligne.</li>
            <li><strong>Le suivi</strong> : on surveille, on ajuste, on vous montre les résultats.</li>
          </ol>

          <h2 className={H2}>Avec quels outils travaillez-vous ?</h2>
          <p className={P}>
            Nos automatisations tournent sur <strong>Make</strong>, connecté à vos outils : WhatsApp Business (API
            officielle de Meta), Google Sheets, CRM, boutiques en ligne, agendas, e-mail, et des modèles d&apos;IA pour
            comprendre et rédiger les réponses. On choisit l&apos;outil selon votre cas, pas l&apos;inverse. Si vous voulez
            comparer les solutions vous-même, voici notre sélection des{' '}
            <Link className={A} href="/fr/blog/best-ai-chatbot-tools">meilleurs outils pour créer un chatbot IA</Link>.
          </p>

          <h2 className={H2}>Questions fréquentes</h2>
          <div className="space-y-6 mb-5">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{f.q}</h3>
                <p className="text-neutral-700 text-lg leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className={P}>
            Pour aller plus loin : <Link className={A} href="/fr/blog/ai-chatbot-cost">combien coûte un chatbot IA</Link> et{' '}
            <Link className={A} href="/fr/blog/whatsapp-chatbot-cost">combien coûte un chatbot WhatsApp</Link>.
          </p>

          <div className="bg-neutral-900 rounded-2xl p-8 sm:p-10 text-center mt-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Qu&apos;est-ce que vous aimeriez automatiser ?</h2>
            <p className="text-neutral-300 mb-8">Dites-le-nous en deux lignes. On vous répond sous 24 h avec une première idée et un devis gratuit.</p>
            <Link href="/start" className="inline-flex items-center gap-2 bg-accent hover:bg-darker-orange text-white font-medium px-8 py-4 rounded-pill transition-colors">
              Obtenir ma démo gratuite
            </Link>
          </div>
        </div>
      </main>
      <Footer locale="fr" />
    </div>
  );
}
