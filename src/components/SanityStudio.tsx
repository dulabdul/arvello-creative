// src/components/SanityStudio.tsx
import { Studio, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from '../../sanity/schemaTypes';

const config = defineConfig({
  name: 'default',
  title: 'ArVelloCreative Admin',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  basePath: '/admin',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Manager')
          .items([
            // --- 1. GLOBAL SETTINGS ---
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),

            S.divider(),

            // --- 2. LANDING PAGE SECTIONS (Singletons) ---
            S.listItem()
              .title('Hero Section')
              .id('hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem()
              .title('About Section')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem()
              .title('How It Works Section')
              .id('howItWorks')
              .child(
                S.document().schemaType('howItWorks').documentId('howItWorks'),
              ),
            S.listItem()
              .title('What We Do Section')
              .id('whatWeDo')
              .child(
                S.document().schemaType('whatWeDo').documentId('whatWeDo'),
              ),
            S.listItem()
              .title('Portfolio Section')
              .id('portfolioSection')
              .child(
                S.document()
                  .schemaType('portfolioSection')
                  .documentId('portfolioSection'),
              ),
            S.listItem()
              .title('Pricing Section')
              .id('pricingSection')
              .child(
                S.document()
                  .schemaType('pricingSection')
                  .documentId('pricingSection'),
              ),
            S.listItem()
              .title('Template Section')
              .id('templateSection')
              .child(
                S.document()
                  .schemaType('templateSection')
                  .documentId('templateSection'),
              ),
            S.listItem()
              .title('FAQ Section')
              .id('faqSection')
              .child(
                S.document().schemaType('faqSection').documentId('faqSection'),
              ),
            S.listItem()
              .title('Contact Section')
              .id('contactSection')
              .child(
                S.document()
                  .schemaType('contactSection')
                  .documentId('contactSection'),
              ),

            S.divider(),

            // --- 3. BLOG COLLECTIONS (Multiple Items) ---
            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('category').title('Blog Categories'),
            S.documentTypeListItem('author').title('Blog Authors'),

            S.divider(),

            // --- 4. HIDE DUPLICATES ---
            ...S.documentTypeListItems().filter(
              (listItem) =>
                ![
                  'siteSettings',
                  'hero',
                  'about',
                  'howItWorks',
                  'whatWeDo',
                  'portfolioSection',
                  'pricingSection',
                  'templateSection',
                  'faqSection',
                  'contactSection',
                  'post',
                  'category',
                  'author',
                ].includes(listItem.getId()!),
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});

export default function SanityStudio() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
      }}>
      <Studio config={config} />
    </div>
  );
}
