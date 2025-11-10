# 使用指南

## 快速开始

### 1. 安装依赖

首先确保你已经安装了 pnpm。如果没有，可以通过以下命令安装：

```bash
npm install -g pnpm
```

然后在项目根目录下安装所有依赖：

```bash
pnpm install
```

### 2. 启动项目

#### 启动所有应用（推荐）

```bash
pnpm dev
```

这会同时启动主应用和两个子应用。

#### 分别启动

```bash
# 启动主应用
pnpm dev:main

# 启动子应用一
pnpm dev:childone

# 启动子应用二
pnpm dev:childtwo
```

### 3. 访问应用

- **主应用**: http://localhost:8080
- **子应用一** (独立访问): http://localhost:8081
- **子应用二** (独立访问): http://localhost:8082

在主应用中，通过左侧菜单可以访问不同的子应用。

## 项目结构详解

```
qiankunDemo/
├── app/                          # 应用目录
│   ├── app-main/                 # 主应用（端口 8080）
│   │   ├── src/
│   │   │   ├── main.ts          # 入口文件，注册微应用
│   │   │   ├── App.vue          # 根组件，包含菜单和容器
│   │   │   ├── router/          # 路由配置
│   │   │   └── views/           # 页面组件
│   │   ├── vite.config.ts       # Vite 配置
│   │   └── package.json
│   │
│   ├── app-childone/             # 子应用一（端口 8081）
│   │   ├── src/
│   │   │   ├── main.ts          # 入口文件，使用 vite-plugin-qiankun
│   │   │   ├── App.vue
│   │   │   ├── router/
│   │   │   └── views/
│   │   ├── vite.config.ts       # 配置了 qiankun 插件
│   │   └── package.json
│   │
│   └── app-childtwo/             # 子应用二（端口 8082）
│       ├── src/
│       │   ├── main.ts          # 入口文件，使用 vite-plugin-qiankun
│       │   ├── App.vue
│       │   ├── router/
│       │   └── views/
│       ├── vite.config.ts       # 配置了 qiankun 插件
│       └── package.json
│
├── common/                       # 公共代码
│   ├── com-components/          # 公共组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── CommonButton.vue
│   │   │   │   └── CommonCard.vue
│   │   │   └── index.ts
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── com-utils/               # 公共工具函数库
│       ├── src/
│       │   ├── date.ts          # 日期工具
│       │   ├── storage.ts       # 存储工具
│       │   ├── format.ts        # 格式化工具
│       │   ├── validate.ts      # 验证工具
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── pnpm-workspace.yaml          # pnpm workspace 配置
├── package.json                 # 根 package.json
└── README.md
```

## 主要功能说明

### 主应用 (app-main)

主应用是整个微前端架构的容器，负责：

1. **注册微应用**：在 `src/main.ts` 中使用 qiankun 的 `registerMicroApps` 注册子应用
2. **提供导航**：左侧菜单用于切换不同的子应用
3. **管理容器**：提供 `#micro-app-container` 作为子应用的挂载点

关键代码：

```typescript
// src/main.ts
registerMicroApps([
  {
    name: 'app-childone',
    entry: '//localhost:8081',
    container: '#micro-app-container',
    activeRule: '/childone',
  },
  {
    name: 'app-childtwo',
    entry: '//localhost:8082',
    container: '#micro-app-container',
    activeRule: '/childtwo',
  },
]);
```

### 子应用 (app-childone & app-childtwo)

两个子应用都使用了 `vite-plugin-qiankun` 插件，支持：

1. **独立运行**：可以作为独立应用在各自的端口运行
2. **集成运行**：可以在主应用中作为微应用运行

关键配置：

```typescript
// vite.config.ts
import qiankun from 'vite-plugin-qiankun';

export default defineConfig({
  plugins: [
    vue(),
    qiankun('app-childone', {
      useDevMode: true,
    }),
  ],
  // ...
});
```

```typescript
// src/main.ts
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

renderWithQiankun({
  mount(props) {
    render(props);
  },
  bootstrap() {},
  unmount() {},
  update() {},
});

// 独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
```

### 公共组件库 (com-components)

