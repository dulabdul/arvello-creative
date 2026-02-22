import { useState } from 'react';
import { Menu, Zap, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface NavbarProps {
  brandName?: string;
  currentLang: 'id' | 'en';
}

export default function Navbar({
  brandName = 'FasterUI',
  currentLang,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Link navbar dinamis sesuai bahasa
  const navLinks =
    currentLang === 'id'
      ? [
          { name: 'Beranda', href: '#home' },
          { name: 'Layanan', href: '#services' },
          { name: 'Cara Kerja', href: '#how-it-works' },
          { name: 'Portofolio', href: '#portfolio' },
          { name: 'Templates', href: '#template' },
          { name: 'FAQ', href: '#faq' },
        ]
      : [
          { name: 'Home', href: '#home' },
          { name: 'Services', href: '#services' },
          { name: 'How It Works', href: '#how-it-works' },
          { name: 'Porfolio', href: '#portfolio' },
          { name: 'Templates', href: '#template' },
          { name: 'FAQ', href: '#faq' },
        ];

  // Tentukan path untuk tombol switch bahasa
  // Jika sedang di ID, tombol mengarah ke EN (/en/). Jika di EN, mengarah ke ID (/).
  const toggleLangPath = currentLang === 'id' ? '/en/' : '/';
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

        {/* Kanan: Language Switcher (Pengganti Auth) */}
        <div className='hidden md:flex items-center gap-4'>
          <a href={toggleLangPath}>
            <Button
              variant='outline'
              className='rounded-xl flex items-center gap-2 border-slate-300 hover:bg-slate-100'>
              <Globe className='w-4 h-4 text-slate-600' />
              <span className='font-bold text-slate-700'>{toggleLangText}</span>
            </Button>
          </a>
        </div>

        {/* Mobile Nav (Diringkas untuk contoh) */}
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
            <SheetContent side='right'>
              {/* Tambahkan link mobile dan tombol switch bahasa di sini */}
              <a
                href={toggleLangPath}
                className='mt-8 flex items-center gap-2 font-bold text-lg'>
                <Globe className='w-5 h-5' /> Switch to{' '}
                {currentLang === 'id' ? 'English' : 'Indonesian'}
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
