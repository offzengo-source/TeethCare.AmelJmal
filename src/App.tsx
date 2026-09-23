import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { BookingModal } from './components/BookingModal';
import { ServiceItem } from './types';
import { Phone, Calendar } from 'lucide-react';
import { PRACTICAL_INFO } from './data/dentistData';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen text-[#2A2A2A] font-sans antialiased selection:bg-[#A8D5C8]/40 selection:text-[#18392B] relative overflow-x-hidden">
      {/* Global Fixed Background: Femme souriante aux belles dents blanches */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <img
          src="/woman_hero_banner.jpg"
          alt="Femme aux dents blanches qui sourit - Cabinet dentaire Dr Amel Jemal"
          className="w-full h-full object-cover object-[78%_center] md:object-[82%_center] filter brightness-[1.02] contrast-[1.03]"
          referrerPolicy="no-referrer"
        />
        {/* Editorial soft paper wash allowing the smiling woman to remain visible while guaranteeing text readability */}
        <div className="absolute inset-0 bg-[#FAFAF8]/75 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8]/95 via-[#FAFAF8]/70 to-[#FAFAF8]/30 md:from-[#FAFAF8]/90 md:via-[#FAFAF8]/60 md:to-transparent/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/40 via-transparent to-[#FAFAF8]/80" />
      </div>

      {/* Editorial Top Masthead Strip */}
      <div className="relative z-50 bg-white/80 backdrop-blur-md border-b border-black/[0.06] text-[11px] text-[#2A2A2A]/70 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#2E5E54] uppercase tracking-wider">Cabinet Dentaire d'Excellence</span>
            <span className="text-black/30">|</span>
            <span>Ariana Centre · Grand Tunis</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C9A876] font-medium">★ 5.0 sur Google Reviews</span>
            <span className="text-black/30">|</span>
            <a
              href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
              className="hover:text-[#5B9B8E] transition-colors font-medium"
            >
              Urgences & RDV : {PRACTICAL_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Container with Editorial Frame */}
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto border-x border-black/[0.04] bg-white/40 backdrop-blur-[1px]">
        {/* 1. Hero Section with Liquid Search Bar */}
        <Hero
          onSelectService={(svc) => setSelectedService(svc)}
          onOpenBooking={(svcId) => handleOpenBooking(svcId)}
        />

        {/* 2. Services Section */}
        <ServicesSection
          onSelectService={(svc) => setSelectedService(svc)}
          onOpenBooking={(svcId) => handleOpenBooking(svcId)}
        />

        {/* 3. Google Reviews Section */}
        <ReviewsSection />

        {/* 4. About Section */}
        <AboutSection />

        {/* 5. Location Section (Google Maps) */}
        <LocationSection />

        {/* 6. Contact & Appointment Section */}
        <ContactSection preselectedServiceId={bookingServiceId} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(svcId) => {
          setSelectedService(null);
          handleOpenBooking(svcId);
        }}
      />

      <BookingModal
        isOpen={isBookingOpen}
        initialServiceId={bookingServiceId}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Mobile Floating Quick Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden flex items-center gap-2 p-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_8px_25px_rgba(42,42,42,0.12)]">
        <a
          href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-xs font-semibold text-[#2A2A2A] border border-black/5"
        >
          <Phone className="w-3.5 h-3.5 text-[#5B9B8E]" />
          <span>Appeler</span>
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#5B9B8E] text-xs font-semibold text-white shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Rendez-vous</span>
        </button>
      </div>
    </div>
  );
}
