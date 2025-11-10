# 项目结构说明

## 完整目录结构

```
qiankunDemo/
│
├── app/                                  # 应用目录
│   │
│   ├── app-main/                         # 主应用 (端口: 8080)
│   │   ├── src/
│   │   │   ├── router/
│   │   │   │   └── index.ts             # 路由配置
│   │   │   ├── views/
│   │   │   │   ├── Home.vue             # 首页
│   │   │   │   └── MicroApp.vue         # 微应用占位组件
│   │   │   ├── App.vue                  # 根组件（含菜单和容器）
│   │   │   ├── main.ts                  # 入口文件（注册微应用）
│   │   │   └── vite-env.d.ts           # 类型声明
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   ├── .eslintrc.cjs
│   │   └── .prettierrc.json
│   │
│   ├── app-childone/                     # 子应用一 (端口: 8081)
│   │   ├── src/
│   │   │   ├── router/
│   │   │   │   └── index.ts             # 路由配置
│   │   │   ├── views/
│   │   │   │   ├── Home.vue             # 首页
│   │   │   │   ├── About.vue            # 关于页
│   │   │   │   └── List.vue             # 列表页
│   │   │   ├── App.vue                  # 根组件
│   │   │   ├── main.ts                  # 入口（含 qiankun 生命周期）
│   │   │   └── vite-env.d.ts           # 类型声明
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.ts              # 配置 vite-plugin-qiankun
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   ├── .eslintrc.cjs
│   │   └── .prettierrc.json
│   │
│   └── app-childtwo/                     # 子应用二 (端口: 8082)
│       ├── src/
│       │   ├── router/
│       │   │   └── index.ts             # 路由配置
│       │   ├── views/
│       │   │   ├── Home.vue             # 首页
│       │   │   ├── Settings.vue         # 设置页
│       │   │   └── Profile.vue          # 个人资料页
│       │   ├── App.vue                  # 根组件
│       │   ├── main.ts                  # 入口（含 qiankun 生命周期）
│       │   └── vite-env.d.ts           # 类型声明
│       ├── index.html
│       ├── package.json
│       ├── vite.config.ts              # 配置 vite-plugin-qiankun
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── .eslintrc.cjs
│       └── .prettierrc.json
│
├── common/                               # 公共代码
│   │
│   ├── com-components/                   # 公共组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── CommonButton.vue     # 公共按钮组件
│   │   │   │   └── CommonCard.vue       # 公共卡片组件
│   │   │   └── index.ts                # 导出入口
│   │   ├── package.json
│   │   ├── vite.config.ts              # 构建配置
│   │   ├── tsconfig.json
│   │   └── tsconfig.node.json
│   │
│   └── com-utils/                        # 公共工具函数库
│       ├── src/
│       │   ├── date.ts                  # 日期工具函数
│       │   ├── storage.ts               # 存储工具函数
│       │   ├── format.ts                # 格式化工具函数
│       │   ├── validate.ts              # 验证工具函数
│       │   └── index.ts                # 导出入口
│       ├── package.json
│       └── tsconfig.json
│
├── pnpm-workspace.yaml                   # pnpm workspace 配置
├── package.json                          # 根 package.json
├── .gitignore                           # Git 忽略文件
├── .npmrc                               # npm 配置
├── .editorconfig                        # 编辑器配置
├── .prettierrc.json                     # Prettier 配置
├── README.md                            # 项目说明
├── USAGE.md                             # 使用指南
└── STRUCTURE.md                         # 本文件（项目结构说明）
```

## 各部分职责

### 1. 主应用 (app-main)

**职责**：
- 作为微前端的容器和入口
- 注册和管理子应用
- 提供统一的导航菜单
- 提供子应用挂载容器

**关键文件**：
- `src/main.ts`: 使用 qiankun 注册微应用并启动
- `src/App.vue`: 包含菜单布局和微应用容器
- `src/router/index.ts`: 主应用路由配置

### 2. 子应用一 (app-childone)

**职责**：
- 提供业务功能（首页、关于、列表等）
- 支持独立运行和集成运行
- 使用公共组件和工具函数

**特点**：
- 使用 `vite-plugin-qiankun` 插件
- 实现了 qiankun 生命周期钩子
- 包含多个示例页面

### 3. 子应用二 (app-childtwo)

