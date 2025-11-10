# 部署指南

本项目使用 Nginx 进行部署，支持开发环境和生产环境。

## 快速部署

### 1. 构建项目

```bash
pnpm build
```

执行后会：
- ✅ 构建所有公共库
- ✅ 构建所有应用
- ✅ 自动复制到 `nginx/html` 目录

### 2. 启动 Nginx

#### Windows

```bash
# 进入 nginx 目录
cd nginx

# 启动（假设 nginx 安装在 C:\nginx）
C:\nginx\nginx.exe -p . -c conf/nginx.conf

# 重新加载配置
C:\nginx\nginx.exe -s reload

# 停止
C:\nginx\nginx.exe -s stop
```

#### Linux/Mac

```bash
# 进入 nginx 目录
cd nginx

# 启动
nginx -p . -c conf/nginx.conf

# 重新加载配置
nginx -s reload

# 停止
nginx -s stop
```

### 3. 访问应用

生产环境（Nginx）：
- 主应用：http://localhost:9080
- 子应用一：http://localhost:9081
- 子应用二：http://localhost:9082

开发环境（Vite）：
- 主应用：http://localhost:8080
- 子应用一：http://localhost:8081
- 子应用二：http://localhost:8082

## 开发环境 vs 生产环境

### 开发环境

开发环境使用 Vite 开发服务器：

```bash
pnpm dev
```

特点：
- 热更新
- 快速编译
- 源码调试

### 生产环境

生产环境使用 Nginx 部署构建后的静态文件：

```bash
pnpm build
cd nginx
nginx -p . -c conf/nginx.conf
```

特点：
- 静态文件服务
- Gzip 压缩
- 资源缓存
- 跨域配置

## 生产环境配置建议

### 1. 使用环境变量

创建 `.env.production` 文件：

```bash
# app/app-main/.env.production
VITE_API_BASE_URL=https://api.your-domain.com
VITE_CHILD_ONE_URL=https://your-domain.com:9081
VITE_CHILD_TWO_URL=https://your-domain.com:9082
```

### 2. 修改主应用配置

```typescript
// app/app-main/src/main.ts
const childOneUrl = import.meta.env.VITE_CHILD_ONE_URL || '//localhost:8081';
const childTwoUrl = import.meta.env.VITE_CHILD_TWO_URL || '//localhost:8082';

registerMicroApps([
  {
    name: 'app-childone',
    entry: childOneUrl,
    container: '#micro-app-container',
    activeRule: '/childone',
  },
  {
    name: 'app-childtwo',
    entry: childTwoUrl,
    container: '#micro-app-container',
    activeRule: '/childtwo',
  },
]);
```

### 3. 配置域名和 HTTPS

编辑 `nginx/conf/nginx.conf`：

```nginx
server {
    listen       443 ssl http2;
    server_name  your-domain.com;
    
    ssl_certificate      /path/to/fullchain.pem;
    ssl_certificate_key  /path/to/privkey.pem;
    
    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # ... 其他配置
}

# HTTP 重定向到 HTTPS
server {
    listen       80;
    server_name  your-domain.com;
    return 301   https://$server_name$request_uri;
}
```

### 4. 性能优化

Nginx 配置已包含以下优化：

- ✅ Gzip 压缩
- ✅ 静态资源缓存（30天）
- ✅ 浏览器缓存控制
- ✅ CORS 支持

### 5. 监控和日志

```bash
# 查看访问日志
tail -f nginx/logs/access.log

# 查看错误日志
tail -f nginx/logs/error.log
```

## Docker 部署（可选）

创建 `Dockerfile`：

```dockerfile
FROM nginx:alpine

# 复制构建产物
COPY nginx/html /usr/share/nginx/html
COPY nginx/conf/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf/mime.types /etc/nginx/mime.types

EXPOSE 8080 8081 8082

CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
# 构建镜像
docker build -t qiankun-demo .

# 运行容器
docker run -d -p 8080:8080 -p 8081:8081 -p 8082:8082 qiankun-demo
```

## 持续集成/持续部署（CI/CD）

### GitHub Actions 示例

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install pnpm
      run: npm install -g pnpm
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Build
      run: pnpm build
    
    - name: Deploy to server
      uses: easingthemes/ssh-deploy@main
      with:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        SOURCE: "nginx/html/"
        TARGET: "/var/www/qiankun-demo/"
```

## 故障排查

### 构建失败

```bash
# 清理依赖重新安装
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install

# 清理构建缓存
pnpm --filter com-components build
pnpm --filter com-utils build
pnpm build
```

### 应用无法访问

1. 检查 Nginx 是否启动
2. 检查端口是否被占用
3. 检查防火墙设置
4. 查看 Nginx 错误日志

### 子应用加载失败

1. 检查浏览器控制台错误
2. 验证 CORS 配置
3. 确认子应用构建产物存在
4. 检查主应用中的子应用地址配置

## 更多帮助

- [项目 README](./README.md)
- [Nginx 部署说明](./nginx/README.md)
- [使用指南](./USAGE.md)

