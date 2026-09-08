import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/dentistData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Avis', href: '#avis' },
    { label: 'À propos', href: '#apropos' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-[#FAFAF8]/85 backdrop-blur-xl border-b border-[#A8D5C8]/25 shadow-[0_4px_24px_rgba(42,42,42,0.03)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="brand-logo"
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3.5 text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#A8D5C8]/70 shadow-sm transition-transform duration-300 group-hover:scale-105 bg-white p-0.5 flex-shrink-0 flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="Logo Cabinet Dr Amel Jemal"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-[#2A2A2A] font-sans group-hover:text-[#5B9B8E] transition-colors">
                Dr Amel Jemal
              </span>
              <span className="text-xs font-medium tracking-wide text-[#7FA8C9] uppercase">
                Chirurgien-Dentiste
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_2px_12px_rgba(42,42,42,0.02)]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-[#2A2A2A]/80 hover:text-[#5B9B8E] hover:bg-white/80 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Phone pill + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              id="header-quick-call"
              href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#2A2A2A]/75 hover:text-[#5B9B8E] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#5B9B8E]" />
              <span>{PRACTICAL_INFO.phone}</span>
            </a>

            <button
              id="header-cta-booking"
              onClick={onOpenBooking}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#1F3D36] bg-gradient-to-r from-[#A8D5C8]/90 via-[#BEE3D8]/90 to-[#A8D5C8]/90 border border-white/80 shadow-[0_4px_16px_rgba(91,155,142,0.22)] hover:shadow-[0_6px_22px_rgba(91,155,142,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Calendar className="w-4 h-4 text-[#2E5E54] transition-transform duration-300 group-hover:rotate-6" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-cta-btn"
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#1F3D36] bg-[#A8D5C8]/80 border border-white/60 shadow-sm"
            >
              Rendez-vous
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu de navigation"
              className="p-2 rounded-xl text-[#2A2A2A] hover:bg-black/5 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden mt-2 mx-4 p-5 rounded-2xl bg-[#FAFAF8]/95 backdrop-blur-2xl border border-[#A8D5C8]/40 shadow-xl space-y-3"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-[#2A2A2A] hover:bg-[#A8D5C8]/20 hover:text-[#5B9B8E] transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-black/5 flex flex-col gap-2.5">
            <button
              id="mobile-drawer-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-[#1F3D36] bg-[#A8D5C8] hover:bg-[#97cfc0] shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre rendez-vous</span>
            </button>

            <a
              id="mobile-drawer-call"
              href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-[#2A2A2A]/80 bg-white/70 border border-black/5"
            >
              <Phone className="w-4 h-4 text-[#5B9B8E]" />
              <span>Appeler le {PRACTICAL_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
