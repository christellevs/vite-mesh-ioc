import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';


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
