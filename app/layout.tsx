import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://weautomationagency.com'),
  title: 'WeAutomationAgency — AI Automation for Business Growth',
  description:
    'We build AI chatbots, automated lead generation, intelligent call centers, and multimedia solutions that drive revenue for your business.',
  keywords: [
    'AI automation',
    'chatbot',
    'lead generation',
    'call center',
    'business automation',
    'AI chatbot for ecommerce',
    'marketing automation',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'google36103d0fc821d9cf',
  },
  openGraph: {
    title: 'WeAutomationAgency — AI Automation for Business Growth',
    description: 'Transform your business with AI automation solutions',
    url: 'https://weautomationagency.com',
    siteName: 'WeAutomationAgency',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'WeAutomationAgency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeAutomationAgency — AI Automation for Business Growth',
    description: 'AI automation solutions for business growth',
    images: ['/opengraph-image.png'],
  },
  robots: { index: true, follow: true },
};

// Structured data (JSON-LD) — helps Google understand the business as an entity
// and enables richer search results. Organization + the services offered.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://weautomationagency.com/#organization',
      name: 'WeAutomationAgency',
      legalName: 'BOUTALEB LLC',
      url: 'https://weautomationagency.com',
      logo: 'https://weautomationagency.com/icon-512.png',
      image: 'https://weautomationagency.com/opengraph-image.png',
      description:
        'We build AI chatbots, automated lead generation, intelligent call centers, and email automation that drive revenue for your business.',
      email: 'ceo@weautomationagency.com',
      telephone: '+1-646-980-2446',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '30 N Gould St Ste N',
        addressLocality: 'Sheridan',
        addressRegion: 'WY',
        postalCode: '82801',
        addressCountry: 'US',
      },
      sameAs: [
        'https://www.linkedin.com/company/weautomationagency',
        'https://www.instagram.com/weautomationagency',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://weautomationagency.com/#website',
      url: 'https://weautomationagency.com',
      name: 'WeAutomationAgency',
      publisher: { '@id': 'https://weautomationagency.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfessionalService',
      name: 'WeAutomationAgency — AI Automation Services',
      url: 'https://weautomationagency.com',
      provider: { '@id': 'https://weautomationagency.com/#organization' },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Automation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Chatbot Development',
              url: 'https://weautomationagency.com/services/ai-chatbot',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Automated Lead Generation',
              url: 'https://weautomationagency.com/services/lead-generation',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Call Center',
              url: 'https://weautomationagency.com/services/call-center',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Email Automation',
              url: 'https://weautomationagency.com/services/email-automation',
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        {/* Satoshi font from Fontshare (free) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-primary text-secondary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
