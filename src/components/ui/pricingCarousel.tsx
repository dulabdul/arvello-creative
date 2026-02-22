// src/components/ui/PricingCarousel.tsx
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Flame, // Icon tambahan untuk Hot Sales
} from 'lucide-react';
import { Button } from './button';

export interface PricingPackage {
  _key: string;
  name: string;
  description: string;
  price: string;
  billingCycle: string;
  features: string[];
  waLink: string;
  isPopular: boolean; // Tambahan properti baru
}

interface PricingCarouselProps {
  packages: PricingPackage[];
  lang: 'id' | 'en';
}

export default function PricingCarousel({
  packages,
  lang,
}: PricingCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  if (!packages || packages.length === 0) return null;

  return (
    <div className='relative w-full pt-4'>
      {' '}
      {/* pt-4 agar badge yang melayang tidak terpotong */}
      <div className='hidden md:flex justify-end gap-2 mb-4 pr-4'>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full w-10 h-10 border-slate-200'
          onClick={scrollPrev}>
          <ChevronLeft className='w-5 h-5 text-slate-600' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full w-10 h-10 border-slate-200'
          onClick={scrollNext}>
          <ChevronRight className='w-5 h-5 text-slate-600' />
        </Button>
      </div>
      <div
        className='overflow-hidden'
        ref={emblaRef}>
        <div className='flex touch-pan-y -ml-4 pb-8'>
          {' '}
          {/* pb-8 untuk spasi shadow di bawah */}
          {packages.map((pkg) => {
            // Logika Styling Dinamis
            const cardClasses = pkg.isPopular
              ? 'bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_12px_40px_rgba(37,99,235,0.15)] border-2 border-blue-500 h-full flex flex-col relative transform scale-[1.02]'
              : 'bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full flex flex-col relative';

            const buttonClasses = pkg.isPopular
              ? 'w-full rounded-2xl h-14 px-8 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white group transition-all duration-300 shadow-[0_8px_20px_rgb(37,99,235,0.2)]'
              : 'w-full rounded-2xl h-14 px-8 text-base font-bold bg-slate-900 hover:bg-black text-white group transition-all duration-300';

            return (
              <div
                key={pkg._key}
                className='flex-[0_0_90%] md:flex-[0_0_80%] lg:flex-[0_0_100%] xl:flex-[0_0_80%] min-w-0 pl-4 py-4' // py-4 agar scale transform tidak terpotong
              >
                <div className={cardClasses}>
                  {/* --- BADGE POPULAR --- */}
                  {pkg.isPopular && (
                    <div className='absolute -top-3 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg'>
                      <Flame className='w-4 h-4 fill-current text-yellow-300' />
                      {lang === 'id' ? 'Terpopuler' : 'Most Popular'}
                    </div>
                  )}

                  <h3 className='text-3xl font-extrabold text-slate-900 mb-3'>
                    {pkg.name}
                  </h3>
                  <p className='text-slate-500 mb-8 whitespace-pre-line'>
                    {pkg.description}
                  </p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-10'>
                    {pkg.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className='flex items-start gap-3'>
                        <CheckCircle2
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${pkg.isPopular ? 'text-blue-600' : 'text-slate-800'}`}
                        />
                        <span className='text-slate-600 font-medium'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`mt-auto rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border ${pkg.isPopular ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight'>
                        {pkg.price}
                      </span>
                    </div>

                    <a
                      href={pkg.waLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-full md:w-auto'>
                      <Button className={buttonClasses}>
                        {lang === 'id' ? 'Pilih Paket' : 'Choose Plan'}
                        <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