**职责**：
- 提供业务功能（首页、设置、个人资料等）
- 支持独立运行和集成运行
- 使用公共组件和工具函数

**特点**：
- 使用 `vite-plugin-qiankun` 插件
- 实现了 qiankun 生命周期钩子
- 包含表单和设置页面示例

### 4. 公共组件库 (com-components)

**职责**：
- 提供可复用的 Vue 组件
- 基于 Element Plus 封装
- 供所有应用使用

**包含组件**：
- `CommonButton`: 按钮组件
- `CommonCard`: 卡片组件

### 5. 公共工具函数库 (com-utils)

**职责**：
- 提供通用工具函数
- 无 UI 依赖
- 纯函数实现

**包含模块**：
- `date`: 日期处理
- `storage`: 本地存储
- `format`: 数据格式化
- `validate`: 数据验证

## 技术栈

### 构建工具
- **Vite 5**: 快速的前端构建工具
- **pnpm**: 高效的包管理器
- **TypeScript**: 类型安全

### 前端框架
- **Vue 3**: 渐进式前端框架
- **Vue Router 4**: 官方路由
- **Pinia**: 状态管理

### UI 组件库
- **Element Plus**: Vue 3 UI 组件库

### 微前端
- **qiankun**: 微前端框架（主应用）
- **vite-plugin-qiankun**: Vite 的 qiankun 插件（子应用）

### 代码规范
- **ESLint**: JavaScript/TypeScript 代码检查
- **Prettier**: 代码格式化

## 端口分配

| 应用 | 端口 | 说明 |
|------|------|------|
| app-main | 8080 | 主应用，微前端容器 |
| app-childone | 8081 | 子应用一，可独立运行 |
| app-childtwo | 8082 | 子应用二，可独立运行 |

## 依赖关系

```
主应用 (app-main)
├── qiankun (微前端框架)
├── com-components (公共组件)
└── com-utils (公共工具)

子应用一 (app-childone)
├── vite-plugin-qiankun (微前端插件)
├── com-components (公共组件)
└── com-utils (公共工具)

子应用二 (app-childtwo)
├── vite-plugin-qiankun (微前端插件)
├── com-components (公共组件)
└── com-utils (公共工具)

公共组件 (com-components)
├── vue
└── element-plus

公共工具 (com-utils)
└── (无外部依赖)
```

## Monorepo 配置

使用 pnpm workspace 管理 monorepo：

```yaml
# pnpm-workspace.yaml
packages:
  - 'app/*'      # 所有应用
  - 'common/*'   # 公共代码
```

优势：
- 统一依赖管理
- 代码复用
- 一键安装所有依赖
- 支持 workspace 协议引用本地包

## 命令说明

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装所有依赖 |
| `pnpm dev` | 启动所有应用 |
| `pnpm dev:main` | 仅启动主应用 |
| `pnpm dev:childone` | 仅启动子应用一 |
| `pnpm dev:childtwo` | 仅启动子应用二 |
| `pnpm build` | 构建所有应用 |
| `pnpm lint` | 检查所有应用代码 |
| `pnpm format` | 格式化所有应用代码 |

## 开发流程

1. **安装依赖**
   ```bash
   pnpm install
   ```

2. **启动开发环境**
   ```bash
   pnpm dev
   ```

3. **访问应用**
   - 打开浏览器访问 http://localhost:8080
   - 通过菜单切换不同子应用

4. **修改代码**
   - 所有应用支持热更新
   - 修改公共组件或工具函数后，应用会自动刷新

5. **构建生产版本**
   ```bash
   pnpm build
   ```

## 扩展建议

### 添加新的子应用

1. 复制 `app-childone` 或 `app-childtwo` 目录
2. 修改 `package.json` 中的 `name`
3. 修改 `vite.config.ts` 中的应用名称和端口
4. 在主应用的 `src/main.ts` 中注册新应用
5. 在主应用的菜单中添加导航项

### 添加新的公共组件

1. 在 `common/com-components/src/components/` 创建组件
2. 在 `common/com-components/src/index.ts` 导出
3. 在应用中直接使用

### 添加新的工具函数

1. 在 `common/com-utils/src/` 添加函数
2. 在 `common/com-utils/src/index.ts` 导出
3. 在应用中直接使用

