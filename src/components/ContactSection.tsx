import React, { useState } from 'react';
import { Phone, MapPin, Send, MessageCircle, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/dentistData';
import { 
  sendAppointmentEmail, 
  createAppointmentWhatsAppLink, 
  SOINS_LIST, 
  isValidTunisianPhone, 
  formatTunisianPhoneDisplay,
  cleanTunisianDigits 
} from '../services/emailService';

interface ContactSectionProps {
  preselectedServiceId?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedServiceId }) => {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    soin: 'Détartrage & prophylaxie',
    date: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: ''
  });
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  // Minimum date for appointment booking is today
  const todayStr = new Date().toISOString().split('T')[0];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatTunisianPhoneDisplay(raw);
    setFormData((prev) => ({ ...prev, telephone: formatted }));

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
    
    // Strict Tunisian 8-digit phone validation
    const rawDigits = cleanTunisianDigits(formData.telephone);
    if (!formData.nom.trim()) {
      setStatusMessage({
        text: 'Veuillez renseigner votre nom complet.',
        type: 'error'
      });
      return;
    }

    if (!isValidTunisianPhone(formData.telephone)) {
      setPhoneError('Numéro tunisien invalide (8 chiffres requis)');
      setStatusMessage({
        text: '⚠️ Le téléphone doit être un numéro tunisien valide de 8 chiffres (ex : 53 211 200).',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: 'Envoi en cours...', type: '' });

    try {
      const result = await sendAppointmentEmail({
        nom: formData.nom.trim(),
        telephone: formData.telephone.trim(),
        email: formData.email.trim(),
        soin: formData.soin,
        date: formData.date,
        message: formData.message.trim()
      });

      if (result.success) {
        setStatusMessage({
          text: '✅ Votre demande a été envoyée avec succès !',
          type: 'success'
        });
        setSubmittedData({ ...formData });
        // Reset form fields
        setFormData({
          nom: '',
          telephone: '',
          email: '',
          soin: 'Détartrage & prophylaxie',
          date: '',
          message: ''
        });
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

  const handleReset = () => {
    setSubmittedData(null);
    setStatusMessage({ text: '', type: '' });
    setPhoneError(null);
  };

  const currentDigits = cleanTunisianDigits(formData.telephone);

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-gradient-to-b from-transparent via-[#F4F8F6]/50 to-transparent">
      {/* Background soft blurs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#A8D5C8]/15 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Direct Info & Quick Action Buttons Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8D5C8]/25 text-[#2E5E54] text-xs font-semibold tracking-wide uppercase mb-3">
                Prendre contact
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#2A2A2A] mb-4">
                À votre écoute pour un rendez-vous serein
              </h2>
              <p className="text-base text-[#2A2A2A]/70 leading-relaxed">
                Remplissez notre formulaire ou contactez-nous directement par téléphone ou WhatsApp. Notre équipe vous répondra dans les plus brefs délais.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#A8D5C8]/30 text-[#2E5E54] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#2A2A2A]/60 font-medium">Téléphone direct (Tunisie)</div>
                  <a
                    id="contact-direct-phone-link"
                    href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
                    className="text-lg font-bold text-[#2A2A2A] hover:text-[#5B9B8E] transition-colors"
                  >
                    {PRACTICAL_INFO.phone}
                  </a>
                  <div className="text-[11px] text-[#5B9B8E] font-medium">Disponible Lun-Sam</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#7FA8C9]/25 text-[#2C5E8A] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#2A2A2A]/60 font-medium">Adresse du cabinet</div>
                  <div className="text-sm font-semibold text-[#2A2A2A]">
                    {PRACTICAL_INFO.address}
                  </div>
                  <div className="text-[11px] text-[#2A2A2A]/60">Ariana, Tunisie</div>
                </div>
              </div>
            </div>

            {/* 3 Quick Action Buttons */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2A2A2A]/50 mb-3">
                Accès direct & messagerie
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                {/* 1. Appeler maintenant */}
                <a
                  id="btn-call-now"
                  href={`tel:${PRACTICAL_INFO.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white bg-[#5B9B8E] hover:bg-[#478276] shadow-sm hover:shadow-[0_6px_20px_rgba(91,155,142,0.25)] transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler maintenant ({PRACTICAL_INFO.phone})</span>
                </a>

                {/* 2. WhatsApp */}
                <a
                  id="btn-whatsapp-chat"
                  href={PRACTICAL_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl text-sm font-semibold text-[#18392B] bg-[#E8F6F1] hover:bg-[#D5EFE6] border border-[#A8D5C8]/50 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#2E7D59]" />
                  <span>Échanger sur WhatsApp</span>
                </a>

                {/* 3. Itinéraire Google Maps */}
                <a
                  id="btn-maps-directions"
                  href={PRACTICAL_INFO.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold text-[#2A2A2A]/85 bg-white hover:bg-[#FAFAF8] border border-black/10 shadow-sm transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#7FA8C9]" />
                  <span>Itinéraire Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Connected Web Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[28px] bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_45px_rgba(42,42,42,0.04)] relative">
              {submittedData ? (
                <div className="py-10 px-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-[#A8D5C8]/30 text-[#2E5E54] flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-8 h-8 text-[#5B9B8E]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2A2A2A]">
                    Demande transmise avec succès !
                  </h3>
                  <p className="text-sm text-[#2A2A2A]/70 max-w-md mx-auto leading-relaxed">
                    Merci <strong>{submittedData.nom}</strong>. Votre demande de rendez-vous pour <strong>« {submittedData.soin} »</strong> a bien été transmise au cabinet du Dr Amel Jemal. Nous vous recontacterons au <strong>+216 {formatTunisianPhoneDisplay(submittedData.telephone)}</strong>.
                  </p>

                  {/* Immediate confirmation options */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={createAppointmentWhatsAppLink(submittedData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-[#18392B] bg-[#E8F6F1] border border-[#A8D5C8]/60 hover:bg-[#D5EFE6] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#2E7D59]" />
                      <span>Confirmer aussi sur WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-[#5B9B8E] bg-[#FAFAF8] hover:bg-black/5 border border-[#A8D5C8]/40 transition-colors"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                </div>
              ) : (
                <form id="rdv-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2A2A2A] mb-1">
                      Prendre rendez-vous
                    </h3>
                    <p className="text-xs text-[#2A2A2A]/60">
                      Cabinet Dentaire Dr Amel Jemal — Ariana
                    </p>
                  </div>

                  {/* Nom complet */}
                  <div>
                    <label htmlFor="nom" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1.5">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      placeholder="Votre nom complet"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-black/10 focus:border-[#7FA8C9] focus:bg-white focus:outline-none text-sm transition-all"
                    />
                  </div>

                  {/* Téléphone (Strict 8 chiffres tunisiens) & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Téléphone */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="telephone" className="block text-xs font-semibold text-[#2A2A2A]/80">
                          Téléphone (Tunisie 8 chiffres) *
                        </label>
                        <span className={`text-[10px] font-mono ${currentDigits.length === 8 ? 'text-emerald-600 font-bold' : 'text-black/40'}`}>
                          {currentDigits.length}/8 chiffres
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 flex items-center gap-1.5 text-xs font-medium text-black/60 pointer-events-none select-none border-r border-black/10 pr-2">
                          <span className="text-sm">🇹🇳</span>
                          <span className="font-mono text-[11px]">+216</span>
                        </div>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          required
                          maxLength={10}
                          placeholder="53 211 200"
                          value={formData.telephone}
                          onChange={handlePhoneChange}
                          className={`w-full pl-22 pr-4 py-3 rounded-xl bg-[#FAFAF8] border text-sm font-mono tracking-wider focus:bg-white focus:outline-none transition-all ${
                            phoneError
                              ? 'border-red-400 focus:border-red-500 text-red-900'
                              : currentDigits.length === 8
                              ? 'border-emerald-400 focus:border-emerald-500'
                              : 'border-black/10 focus:border-[#7FA8C9]'
                          }`}
                        />
                      </div>
                      {phoneError ? (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>{phoneError}</span>
                        </p>
                      ) : (
                        <p className="text-[10px] text-black/45 mt-1">
                          Accepte uniquement 8 chiffres tunisiens (ex: 53 211 200, 20..., 98...)
                        </p>
                      )}
                    </div>

                    {/* Email (optionnel) */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1.5">
                        Email (optionnel)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="vous@exemple.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-black/10 focus:border-[#7FA8C9] focus:bg-white focus:outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Type de soin & Date souhaitée */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Type de soin */}
                    <div>
                      <label htmlFor="soin" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1.5">
                        Type de soin
                      </label>
                      <select
                        id="soin"
                        name="soin"
                        value={formData.soin}
                        onChange={(e) => setFormData({ ...formData, soin: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-black/10 focus:border-[#7FA8C9] focus:bg-white focus:outline-none text-sm transition-all"
                      >
                        {SOINS_LIST.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date souhaitée */}
                    <div>
                      <label htmlFor="date" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1.5">
                        Date souhaitée
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        min={todayStr}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-black/10 focus:border-[#7FA8C9] focus:bg-white focus:outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Message (optionnel) */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#2A2A2A]/80 mb-1.5">
                      Message (optionnel)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Précisez votre demande..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-black/10 focus:border-[#7FA8C9] focus:bg-white focus:outline-none text-sm transition-all resize-y min-h-[80px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-btn"
                      disabled={isSubmitting || currentDigits.length !== 8}
                      className="w-full py-3.5 px-6 rounded-full bg-[#5B9B8E] text-white text-base font-semibold shadow-md hover:bg-[#4a877b] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <span>Envoyer la demande</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Status Element */}
                    <div
                      id="status"
                      className={`mt-3.5 text-center text-sm font-medium transition-all ${
                        statusMessage.type === 'success'
                          ? 'text-[#2E8B57]'
                          : statusMessage.type === 'error'
                          ? 'text-[#C0392B]'
                          : 'text-[#2A2A2A]/70'
                      }`}
                    >
                      {statusMessage.text}
                    </div>

                    <p className="text-[11px] text-[#2A2A2A]/50 text-center mt-2">
                      Vos informations restent strictement confidentielles et protégées.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
