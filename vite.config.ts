import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    base: '/fs-docs/'
    plugins: [
        react(),
    ],
    define: {
        global: 'window',
    },
    resolve: {
        alias: {
            buffer: 'buffer',
        },
    },
})
