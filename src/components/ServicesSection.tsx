import React, { useState } from 'react';
import {
  Sparkles,
  SunMedium,
  ShieldCheck,
  Activity,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Clock,
  Check,
  ChevronRight
} from 'lucide-react';
import { CLINIC_SERVICES } from '../data/dentistData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#5B9B8E]" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5 text-[#C9A876]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#7FA8C9]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#E06D53]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#5B9B8E]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-[#7FA8C9]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#5B9B8E]" />;
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#A8D5C8]/15 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#7FA8C9]/15 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8D5C8]/25 text-[#2E5E54] text-xs font-semibold tracking-wide uppercase mb-3">
            Soins & Pratique clinique
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#2A2A2A] mb-4">
            Des soins dentaires sur-mesure, dispensés avec douceur
          </h2>
          <p className="text-base text-[#2A2A2A]/70 leading-relaxed">
            Chaque bouche est unique. Nous privilégions une approche conservatrice et préventive
            en utilisant des technologies de pointe pour préserver votre capital dentaire.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CLINIC_SERVICES.map((service, index) => {
            const isHovered = hoveredCard === service.id;
            const isUrgency = service.id === 'urgences';

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-[24px] transition-all duration-300 ${
                  isUrgency
                    ? 'bg-gradient-to-b from-white/90 to-[#FFF8F6]/90 border border-[#FADCD5] shadow-[0_8px_30px_rgba(224,109,83,0.08)]'
                    : 'bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_6px_26px_rgba(42,42,42,0.03)] hover:shadow-[0_16px_40px_rgba(91,155,142,0.12)] hover:border-[#A8D5C8]/70 hover:-translate-y-1'
                }`}
              >
                {/* Top badge or duration */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                        isUrgency
                          ? 'bg-[#FFF0ED] border-[#FADCD5]'
                          : 'bg-[#FAFAF8] border-[#A8D5C8]/40 group-hover:scale-105 group-hover:bg-[#A8D5C8]/20'
                      }`}
                    >
                      {getServiceIcon(service.icon)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#2A2A2A]/60 px-3 py-1 rounded-full bg-black/[0.03]">
                      <Clock className="w-3 h-3 text-[#5B9B8E]" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-[#2A2A2A] group-hover:text-[#5B9B8E] transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#2A2A2A]/75 leading-relaxed mb-6 font-normal">
                    {service.shortDesc}
                  </p>

                  {/* Highlight pill / key benefit */}
                  <div className="p-3 rounded-xl bg-[#FAFAF8]/90 border border-black/[0.04] mb-6">
                    <div className="text-[11px] font-semibold text-[#2A2A2A]/50 uppercase tracking-wider mb-1">
                      Indication & bénéfice
                    </div>
                    <p className="text-xs text-[#2A2A2A]/80 line-clamp-2">
                      {service.recommendedFor}
                    </p>
                  </div>
                </div>

                {/* Footer card actions */}
                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A2A2A]/80 hover:text-[#5B9B8E] transition-colors cursor-pointer"
                  >
                    <span>Détails du soin</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(service.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isUrgency
                        ? 'bg-[#E06D53] text-white hover:bg-[#c95d45] shadow-sm'
                        : 'bg-[#A8D5C8]/35 text-[#1F3D36] hover:bg-[#A8D5C8] hover:text-[#18332c]'
                    }`}
                  >
                    <span>Prendre RDV</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom banner for reassurance & emergencies */}
        <div className="mt-14 p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-white/90 via-[#F3F9F7] to-white/90 border border-[#A8D5C8]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#A8D5C8]/30 flex items-center justify-center text-[#2E5E54] flex-shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#2A2A2A]">
                Une urgence dentaire dans la journée à Ariana ?
              </h4>
              <p className="text-xs sm:text-sm text-[#2A2A2A]/70 mt-0.5">
                Rage de dent, dent fracturée ou gonflement : contactez directement notre ligne d’assistance.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="tel:53211200"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#5B9B8E] hover:bg-[#478276] shadow-sm transition-all"
            >
              <span>Appeler le 53 211 200</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
