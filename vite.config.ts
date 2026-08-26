import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { Features } from 'lightningcss';

export default defineConfig({
    plugins: [sveltekit()],
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            exclude: Features.LightDark
        }
    }
});
