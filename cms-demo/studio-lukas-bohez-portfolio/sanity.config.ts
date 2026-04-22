import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Lukas Bohez Portfolio Studio',
  projectId: '3a5uodlw',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
