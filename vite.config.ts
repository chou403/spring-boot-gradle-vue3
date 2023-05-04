import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

/** 路径查找 */
const pathResolve = (dir: string): string => {
    return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
    "@": pathResolve("src"),
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://42.193.249.218:8888/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
})
