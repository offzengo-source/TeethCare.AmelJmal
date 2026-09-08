import React, { useState, useRef, useEffect } from 'react';
import { Search, Star, Sparkles, ArrowRight, ShieldCheck, Clock, MapPin, X, Check } from 'lucide-react';
import { CLINIC_SERVICES, PRACTICAL_INFO } from '../data/dentistData';
import { ServiceItem } from '../types';

interface HeroProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectService, onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({ x: 50, y: 50 });
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter services dynamically based on title, description, and tags
  const filteredServices = searchQuery.trim() === ''
    ? []
    : CLINIC_SERVICES.filter((svc) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = svc.title.toLowerCase().includes(query);
        const matchesDesc = svc.shortDesc.toLowerCase().includes(query);
        const matchesTag = svc.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesTag;
      });

  // Track cursor within search container for liquid sheen effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!searchContainerRef.current) return;
    const rect = searchContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseCoords({ x, y });
  };

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('avis');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSuggestionClick = (service: ServiceItem) => {
    setSearchQuery(service.title);
    setIsFocused(false);
    onSelectService(service);
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    setIsFocused(true);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col justify-center overflow-hidden"
    >
      {/* Organic Fluid SVG Blobs Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Blob 1: Gentle Mint */}
        <div
          className="absolute -top-10 -left-20 w-[480px] h-[480px] md:w-[650px] md:h-[650px] rounded-full opacity-45 mix-blend-multiply blur-3xl animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(168, 213, 200, 0.7) 0%, rgba(168, 213, 200, 0.1) 70%, transparent 100%)',
          }}
        />

        {/* Blob 2: Soft Clinical Blue */}
        <div
          className="absolute top-1/4 -right-20 w-[420px] h-[420px] md:w-[580px] md:h-[580px] rounded-full opacity-35 mix-blend-multiply blur-3xl animate-float-reverse"
          style={{
            background: 'radial-gradient(circle, rgba(127, 168, 201, 0.65) 0%, rgba(127, 168, 201, 0.05) 70%, transparent 100%)',
          }}
        />

        {/* Blob 3: Subtle Warm Gold Glow */}
        <div
          className="absolute bottom-10 left-1/3 w-[360px] h-[360px] rounded-full opacity-20 mix-blend-multiply blur-3xl animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(201, 168, 118, 0.5) 0%, rgba(201, 168, 118, 0.05) 65%, transparent 100%)',
          }}
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(42,42,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,42,42,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Logo Badge & Google Rating Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#A8D5C8]/40 shadow-sm">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#5B9B8E]/30 bg-white flex items-center justify-center p-0.5 flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="Logo Dr Amel Jemal"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-semibold text-[#2E5E54]">Cabinet Dr Amel Jemal</span>
          </div>

          <a
            id="hero-google-rating-badge"
            href="#avis"
            onClick={scrollToReviews}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#A8D5C8]/40 shadow-sm hover:border-[#5B9B8E]/50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-0.5 text-[#C9A876]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#C9A876] text-[#C9A876]" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#2A2A2A]">5.0</span>
            <span className="text-xs text-[#2A2A2A]/60 font-medium">(14 avis Google)</span>
            <span className="text-[11px] font-semibold text-[#5B9B8E] group-hover:translate-x-0.5 transition-transform">
              Lire les avis &rarr;
            </span>
          </a>
        </div>

        {/* Strong Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#2A2A2A] leading-[1.15] mb-5">
          Votre sourire,{' '}
          <span className="relative inline-block text-[#2E5E54]">
            notre priorité
            <svg
              className="absolute -bottom-2 left-0 w-full h-2.5 text-[#A8D5C8]/70"
              viewBox="0 0 200 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 6.5C50.5 2 152 1.5 197.5 6.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Reassuring Subtitle (2 lines max) */}
        <p className="text-lg sm:text-xl text-[#2A2A2A]/75 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Des soins dentaires d'excellence alliant douceur, technologie moderne et écoute humaine au cœur d'Ariana.
        </p>

        {/* Liquid and Fluid Central Search Bar */}
        <div
          ref={searchContainerRef}
          onMouseMove={handleMouseMove}
          className="relative max-w-2xl mx-auto mb-8"
        >
          {/* Animated Liquid Background Border Sheen */}
          <div
            className={`absolute -inset-1 rounded-[32px] transition-all duration-700 pointer-events-none ${
              isFocused
                ? 'opacity-100 animate-liquid-morph'
                : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle at ${mouseCoords.x}% ${mouseCoords.y}%, rgba(168, 213, 200, 0.8) 0%, rgba(127, 168, 201, 0.4) 50%, transparent 80%)`,
            }}
          />

          {/* Main Input Container with Glassmorphism */}
          <div
            className={`relative flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-3.5 rounded-full bg-white/80 backdrop-blur-xl border transition-all duration-500 shadow-[0_8px_30px_rgba(42,42,42,0.06)] ${
              isFocused
                ? 'border-[#5B9B8E] shadow-[0_12px_36px_rgba(91,155,142,0.22)] bg-white/95'
                : 'border-white/90 hover:border-[#A8D5C8]/70'
            }`}
          >
            {/* Subtle Pulsing Magnifying Glass */}
            <div className="relative flex items-center justify-center flex-shrink-0">
              <span className={`absolute inset-0 rounded-full bg-[#A8D5C8]/40 animate-ping opacity-75 ${isFocused ? 'scale-125' : 'scale-90 opacity-0'}`} />
              <Search
                className={`w-5 h-5 transition-colors duration-300 ${
                  isFocused ? 'text-[#5B9B8E]' : 'text-[#2A2A2A]/40'
                }`}
              />
            </div>

            {/* Input Field */}
            <input
              id="liquid-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Rechercher un soin (détartrage, blanchiment, urgence...)"
              className="w-full bg-transparent text-[#2A2A2A] placeholder-[#2A2A2A]/45 text-sm sm:text-base font-normal focus:outline-none"
            />

            {/* Clear button if has text */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-[#2A2A2A]/40 hover:text-[#2A2A2A] hover:bg-black/5 transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Liquid Fill Search CTA Button */}
            <button
              id="liquid-search-submit-btn"
              type="button"
              onClick={() => {
                if (filteredServices.length > 0) {
                  onSelectService(filteredServices[0]);
                } else {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative group overflow-hidden flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#5B9B8E] shadow-sm transition-all duration-300 hover:shadow-[0_4px_16px_rgba(91,155,142,0.4)] active:scale-95"
            >
              {/* Liquid fill animation layer */}
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#A8D5C8] to-[#478276] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
              />
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Trouver</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Dynamic Floating Suggestions Card (Frosted Glass) */}
          {isFocused && (
            <div
              id="search-suggestions-panel"
              className="absolute left-0 right-0 top-full mt-3 p-3 rounded-2xl bg-[#FAFAF8]/95 backdrop-blur-2xl border border-white/90 shadow-[0_18px_45px_rgba(42,42,42,0.08)] z-50 text-left transition-all duration-300 animate-in fade-in slide-in-from-top-2"
            >
              {filteredServices.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#5B9B8E]">
                    Soins correspondants ({filteredServices.length})
                  </div>
                  {filteredServices.map((svc) => (
                    <button
                      key={svc.id}
                      id={`search-item-${svc.id}`}
                      onClick={() => handleSuggestionClick(svc)}
                      className="w-full flex items-start justify-between p-3 rounded-xl hover:bg-white/80 transition-all group text-left"
                    >
                      <div className="flex-1 pr-3">
                        <div className="font-semibold text-sm text-[#2A2A2A] group-hover:text-[#5B9B8E] transition-colors flex items-center gap-2">
                          <span>{svc.title}</span>
                          <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-[#A8D5C8]/25 text-[#2E5E54]">
                            {svc.duration}
                          </span>
                        </div>
                        <p className="text-xs text-[#2A2A2A]/70 mt-0.5 line-clamp-1 font-normal">
                          {svc.shortDesc}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-[#5B9B8E] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap self-center">
                        <span>Voir détails</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() !== '' ? (
                <div className="py-6 px-4 text-center">
                  <p className="text-sm font-medium text-[#2A2A2A]">Aucun soin spécifique trouvé pour "{searchQuery}"</p>
                  <p className="text-xs text-[#2A2A2A]/60 mt-1">
                    Besoin d'un renseignement ? Contactez directement notre cabinet au {PRACTICAL_INFO.phone}.
                  </p>
                  <button
                    onClick={() => onOpenBooking()}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B9B8E] hover:underline"
                  >
                    <span>Poser une question ou prendre rendez-vous</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="p-2">
                  <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2A2A2A]/50 mb-2">
                    Soins fréquemment recherchés
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Détartrage', 'Blanchiment', 'Urgence rage de dent', 'Carie', 'Facettes', 'Bilan annuel'].map((item) => (
                      <button
                        key={item}
                        onClick={() => handleQuickTagClick(item)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium text-[#2A2A2A]/80 bg-white/70 hover:bg-[#A8D5C8]/30 hover:text-[#1F3D36] border border-black/5 transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Tag Pills below Search */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-[#2A2A2A]/70">
          <span className="font-medium text-[#2A2A2A]/50">Suggestions :</span>
          {['Détartrage & Polissage', 'Blanchiment sécurisé', 'Urgences sans rdv', 'Bilan dentaire'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag.split(' ')[0]);
                setIsFocused(true);
              }}
              className="px-3 py-1 rounded-full bg-white/60 hover:bg-white border border-black/5 text-[#2A2A2A]/80 hover:text-[#5B9B8E] hover:border-[#A8D5C8]/60 transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Trust Indicators Bar */}
        <div className="mt-14 pt-8 border-t border-black/5 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-xl bg-[#A8D5C8]/25 flex items-center justify-center text-[#5B9B8E] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#2A2A2A]">Soins Indolores</div>
              <div className="text-[11px] text-[#2A2A2A]/60">Anesthésie douce & confort</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-xl bg-[#7FA8C9]/25 flex items-center justify-center text-[#4B799E] flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#2A2A2A]">Ponctualité</div>
              <div className="text-[11px] text-[#2A2A2A]/60">Prise en charge à l’heure</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-xl bg-[#C9A876]/25 flex items-center justify-center text-[#A68249] flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#2A2A2A]">Hygiène Stricte</div>
              <div className="text-[11px] text-[#2A2A2A]/60">Stérilisation hospitalière</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-xl bg-[#A8D5C8]/25 flex items-center justify-center text-[#5B9B8E] flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#2A2A2A]">Ariana Centre</div>
              <div className="text-[11px] text-[#2A2A2A]/60">Immeuble Nozha, accès aisé</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
