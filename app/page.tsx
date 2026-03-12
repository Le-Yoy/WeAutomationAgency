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

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Navbar onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <ResultsStats />
        <CTASection onOpenModal={openModal} />
        <ServicesShowcase />
        <ScrollingText />
        <ScrollingCards />
        <ImageSlides onOpenModal={openModal} />
        <Newsletter />
      </main>
      <Footer />
      <PopupModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}
