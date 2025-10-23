import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname);

export default defineConfig({
    root,
    server: {
        open: true,
    },
    build: {
        rollupOptions: {
            input: {
                home: resolve(root, 'index.html'),
                about: resolve(root, 'about.html'),
                listings: resolve(root, 'listings.html'),
                services: resolve(root, 'services.html'),
                team: resolve(root, 'team.html'),
                contact: resolve(root, 'contact.html'),
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});
