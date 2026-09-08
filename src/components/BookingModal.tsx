import React, { useState, useEffect } from 'react';
import { X, Calendar, Phone, Send, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { CLINIC_SERVICES, PRACTICAL_INFO } from '../data/dentistData';
import { 
  sendAppointmentEmail, 
  createAppointmentWhatsAppLink, 
  SOINS_LIST,
  isValidTunisianPhone,
  formatTunisianPhoneDisplay,
  cleanTunisianDigits 
} from '../services/emailService';

interface BookingModalProps {
  isOpen: boolean;
  initialServiceId?: string;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialServiceId,
  onClose,
}) => {
  const getInitialSoin = (id?: string) => {
    if (!id) return SOINS_LIST[0];
    const match = CLINIC_SERVICES.find(s => s.id === id);
    return match ? match.title : SOINS_LIST[0];
  };

  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [soin, setSoin] = useState<string>(getInitialSoin(initialServiceId));
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: ''
  });
  const [submittedData, setSubmittedData] = useState<{
    nom: string;
    telephone: string;
    email?: string;
    soin: string;
    date?: string;
    message?: string;
  } | null>(null);

  // Sync initial service when opened
  useEffect(() => {
    if (initialServiceId) {
      setSoin(getInitialSoin(initialServiceId));
    }
  }, [initialServiceId, isOpen]);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatTunisianPhoneDisplay(raw);
    setTelephone(formatted);

    const digits = cleanTunisianDigits(raw);
    if (digits.length > 0 && digits.length < 8) {
      setPhoneError('Numéro incomplet (8 chiffres requis)');
    } else if (digits.length === 8 && !/^[2-9]/.test(digits)) {
      setPhoneError('Préfixe tunisien invalide (doit commencer par 2, 3, 4, 5, 7 ou 9)');
    } else {
      setPhoneError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nom.trim()) {
      setStatusMessage({
        text: 'Veuillez renseigner votre nom.',
        type: 'error'
      });
      return;
    }

    if (!isValidTunisianPhone(telephone)) {
      setPhoneError('Numéro tunisien invalide (8 chiffres requis)');
      setStatusMessage({
        text: '⚠️ Le téléphone doit être un numéro tunisien valide de 8 chiffres (ex : 53 211 200).',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: 'Envoi en cours...', type: '' });

    const payload = {
      nom: nom.trim(),
      telephone: telephone.trim(),
      email: email.trim(),
      soin,
      date,
      message: message.trim()
    };

    try {
      const result = await sendAppointmentEmail(payload);
      if (result.success) {
        setStatusMessage({
          text: '✅ Votre demande a été envoyée avec succès !',
          type: 'success'
        });
        setSubmittedData(payload);
        setPhoneError(null);
      } else {
        setStatusMessage({
          text: "❌ Une erreur est survenue. Merci d'appeler directement le cabinet.",
          type: 'error'
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        text: "❌ Une erreur est survenue. Merci d'appeler directement le cabinet.",
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmittedData(null);
    setStatusMessage({ text: '', type: '' });
    setPhoneError(null);
    onClose();
  };

  const currentDigits = cleanTunisianDigits(telephone);

  return (
    <div
      id="booking-modal-backdrop"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        id="booking-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-[28px] bg-white/95 backdrop-blur-2xl border border-white p-6 sm:p-8 shadow-2xl text-left animate-in zoom-in-95 duration-200 my-8"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#2A2A2A]/50 hover:text-[#2A2A2A] hover:bg-black/5 transition-colors"
          aria-label="Fermer la fenêtre de prise de rendez-vous"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          <div className="py-6 px-2 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#A8D5C8]/30 flex items-center justify-center mx-auto text-[#5B9B8E]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-[#2A2A2A]">
              Demande enregistrée avec succès
            </h3>
            <p className="text-sm text-[#2A2A2A]/70 max-w-sm mx-auto leading-relaxed">
              Le secrétariat du <strong>Dr Amel Jemal</strong> a bien reçu votre demande pour <strong>« {submittedData.soin} »</strong> et vous contactera au <strong>+216 {formatTunisianPhoneDisplay(submittedData.telephone)}</strong> pour convenir de l'horaire précis.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={createAppointmentWhatsAppLink(submittedData)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#18392B] bg-[#E8F6F1] border border-[#A8D5C8]/50 hover:bg-[#D5EFE6] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#2E7D59]" />
                <span>Confirmer aussi sur WhatsApp</span>
              </a>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#2A2A2A]/80 hover:bg-black/5 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <form id="modal-rdv-form" onSubmit={handleSubmit} className="space-y-3.5">
            <div className="mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8D5C8]/25 text-[#2E5E54] text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Prise de rendez-vous en ligne</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#2A2A2A]">
                Prendre rendez-vous
              </h3>
              <p className="text-xs text-[#777] mt-0.5">
                Cabinet Dentaire Dr Amel Jemal — Ariana
              </p>
            </div>

            {/* Nom complet */}
            <div>
              <label htmlFor="modal-nom" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1">
                Nom complet *
              </label>
              <input
                id="modal-nom"
                name="nom"
                type="text"
                required
                placeholder="Votre nom complet"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E0E0DC] text-sm focus:border-[#7FA8C9] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Téléphone (Strict 8 chiffres tunisiens) & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="modal-telephone" className="block text-xs font-semibold text-[#2A2A2A]/80">
                    Téléphone (Tunisie) *
                  </label>
                  <span className={`text-[10px] font-mono ${currentDigits.length === 8 ? 'text-emerald-600 font-bold' : 'text-black/40'}`}>
                    {currentDigits.length}/8 chiffres
                  </span>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-2.5 flex items-center gap-1 text-xs font-medium text-black/60 pointer-events-none select-none border-r border-black/10 pr-1.5">
                    <span className="text-xs">🇹🇳</span>
                    <span className="font-mono text-[11px]">+216</span>
                  </div>
                  <input
                    id="modal-telephone"
                    name="telephone"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="53 211 200"
                    value={telephone}
                    onChange={handlePhoneChange}
                    className={`w-full pl-20 pr-3 py-2.5 rounded-xl bg-[#FAFAF8] border text-sm font-mono tracking-wider focus:bg-white focus:outline-none transition-all ${
                      phoneError
                        ? 'border-red-400 focus:border-red-500 text-red-900'
                        : currentDigits.length === 8
                        ? 'border-emerald-400 focus:border-emerald-500'
                        : 'border-[#E0E0DC] focus:border-[#7FA8C9]'
                    }`}
                  />
                </div>
                {phoneError && (
                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1">
                  Email (optionnel)
                </label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E0E0DC] text-sm focus:border-[#7FA8C9] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Type de soin & Date souhaitée */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-soin" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1">
                  Type de soin
                </label>
                <select
                  id="modal-soin"
                  name="soin"
                  value={soin}
                  onChange={(e) => setSoin(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E0E0DC] text-sm focus:border-[#7FA8C9] focus:bg-white focus:outline-none transition-all"
                >
                  {SOINS_LIST.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-date" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1">
                  Date souhaitée
                </label>
                <input
                  id="modal-date"
                  name="date"
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E0E0DC] text-sm focus:border-[#7FA8C9] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Message (optionnel) */}
            <div>
              <label htmlFor="modal-message" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1">
                Message (optionnel)
              </label>
              <textarea
                id="modal-message"
                name="message"
                rows={2}
                placeholder="Précisez votre demande..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAFAF8] border border-[#E0E0DC] text-sm focus:border-[#7FA8C9] focus:bg-white focus:outline-none transition-all resize-y min-h-[60px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                id="modal-submit-btn"
                disabled={isSubmitting || currentDigits.length !== 8}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-base font-semibold text-white bg-[#5B9B8E] hover:bg-[#4a877b] active:scale-[0.98] shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer la demande</span>
                  </>
                )}
              </button>

              <div
                id="modal-status"
                className={`mt-2.5 text-center text-xs font-medium transition-all ${
                  statusMessage.type === 'success'
                    ? 'text-[#2E8B57]'
                    : statusMessage.type === 'error'
                    ? 'text-[#C0392B]'
                    : 'text-[#2A2A2A]/70'
                }`}
              >
                {statusMessage.text}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-[#2A2A2A]/60 pt-2 border-t border-black/5">
                <span>Besoin d'aide immédiate ?</span>
                <a
                  href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
                  className="font-semibold text-[#5B9B8E] hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{PRACTICAL_INFO.phone}</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
