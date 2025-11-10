# 快速开始指南

## 前置要求

- Node.js >= 16
- pnpm >= 8

## 安装 pnpm

如果还没有安装 pnpm，请先安装：

```bash
npm install -g pnpm
```

## 一键启动

### 1. 克隆或下载项目

```bash
# 如果是从 Git 克隆
cd qiankunDemo
```

### 2. 安装所有依赖

```bash
pnpm install
```

这个命令会：
- 安装根目录的依赖
- 安装所有子应用的依赖
- 安装所有公共包的依赖
- 建立 workspace 链接

### 3. 启动所有应用

```bash
pnpm dev
```

这会同时启动：
- 主应用 (http://localhost:8080)
- 子应用一 (http://localhost:8081)
- 子应用二 (http://localhost:8082)

### 4. 访问应用

打开浏览器访问：**http://localhost:8080**

你将看到主应用的界面，包含：
- 顶部标题栏
- 左侧菜单（首页、子应用一、子应用二）
- 右侧内容区

点击左侧菜单即可切换不同的应用。

## 分别启动应用

如果你只想启动某个应用：

```bash
# 只启动主应用
pnpm dev:main

# 只启动子应用一
pnpm dev:childone

# 只启动子应用二
pnpm dev:childtwo
```

**注意**：如果要在主应用中访问子应用，必须确保对应的子应用已经启动。

## 独立访问子应用

子应用也可以独立运行，不需要主应用：

1. 启动子应用一：
   ```bash
   pnpm dev:childone
   ```
   访问：http://localhost:8081

2. 启动子应用二：
   ```bash
   pnpm dev:childtwo
   ```
   访问：http://localhost:8082

## 停止应用

在终端按 `Ctrl + C` 即可停止正在运行的应用。

## 目录说明

```
qiankunDemo/
├── app/
│   ├── app-main/        # 主应用（端口 8080）
│   ├── app-childone/    # 子应用一（端口 8081）
│   └── app-childtwo/    # 子应用二（端口 8082）
├── common/
│   ├── com-components/  # 公共组件
│   └── com-utils/       # 公共工具
└── ...
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动所有应用 |
| `pnpm dev:main` | 启动主应用 |
| `pnpm dev:childone` | 启动子应用一 |
| `pnpm dev:childtwo` | 启动子应用二 |
| `pnpm build` | 构建所有应用 |
| `pnpm lint` | 代码检查 |
| `pnpm format` | 代码格式化 |

## 下一步

- 查看 [README.md](README.md) 了解项目概览
- 查看 [USAGE.md](USAGE.md) 了解详细使用方法
- 查看 [STRUCTURE.md](STRUCTURE.md) 了解项目结构

## 常见问题

### 1. 端口被占用

如果端口被占用，可以修改各应用的端口：

- **主应用**：修改 `app/app-main/vite.config.ts` 和 `app/app-main/package.json`
- **子应用**：修改对应子应用的 `vite.config.ts` 和 `package.json`

**重要**：如果修改了子应用端口，还需要修改主应用的 `src/main.ts` 中的子应用注册地址。

### 2. 依赖安装失败

请确保：
- Node.js 版本 >= 16
- pnpm 版本 >= 8
- 网络连接正常

如果还是失败，可以尝试：
```bash
pnpm store prune  # 清理缓存
pnpm install --force  # 强制重新安装
```

### 3. 页面空白

请检查：
- 所有应用是否都已启动（使用 `pnpm dev`）
- 浏览器控制台是否有错误信息
- 网络请求是否正常（F12 -> Network）

### 4. 子应用无法加载

请确保：
- 子应用已经启动
- 主应用中的子应用地址正确（查看 `app/app-main/src/main.ts`）
- 没有 CORS 错误

## 技术支持

如有问题，请查看：
- [qiankun 官方文档](https://qiankun.umijs.org/zh)
- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [pnpm 文档](https://pnpm.io/zh/)

