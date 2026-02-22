// src/components/ui/FaqAccordion.tsx
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface FaqItem {
  _key: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  // State untuk melacak index accordion mana yang sedang terbuka
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open index 0 (opsional)

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className='flex flex-col space-y-4'>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq._key || index}
            className='bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300'>
            <button
              onClick={() => toggleAccordion(index)}
              className='w-full text-left px-6 py-5 md:px-8 md:py-6 flex justify-between items-center focus:outline-none'
              aria-expanded={isOpen}>
              <h3
                className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-slate-900' : 'text-slate-800'}`}>
                {faq.question}
              </h3>
              <div className='flex-shrink-0 text-slate-400'>
                {isOpen ? (
                  <Minus className='w-6 h-6' />
                ) : (
                  <Plus className='w-6 h-6' />
                )}
              </div>
            </button>

            {/* Animasi Buka/Tutup dengan CSS Grid transition */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}>
              <div className='overflow-hidden'>
                <div className='px-6 pb-6 md:px-8 md:pb-8 pt-0'>
                  <p className='text-slate-500 text-base md:text-lg leading-relaxed whitespace-pre-line'>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
