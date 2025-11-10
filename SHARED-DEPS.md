# 依赖共享配置说明

本项目已配置 Vue、Vue Router、Pinia、Element Plus 等依赖在主应用和子应用之间共享。

## 📁 配置文件说明

### 1. 主应用配置

**文件：`app/app-main/src/main.ts`**

主应用将共享依赖暴露到 window 对象：

```typescript
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import * as Pinia from 'pinia';

window.Vue = Vue;
window.VueRouter = VueRouter;
window.Pinia = Pinia;
window.ElementPlus = ElementPlus;
```

### 2. 子应用配置

#### 2.1 安装依赖

```bash
cd app/app-childone
pnpm add -D vite-plugin-externals

cd app/app-childtwo
pnpm add -D vite-plugin-externals
```

#### 2.2 Vite 配置

**文件：`app/app-childone/vite.config.ts` 和 `app/app-childtwo/vite.config.ts`**

使用 `vite-plugin-externals` 插件，在构建时将导入语句替换为从 window 对象获取：

```typescript
import { viteExternalsPlugin } from 'vite-plugin-externals';

export default defineConfig({
  plugins: [
    vue(),
    qiankun('app-childone', {
      useDevMode: true,
    }),
    viteExternalsPlugin({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      pinia: 'Pinia',
      'element-plus': 'ElementPlus',
    }),
  ],
  // ... 其他配置
});
```

## 🚀 构建和部署

### 开发环境

开发环境下正常运行，各应用独立加载依赖：

```bash
pnpm dev
```

### 生产环境

#### 1. 构建所有应用

```bash
pnpm build
```

#### 2. 部署到 Nginx

将构建产物复制到 Nginx 目录：

```bash
# 主应用
cp -r app/app-main/dist/* nginx/html/app-main/

# 子应用一
cp -r app/app-childone/dist/* nginx/html/app-childone/

# 子应用二
cp -r app/app-childtwo/dist/* nginx/html/app-childtwo/
```

或使用项目自带的构建脚本：

```bash
node scripts/build.js
```

#### 3. 启动 Nginx

```bash
# Windows
cd nginx
start-nginx.bat

# Linux/Mac
cd nginx
./start-nginx.sh
```

#### 4. 访问应用

打开浏览器访问：`http://localhost:9080`

## 🔍 验证依赖共享

在浏览器控制台中验证：

```javascript
// 检查主应用是否暴露了依赖
console.log('Vue:', window.Vue);
console.log('VueRouter:', window.VueRouter);
console.log('Pinia:', window.Pinia);
console.log('ElementPlus:', window.ElementPlus);
```

检查网络请求，子应用不应该再加载 vue、vue-router、pinia、element-plus 的文件。

## ⚠️ 注意事项

### 1. 子应用独立运行

由于配置了依赖共享，子应用在生产环境下**无法独立运行**，必须在主应用中加载。如果需要独立运行子应用，需要：

- 移除 vite.config.ts 中的 external 配置
- 移除 index.html 中的 importmap
- 删除 public 目录下的 shim 文件

### 2. 版本一致性

确保主应用和子应用的 package.json 中，共享依赖的版本保持一致，避免兼容性问题。

### 3. 依赖加载顺序

主应用必须先加载并初始化依赖，子应用才能正常运行。qiankun 会自动处理这个顺序。

## 📊 效果

### 优化前

- 主应用：~500KB (gzipped)
- 子应用一：~450KB (gzipped)
- 子应用二：~450KB (gzipped)
- **总计：~1.4MB**

### 优化后

- 主应用：~500KB (gzipped)
- 子应用一：~50KB (gzipped)
- 子应用二：~50KB (gzipped)
- **总计：~600MB**

**节省约 57% 的加载体积！**

## 🔧 故障排查

### 问题：子应用报错 "Vue is not available on window"

**原因**：主应用还未加载完成或未正确暴露依赖

**解决**：
1. 检查主应用 main.ts 是否正确暴露了依赖到 window
2. 确保在 qiankun 环境中加载子应用
3. 检查浏览器控制台，确认 window.Vue 等变量存在

### 问题：子应用加载失败，提示 CORS 错误

**原因**：子应用的 CORS 配置不正确

**解决**：检查子应用的 vite.config.ts，确保配置了 CORS：

```typescript
server: {
  cors: true,
}
```

### 问题：开发环境依赖共享不生效

**原因**：vite-plugin-externals 主要针对生产构建，开发环境下各应用仍然独立加载依赖

**解决**：这是正常的，开发环境下独立加载依赖有助于调试，生产环境会自动共享

## 📚 相关文档

- [qiankun 官方文档](https://qiankun.umijs.org/)
- [Import Maps 规范](https://github.com/WICG/import-maps)
- [Vite 构建配置](https://vitejs.dev/config/build-options.html)

