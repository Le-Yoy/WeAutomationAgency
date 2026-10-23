import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';

// Spanish-only landing page targeting "agencia ia" (880/mo ES, KD 0), "automatización con ia" (260, KD 0),
// "agencia de inteligencia artificial" (320). Neutral Spanish for Spain + Latin America. Native ES, no EN/FR twin.
export const dynamicParams = false;

const PATH = '/es/agencia-ia';
const TITLE = 'Agencia IA de automatización para empresas | WeAutomation';
const DESCRIPTION =
  'Agencia IA de automatización: chatbots de WhatsApp y web, agentes de voz, captación de leads y CRM. Automatizamos tus tareas repetitivas con IA. Demo gratis.';

export function generateStaticParams() {
  return [{ locale: 'es' }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (params.locale !== 'es') return {};
  return {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: PATH },
    openGraph: { title: TITLE, description: DESCRIPTION, url: `https://weautomationagency.com${PATH}`, type: 'website', locale: 'es_ES' },
    robots: { index: true, follow: true },
  };
}

const FAQ: { q: string; a: string }[] = [
  {
    q: '¿Qué hace una agencia IA de automatización?',
    a: 'Conecta las herramientas de tu empresa (tienda online, CRM, WhatsApp, e-mail, agenda) y les añade inteligencia artificial para que las tareas repetitivas se hagan solas: responder a clientes, confirmar pedidos, hacer seguimiento a prospectos, contestar llamadas o actualizar tus archivos. Tú mantienes el control; nosotros lo construimos y lo mantenemos.',
  },
  {
    q: '¿Cuánto cuesta automatizar con IA?',
    a: 'Depende de cuántas herramientas haya que conectar y del volumen. Un escenario sencillo se mide en horas de trabajo; un chatbot de WhatsApp conectado a tus sistemas, en días. Te damos un presupuesto claro y gratis después de una primera conversación. Para hacerte una idea, nuestros artículos detallan lo que cuesta un chatbot con IA y un chatbot de WhatsApp.',
  },
  {
    q: '¿Cuánto tarda en estar lista una automatización?',
    a: 'Un chatbot sencillo puede estar en marcha en 24 a 48 horas. Un proyecto conectado a varias herramientas (WhatsApp Business, CRM, agenda) suele llevar de 1 a 2 semanas con las pruebas incluidas. Las validaciones de Meta para WhatsApp pueden sumar algunos días.',
  },
  {
    q: '¿Trabajan con Make o con n8n?',
    a: 'Con los dos. Make es nuestra opción por defecto: rápido de entregar, fácil de mantener y fácil de explicar. Usamos n8n o código a medida cuando hay mucho volumen, flujos muy largos o datos que deben quedarse en tus servidores. Lo explicamos en detalle en nuestra comparativa n8n vs Make.',
  },
  {
    q: '¿Trabajan con empresas de España y de Latinoamérica?',
    a: 'Sí. Somos un equipo en remoto y trabajamos con empresas de España, México y el resto de Latinoamérica, además de Europa y Norteamérica. Los chatbots y agentes de voz que construimos funcionan en español, inglés, francés y árabe.',
  },
  {
    q: '¿Necesito conocimientos técnicos?',
    a: 'No. Nos encargamos de la puesta en marcha, las pruebas y el mantenimiento. Te mostramos cómo funciona y qué vigilar, nada más.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Agencia IA de automatización',
      serviceType: 'Automatización con IA para empresas',
      provider: { '@id': 'https://weautomationagency.com/#organization' },
      areaServed: ['ES', 'MX', 'AR', 'CO', 'CL', 'PE'],
      availableLanguage: ['es', 'en', 'fr', 'ar'],
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
  if (params.locale !== 'es') notFound();

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="px-5 sm:px-8">
        <div className="max-w-2xl mx-auto pt-28 pb-16">
          <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wide">Agencia IA</p>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight mb-6">
            Agencia IA de automatización: automatizamos lo que te hace perder tiempo
          </h1>
          <blockquote className="border-l-4 border-accent pl-5 my-8 text-neutral-800 text-lg leading-relaxed">
            <strong>En resumen:</strong> WeAutomationAgency es una agencia de automatización con IA fundada en 2022.
            Conectamos tus herramientas (tienda, WhatsApp, CRM, e-mail, agenda) y les añadimos inteligencia artificial
            para que las tareas repetitivas se hagan solas: responder a clientes, confirmar pedidos, hacer seguimiento a
            prospectos, contestar llamadas. Más de 50 clientes y proyectos. Primera conversación y presupuesto gratis.
          </blockquote>

          <p className={P}>
            Soy <Link className={A} href="/es/about">Houssam Boutaleb</Link>, fundador de WeAutomationAgency. La mayoría de
            empresas con las que trabajamos no necesitan un &quot;proyecto de IA&quot;. Necesitan que los mensajes de
            WhatsApp reciban respuesta por la noche y el fin de semana, que cada pedido se confirme y que los prospectos
            reciban seguimiento sin que nadie tenga que acordarse. Eso es exactamente lo que automatizamos.
          </p>

          <h2 className={H2}>¿Qué automatizamos para tu empresa?</h2>
          <ul className="space-y-4 mb-5 text-neutral-700 text-lg leading-relaxed list-disc pl-6">
            <li>
              <strong>Chatbots con IA en WhatsApp y en tu web</strong>: respuestas a preguntas frecuentes, reservas de
              citas y calificación de prospectos, 24/7. <Link className={A} href="/es/services/ai-chatbot">Ver el servicio de chatbot con IA</Link>.
            </li>
            <li>
              <strong>Agentes de voz con IA</strong> que contestan el teléfono, agendan citas y pasan las solicitudes a
              tu equipo. <Link className={A} href="/es/services/call-center">Ver el centro de llamadas con IA</Link>.
            </li>
            <li>
              <strong>Captación y seguimiento de leads</strong>: formularios, puntuación, seguimientos automáticos y CRM
              al día. <Link className={A} href="/es/services/lead-generation">Ver la captación de leads</Link>.
            </li>
            <li>
              <strong>Automatización de e-mails</strong>: secuencias que se adaptan a lo que hace cada cliente.{' '}
              <Link className={A} href="/es/services/email-automation">Ver la automatización de e-mails</Link>.
            </li>
            <li>
              <strong>Visibilidad en ChatGPT y Google</strong>: que las IA conozcan tu negocio y lo recomienden.{' '}
              <Link className={A} href="/es/services/ai-search-visibility">Ver la visibilidad en IA</Link>.
            </li>
          </ul>

          <h2 className={H2}>Un ejemplo concreto: confirmar pedidos por WhatsApp</h2>
          <p className={P}>
            Piensa en una tienda online que vende con pago contra reembolso. Cada pedido sin confirmar es un paquete que
            puede volver. El flujo que montamos:
          </p>
          <ol className="space-y-2 mb-5 text-neutral-700 text-lg leading-relaxed list-decimal pl-6">
            <li>Entra un pedido en la tienda.</li>
            <li>El cliente recibe al momento un mensaje de WhatsApp para confirmar la dirección y la franja de entrega.</li>
            <li>Su respuesta actualiza el pedido y la hoja de seguimiento.</li>
            <li>Si no responde, sale un recordatorio y después se avisa al equipo.</li>
          </ol>
          <p className={P}>
            Nadie tiene que llamar a cada cliente uno por uno, y el equipo solo se ocupa de los casos con problemas.
            Explicamos los costes de este tipo de flujo (y cómo elegir la herramienta) en nuestra{' '}
            <Link className={A} href="/es/blog/n8n-vs-make">comparativa n8n vs Make</Link>.
          </p>

          <h2 className={H2}>Un caso real: nuestra máquina de captación</h2>
          <p className={P}>
            Primero la construimos para nosotros y después para clientes, entre ellos una empresa que vende productos
            digitales: segmentación en LinkedIn Sales Navigator, búsqueda y verificación del e-mail profesional, una frase
            de apertura escrita por IA para cada prospecto y envío desde buzones calentados con Instantly. Resultado:
            hasta 2.000 personas contactadas al día y alrededor de un 5,5 % de respuestas, cuando la media del mercado
            ronda el 2–3,5 %.{' '}
            <Link className={A} href="/es/blog/cold-email-automation-case-study">Leer el caso completo paso a paso</Link>.
          </p>

          <h2 className={H2}>¿Cómo es un proyecto con nosotros?</h2>
          <ol className="space-y-3 mb-5 text-neutral-700 text-lg leading-relaxed list-decimal pl-6">
            <li><strong>Una primera conversación</strong>: nos cuentas qué te hace perder tiempo.</li>
            <li><strong>Una propuesta clara</strong>: qué automatizamos, con qué herramientas, en cuánto tiempo y a qué precio.</li>
            <li><strong>La construcción</strong> sobre tus herramientas actuales, sin cambiarlo todo.</li>
            <li><strong>Las pruebas</strong> con casos reales antes de ponerlo en marcha.</li>
            <li><strong>El seguimiento</strong>: vigilamos, ajustamos y te mostramos los resultados.</li>
          </ol>

          <h2 className={H2}>¿Con qué herramientas trabajan?</h2>
          <p className={P}>
            Nuestras automatizaciones funcionan sobre todo con <strong>Make</strong> (y con <strong>n8n</strong> o código
            a medida cuando conviene), conectadas a tus herramientas: WhatsApp Business (API oficial de Meta), Google
            Sheets, CRM, tiendas online, agendas, e-mail y modelos de IA para entender y redactar las respuestas. Elegimos
            la herramienta según tu caso, no al revés. Si quieres comparar opciones por tu cuenta, aquí tienes nuestra
            selección de las{' '}
            <Link className={A} href="/es/blog/best-ai-chatbot-tools">mejores herramientas para crear un chatbot con IA</Link>.
          </p>

          <h2 className={H2}>Preguntas frecuentes</h2>
          <div className="space-y-6 mb-5">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{f.q}</h3>
                <p className="text-neutral-700 text-lg leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className={P}>
            Para saber más: <Link className={A} href="/es/blog/ai-chatbot-cost">cuánto cuesta un chatbot con IA</Link> y{' '}
            <Link className={A} href="/es/blog/whatsapp-chatbot-cost">cuánto cuesta un chatbot de WhatsApp</Link>.
          </p>

          <div className="bg-neutral-900 rounded-2xl p-8 sm:p-10 text-center mt-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">¿Qué te gustaría automatizar?</h2>
            <p className="text-neutral-300 mb-8">Cuéntanoslo en dos líneas. Te respondemos en 24 horas con una primera idea y un presupuesto gratis.</p>
            <Link href="/start" className="inline-flex items-center gap-2 bg-accent hover:bg-darker-orange text-white font-medium px-8 py-4 rounded-pill transition-colors">
              Quiero mi demo gratis
            </Link>
          </div>
        </div>
      </main>
      <Footer locale="es" />
    </div>
  );
}
