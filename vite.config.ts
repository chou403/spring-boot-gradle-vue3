import {defineConfig,ConfigEnv,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path,{resolve} from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

/** 路径查找 */
const pathResolve = (dir: string): string => {
    return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
    "@": pathResolve("src"),
};
export default defineConfig((mode: ConfigEnv)=>{
    const env = loadEnv(mode.mode, process.cwd());
    return {
        plugins: [
            vue(),
            AutoImport({
                imports: ["vue","vue-router","pinia"],
                dts: "src/types/auto-imports.d.ts",
            }),
            Components({
                dts: "src/types/components.d.ts",
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
                // 指定symbolId格式
                symbolId: 'local-[dir]-[name]',

                /**
                 * 自定义插入位置
                 * @default: body-last
                 */
                // inject?: 'body-last' | 'body-first'

                /**
                 * custom dom id
                 * @default: __svg__icons__dom__
                 */
                //customDomId: '__svg__icons__dom__',
            }),
        ],
        root: process.cwd(),
        base: env.VITE_PUBLIC_PATH,
        resolve: {
            alias
        },
        server: {
            host: '0.0.0.0',
            port: env.VITE_PORT as unknown as number,
            open: JSON.parse(env.VITE_OPEN),
            proxy: {
                '/api': {
                    target: env.VITE_PROXY_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
