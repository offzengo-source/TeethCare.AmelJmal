import { ServiceItem, ReviewItem, PracticalInfo } from '../types';

export const CLINIC_SERVICES: ServiceItem[] = [
  {
    id: 'detartrage',
    title: 'Détartrage & prophylaxie',
    shortDesc: 'Nettoyage en profondeur par ultrasons, polissage doux et élimination méticuleuse du tartre et des taches superficielles.',
    fullDesc: 'La prophylaxie dentaire est la pierre angulaire de votre santé buccale. Grâce à nos inserts ultrasoniques doux et notre aéropolissage aux micro-particules végétales, nous délogeons la plaque bactérienne et le tartre même dans les zones difficiles d’accès, sans endommager l’émail.',
    icon: 'Sparkles',
    tags: ['détartrage', 'tartre', 'gencives', 'nettoyage', 'haleine', 'hygiène', 'prophylaxie', 'polissage'],
    duration: '30 - 45 min',
    recommendedFor: 'Tous les 6 à 12 mois pour préserver l’intégrité gingivale et la clarté du sourire.'
  },
  {
    id: 'blanchiment',
    title: 'Blanchiment dentaire',
    shortDesc: 'Éclaircissement dentaire professionnel au fauteuil et à domicile pour raviver l’éclat de vos dents en toute sécurité.',
    fullDesc: 'Un protocole sécurisé et contrôlé médicalement qui préserve la vitalité de vos dents. Nous utilisons des gels haute performance associés à une activation lumineuse douce pour gagner jusqu’à 4 à 6 teintes sans fragiliser l’émail.',
    icon: 'SunMedium',
    tags: ['blanchiment', 'éclaircissement', 'sourire blanc', 'dents jaunes', 'éclat', 'taches'],
    duration: '45 - 60 min',
    recommendedFor: 'Dents ternies par le café, le thé ou le tabac, pour un événement ou un coup d’éclat immédiat.'
  },
  {
    id: 'soins-conservateurs',
    title: 'Soins conservateurs (caries)',
    shortDesc: 'Traitement micro-invasif des caries, obturations biomimétiques en résine composite esthétique et inlays discrets.',
    fullDesc: 'Notre priorité est de conserver au maximum la matière dentaire naturelle vivante. Nous réalisons des restaurations en composite nano-hybride mimant fidèlement la transparence et la teinte exacte de vos dents naturelles.',
    icon: 'ShieldCheck',
    tags: ['carie', 'plombage', 'composite', 'inlay', 'douleur', 'sensibilité', 'obturation', 'dents creuses'],
    duration: '30 - 50 min',
    recommendedFor: 'Sensibilité au chaud/froid, tache sombre ou douleur lors de la mastication.'
  },
  {
    id: 'urgences',
    title: 'Urgences dentaires',
    shortDesc: 'Prise en charge prioritaire dans la journée pour soulager la douleur aiguë, les traumatismes et les infections.',
    fullDesc: 'Une rage de dent ou une dent cassée ne peut attendre. Le Dr Amel Jemal réserve chaque jour des créneaux dédiés pour poser un diagnostic immédiat (radio numérique à faible dose) et stopper immédiatement la douleur.',
    icon: 'Activity',
    tags: ['urgence', 'rage de dent', 'abcès', 'dent cassée', 'douleur aiguë', 'traumatisme', 'gonflement'],
    duration: 'Prise en charge immédiate',
    recommendedFor: 'Douleurs violentes et continues, traumatisme suite à un choc, pulpite ou abcès.'
  },
  {
    id: 'esthetique',
    title: 'Esthétique dentaire',
    shortDesc: 'Facettes céramiques ultra-fines, réalignement harmonieux et réhabilitation globale de votre sourire.',
    fullDesc: 'Une analyse sur-mesure de la morphologie de votre visage et de vos lèvres pour sculpter un sourire lumineux et harmonieux. Nous concevons des facettes céramiques en porcelaine feldspathique d’un naturel remarquable.',
    icon: 'HeartHandshake',
    tags: ['esthétique', 'facettes', 'porcelaine', 'alignement', 'dents écartées', 'relooking sourire', 'forme des dents'],
    duration: 'Sur plan de traitement',
    recommendedFor: 'Dents ébréchées, espacées, mal alignées ou de coloration rebelle.'
  },
  {
    id: 'suivi-controle',
    title: 'Suivi & contrôle',
    shortDesc: 'Bilan bucco-dentaire annuel complet, radiographie panoramique numérique et dépistage précoce des affections.',
    fullDesc: 'Mieux vaut prévenir que guérir. Ce rendez-vous comprend l’examen complet des muqueuses, des dents, du parodonte, un bilan occlusal ainsi que des conseils d’hygiène personnalisés adaptés à votre mode de vie.',
    icon: 'CheckCircle2',
    tags: ['contrôle', 'bilan', 'check-up', 'radio', 'panoramique', 'prévention', 'consultation'],
    duration: '20 - 30 min',
    recommendedFor: 'Recommandé chaque année pour les adultes et les enfants.'
  }
];

