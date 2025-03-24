import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),       // For React support
    tailwindcss(), // TailwindCSS integration
  ],
  server: {
    hmr: {
      overlay: false, // Disable the error overlay if desired
    },
  },
});
