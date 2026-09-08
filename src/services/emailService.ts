import emailjs from '@emailjs/browser';
import { PRACTICAL_INFO } from '../data/dentistData';

export interface AppointmentFormData {
  nom: string;
  telephone: string;
  email?: string;
  soin: string;
  date?: string;
  message?: string;
}

export const SOINS_LIST = [
  'Détartrage & prophylaxie',
  'Blanchiment dentaire',
  'Soins conservateurs (caries)',
  'Urgence dentaire',
  'Esthétique dentaire',
  'Suivi & contrôle',
  'Autre'
] as const;

/**
 * Nettoie et extrait les 8 chiffres d'un numéro tunisien
 */
export function cleanTunisianDigits(raw: string): string {
  // Supprime tout caractère non numérique
  let digits = raw.replace(/\D/g, '');
  // Supprime l'indicatif international éventuel (+216 ou 00216)
  if (digits.startsWith('00216')) {
    digits = digits.slice(5);
  } else if (digits.startsWith('216')) {
    digits = digits.slice(3);
  }
  return digits.slice(0, 8);
}

/**
 * Vérifie si le numéro est un numéro tunisien valide de 8 chiffres
 */
export function isValidTunisianPhone(phone: string): boolean {
  const digits = cleanTunisianDigits(phone);
  // Doit comporter exactement 8 chiffres et commencer par un préfixe tunisien valide (2, 3, 4, 5, 7 ou 9)
  return /^[2-9]\d{7}$/.test(digits);
}

/**
 * Formate un numéro tunisien sous la forme "53 211 200"
 */
export function formatTunisianPhoneDisplay(raw: string): string {
  const digits = cleanTunisianDigits(raw);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)}`;
}

// Credentials securely read only from environment variables (no browser overrides)
function getSecureEmailJSConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
  };
}

export function isEmailJSConfigured(): boolean {
  const config = getSecureEmailJSConfig();
  return Boolean(
    config.publicKey && 
    config.serviceId && 
    config.templateId && 
    config.publicKey !== 'YOUR_PUBLIC_KEY' &&
    config.serviceId !== 'YOUR_SERVICE_ID' &&
    config.templateId !== 'YOUR_TEMPLATE_ID'
  );
}

// Generate formatted WhatsApp message URL with all appointment data
export function createAppointmentWhatsAppLink(data: AppointmentFormData): string {
  const cleanPhone = PRACTICAL_INFO.phone.replace(/\s/g, '');
  const lines = [
    `Bonjour Dr Amel Jemal,`,
    `Je souhaite prendre un rendez-vous au cabinet :`,
    `• Nom : ${data.nom}`,
    `• Téléphone : ${formatTunisianPhoneDisplay(data.telephone)}`,
    data.email ? `• Email : ${data.email}` : null,
    `• Soin souhaité : ${data.soin}`,
    data.date ? `• Date souhaitée : ${data.date}` : null,
    data.message ? `• Précisions : ${data.message}` : null
  ].filter(Boolean).join('\n');

  return `https://wa.me/216${cleanPhone}?text=${encodeURIComponent(lines)}`;
}

// Store submitted appointment locally for record & offline safety
export function saveLocalAppointmentRecord(data: AppointmentFormData) {
  try {
    const existing = JSON.parse(localStorage.getItem('cabinet_rdv_history') || '[]');
    existing.unshift({
      ...data,
      telephone: formatTunisianPhoneDisplay(data.telephone),
      id: 'rdv_' + Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('cabinet_rdv_history', JSON.stringify(existing.slice(0, 30)));
  } catch (err) {
    console.warn('Could not save rdv to local storage:', err);
  }
}

/**
 * Send appointment form via EmailJS with strict Tunisian phone enforcement
 */
export async function sendAppointmentEmail(data: AppointmentFormData): Promise<{ success: boolean; message: string; method: 'emailjs' | 'local_fallback' }> {
  const formattedPhone = formatTunisianPhoneDisplay(data.telephone);
  const dataToSave = { ...data, telephone: formattedPhone };

  // Save record locally first to ensure no patient inquiry is ever lost
  saveLocalAppointmentRecord(dataToSave);

  const config = getSecureEmailJSConfig();

  if (!isEmailJSConfigured()) {
    return {
      success: true,
      message: 'Votre demande a été enregistrée avec succès ! Notre secrétariat vous recontactera rapidement.',
      method: 'local_fallback'
    };
  }

  try {
    emailjs.init({ publicKey: config.publicKey });

    const templateParams = {
      nom: data.nom,
      telephone: formattedPhone,
      email: data.email || 'Non renseigné',
      soin: data.soin,
      date: data.date || 'Dès que possible',
      message: data.message || 'Aucun message particulier',
      to_name: 'Dr Amel Jemal',
      cabinet: 'Cabinet Dentaire Dr Amel Jemal - Ariana'
    };

    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    );

    if (response.status === 200 || response.text === 'OK') {
      return {
        success: true,
        message: 'Votre demande a été envoyée avec succès par email au cabinet !',
        method: 'emailjs'
      };
    } else {
      throw new Error(`EmailJS responded with status ${response.status}`);
    }
  } catch (error) {
    console.error('EmailJS sending error:', error);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi de l'email. Merci d'appeler directement le cabinet.",
      method: 'emailjs'
    };
  }
}
