'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ResultsStats from '@/components/ResultsStats';
import CTASection from '@/components/CTASection';
import ServicesShowcase from '@/components/ServicesShowcase';
import ScrollingText from '@/components/ScrollingText';
import ScrollingCards from '@/components/ScrollingCards';
import ImageSlides from '@/components/ImageSlides';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import PopupModal from '@/components/PopupModal';
import type { SiteLocale } from '@/lib/i18n';

export default function HomePageClient({ locale = 'en' }: { locale?: SiteLocale }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Navbar onOpenModal={openModal} locale={locale} />
      <main>
        <Hero onOpenModal={openModal} locale={locale} />
        <ResultsStats locale={locale} />
        <CTASection onOpenModal={openModal} locale={locale} />
        <ServicesShowcase locale={locale} />
        <ScrollingText locale={locale} />
        <ScrollingCards locale={locale} />
        <ImageSlides onOpenModal={openModal} />
        <Newsletter locale={locale} />
      </main>
      <Footer locale={locale} />
      <PopupModal isOpen={modalOpen} onClose={closeModal} locale={locale} />
    </>
  );
}
