import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { GOOGLE_REVIEWS, PRACTICAL_INFO } from '../data/dentistData';

export const ReviewsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'urgent'>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 4;

  const filteredReviews = GOOGLE_REVIEWS.filter((rev) => {
    if (activeFilter === 'urgent') return rev.treatment?.toLowerCase().includes('urgence');
    if (activeFilter === 'recent') return rev.date.includes('semaine') || rev.date.includes('1 mois');
    return true;
  });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const displayedReviews = filteredReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <section id="avis" className="py-24 md:py-32 relative bg-gradient-to-b from-transparent via-[#F4F8F6]/60 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Google 5.0 Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A876]/20 text-[#8B6B38] text-xs font-semibold tracking-wide uppercase mb-3">
              Expérience patient
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#2A2A2A] mb-3">
              Ce que disent nos patients
            </h2>
            <p className="text-base text-[#2A2A2A]/70 max-w-xl">
              Votre confort physique et émotionnel est au cœur de chaque geste. Découvrez les avis authentiques déposés sur notre fiche Google.
            </p>
          </div>

          {/* Google 5.0 Rating Card */}
          <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#C9A876]/35 shadow-[0_8px_30px_rgba(42,42,42,0.04)]">
            <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-2xl font-bold text-[#2A2A2A]">5.0</span>
                <div className="flex items-center gap-0.5 text-[#C9A876]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A876] text-[#C9A876]" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-[#2A2A2A]/70 flex items-center gap-1.5">
                <span className="font-semibold text-[#2A2A2A]">14 avis vérifiés</span>
                <span>•</span>
                <span className="text-[#5B9B8E] font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> 100% Positifs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar and pagination controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveFilter('all'); setCurrentPage(0); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#5B9B8E] text-white shadow-sm'
                  : 'bg-white text-[#2A2A2A]/70 hover:bg-black/5 border border-black/5'
              }`}
            >
              Tous les avis (14)
            </button>
            <button
              onClick={() => { setActiveFilter('recent'); setCurrentPage(0); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === 'recent'
                  ? 'bg-[#5B9B8E] text-white shadow-sm'
                  : 'bg-white text-[#2A2A2A]/70 hover:bg-black/5 border border-black/5'
              }`}
            >
              Récents
            </button>
            <button
              onClick={() => { setActiveFilter('urgent'); setCurrentPage(0); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === 'urgent'
                  ? 'bg-[#5B9B8E] text-white shadow-sm'
                  : 'bg-white text-[#2A2A2A]/70 hover:bg-black/5 border border-black/5'
              }`}
            >
              Prise en charge urgence
            </button>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#2A2A2A]/60">
                Page {currentPage + 1} sur {totalPages}
              </span>
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                className="p-1.5 rounded-lg bg-white border border-black/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 transition-all"
                aria-label="Page précédente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                className="p-1.5 rounded-lg bg-white border border-black/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 transition-all"
                aria-label="Page suivante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-item-${rev.id}`}
              className="p-6 sm:p-7 rounded-[22px] bg-white/80 backdrop-blur-lg border border-white/90 shadow-[0_4px_20px_rgba(42,42,42,0.03)] hover:shadow-[0_12px_32px_rgba(42,42,42,0.06)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#A8D5C8]/40 to-[#7FA8C9]/30 flex items-center justify-center font-semibold text-[#1F3D36] text-sm">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#2A2A2A] flex items-center gap-1.5">
                        <span>{rev.author}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B9B8E]" />
                        <span className="text-[11px] font-normal text-[#2A2A2A]/50">Avis vérifié</span>
                      </div>
                      <div className="text-[11px] text-[#2A2A2A]/55">
                        {rev.date} {rev.treatment ? `• ${rev.treatment}` : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#C9A876]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A876] text-[#C9A876]" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm text-[#2A2A2A]/80 leading-relaxed font-normal mb-5 relative pl-3 border-l-2 border-[#A8D5C8]/40 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Clinic Response (discreet, indented) */}
              {rev.clinicReply && (
                <div className="mt-2 p-3.5 rounded-xl bg-[#FAFAF8] border border-[#A8D5C8]/25 ml-4 text-xs text-[#2A2A2A]/75">
                  <div className="flex items-center gap-2 mb-1 text-[11px] font-semibold text-[#5B9B8E]">
                    <span className="w-2 h-2 rounded-full bg-[#5B9B8E]" />
                    <span>Réponse du Dr Amel Jemal ({rev.clinicReplyDate})</span>
                  </div>
                  <p className="leading-relaxed font-normal text-[#2A2A2A]/75">
                    {rev.clinicReply}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View all reviews on Google CTA */}
        <div className="mt-12 text-center">
          <a
            id="view-all-google-reviews-btn"
            href={PRACTICAL_INFO.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#2A2A2A] bg-white hover:bg-[#FAFAF8] border border-black/10 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <span>Voir tous les avis sur Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#5B9B8E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
