import { createApp, App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { renderWithQiankun, qiankunWindow, QiankunProps } from 'vite-plugin-qiankun/dist/helper';
import App from './App.vue';
import routes from './router';

let app: VueApp<Element> | null = null;
let router: any = null;
let history: any = null;

function render(props: QiankunProps = {}) {
  const { container } = props;
  history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/childone' : '/');
  router = createRouter({
    history,
    routes,
  });

  app = createApp(App);
  app.use(createPinia());
  app.use(router);

  const containerId = container ? container.querySelector('#app') : '#app';
  app.mount(containerId as any);
}

renderWithQiankun({
  mount(props) {
    console.log('子应用一挂载', props);
    render(props);
  },
  bootstrap() {
    console.log('子应用一启动');
  },
  unmount() {
    console.log('子应用一卸载');
    app?.unmount();
    app = null;
    router = null;
    history = null;
  },
  update() {
    console.log('子应用一更新');
  },
});

// 独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
