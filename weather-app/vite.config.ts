import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), svgr()],
    resolve: {
        alias: {
            '@': '/src'
        }
    }
})
