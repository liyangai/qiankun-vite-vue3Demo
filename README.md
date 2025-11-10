# Qiankun 微前端项目

一个完整的微前端示例项目，基于 **qiankun** + **pnpm monorepo** 架构，包含一个主应用和两个子应用，支持独立运行和集成运行。

## ✨ 特性

- 🚀 **Vite** - 极速的开发体验
- 📦 **pnpm Monorepo** - 高效的包管理和代码复用
- 🔥 **Vue 3** - 组合式 API，性能更强
- 💪 **TypeScript** - 类型安全
- 🎨 **Element Plus** - 美观的 UI 组件库
- 🔌 **微前端** - qiankun + vite-plugin-qiankun
- 📐 **ESLint + Prettier** - 代码规范
- 🧩 **公共组件库** - 可复用的组件和工具

## 📦 项目结构

```
qiankunDemo/
├── app/                    # 应用目录
│   ├── app-main/          # 主应用（端口: 8080）
│   ├── app-childone/      # 子应用一（端口: 8081）
│   └── app-childtwo/      # 子应用二（端口: 8082）
├── common/                # 公共目录
│   ├── com-components/    # 公共组件库
│   └── com-utils/         # 公共工具函数库
├── pnpm-workspace.yaml    # pnpm workspace 配置
└── package.json           # 根 package.json
```

## 🛠️ 技术栈

- **构建工具**: Vite 5
- **前端框架**: Vue 3
- **语言**: TypeScript
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **微前端**: qiankun + vite-plugin-qiankun
- **代码规范**: ESLint + Prettier
- **包管理**: pnpm

## 🚀 快速开始

### 前置要求

- Node.js >= 16
- pnpm >= 8

### 安装 pnpm

```bash
npm install -g pnpm
```

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
# 启动所有应用（推荐）
pnpm dev

# 或分别启动
pnpm dev:main      # 启动主应用（端口: 8080）
pnpm dev:childone  # 启动子应用一（端口: 8081）
pnpm dev:childtwo  # 启动子应用二（端口: 8082）
```

### 访问应用

**开发环境**（Vite 开发服务器）：

- **主应用**: http://localhost:8080
- **子应用一**: http://localhost:8081
- **子应用二**: http://localhost:8082

**生产环境**（Nginx 部署）：

- **主应用**: http://localhost:9080
- **子应用一**: http://localhost:9081
- **子应用二**: http://localhost:9082

## 📝 可用命令

| 命令                | 说明           |
| ------------------- | -------------- |
| `pnpm install`      | 安装所有依赖   |
| `pnpm dev`          | 启动所有应用   |
| `pnpm dev:main`     | 仅启动主应用   |
| `pnpm dev:childone` | 仅启动子应用一 |
| `pnpm dev:childtwo` | 仅启动子应用二 |
| `pnpm build`        | 构建所有应用   |
| `pnpm lint`         | 代码检查       |
| `pnpm format`       | 代码格式化     |

## 📚 文档

- [快速开始指南](QUICKSTART.md) - 最简单的入门指南
- [使用指南](USAGE.md) - 详细的使用说明
- [项目结构](STRUCTURE.md) - 完整的项目结构说明
- [部署指南](DEPLOY.md) - 生产环境部署说明
- [Nginx 配置](nginx/README.md) - Nginx 详细配置

## 🎯 主要功能

### 主应用 (app-main)

- ✅ 基于 qiankun 的微前端容器
- ✅ 统一的导航菜单
- ✅ 子应用加载和生命周期管理
- ✅ 公共组件和工具函数演示

### 子应用一 (app-childone)

- ✅ 支持独立运行和集成运行
- ✅ 完整的路由配置（首页、关于、列表）
- ✅ Element Plus 组件使用示例
- ✅ 公共组件和工具函数使用示例

### 子应用二 (app-childtwo)

- ✅ 支持独立运行和集成运行
- ✅ 完整的路由配置（首页、设置、个人资料）
- ✅ 表单处理示例
- ✅ 公共工具函数使用示例

### 公共组件库 (com-components)

- ✅ CommonButton - 通用按钮组件
- ✅ CommonCard - 通用卡片组件
- ✅ 基于 Element Plus 封装

### 公共工具库 (com-utils)

- ✅ 日期工具 - 日期格式化、相对时间
- ✅ 存储工具 - localStorage、sessionStorage 封装
- ✅ 格式化工具 - 数字、文件大小、脱敏等
- ✅ 验证工具 - 手机号、邮箱、身份证等验证

## 🏗️ 构建与部署

### 开发环境

```bash
pnpm dev
```

### 生产环境构建

```bash
# 构建所有应用并复制到 nginx/html
pnpm build
```

执行 `pnpm build` 后会自动：

1. ✅ 构建公共组件库和工具库
2. ✅ 构建主应用和所有子应用
3. ✅ 复制构建产物到 `nginx/html` 目录

### Nginx 部署

```bash
# 进入 nginx 目录
cd nginx

# 启动 nginx（Windows）
C:\nginx\nginx.exe -p . -c conf/nginx.conf

# 启动 nginx（Linux/Mac）
nginx -p . -c conf/nginx.conf
```

详细部署说明请查看 [部署指南](DEPLOY.md)。

### 单独构建

```bash
# 仅构建公共库
pnpm build:libs

# 仅构建应用
pnpm build:apps

# 单独构建某个应用
pnpm --filter app-main build
pnpm --filter app-childone build
pnpm --filter app-childtwo build
```

## 🤝 开发建议

### 添加新的公共组件

1. 在 `common/com-components/src/components/` 下创建组件
2. 在 `common/com-components/src/index.ts` 中导出
3. 在应用中直接引入使用

### 添加新的工具函数

1. 在 `common/com-utils/src/` 下创建或添加函数
2. 在 `common/com-utils/src/index.ts` 中导出
3. 在应用中直接引入使用

### 添加新的子应用

1. 复制现有子应用目录
2. 修改配置文件（package.json、vite.config.ts）
3. 在主应用中注册新的微应用
4. 添加菜单导航项

## 📄 许可证

MIT
