// src/config/navigation.ts

export type NavItem = {
  name: {
    id: string;
    en: string;
  };
  // `href` = shared fallback. `hrefLocale` = per-language override.
  href: string;
  hrefLocale?: {
    id?: string;
    en?: string;
  };
};

// --- SINGLE SOURCE OF TRUTH ---
export const navigationData: NavItem[] = [
  { name: { id: 'Beranda', en: 'Home' }, href: '#home' },
  { name: { id: 'Blog', en: 'Blog' }, href: '/blog' },
  { name: { id: 'Cara Kerja', en: 'How It Works' }, href: '#how-it-works' },
  {
    name: { id: 'Layanan', en: 'Services' },
    href: '/layanan',
    hrefLocale: { id: '/layanan', en: '/en/services' },
  },
  { name: { id: 'Projects', en: 'Projects' }, href: '#portfolio' },
  { name: { id: 'Pricing', en: 'Pricing' }, href: '#pricing' },
  //   { name: { id: 'Templates', en: 'Templates' }, href: '#template' },
  { name: { id: 'FAQ', en: 'FAQ' }, href: '#faq' },
  { name: { id: 'Kontak', en: 'Contact' }, href: '#contact' },
];

// Helper: picks hrefLocale[lang] if available, otherwise falls back to href
export const getNavLinks = (lang: 'id' | 'en') => {
  return navigationData.map((item) => ({
    name: item.name[lang],
    href: item.hrefLocale?.[lang] ?? item.href,
  }));
};

/**
 * Resolves a navigation URL based on the current page path and language.
 * Ensures anchor links (#) point to the home page if the user is on a sub-page.
 */
export const resolveAnchorLink = (href: string, currentPath: string, lang: 'id' | 'en') => {
  // Clean path (remove double slashes and trailing slash for comparison)
  const safePath = currentPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  const isHomePage = safePath === '/' || safePath === '/en';

  if (href.startsWith('#')) {
    if (isHomePage) {
      return href; // Anchors work fine on home page
    }
    // Cross-page anchor: redirect to homepage first
    return lang === 'id' ? `/${href}` : `/en/${href}`;
  }

  // Handle absolute internal paths for multi-language
  if (href.startsWith('/') && !href.startsWith('http')) {
    if (lang === 'en' && !href.startsWith('/en')) {
      return `/en${href}`;
    }
  }

  return href;
};
