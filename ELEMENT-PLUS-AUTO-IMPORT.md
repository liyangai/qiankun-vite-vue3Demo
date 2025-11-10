# Element Plus 按需导入配置说明

本项目已配置 Element Plus 按需导入，同时保持 Vue、Vue Router、Pinia 的依赖共享。

## 📦 已安装的依赖

在所有应用中已安装：
- `unplugin-vue-components` - 自动导入组件
- `unplugin-auto-import` - 自动导入 API
- `vite-plugin-externals` - 处理共享依赖

## ⚙️ 配置说明

### 1. 主应用配置

**文件：`app/app-main/vite.config.ts`**

```typescript
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    // Element Plus 按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

**移除了：**
- ❌ `import ElementPlus from 'element-plus'`
- ❌ `import 'element-plus/dist/index.css'`
- ❌ `app.use(ElementPlus)`
- ❌ `window.ElementPlus = ElementPlus`

### 2. 子应用配置

**文件：`app/app-childone/vite.config.ts` 和 `app/app-childtwo/vite.config.ts`**

```typescript
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      vue(),
      qiankun('app-childone', {
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
          'vue-demi': 'Vue', // Element Plus 依赖
        }),
    ].filter(Boolean),
    build: {
      rollupOptions: {
        external: (id) => {
          // 只排除核心共享依赖
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
```

**移除了：**
- ❌ `import ElementPlus from 'element-plus'`
- ❌ `import 'element-plus/dist/index.css'`
- ❌ `app.use(ElementPlus)`

## 🚀 使用方式

### 自动导入组件

在 Vue 组件中直接使用 Element Plus 组件，无需手动导入：

```vue
<template>
  <el-button type="primary">按钮</el-button>
  <el-input v-model="text" placeholder="请输入" />
  <el-card>卡片内容</el-card>
</template>

<script setup>
// 无需导入，自动注册
const text = ref('');
</script>
```

### 自动导入 API

Element Plus 的 API 也会自动导入：

```typescript
// 无需 import { ElMessage } from 'element-plus'
ElMessage.success('操作成功！');
ElMessage.error('操作失败！');

// 无需 import { ElMessageBox } from 'element-plus'
ElMessageBox.confirm('确认删除吗？', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning',
});
```

## 📊 优化效果对比

### 全量引入时（之前）

| 应用 | 主文件大小 | 说明 |
|------|-----------|------|
| 主应用 | 1,159.99 KB (gzip: 384.76 kB) | 包含所有 Element Plus 组件 |
| 子应用一 | ~7 KB (gzip: 3.31 kB) | 排除所有共享依赖 |
| 子应用二 | ~8 KB (gzip: 3.91 kB) | 排除所有共享依赖 |

**问题**：子应用虽然小，但主应用包含了所有 Element Plus 组件，即使没用到。

### 按需导入后（现在）

| 应用 | 主文件大小 | 说明 |
|------|-----------|------|
| 主应用 | 404.82 KB (gzip: 144.89 kB) | 只包含使用的组件 ⬇️ **65%** |
| 子应用一 | 110.45 KB (gzip: 29.73 kB) | Vue共享 + 按需 Element Plus |
| 子应用二 | 169.65 KB (gzip: 49.38 kB) | Vue共享 + 按需 Element Plus |

**优势**：
- ✅ 主应用体积减少 65%
- ✅ 子应用包含自己需要的 Element Plus 组件
- ✅ Vue、Vue Router、Pinia 仍然共享
- ✅ 整体加载速度更快

## 🔧 工作原理

### 依赖关系

```
主应用：
  ├─ Vue (暴露到 window.Vue) ✓
  ├─ Vue Router (暴露到 window.VueRouter) ✓
  ├─ Pinia (暴露到 window.Pinia) ✓
  └─ Element Plus 组件（按需导入，不共享）

子应用：
  ├─ Vue (从 window.Vue 获取) ← 共享
  ├─ Vue Router (从 window.VueRouter 获取) ← 共享
  ├─ Pinia (从 window.Pinia 获取) ← 共享
  ├─ vue-demi (映射到 window.Vue) ← 共享
  └─ Element Plus 组件（按需打包，独立加载）
```

### 为什么不共享 Element Plus？

1. **按需导入已经很小**：通过 tree-shaking，各应用只打包使用的组件
2. **灵活性更高**：各应用可以使用不同版本的 Element Plus
3. **维护更简单**：不需要主应用提前知道子应用用了哪些组件
4. **避免重复打包风险**：如果共享，需要主应用加载所有可能用到的组件

## 📝 自动生成的文件

按需导入会自动生成以下类型定义文件（已加入 `.gitignore`）：

- `auto-imports.d.ts` - 自动导入的 API 类型定义
- `components.d.ts` - 自动导入的组件类型定义

这些文件提供 TypeScript 智能提示，无需手动维护。

## 🧪 验证方法

### 1. 检查构建产物

```bash
pnpm build
```

查看各应用的打包大小，确认按需导入生效。

### 2. 检查运行时

打开浏览器开发者工具：

```javascript
// 检查共享依赖
console.log(window.Vue);        // 应该存在
console.log(window.VueRouter);  // 应该存在
console.log(window.Pinia);      // 应该存在
console.log(window.ElementPlus); // 应该不存在（按需导入，不全局暴露）
```

### 3. 检查网络请求

在 Network 面板中：
- ✅ 只应该看到使用的 Element Plus 组件被加载
- ✅ 不应该看到完整的 `element-plus.js`

## ⚠️ 注意事项

### 1. 开发环境 vs 生产环境

- **开发环境**：各应用独立加载依赖（方便调试）
- **生产环境**：Vue、Vue Router、Pinia 共享；Element Plus 按需加载

### 2. TypeScript 支持

自动生成的类型文件提供完整的 TypeScript 支持，包括：
- Element Plus 组件的类型
- ElMessage、ElMessageBox 等 API 的类型
- Vue API（ref、reactive 等）的类型

### 3. 样式处理

Element Plus 的样式也会按需导入，无需手动引入 CSS 文件。

## 🔍 故障排查

### 问题：组件或 API 提示未定义

**解决**：重启开发服务器，让自动生成的类型文件生效：

```bash
pnpm dev
```

### 问题：构建时报错 "vue-demi" not found

**解决**：确保配置了 vue-demi 映射：

```typescript
external: (id) => {
  if (id === 'vue-demi') return true;
  // ...
}
```

### 问题：Element Plus 样式不生效

**解决**：确保没有手动导入 `element-plus/dist/index.css`，让自动导入处理样式。

## 📚 相关文档

- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)
- [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)
- [Element Plus 按需导入](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)
- [vite-plugin-externals](https://github.com/crcong/vite-plugin-externals)

