import React from 'react';
import { MapPin, Navigation, Clock, Phone, Car, Compass, Building, Calendar } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/dentistData';

export const LocationSection: React.FC = () => {
  // Google Maps embed URL centered on Rue Ahmed Amine, Khabthani 2080 Ariana
  const mapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.5445209794384!2d10.187309999999999!3d36.853360000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34d85202c46f%3A0x6b4fb6c6f3708e1!2sRue%20Ahmed%20Amine%2C%20Ariana!5e0!3m2!1sfr!2stn!4v1709890000000!5m2!1sfr!2stn`;

  return (
    <section id="localisation" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7FA8C9]/20 text-[#2C5E8A] text-xs font-semibold tracking-wide uppercase mb-3">
            Accès & Coordonnées
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#2A2A2A] mb-3">
            Venir au cabinet à Ariana
          </h2>
          <p className="text-base text-[#2A2A2A]/70">
            Idéalement situé au cœur d'Ariana, notre cabinet vous accueille dans des locaux modernes, accessibles et pensés pour votre confort.
          </p>
        </div>

        {/* 2-Column Grid: Map + Practical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[380px] sm:h-[450px] lg:h-full min-h-[380px] rounded-[26px] overflow-hidden border border-black/10 shadow-[0_12px_40px_rgba(42,42,42,0.06)] bg-white">
              <iframe
                id="google-maps-iframe"
                title="Localisation Cabinet Dentaire Dr Amel Jemal Ariana"
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />

              {/* Floating Address Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5B9B8E] text-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-xs text-[#2A2A2A]">Cabinet Dr Amel Jemal</div>
                  <div className="text-[11px] text-[#2A2A2A]/70 mt-0.5 leading-snug">
                    {PRACTICAL_INFO.address}, Ariana
                  </div>
                  <a
                    id="maps-overlay-directions"
                    href={PRACTICAL_INFO.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5B9B8E] hover:underline mt-1.5"
                  >
                    <span>Ouvrir dans Google Maps</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Info Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-[22px] bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(42,42,42,0.03)]">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#A8D5C8]/30 text-[#2E5E54] flex items-center justify-center flex-shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2A2A2A]">Adresse du cabinet</h3>
                  <p className="text-xs text-[#2A2A2A]/70 mt-1 leading-relaxed">
                    {PRACTICAL_INFO.fullAddress}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center gap-3">
                <a
                  id="direct-directions-btn"
                  href={PRACTICAL_INFO.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#5B9B8E] hover:bg-[#478276] transition-all shadow-sm flex-1 text-center"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Obtenir l'itinéraire</span>
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-[22px] bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(42,42,42,0.03)]">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#7FA8C9]/25 text-[#2C5E8A] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2A2A2A]">Horaires d'ouverture</h3>
                  <p className="text-[11px] text-[#2A2A2A]/60">Consultations sur rendez-vous</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#2A2A2A]/80">
                {PRACTICAL_INFO.openingHours.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between py-1 border-b border-black/[0.04] last:border-0">
                    <span className="font-medium text-[#2A2A2A]">{slot.days}</span>
                    <span className="text-[#2A2A2A]/70 font-mono text-[11px]">{slot.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Access & Parking */}
            <div className="p-6 rounded-[22px] bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(42,42,42,0.03)]">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A876]/25 text-[#8A6732] flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2A2A2A]">Accès & Stationnement</h3>
                  <p className="text-[11px] text-[#2A2A2A]/60">Facilités pour les patients</p>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-[#2A2A2A]/75">
                {PRACTICAL_INFO.accessibility.map((acc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B9B8E]" />
                    <span>{acc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
