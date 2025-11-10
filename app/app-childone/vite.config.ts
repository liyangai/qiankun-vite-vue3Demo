import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // 开发环境使用 8081，生产环境使用 9081
  const port = mode === 'production' ? '9081' : '8081';
  const baseUrl = `http://localhost:${port}`;

  return {
    plugins: [
      vue(),
      qiankun('app-childone', {
        useDevMode: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 8081,
      cors: true,
      origin: 'http://localhost:8081',
    },
    base: baseUrl,
  };
});
