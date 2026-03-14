// src/components/layout/Navbar.tsx
import { useState } from 'react';
import { Menu, Zap, Globe, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { getNavLinks, resolveAnchorLink } from '@/config/navigation';

interface NavbarProps {
  brandName?: string;
  currentLang: 'id' | 'en';
  currentPath?: string;
  serviceCategories?: { name: string; slug: string }[];
  alternativeLangPath?: string;
}

export default function Navbar({
  brandName = 'FasterUI',
  currentLang,
  currentPath = '/',
  serviceCategories = [],
  alternativeLangPath,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navLinks = getNavLinks(currentLang);

  // Bersihkan slash ganda jika ada
  const safePath = currentPath.replace(/\/+/g, '/');

  // Helper untuk membuat href dinamis berdasarkan posisi halaman
  const resolveHref = (href: string) => resolveAnchorLink(href, currentPath, currentLang);

  // ─── Localized path alias map ─────────────────────────────────────────────
  // Maps localized paths to their language counterparts.
  // ADD NEW LOCALIZED ROUTES HERE — single source of truth.
  const pathAliasMap: Record<string, string> = {
    '/layanan':      '/en/services', // ID → EN
    '/en/services':  '/layanan',     // EN → ID
  };

  // Dynamic: /layanan/[slug] ↔ /en/services/[slug]
  const layananSubMatch = safePath.match(/^\/layanan\/(.+)$/);
  const enServicesSubMatch = safePath.match(/^\/en\/services\/(.+)$/);

  // Logika Switch Bahasa Dinamis
  let toggleLangPath = '/';
  
  if (alternativeLangPath) {
    toggleLangPath = alternativeLangPath;
  } else if (currentLang === 'id') {
    if (layananSubMatch) {
      toggleLangPath = `/en/services/${layananSubMatch[1]}`;
    } else {
      toggleLangPath =
        pathAliasMap[safePath] ??
        (safePath === '/' ? '/en/' : `/en${safePath}`);
    }
  } else {
    if (enServicesSubMatch) {
      toggleLangPath = `/layanan/${enServicesSubMatch[1]}`;
    } else {
      toggleLangPath =
        pathAliasMap[safePath] ??
        (safePath.replace(/^\/en(\/|$)/, '/') || '/');
    }
  }

  const toggleLangText = currentLang === 'id' ? 'EN' : 'ID';
  const toggleLangFullText =
    currentLang === 'id' ? 'Switch to English' : 'Ganti ke Indonesia';

  return (
    <header className='fixed top-4 w-full z-50 px-4 md:px-8'>
      <div className='container mx-auto max-w-7xl flex items-center justify-between'>
        {/* --- BRAND KIRI --- */}
        <a
          href={currentLang === 'id' ? '/' : '/en/'}
          className='flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 hover:opacity-80 transition-opacity'
          aria-label='Homepage'>
          <div className='bg-slate-900 text-white p-1 rounded-md'>
            <Zap className='w-5 h-5 fill-current' />
          </div>
          {brandName}
        </a>

        {/* --- TENGAH: GLASSMORPHISM PILL (DESKTOP) --- */}
        <nav className='hidden md:flex items-center gap-8 bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full px-8 py-3'>
          {navLinks.map((link) => {
            const isServices = link.href === '/layanan' || link.href === '/en/services';
            if (isServices && serviceCategories.length > 0) {
              return (
                <div
                  key={link.name}
                  className='relative'
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}>
                  <a
                    href={resolveHref(link.href)}
                    className='flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors'>
                    {link.name}
                    <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}><path d='m6 9 6 6 6-6'/></svg>
                  </a>
                  {/* Dropdown */}
                  {isServicesOpen && (
                    <div className='absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50'>
                      <div className='bg-white/95 backdrop-blur-xl border border-slate-100 shadow-xl rounded-2xl py-2 min-w-[180px]'>
                        {serviceCategories.map((cat) => (
                          <a
                            key={cat.slug}
                            href={currentLang === 'id' ? `/layanan/${cat.slug}` : `/en/services/${cat.slug}`}
                            className='flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 transition-all'>
                            <span className='w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0' />
                            {cat.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={link.name}
                href={resolveHref(link.href)}
                className='text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors'>
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* --- KANAN: LANGUAGE SWITCHER (DESKTOP) --- */}
        <div className='hidden md:flex items-center gap-4 min-w-[80px] justify-end'>
          <a
            href={toggleLangPath}
            aria-label={`Switch language to ${toggleLangFullText}`}>
              <Button
                variant='outline'
                className='rounded-xl flex items-center gap-2 border-slate-300 hover:bg-slate-100'>
                <Globe className='w-4 h-4 text-slate-600' />
                <span className='font-bold text-slate-700'>
                  {toggleLangText}
                </span>
              </Button>
            </a>
        </div>

        {/* --- MOBILE NAV --- */}
        <div className='md:hidden'>
          <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              {/* FIX PAGESPEED: Menambahkan aria-label dan sr-only */}
              <Button
                variant='ghost'
                size='icon'
                className='bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-full'
                aria-label='Toggle navigation menu'>
                <Menu className='h-6 w-6 text-slate-800' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side='right'
              className='flex flex-col w-[300px] sm:w-[350px] bg-white border-l border-slate-100 p-6'>
              {/* Header Mobile Menu (Logo) */}
              <div className='flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 mt-4 mb-8 pb-6 border-b border-slate-100'>
                <div className='bg-slate-900 text-white p-1 rounded-md'>
                  <Zap className='w-5 h-5 fill-current' />
                </div>
                {brandName}
              </div>

              {/* Menu List untuk Mobile */}
              <nav className='flex flex-col gap-2 flex-grow overflow-y-auto'>
                {navLinks.map((link) => {
                  const isServices = link.href === '/layanan' || link.href === '/en/services';
                  return (
                    <div key={link.name}>
                      <a
                        href={resolveHref(link.href)}
                        onClick={() => setIsOpen(false)}
                        className='flex items-center justify-between py-3 px-2 text-lg font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all'>
                        {link.name}
                        <ChevronRight className='w-5 h-5 text-slate-300' />
                      </a>
                      {/* Sub-items for Services on mobile */}
                      {isServices && serviceCategories.length > 0 && (
                        <div className='flex flex-col gap-0.5 ml-4 mb-2'>
                          {serviceCategories.map((cat) => (
                            <a
                              key={cat.slug}
                              href={currentLang === 'id' ? `/layanan/${cat.slug}` : `/en/services/${cat.slug}`}
                              onClick={() => setIsOpen(false)}
                              className='flex items-center gap-2 py-2 px-3 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-all'>
                              <span className='w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0' />
                              {cat.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Language Switcher Mobile (Revamped UI) */}
              <div className='mt-auto pt-6 border-t border-slate-100'>
                <a
                  href={toggleLangPath}
                  className='flex items-center justify-center gap-2 w-full py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-2xl transition-all font-bold text-base'>
                  <Globe className='w-5 h-5 text-slate-600' />
                  {toggleLangFullText}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
