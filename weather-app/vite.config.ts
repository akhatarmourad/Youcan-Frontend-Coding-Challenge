import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgr from 'vite-plugin-svgr'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), svgr(), svgLoader()],
    resolve: {
        alias: {
            '@': '/src'
        }
    }
})
