export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  tags: string[];
  duration: string;
  recommendedFor: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  treatment?: string;
  clinicReply?: string;
  clinicReplyDate?: string;
}

export interface PracticalInfo {
  address: string;
  fullAddress: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  whatsappLink: string;
  mapsLink: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
  accessibility: string[];
}
