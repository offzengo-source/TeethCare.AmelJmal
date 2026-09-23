import React, { useState, useRef, useEffect } from 'react';
import { Search, Star, Sparkles, ArrowRight, ShieldCheck, Clock, MapPin, X, Check } from 'lucide-react';
import { CLINIC_SERVICES, PRACTICAL_INFO } from '../data/dentistData';
import { ServiceItem } from '../types';
import womanHeroBanner from '../assets/images/woman_hero_banner_1790184928043.jpg';

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
      {/* Ultra High-Res 16:9 Hero Banner - Professional Dental Studio Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Woman with brilliant smile on the right (rule of thirds), soft negative space for UI */}
        <img
          src={womanHeroBanner}
          alt="Femme au sourire éclatant et dents blanches parfaites - Cabinet dentaire Dr Amel Jemal"
          className="w-full h-full object-cover object-[80%_center] md:object-[85%_center] transform scale-100 filter brightness-[1.01] contrast-[1.02]"
          referrerPolicy="no-referrer"
        />

        {/* Luminous soft golden hour & cream gradient wash: fades naturally into page design while spotlighting the smile */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/80 via-white/45 to-[#FAFAF8]/95 md:bg-gradient-to-r md:from-[#FAFAF8]/90 md:via-[#FAFAF8]/65 md:to-white/20" />
        
        {/* Soft pastel mint & luminous clinic aesthetic accents */}
        <div
          className="absolute -top-10 -left-20 w-[480px] h-[480px] md:w-[650px] md:h-[650px] rounded-full opacity-20 mix-blend-multiply blur-3xl animate-float-slow pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168, 213, 200, 0.6) 0%, rgba(168, 213, 200, 0.05) 70%, transparent 100%)',
          }}
        />

        <div
          className="absolute top-1/4 -right-20 w-[420px] h-[420px] md:w-[580px] md:h-[580px] rounded-full opacity-15 mix-blend-multiply blur-3xl animate-float-reverse pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201, 168, 118, 0.4) 0%, rgba(201, 168, 118, 0.05) 70%, transparent 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Editorial Layout: Left Column with Content Sheet, Right Space open to show the Smiling Woman */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Editorial Content Sheet */}
          <div className="lg:col-span-7 text-left">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-[#2E5E54] mb-3">
              <span>01 / Écrin Dentaire & Esthétique</span>
              <span className="w-8 h-[1px] bg-[#5B9B8E]/40" />
              <span className="text-[#2A2A2A]/50">Ariana Centre</span>
            </div>

            {/* Glassmorphic Editorial Panel for maximum contrast & crisp readability */}
            <div className="p-6 sm:p-8 md:p-10 rounded-[28px] bg-white/92 backdrop-blur-xl border border-white/95 shadow-[0_20px_50px_rgba(30,50,45,0.08)]">
              {/* Logo Badge & Google Rating Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#A8D5C8]/40 shadow-xs">
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-[#5B9B8E]/30 bg-white flex items-center justify-center p-0.5 flex-shrink-0">
                    <img
                      src="/logo.jpg"
                      alt="Logo Dr Amel Jemal"
                      className="w-full h-full object-contain rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#2E5E54]">Dr Amel Jemal</span>
                </div>

                <a
                  id="hero-google-rating-badge"
                  href="#avis"
                  onClick={scrollToReviews}
                  className="group inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[#A8D5C8]/40 shadow-xs hover:border-[#5B9B8E]/50 transition-all duration-300 cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-0.5 text-[#C9A876]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C9A876] text-[#C9A876]" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#2A2A2A]">5.0</span>
                  <span className="text-[#2A2A2A]/60 font-medium">(14 avis)</span>
                  <span className="font-semibold text-[#5B9B8E] group-hover:translate-x-0.5 transition-transform text-[11px]">
                    Lire &rarr;
                  </span>
                </a>
              </div>

              {/* Strong Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2A2A2A] leading-[1.18] mb-4">
                Votre sourire,{' '}
                <span className="relative inline-block text-[#2E5E54]">
                  notre priorité
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2 text-[#A8D5C8]/70"
                    viewBox="0 0 200 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 6.5C50.5 2 152 1.5 197.5 6.5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Reassuring Subtitle */}
              <p className="text-sm sm:text-base text-[#2A2A2A]/75 leading-relaxed mb-7 font-normal">
                Des soins dentaires d'excellence alliant douceur, technologie opératoire de pointe et écoute humaine bienveillante au cœur d'Ariana.
              </p>

              {/* Liquid Search Bar */}
              <div
                ref={searchContainerRef}
                onMouseMove={handleMouseMove}
                className="relative mb-5"
              >
                {/* Animated Liquid Background Border Sheen */}
                <div
                  className={`absolute -inset-1 rounded-[32px] transition-all duration-700 pointer-events-none ${
                    isFocused ? 'opacity-100 animate-liquid-morph' : 'opacity-0'
                  }`}
                  style={{
                    background: `radial-gradient(circle at ${mouseCoords.x}% ${mouseCoords.y}%, rgba(168, 213, 200, 0.8) 0%, rgba(127, 168, 201, 0.4) 50%, transparent 80%)`,
                  }}
                />

                {/* Main Input Container with Glassmorphism */}
                <div
                  className={`relative flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/90 backdrop-blur-xl border transition-all duration-500 shadow-sm ${
                    isFocused
                      ? 'border-[#5B9B8E] shadow-[0_8px_24px_rgba(91,155,142,0.2)] bg-white'
                      : 'border-black/10 hover:border-[#A8D5C8]/70'
                  }`}
                >
                  <Search
                    className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                      isFocused ? 'text-[#5B9B8E]' : 'text-[#2A2A2A]/40'
                    }`}
                  />

                  <input
                    id="liquid-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder="Rechercher un soin (détartrage, blanchiment, urgence...)"
                    className="w-full bg-transparent text-[#2A2A2A] placeholder-[#2A2A2A]/45 text-xs sm:text-sm font-normal focus:outline-none"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 rounded-full text-[#2A2A2A]/40 hover:text-[#2A2A2A] hover:bg-black/5 transition-colors"
                      aria-label="Effacer la recherche"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

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
                    className="relative group overflow-hidden flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#5B9B8E] shadow-sm transition-all duration-300 hover:bg-[#478276] active:scale-95"
                  >
                    <span className="flex items-center gap-1">
                      <span>Trouver</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>

                {/* Suggestions Panel */}
                {isFocused && (
                  <div
                    id="search-suggestions-panel"
                    className="absolute left-0 right-0 top-full mt-2 p-3 rounded-2xl bg-[#FAFAF8]/98 backdrop-blur-2xl border border-black/10 shadow-[0_18px_45px_rgba(42,42,42,0.12)] z-50 text-left transition-all duration-300"
                  >
                    {filteredServices.length > 0 ? (
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#5B9B8E]">
                          Soins correspondants ({filteredServices.length})
                        </div>
                        {filteredServices.map((svc) => (
                          <button
                            key={svc.id}
                            id={`search-item-${svc.id}`}
                            onClick={() => handleSuggestionClick(svc)}
                            className="w-full flex items-start justify-between p-2.5 rounded-xl hover:bg-white transition-all group text-left"
                          >
                            <div className="flex-1 pr-3">
                              <div className="font-semibold text-xs text-[#2A2A2A] group-hover:text-[#5B9B8E] transition-colors flex items-center gap-2">
                                <span>{svc.title}</span>
                                <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-[#A8D5C8]/25 text-[#2E5E54]">
                                  {svc.duration}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#2A2A2A]/70 mt-0.5 line-clamp-1 font-normal">
                                {svc.shortDesc}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#5B9B8E] opacity-0 group-hover:opacity-100 transition-opacity self-center" />
                          </button>
                        ))}
                      </div>
                    ) : searchQuery.trim() !== '' ? (
                      <div className="py-4 px-3 text-center">
                        <p className="text-xs font-medium text-[#2A2A2A]">Aucun soin trouvé pour "{searchQuery}"</p>
                        <p className="text-[11px] text-[#2A2A2A]/60 mt-1">
                          Contactez le cabinet au {PRACTICAL_INFO.phone}
                        </p>
                      </div>
                    ) : (
                      <div className="p-1">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-[#2A2A2A]/50 mb-1.5">
                          Suggestions rapides
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {['Détartrage', 'Blanchiment', 'Urgence rage de dent', 'Carie', 'Facettes', 'Bilan'].map((item) => (
                            <button
                              key={item}
                              onClick={() => handleQuickTagClick(item)}
                              className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#2A2A2A]/80 bg-white hover:bg-[#A8D5C8]/30 hover:text-[#1F3D36] border border-black/5 transition-all"
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

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#2E5E54] hover:bg-[#1F3D36] shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
                  <span>Prendre rendez-vous en ligne</span>
                </button>
                <a
                  href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-[#2A2A2A] bg-white/80 hover:bg-white border border-black/10 transition-all flex items-center gap-2"
                >
                  <span>Appeler le cabinet</span>
                </a>
              </div>

              {/* Trust Indicators Bar in Editorial Style */}
              <div className="mt-8 pt-6 border-t border-black/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#A8D5C8]/25 flex items-center justify-center text-[#5B9B8E] flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#2A2A2A]">Soins Indolores</div>
                    <div className="text-[10px] text-[#2A2A2A]/60">Anesthésie douce</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#7FA8C9]/25 flex items-center justify-center text-[#4B799E] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#2A2A2A]">Ponctualité</div>
                    <div className="text-[10px] text-[#2A2A2A]/60">À l’heure fixée</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C9A876]/25 flex items-center justify-center text-[#A68249] flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#2A2A2A]">Hygiène Stricte</div>
                    <div className="text-[10px] text-[#2A2A2A]/60">Stérilisation certifiée</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#A8D5C8]/25 flex items-center justify-center text-[#5B9B8E] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#2A2A2A]">Ariana Centre</div>
                    <div className="text-[10px] text-[#2A2A2A]/60">Immeuble Nozha</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Unobstructed View of the Woman with White Teeth Smiling */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-end items-end space-y-4 pt-16">
            {/* Floating Editorial Quote Card */}
            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_15px_35px_rgba(30,50,45,0.08)] max-w-xs text-left">
              <div className="flex items-center gap-1 text-[#C9A876] mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C9A876] text-[#C9A876]" />
                ))}
                <span className="text-[11px] font-bold text-[#2A2A2A] ml-1">5.0 · Google</span>
              </div>
              <p className="text-xs italic text-[#2A2A2A]/80 leading-relaxed font-serif">
                « Un sourire éclatant aux dents blanches et saines illumine le visage et redonne confiance à chaque instant. »
              </p>
              <div className="mt-3 pt-2.5 border-t border-black/[0.06] flex items-center justify-between text-[10px] text-[#2A2A2A]/60 font-medium">
                <span>Dr Amel Jemal</span>
                <span className="text-[#5B9B8E]">Ariana Centre</span>
              </div>
            </div>

            {/* Reassurance Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#A8D5C8]/50 shadow-sm text-xs font-medium text-[#2E5E54]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
              <span>Esthétique, Blanchiment & Soins Doux</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