提供了可复用的 Vue 组件：

- **CommonButton**: 基于 Element Plus 的按钮组件
- **CommonCard**: 基于 Element Plus 的卡片组件

使用方式：

```vue
<script setup>
import { CommonButton, CommonCard } from 'com-components';
</script>

<template>
  <common-button type="primary">点击</common-button>
  <common-card title="标题">内容</common-card>
</template>
```

### 公共工具函数库 (com-utils)

提供了实用的工具函数：

- **日期工具** (`date.ts`)：`formatDate`、`getRelativeTime`
- **存储工具** (`storage.ts`)：`storage`、`sessionStorage`
- **格式化工具** (`format.ts`)：`formatNumber`、`formatFileSize`、`maskPhone`、`maskIdCard`
- **验证工具** (`validate.ts`)：`isValidPhone`、`isValidEmail`、`isValidIdCard`、`isValidUrl`、`isEmpty`

使用方式：

```typescript
import { formatDate, storage, formatNumber } from 'com-utils';

// 格式化日期
const date = formatDate(new Date());

// 使用 storage
storage.set('key', { data: 'value' });
const value = storage.get('key');

// 格式化数字
const num = formatNumber(1234567); // "1,234,567"
```

## 开发建议

### 添加新的公共组件

1. 在 `common/com-components/src/components/` 下创建新组件
2. 在 `common/com-components/src/index.ts` 中导出
3. 运行 `pnpm --filter com-components build` 构建

### 添加新的工具函数

1. 在 `common/com-utils/src/` 下创建新文件或在现有文件中添加
2. 在 `common/com-utils/src/index.ts` 中导出
3. 运行 `pnpm --filter com-utils build` 构建

### 添加新的子应用

1. 在 `app/` 目录下创建新的子应用目录
2. 安装 `vite-plugin-qiankun` 依赖
3. 配置 `vite.config.ts` 和 `src/main.ts`
4. 在主应用的 `src/main.ts` 中注册新的微应用
5. 在主应用的菜单中添加新的导航项

## 构建与部署

### 构建所有应用

```bash
pnpm build
```

这会构建所有应用，生成的文件在各自的 `dist` 目录下。

### 单独构建

```bash
# 构建主应用
pnpm --filter app-main build

# 构建子应用一
pnpm --filter app-childone build

# 构建子应用二
pnpm --filter app-childtwo build
```

### 部署注意事项

1. **主应用**：需要部署在根域名或固定路径
2. **子应用**：可以部署在任意位置，但需要确保主应用能够访问
3. **配置更新**：部署时需要更新主应用中子应用的 `entry` 地址为实际的生产环境地址
4. **CORS**：确保子应用的服务器配置了正确的 CORS 策略

生产环境配置示例：

```typescript
// app-main/src/main.ts
registerMicroApps([
  {
    name: 'app-childone',
    entry: '//your-domain.com/childone',  // 改为实际地址
    container: '#micro-app-container',
    activeRule: '/childone',
  },
  {
    name: 'app-childtwo',
    entry: '//your-domain.com/childtwo',  // 改为实际地址
    container: '#micro-app-container',
    activeRule: '/childtwo',
  },
]);
```

## 常见问题

### 1. 子应用无法加载

检查：
- 子应用是否已启动
- 主应用中的 entry 地址是否正确
- 浏览器控制台是否有 CORS 错误

### 2. 子应用样式冲突

qiankun 已配置了样式隔离：

```typescript
start({
  sandbox: {
    experimentalStyleIsolation: true,
  },
});
```

如果仍有问题，可以尝试使用 CSS Modules 或 scoped 样式。

### 3. 路由冲突

确保：
- 主应用和子应用的路由前缀不冲突
- 子应用使用正确的 base 路径

### 4. 公共依赖重复加载

可以考虑使用 Module Federation 或 externals 配置来共享依赖。

## 更多资源

- [qiankun 官方文档](https://qiankun.umijs.org/zh)
- [vite-plugin-qiankun](https://github.com/tengmaoqing/vite-plugin-qiankun)
- [Vue 3 文档](https://cn.vuejs.org/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [pnpm 文档](https://pnpm.io/zh/)

