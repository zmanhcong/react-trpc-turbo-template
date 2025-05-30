import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['@locator/babel-jsx/dist', { env: 'development' }]],
      },
    }),
    tsconfigPaths(),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: { '@/': `${__dirname}/src/` },
  },
});
