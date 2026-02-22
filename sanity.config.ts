// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes'; // From Deliverable 3

export default defineConfig({
  name: 'default',
  title: 'Agency Studio',

  // Using Vite's import.meta.env for Astro
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  // structureTool provides the default standard desk/sidebar UI
  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  // Crucial: This must match the catch-all route we created in Deliverable 8
  basePath: '/admin',
});
