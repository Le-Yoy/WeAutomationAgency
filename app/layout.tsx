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
      </head>
      <body className="bg-primary text-secondary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
