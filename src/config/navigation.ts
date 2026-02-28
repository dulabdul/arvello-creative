// src/config/navigation.ts

export type NavItem = {
  name: {
    id: string;
    en: string;
  };
  href: string;
};
const isDevMode = import.meta.env.DEV;

// --- SINGLE SOURCE OF TRUTH ---
export const navigationData: NavItem[] = [
  { name: { id: 'Beranda', en: 'Home' }, href: '#home' },
  { name: { id: 'Cara Kerja', en: 'How It Works' }, href: '#how-it-works' },
  { name: { id: 'Layanan', en: 'Service' }, href: '#what-we-do' },
  { name: { id: 'Projects', en: 'Projects' }, href: '#portfolio' },
  { name: { id: 'Pricing', en: 'Pricing' }, href: '#pricing' },
  //   { name: { id: 'Templates', en: 'Templates' }, href: '#template' },
  { name: { id: 'FAQ', en: 'FAQ' }, href: '#faq' },
  { name: { id: 'Kontak', en: 'Contact' }, href: '#contact' },
  { name: { id: 'Blog', en: 'Blog' }, href: '/blog' },
];

// Helper function agar komponen React & Astro tinggal panggil 1 baris
export const getNavLinks = (lang: 'id' | 'en') => {
  return navigationData.map((item) => ({
    name: item.name[lang],
    href: item.href,
  }));
};
