import React from 'react';
import { ShieldCheck, Heart, Eye, Award, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import doctorPhoto from '../assets/images/dr_amel_portrait_1788804747385.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="apropos" className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle organic gradient backdrop */}
      <div className="absolute -right-20 top-1/3 w-96 h-96 rounded-full bg-[#A8D5C8]/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-10 w-96 h-96 rounded-full bg-[#7FA8C9]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Doctor Portrait Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Decorative liquid background frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-[32px] bg-gradient-to-tr from-[#A8D5C8]/40 via-[#BCE3D8]/30 to-[#7FA8C9]/35 -rotate-2 -z-10" />

              {/* Main image container */}
              <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_20px_45px_rgba(42,42,42,0.08)] border border-white/80">
                <img
                  src={doctorPhoto}
                  alt="Dr Amel Jemal, Chirurgien-Dentiste à Ariana"
                  className="w-full h-auto object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Reassurance Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#A8D5C8]/50 shadow-[0_10px_30px_rgba(42,42,42,0.08)] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#A8D5C8]/30 flex items-center justify-center text-[#2E5E54]">
                  <Award className="w-5 h-5 text-[#5B9B8E]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#2A2A2A]">Approche Douce & Zen</div>
                  <div className="text-[11px] text-[#2A2A2A]/60">Soins 100% personnalisés</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Philosophy Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8D5C8]/25 text-[#2E5E54] text-xs font-semibold tracking-wide uppercase mb-4">
              À propos de votre praticienne
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#2A2A2A] mb-6 leading-tight">
              Une médecine dentaire attentive, où l'humain passe avant tout
            </h2>

            <div className="space-y-4 text-base text-[#2A2A2A]/80 leading-relaxed mb-8">
              <p>
                Diplômée en chirurgie dentaire et constamment formée aux innovations biomimétiques et préventives,
                le <strong className="font-semibold text-[#2A2A2A]">Dr Amel Jemal</strong> conçoit son cabinet comme un havre
                de sérénité, loin de l'image austère des salles de soins traditionnelles.
              </p>
              <p>
                Chaque consultation débute par une écoute attentive de votre ressenti, de vos appréhensions et de vos attentes esthétiques.
                Grâce à des explications pédagogiques claires et une gestuelle d'une grande délicatesse, nous transformons votre rendez-vous dentaire
                en un moment paisible et constructif.
              </p>
            </div>

            {/* 3 Key Points with Fine Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-black/5 mb-8">
              {/* Point 1: Professionnalisme */}
              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 hover:border-[#A8D5C8]/50 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#A8D5C8]/25 flex items-center justify-center text-[#5B9B8E] mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-[#2A2A2A] mb-1">
                  Rigueur & Excellence
                </h3>
                <p className="text-xs text-[#2A2A2A]/70 leading-relaxed font-normal">
                  Protocoles stricts d'asepsie, équipement moderne et matériaux biomimétiques de haute qualité.
                </p>
              </div>

              {/* Point 2: Écoute */}
              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 hover:border-[#A8D5C8]/50 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#7FA8C9]/25 flex items-center justify-center text-[#4B799E] mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-[#2A2A2A] mb-1">
                  Écoute & Douceur
                </h3>
                <p className="text-xs text-[#2A2A2A]/70 leading-relaxed font-normal">
                  Prise en compte bienveillante des craintes et anesthésie douce pour des soins sans stress ni douleur.
                </p>
              </div>

              {/* Point 3: Transparence */}
              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 hover:border-[#A8D5C8]/50 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#C9A876]/25 flex items-center justify-center text-[#9E7B44] mb-3">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-[#2A2A2A] mb-1">
                  Transparence Totale
                </h3>
                <p className="text-xs text-[#2A2A2A]/70 leading-relaxed font-normal">
                  Explications détaillées de chaque option de soin, devis clairs et respect de vos décisions.
                </p>
              </div>
            </div>

            {/* Reassuring tags */}
            <div className="flex flex-wrap gap-2 text-xs text-[#2A2A2A]/75">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8D5C8]/20 text-[#1F3D36]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B9B8E]" /> Dépistage numérique
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8D5C8]/20 text-[#1F3D36]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B9B8E]" /> Prise en charge enfants & adultes
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8D5C8]/20 text-[#1F3D36]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B9B8E]" /> Confort et relaxation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
