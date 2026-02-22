// src/config/navigation.ts

export type NavItem = {
  name: {
    id: string;
    en: string;
  };
  href: string;
};

// --- SINGLE SOURCE OF TRUTH ---
export const navigationData: NavItem[] = [
  { name: { id: 'Beranda', en: 'Home' }, href: '#home' },
  { name: { id: 'Layanan', en: 'Services' }, href: '#services' },
  { name: { id: 'Cara Kerja', en: 'How It Works' }, href: '#how-it-works' },
  { name: { id: 'Portofolio', en: 'Portfolio' }, href: '#portfolio' },
  { name: { id: 'Templates', en: 'Templates' }, href: '#template' },
  { name: { id: 'Blog', en: 'Blog' }, href: '/blog' },
  { name: { id: 'FAQ', en: 'FAQ' }, href: '#faq' },
  { name: { id: 'Kontak', en: 'Contact' }, href: '#contact' },
];

// Helper function agar komponen React & Astro tinggal panggil 1 baris
export const getNavLinks = (lang: 'id' | 'en') => {
  return navigationData.map((item) => ({
    name: item.name[lang],
    href: item.href,
  }));
};
