/* eslint-disable import/no-default-export */
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    root: path.resolve(__dirname, 'app'),
    plugins: [vue()],
    resolve: {
        alias: {
            '@libs': path.resolve(__dirname, './libs'),
        },
    },
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'app/index.html'),
        },
    },
});
/* eslint-enable import/no-default-export */
