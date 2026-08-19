import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chatbot Development for Ecommerce, Banking & Support',
  description:
    'Custom AI chatbots that handle support, qualify leads, and drive sales 24/7. Multilingual, WhatsApp-ready, deployed in 24-48 hours. Built for ecommerce, banking, and service businesses.',
  keywords: [
    'AI chatbot development',
    'AI chatbot for ecommerce',
    'customer support chatbot',
    'WhatsApp chatbot',
    'multilingual chatbot',
    'conversational AI agency',
  ],
  alternates: { canonical: '/services/ai-chatbot' },
  openGraph: {
    title: 'AI Chatbot Development for Ecommerce, Banking & Support',
    description:
      'Custom AI chatbots that handle support, qualify leads, and drive sales 24/7.',
    url: 'https://weautomationagency.com/services/ai-chatbot',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
