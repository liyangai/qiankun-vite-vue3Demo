import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { registerMicroApps, start } from 'qiankun';
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import * as Pinia from 'pinia';

// 将共享依赖暴露到 window 对象，供子应用使用
(window as any).Vue = Vue;
(window as any).VueRouter = VueRouter;
(window as any).Pinia = Pinia;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

// 注册微应用
// 根据主应用端口判断环境：8080=开发环境，9080=生产环境
const getChildPort = (devPort: string, prodPort: string) => {
  const mainPort = window.location.port;
  return mainPort === '9080' ? prodPort : devPort;
};

registerMicroApps([
  {
    name: 'app-childone',
    entry: `//localhost:${getChildPort('8081', '9081')}`,
    container: '#micro-app-container',
    activeRule: '/childone',
  },
  {
    name: 'app-childtwo',
    entry: `//localhost:${getChildPort('8082', '9082')}`,
    container: '#micro-app-container',
    activeRule: '/childtwo',
  },
]);

// 启动 qiankun
start({
  prefetch: true,
  sandbox: {
    strictStyleIsolation: false,
    experimentalStyleIsolation: true,
  },
});
