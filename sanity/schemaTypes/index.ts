// sanity/schemaTypes/index.ts

import about from './about';
import author from './author';
import category from './category';
import conctactSection from './conctactSection';
import faqSection from './faqSection';
import hero from './hero';
import howItWorks from './howItWorks';
import localeBlockContent from './localeBlockContent';
import localeString from './localeString';
import localeText from './localeText';
import portfolioSection from './portfolioSection';
import post from './post';
import pricingSection from './pricingSection';
import siteSettings from './siteSettings';
import templateSection from './templateSection';
import whatWeDo from './whatWeDo';

export const schemaTypes = [
  siteSettings,
  hero,
  localeString,
  about,
  localeText,
  howItWorks,
  whatWeDo,
  portfolioSection,
  pricingSection,
  templateSection,
  faqSection,
  conctactSection,
  category,
  author,
  localeBlockContent,
  post,
];
