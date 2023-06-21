// vite.config.ts
import { defineConfig } from "file:///C:/Users/cheng/Desktop/%E5%97%AF%E7%89%B9/spring-boot-plus-vue3/node_modules/.pnpm/vite@4.3.3_7zguiaeifckn4fzkszc6bvg2km/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/cheng/Desktop/%E5%97%AF%E7%89%B9/spring-boot-plus-vue3/node_modules/.pnpm/@vitejs+plugin-vue@4.2.1_vite@4.3.3+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path, { resolve } from "path";
import { createSvgIconsPlugin } from "file:///C:/Users/cheng/Desktop/%E5%97%AF%E7%89%B9/spring-boot-plus-vue3/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.3.3/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\cheng\\Desktop\\\u55EF\u7279\\spring-boot-plus-vue3";
var pathResolve = (dir) => {
  return resolve(__vite_injected_original_dirname, ".", dir);
};
var alias = {
  "@": pathResolve("src")
};
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "local-[dir]-[name]"
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
    })
  ],
  resolve: {
    alias
  },
  server: {
    proxy: {
      "/api": {
        target: "http://42.193.249.218:8888/",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjaGVuZ1xcXFxEZXNrdG9wXFxcXFx1NTVFRlx1NzI3OVxcXFxzcHJpbmctYm9vdC1wbHVzLXZ1ZTNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGNoZW5nXFxcXERlc2t0b3BcXFxcXHU1NUVGXHU3Mjc5XFxcXHNwcmluZy1ib290LXBsdXMtdnVlM1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvY2hlbmcvRGVza3RvcC8lRTUlOTclQUYlRTclODklQjkvc3ByaW5nLWJvb3QtcGx1cy12dWUzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgcGF0aCx7cmVzb2x2ZX0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG4vKiogXHU4REVGXHU1Rjg0XHU2N0U1XHU2MjdFICovXHJcbmNvbnN0IHBhdGhSZXNvbHZlID0gKGRpcjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgIHJldHVybiByZXNvbHZlKF9fZGlybmFtZSwgXCIuXCIsIGRpcik7XHJcbn07XHJcblxyXG4vKiogXHU4QkJFXHU3RjZFXHU1MjJCXHU1NDBEICovXHJcbmNvbnN0IGFsaWFzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgXCJAXCI6IHBhdGhSZXNvbHZlKFwic3JjXCIpLFxyXG59O1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICB2dWUoKSxcclxuICAgICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmcnKV0sXHJcbiAgICAgICAgICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXHJcbiAgICAgICAgICAgIHN5bWJvbElkOiAnbG9jYWwtW2Rpcl0tW25hbWVdJyxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBcdTgxRUFcdTVCOUFcdTRFNDlcdTYzRDJcdTUxNjVcdTRGNERcdTdGNkVcclxuICAgICAgICAgICAgICogQGRlZmF1bHQ6IGJvZHktbGFzdFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgLy8gaW5qZWN0PzogJ2JvZHktbGFzdCcgfCAnYm9keS1maXJzdCdcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBjdXN0b20gZG9tIGlkXHJcbiAgICAgICAgICAgICAqIEBkZWZhdWx0OiBfX3N2Z19faWNvbnNfX2RvbV9fXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAvL2N1c3RvbURvbUlkOiAnX19zdmdfX2ljb25zX19kb21fXycsXHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgcHJveHk6IHtcclxuICAgICAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vNDIuMTkzLjI0OS4yMTg6ODg4OC8nLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVixTQUFRLG9CQUFtQjtBQUN0WCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxRQUFNLGVBQWM7QUFDM0IsU0FBUyw0QkFBNEI7QUFIckMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxjQUFjLENBQUMsUUFBd0I7QUFDekMsU0FBTyxRQUFRLGtDQUFXLEtBQUssR0FBRztBQUN0QztBQUdBLElBQU0sUUFBZ0M7QUFBQSxFQUNsQyxLQUFLLFlBQVksS0FBSztBQUMxQjtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLHFCQUFxQjtBQUFBO0FBQUEsTUFFakIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztBQUFBO0FBQUEsTUFFeEQsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFhZCxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsUUFDSixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUNoRDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
