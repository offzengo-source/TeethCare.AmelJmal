import React from 'react';
import { X, Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Calendar } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div
      id="service-detail-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="service-detail-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-[28px] bg-white/95 backdrop-blur-2xl border border-white p-7 sm:p-9 shadow-2xl text-left animate-in zoom-in-95 duration-200"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#2A2A2A]/50 hover:text-[#2A2A2A] hover:bg-black/5 transition-colors"
          aria-label="Fermer la fenêtre"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge & Duration */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#A8D5C8]/30 text-[#1F3D36] text-xs font-semibold">
            Protocole de soin
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#2A2A2A]/60 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#5B9B8E]" />
            {service.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-[#2A2A2A] mb-3">
          {service.title}
        </h3>

        {/* Full description */}
        <p className="text-sm text-[#2A2A2A]/80 leading-relaxed mb-6 font-normal">
          {service.fullDesc}
        </p>

        {/* Recommended for */}
        <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#A8D5C8]/30 mb-6">
          <div className="text-xs font-semibold text-[#5B9B8E] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quand réaliser ce soin ?</span>
          </div>
          <p className="text-xs text-[#2A2A2A]/80 leading-relaxed font-normal">
            {service.recommendedFor}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <div className="text-[11px] font-semibold text-[#2A2A2A]/50 uppercase tracking-wider mb-2">
            Mots-clés associés
          </div>
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-black/[0.03] text-[11px] font-medium text-[#2A2A2A]/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-black/5">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl text-xs font-semibold text-[#2A2A2A]/70 hover:bg-black/5 transition-colors flex-1"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookService(service.id);
            }}
            className="flex-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#5B9B8E] hover:bg-[#478276] shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Prendre RDV pour ce soin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
