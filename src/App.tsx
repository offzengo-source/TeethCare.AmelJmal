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
    <div className="min-h-screen bg-[#FAFAF8] text-[#2A2A2A] font-sans antialiased selection:bg-[#A8D5C8]/40 selection:text-[#18392B]">
      {/* Sticky Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative">
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
