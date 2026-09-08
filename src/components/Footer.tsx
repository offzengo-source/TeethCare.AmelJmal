import React, { useState } from 'react';
import { Phone, MapPin, MessageCircle, Heart, Shield, X } from 'lucide-react';
import { PRACTICAL_INFO, CLINIC_SERVICES } from '../data/dentistData';

export const Footer: React.FC = () => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#242A28] text-white/80 pt-16 pb-12 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Identity & Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white p-0.5 flex items-center justify-center border border-[#A8D5C8]/40 shadow-sm flex-shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Logo Dr Amel Jemal"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-tight text-white">
                  Dr Amel Jemal
                </div>
                <div className="text-xs text-[#A8D5C8] font-medium tracking-wide uppercase">
                  Chirurgien-Dentiste
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Cabinet dentaire à Ariana dédié aux soins de haute précision, à la prévention et à l'esthétique du sourire dans une atmosphère sereine et bienveillante.
            </p>

            <div className="pt-2 text-xs text-white/50">
              Inscrite au Conseil National de l'Ordre des Médecins Dentistes de Tunisie.
            </div>
          </div>

          {/* Col 2: Services rapides (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#A8D5C8]">
              Nos Soins Dentaires
            </div>
            <ul className="space-y-2 text-xs text-white/75">
              {CLINIC_SERVICES.slice(0, 5).map((svc) => (
                <li key={svc.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleScrollTo(e, 'services')}
                    className="hover:text-[#A8D5C8] transition-colors"
                  >
                    {svc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Coordonnées résumées (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#A8D5C8]">
              Coordonnées directes
            </div>
            <div className="space-y-2.5 text-xs text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A8D5C8] flex-shrink-0 mt-0.5" />
                <span>{PRACTICAL_INFO.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A8D5C8] flex-shrink-0" />
                <a
                  href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors font-medium"
                >
                  {PRACTICAL_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#A8D5C8] flex-shrink-0" />
                <a
                  href={PRACTICAL_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp direct : +216 53 211 200
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-white/55">
              Horaires : Lun - Ven 8h30-18h00 | Sam 8h30-13h00
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {currentYear} Cabinet Dentaire Dr Amel Jemal. Tous droits réservés.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegalModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions légales & Confidentialité
            </button>
            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, 'hero')}
              className="hover:text-white transition-colors"
            >
              Haut de page ↑
            </a>
          </div>
        </div>
      </div>

      {/* Mentions Légales Modal */}
      {legalModalOpen && (
        <div
          onClick={() => setLegalModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl bg-white text-[#2A2A2A] p-7 sm:p-8 shadow-2xl text-left"
          >
            <button
              onClick={() => setLegalModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-black/50 hover:text-black rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#5B9B8E]" />
              Mentions Légales & Confidentialité
            </h3>

            <div className="space-y-3 text-xs text-[#2A2A2A]/80 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <strong className="font-semibold text-[#2A2A2A]">Cabinet Médical Dentaire :</strong><br />
                Dr Amel Jemal, Chirurgien-Dentiste.<br />
                Adresse : Immeuble Nozha, 18 Rue Ahmed Amine, Khabthani 2080, Ariana, Tunisie.<br />
                Téléphone : 53 211 200.
              </div>
              <div>
                <strong className="font-semibold text-[#2A2A2A]">Déontologie & Exercice :</strong><br />
                Activité médicale exercée conformément aux règles déontologiques de l'Ordre National des Médecins Dentistes de Tunisie. Les informations fournies sur ce site visent à éclairer les patients sur les soins proposés et ne sauraient remplacer une consultation clinique en cabinet.
              </div>
              <div>
                <strong className="font-semibold text-[#2A2A2A]">Données personnelles & Secret médical :</strong><br />
                Toutes les informations transmises via les formulaires de contact sont strictement confidentielles, destinées uniquement à la prise de rendez-vous avec le cabinet, et ne font l'objet d'aucun partage commercial.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 text-right">
              <button
                onClick={() => setLegalModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#5B9B8E] text-white text-xs font-semibold hover:bg-[#478276]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
