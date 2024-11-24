/* eslint-disable import/no-default-export */
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
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
    css: {
        postcss: {
            plugins: [
                postcssImport(),
                postcssNested(),
                autoprefixer(),
            ],
        },
    }
});
/* eslint-enable import/no-default-export */