export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Syrine B.',
    rating: 5,
    date: 'Il y a 2 semaines',
    treatment: 'Détartrage & Contrôle',
    comment: 'Une praticienne exceptionnelle. J’avais une phobie terrible du dentiste depuis l’enfance, mais le Dr Amel Jemal m’a mise en totale confiance dès la première seconde. Douceur, écoute et aucune douleur. Le cabinet est d’une propreté clinique irréprochable.',
    clinicReply: 'Chère Syrine, un immense merci pour vos mots bienveillants ! Vous avoir réconciliée avec les soins dentaires est notre plus belle récompense. Au plaisir de vous revoir pour votre contrôle régulier.',
    clinicReplyDate: 'Il y a 2 semaines'
  },
  {
    id: 'rev-2',
    author: 'Mehdi Khemir',
    rating: 5,
    date: 'Il y a 1 mois',
    treatment: 'Soins conservateurs',
    comment: 'Accueil très chaleureux et ponctualité exemplaire. Le Dr Jemal prend vraiment le temps d’expliquer chaque étape du soin avec beaucoup de pédagogie. Je recommande vivement les yeux fermés !',
    clinicReply: 'Merci beaucoup Mehdi pour votre retour. La transparence et l’explication de chaque geste sont essentielles pour des soins en toute sérénité.',
    clinicReplyDate: 'Il y a 1 mois'
  },
  {
    id: 'rev-3',
    author: 'Amira Triki',
    rating: 5,
    date: 'Il y a 1 mois',
    treatment: 'Blanchiment dentaire',
    comment: 'Résultat au-delà de mes espérances pour le blanchiment ! Très naturel et aucune sensibilité post-traitement grâce aux précieux conseils du docteur. Cabinet moderne et apaisant à Ariana.',
    clinicReply: 'Ravi que votre nouveau sourire vous plaise autant, Amira ! Merci pour votre confiance.',
    clinicReplyDate: 'Il y a 1 mois'
  },
  {
    id: 'rev-4',
    author: 'Yassine M.',
    rating: 5,
    date: 'Il y a 2 mois',
    treatment: 'Urgence dentaire',
    comment: 'Reçu en urgence pour une rage de dent insupportable un vendredi après-midi. Soulagement immédiat et prise en charge humaine et rassurante. Mille mercis au Dr Amel !',
    clinicReply: 'C’est tout naturel Yassine. Soulager rapidement nos patients en souffrance est notre engagement prioritaire. Bon rétablissement continu !',
    clinicReplyDate: 'Il y a 2 mois'
  },
  {
    id: 'rev-5',
    author: 'Leila Ben Mahmoud',
    rating: 5,
    date: 'Il y a 3 mois',
    treatment: 'Esthétique dentaire',
    comment: 'Excellente dentiste, très professionnelle et minutieuse. On sent la maîtrise et la passion pour son métier. Le cadre est zen et relaxant.',
    clinicReply: 'Merci de tout cœur Leila pour ce magnifique commentaire.',
    clinicReplyDate: 'Il y a 3 mois'
  },
  {
    id: 'rev-6',
    author: 'Mohamed Anis G.',
    rating: 5,
    date: 'Il y a 3 mois',
    treatment: 'Détartrage & Polissage',
    comment: 'Très bonne expérience. Matériel à la pointe de la technologie et hygiène irréprochable. L’accès à l’immeuble Nozha à Ariana est facile.',
    clinicReply: 'Merci Mohamed pour votre fidélité et ce précieux témoignage.',
    clinicReplyDate: 'Il y a 3 mois'
  },
  {
    id: 'rev-7',
    author: 'Inès Chaabane',
    rating: 5,
    date: 'Il y a 4 mois',
    treatment: 'Contrôle & Soins',
    comment: 'Un grand professionnalisme allié à une extrême gentillesse. Les explications sont limpides et le travail est impeccable.',
    clinicReply: 'Merci infiniment Inès ! Nous restons à votre entière disposition.',
    clinicReplyDate: 'Il y a 4 mois'
  },
  {
    id: 'rev-8',
    author: 'Karim Zouari',
    rating: 5,
    date: 'Il y a 5 mois',
    treatment: 'Restauration composite',
    comment: 'Un travail d’artiste sur ma dent de devant, on ne voit absolument aucune différence avec la dent d’origine. Bravo docteur.',
    clinicReply: 'Merci beaucoup Karim ! La biomimétique et la préservation de l’esthétique naturelle sont notre signature.',
    clinicReplyDate: 'Il y a 5 mois'
  },
  {
    id: 'rev-9',
    author: 'Nour El Houda',
    rating: 5,
    date: 'Il y a 6 mois',
    treatment: 'Détartrage doux',
    comment: 'Mains de fée ! Première fois que je n’ai aucune douleur pendant un détartrage. Je recommande à toute ma famille.',
    clinicReply: 'Votre satisfaction et votre confort nous touchent beaucoup, Nour. À très bientôt !',
    clinicReplyDate: 'Il y a 6 mois'
  },
  {
    id: 'rev-10',
    author: 'Tarek Cherif',
    rating: 5,
    date: 'Il y a 7 mois',
    treatment: 'Bilan complet',
    comment: 'Cabinet très propre, respect scrupuleux des heures de rendez-vous et accueil remarquable. Le Dr Jemal est d’un grand calme rassurant.',
    clinicReply: 'Merci Tarek pour ces encouragements et votre fidélité.',
    clinicReplyDate: 'Il y a 7 mois'
  },
  {
    id: 'rev-11',
    author: 'Hela Ben Salem',
    rating: 5,
    date: 'Il y a 8 mois',
    treatment: 'Soins caries',
    comment: 'Très attentionnée, elle prend le temps de s’assurer qu’on ne ressent aucune douleur. Le cabinet inspire confiance et propreté.',
    clinicReply: 'Merci sincèrement Hela pour votre confiance.',
    clinicReplyDate: 'Il y a 8 mois'
  },
  {
    id: 'rev-12',
    author: 'Oussama D.',
    rating: 5,
    date: 'Il y a 9 mois',
    treatment: 'Détartrage',
    comment: 'Service impeccable. Une dentiste consciencieuse, douce et très professionnelle. Tarifs transparents.',
    clinicReply: 'Merci Oussama pour votre recommandation !',
    clinicReplyDate: 'Il y a 9 mois'
  },
  {
    id: 'rev-13',
    author: 'Sonia Trabelsi',
    rating: 5,
    date: 'Il y a 10 mois',
    treatment: 'Consultation & Blanchiment',
    comment: 'Excellente prise en charge du début à la fin. Tout est fait pour apaiser le patient. Très contente du résultat.',
    clinicReply: 'Merci chère Sonia, nous sommes ravis de vous compter parmi nos patients.',
    clinicReplyDate: 'Il y a 10 mois'
  },
  {
    id: 'rev-14',
    author: 'Farouk Bouazizi',
    rating: 5,
    date: 'Il y a 1 an',
    treatment: 'Urgence & Bilan',
    comment: 'Le meilleur cabinet dentaire à Ariana ! Diagnostic rapide et précis, soins sans aucune douleur. Merci Dr Amel.',
    clinicReply: 'Un immense merci Farouk pour ce témoignage si encourageant !',
    clinicReplyDate: 'Il y a 1 an'
  }
];

export const PRACTICAL_INFO: PracticalInfo = {
  address: 'Immeuble Nozha, 18 Rue Ahmed Amine, Khabthani 2080',
  fullAddress: 'Immeuble Nozha, 18 Rue Ahmed Amine, Khabthani 2080, Ariana, Tunisie',
  phone: '53 211 200',
  phoneFormatted: '+216 53 211 200',
  whatsapp: '+216 53 211 200',
  whatsappLink: 'https://wa.me/21653211200?text=Bonjour%20Dr%20Amel%20Jemal,%20je%20souhaite%20prendre%20un%20rendez-vous%20au%20cabinet.',
  mapsLink: 'https://maps.google.com/?q=Cabinet+Dentaire+Dr+Amel+Jemal+18+Rue+Ahmed+Amine+Ariana',
  openingHours: [
    { days: 'Lundi — Vendredi', hours: '08:30 — 18:00' },
    { days: 'Samedi', hours: '08:30 — 13:00' },
    { days: 'Dimanche', hours: 'Fermé (Urgences sur appel)' }
  ],
  accessibility: [
    'Ascenseur disponible dans l’immeuble',
    'Facilité de stationnement à proximité',
    'Accès adapté aux personnes à mobilité réduite'
  ]
};
