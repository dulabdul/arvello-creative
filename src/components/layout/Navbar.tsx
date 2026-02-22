// src/components/layout/Navbar.tsx
import { useState } from 'react';
import { Menu, Zap, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { getNavLinks } from '@/config/navigation';

interface NavbarProps {
  brandName?: string;
  currentLang: 'id' | 'en';
  currentPath?: string;
}

export default function Navbar({
  brandName = 'FasterUI',
  currentLang,
  currentPath = '/',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = getNavLinks(currentLang);

  // Bersihkan slash ganda jika ada
  const safePath = currentPath.replace(/\/+/g, '/');

  // --- LOGIKA BARU: Cek HANYA untuk halaman DETAIL blog ---
  // Menandai rute sebagai detail jika dimulai dengan /blog/ atau /en/blog/
  // DAN memiliki karakter tambahan (slug) setelahnya.
  const isBlogDetailRoute =
    (safePath.startsWith('/blog/') && safePath.length > '/blog/'.length) ||
    (safePath.startsWith('/en/blog/') && safePath.length > '/en/blog/'.length);

  // Logika Switch Bahasa Dinamis Berdasarkan URL Saat Ini
  let toggleLangPath = '/';
  if (currentLang === 'id') {
    // Jika di ID, tambahkan /en di awal URL
    toggleLangPath = safePath === '/' ? '/en/' : `/en${safePath}`;
  } else {
    // Jika di EN, hapus awalan /en dari URL
    toggleLangPath = safePath.replace(/^\/en(\/|$)/, '/') || '/';
  }

  const toggleLangText = currentLang === 'id' ? 'EN' : 'ID';

  return (
    <header className='fixed top-4 w-full z-50 px-4 md:px-8'>
      <div className='container mx-auto max-w-7xl flex items-center justify-between'>
        {/* Brand Kiri */}
        <a
          href={currentLang === 'id' ? '/' : '/en/'}
          className='flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 hover:opacity-80 transition-opacity'>
          <div className='bg-slate-900 text-white p-1 rounded-md'>
            <Zap className='w-5 h-5 fill-current' />
          </div>
          {brandName}
        </a>

        {/* Tengah: Glassmorphism Pill */}
        <nav className='hidden md:flex items-center gap-8 bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full px-8 py-3'>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors'>
              {link.name}
            </a>
          ))}
        </nav>

        {/* Kanan: Language Switcher - Disembunyikan HANYA di Detail Blog */}
        <div className='hidden md:flex items-center gap-4 min-w-[80px] justify-end'>
          {!isBlogDetailRoute && (
            <a href={toggleLangPath}>
              <Button
                variant='outline'
                className='rounded-xl flex items-center gap-2 border-slate-300 hover:bg-slate-100'>
                <Globe className='w-4 h-4 text-slate-600' />
                <span className='font-bold text-slate-700'>
                  {toggleLangText}
                </span>
              </Button>
            </a>
          )}
        </div>

        {/* Mobile Nav */}
        <div className='md:hidden'>
          <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='bg-white/50 backdrop-blur-md rounded-full'>
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='flex flex-col'>
              {/* Menu List untuk Mobile */}
              <div className='flex flex-col gap-6 mt-12 mb-8'>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className='text-lg font-semibold text-slate-800'>
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Language Switcher Mobile - Disembunyikan HANYA di Detail Blog */}
              {!isBlogDetailRoute && (
                <div className='mt-auto border-t border-slate-200 pt-6'>
                  <a
                    href={toggleLangPath}
                    className='flex items-center gap-2 font-bold text-lg text-blue-600'>
                    <Globe className='w-5 h-5' /> Switch to{' '}
                    {currentLang === 'id' ? 'English' : 'Indonesian'}
                  </a>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
