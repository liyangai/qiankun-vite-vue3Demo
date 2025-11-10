import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // 开发环境使用 8082，生产环境使用 9082
  const port = mode === 'production' ? '9082' : '8082';
  const baseUrl = `http://localhost:${port}`;
  const isProduction = mode === 'production';

  return {
    plugins: [
      vue(),
      qiankun('app-childtwo', {
        useDevMode: true,
      }),
      // Element Plus 按需导入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // Vue、Vue Router、Pinia 从主应用共享（仅在生产环境）
      isProduction &&
        viteExternalsPlugin({
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          'vue-demi': 'Vue', // vue-demi 也映射到 Vue
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // 开发环境下正常解析，生产环境交给 vite-plugin-externals
        ...(isProduction && {
          'vue-demi': 'vue',
        }),
      },
    },
    server: {
      port: 8082,
      cors: true,
      origin: 'http://localhost:8082',
    },
    base: baseUrl,
    build: {
      rollupOptions: {
        external: (id) => {
          // 排除核心共享依赖
          if (id === 'vue' || id === 'vue-router' || id === 'pinia' || id === 'vue-demi') {
            return true;
          }
          return false;
        },
        output: {
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            pinia: 'Pinia',
            'vue-demi': 'Vue',
          },
        },
      },
    },
  };
});
