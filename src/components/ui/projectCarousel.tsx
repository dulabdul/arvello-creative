// src/components/ui/ProjectCarousel.tsx
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button'; // Menggunakan shadcn button

// Type definition untuk data yang diterima dari Astro
export interface ProjectSlideData {
  id: string;
  imageUrl: string;
  imageAlt: string;
  projectUrl?: string | null;
}

interface ProjectCarouselProps {
  projects: ProjectSlideData[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  // Inisialisasi Embla dengan opsi loop dan align center agar mirip referensi
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className='relative max-w-[90rem] mx-auto'>
      {/* Embla Viewport */}
      <div
        className='overflow-hidden py-10'
        ref={emblaRef}>
        <div className='flex touch-pan-y -ml-4 md:-ml-8'>
          {projects.map((project, index) => (
            // Slide Item
            // flex-[0_0_85%] artinya di mobile lebarnya 85%, di md ke atas 60%
            // agar slide sampingnya terlihat sedikit (seperti referensi)
            <div
              key={project.id}
              className='flex-[0_0_85%] md:flex-[0_0_60%] min-w-0 pl-4 md:pl-8 relative group'>
              {/* Wrapper Gambar dengan Aspect Ratio */}
              <div className='relative aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-xl transition-transform duration-300 group-hover:scale-[1.02]'>
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  className='w-full h-full object-cover bg-slate-200'
                  loading={index < 2 ? 'eager' : 'lazy'} // Eager load 2 gambar pertama
                />

                {/* Overlay jika ada linknya */}
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10'
                    aria-label={`Visit ${project.imageAlt}`}>
                    <span className='sr-only'>Visit Project</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Floating di kiri kanan) */}
      <div className='absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-10 hidden md:block'>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm hover:bg-white w-12 h-12'
          onClick={scrollPrev}
          aria-label='Previous slide'>
          <ChevronLeft className='w-6 h-6 text-slate-700' />
        </Button>
      </div>

      <div className='absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-10 hidden md:block'>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm hover:bg-white w-12 h-12'
          onClick={scrollNext}
          aria-label='Next slide'>
          <ChevronRight className='w-6 h-6 text-slate-700' />
        </Button>
      </div>

      {/* Mobile Navigation Buttons (Di bawah carousel) */}
      <div className='flex md:hidden justify-center gap-4 mt-4'>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full w-12 h-12'
          onClick={scrollPrev}
          aria-label='Previous slide'>
          <ChevronLeft className='w-6 h-6' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full w-12 h-12'
          onClick={scrollNext}
          aria-label='Next slide'>
          <ChevronRight className='w-6 h-6' />
        </Button>
      </div>
    </div>
  );
}
