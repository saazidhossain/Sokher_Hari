import type { MenuItem } from '../types';

// ─── Real dish photos from Shokher Hadi ───────────────────────────────────────
const IMG = {
  chickenRoast:  'https://github.com/user-attachments/assets/0c6abb44-d26d-468c-8d80-d533e2fad052',
  ghoroaFeast:   'https://github.com/user-attachments/assets/ec5d28c4-6dd0-4da3-939f-562cabe09eb4',
  pointedMomos:  'https://github.com/user-attachments/assets/6652fba0-aec3-41b1-a40c-aeefde4734d6',
  pleatMomos:    'https://github.com/user-attachments/assets/f47f991c-ed30-4eec-a043-1e1529b495a9',
  // Curated Unsplash placeholders for items without a dedicated photo yet
  caramelPudding:'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=600',
  bhapaPitha:    'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=600',
  cutlets:       'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=600',
  samosa:        'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600',
} as const;

export const MENU_ITEMS: MenuItem[] = [
  // ── MAINS ──────────────────────────────────────────────────────────────────
  {
    id: 'm1',
    name: 'Shahi Chicken Roast',
    description:
      'Slow-roasted whole chicken in a rich caramelized-onion gravy, finished with crispy fried beresta. Our signature dish — every bite tells a story.',
    price: 180,
    category: 'Mains',
    tags: ['Popular', 'Best Seller', 'Non-Veg'],
    image: IMG.chickenRoast,
    isAvailable: true,
  },
  // ── SNACKS ─────────────────────────────────────────────────────────────────
  {
    id: 's1',
    name: 'Handcrafted Pleated Momos',
    description:
      'Generously filled, beautifully pleated dumplings with a savory spiced filling. Steamed to perfection and served with fiery chutney.',
    price: 150,
    category: 'Snacks',
    tags: ['Popular', 'New'],
    image: IMG.pleatMomos,
    isAvailable: true,
  },
  {
    id: 's2',
    name: 'Pointed Tip Momos',
    description:
      'Delicately hand-folded cone-shaped dumplings, a signature Shokher Hadi style. Light, airy pastry shell with a juicy, aromatic filling inside.',
    price: 130,
    category: 'Snacks',
    tags: ['New'],
    image: IMG.pointedMomos,
    isAvailable: true,
  },
  {
    id: 's3',
    name: 'Crispy Breaded Cutlets',
    description:
      'Golden crumb-coated meat patties with a soft, spiced interior. Round & Star shapes available. Ideal for evening snacks or party trays.',
    price: 60,
    category: 'Snacks',
    tags: ['Popular'],
    image: IMG.cutlets,
    isAvailable: true,
  },
  {
    id: 's4',
    name: 'Envelope Samosas',
    description:
      'Unique envelope-folded crispy pastry packed with spiced meat and aromatics. A twist on a classic — once you try, you can\'t stop.',
    price: 40,
    category: 'Snacks',
    tags: [],
    image: IMG.samosa,
    isAvailable: true,
  },
  // ── DESSERTS ───────────────────────────────────────────────────────────────
  {
    id: 'd1',
    name: 'Classic Caramel Pudding',
    description:
      'Silky-smooth custard with a rich, dark caramel glaze. Chilled, wobbly, and absolutely indulgent — a crowd favourite.',
    price: 120,
    category: 'Desserts',
    tags: ['Popular'],
    image: IMG.caramelPudding,
    isAvailable: true,
  },
  {
    id: 'd2',
    name: 'Traditional Bhapa Pitha',
    description:
      'Steamed rice-flour cakes filled with sweet jaggery and fresh coconut. A nostalgic winter delight straight from grandma\'s kitchen.',
    price: 50,
    category: 'Desserts',
    tags: ['Seasonal'],
    image: IMG.bhapaPitha,
    isAvailable: true,
  },
  // ── FAMILY PACKS ───────────────────────────────────────────────────────────
  {
    id: 'f1',
    name: 'Ghoroa Feast Package',
    description:
      'The full homestyle spread: Polao, Shahi Chicken Roast, Spinach & Mustard Bhortás, Mishti Doi, and Fried Fritters. The complete Shokher Hadi experience for 4–5 people.',
    price: 850,
    category: 'Family Packs',
    tags: ['Special', 'Pre-order', 'Best Seller'],
    image: IMG.ghoroaFeast,
    isAvailable: true,
  },
];

export const CATEGORIES = [
  'All',
  'Mains',
  'Snacks',
  'Desserts',
  'Family Packs',
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

/** Business WhatsApp number (wa.me format — country code + number, no +) */
export const WHATSAPP_NUMBER = '8801799667018';

/** Business config */
export const BUSINESS_CONFIG = {
  name: 'Shokher Hadi',
  nameBn: 'শখের হাঁড়ি',
  tagline: 'Crafted with love, served with warmth.',
  hours: 'Orders: 10 AM – 9 PM · Delivery from 12 PM',
  location: 'Dhaka, Bangladesh',
  whatsapp: WHATSAPP_NUMBER,
  instagram: 'shokher.hadi',
};
