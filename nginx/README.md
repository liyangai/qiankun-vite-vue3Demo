# Nginx 部署指南

## 目录结构

```
nginx/
├── conf/
│   ├── nginx.conf        # Nginx 主配置文件
│   └── mime.types        # MIME 类型配置
├── html/                 # 静态文件目录（构建后自动生成）
│   ├── app-main/        # 主应用
│   ├── app-childone/    # 子应用一
│   └── app-childtwo/    # 子应用二
├── logs/                 # 日志目录（运行时生成）
└── README.md            # 本文件
```

## 快速开始

### 1. 构建项目

在项目根目录执行：

```bash
pnpm build
```

这会：
- 构建公共组件库和工具库
- 构建所有应用
- 自动复制构建产物到 `nginx/html` 目录

### 2. 安装 Nginx

#### Windows

1. 下载 Nginx：http://nginx.org/en/download.html
2. 解压到任意目录，例如 `C:\nginx`
3. 将本项目的 `nginx/conf/nginx.conf` 复制到 `C:\nginx\conf\`
4. 将本项目的 `nginx/html` 目录复制到 `C:\nginx\`

#### Linux/Mac

```bash
# Ubuntu/Debian
sudo apt-get install nginx

# CentOS/RHEL
sudo yum install nginx

# macOS
brew install nginx
```

### 3. 配置 Nginx

#### 方法一：使用项目内置配置（推荐）

直接在项目的 `nginx` 目录下启动：

```bash
# Windows（在项目根目录）
cd nginx
"C:\nginx\nginx.exe" -p . -c conf/nginx.conf

# Linux/Mac
cd nginx
nginx -p . -c conf/nginx.conf
```

#### 方法二：复制到系统 Nginx

将 `nginx/conf/nginx.conf` 和 `nginx/html` 复制到系统 Nginx 目录。

**注意**：需要修改配置文件中的 `html` 路径为绝对路径。

### 4. 启动 Nginx

#### Windows

```bash
# 启动
nginx.exe -p nginx -c conf/nginx.conf

# 重新加载配置
nginx.exe -s reload

# 停止
nginx.exe -s stop
```

#### Linux/Mac

```bash
# 启动
sudo nginx -p nginx -c conf/nginx.conf

# 重新加载配置
sudo nginx -s reload

# 停止
sudo nginx -s stop

# 查看状态
ps aux | grep nginx
```

### 5. 访问应用

- **主应用**：http://localhost:9080
- **子应用一**：http://localhost:9081（可独立访问）
- **子应用二**：http://localhost:9082（可独立访问）

## 配置说明

### 端口配置

生产环境端口：
- 主应用：9080
- 子应用一：9081
- 子应用二：9082

开发环境端口：
- 主应用：8080
- 子应用一：8081
- 子应用二：8082

如需修改端口，编辑 `nginx/conf/nginx.conf`：

```nginx
server {
    listen       9080;  # 修改为你需要的端口
    server_name  localhost;
    # ...
}
```

**重要**：如果修改了子应用端口，需要同步修改主应用中的子应用注册地址。

### 域名配置

生产环境建议使用域名：

```nginx
server {
    listen       80;
    server_name  your-domain.com;  # 修改为你的域名
    # ...
}
```

### HTTPS 配置

```nginx
server {
    listen       443 ssl;
    server_name  your-domain.com;
    
    ssl_certificate      /path/to/cert.pem;
    ssl_certificate_key  /path/to/cert.key;
    
    # ...
}
```

### 跨域配置

配置文件已包含 CORS 支持，如需调整：

```nginx
location / {
    # 允许的域名（生产环境建议指定具体域名）
    add_header Access-Control-Allow-Origin *;
    
    # 允许的请求方法
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    
    # 允许的请求头
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
}
```

## 生产环境部署

### 1. 环境变量配置

在各应用的构建配置中设置生产环境地址。

### 2. 主应用配置

修改 `app/app-main/src/main.ts`，使用环境变量：

```typescript
const isProd = import.meta.env.PROD;
const baseUrl = isProd ? 'https://your-domain.com' : '//localhost';

registerMicroApps([
  {
    name: 'app-childone',
    entry: `${baseUrl}:8081`,
    container: '#micro-app-container',
    activeRule: '/childone',
  },
  // ...
]);
```

### 3. 性能优化

配置文件已包含：
- Gzip 压缩
- 静态资源缓存（30天）
- 浏览器缓存控制

### 4. 安全建议

- 使用 HTTPS
- 配置防火墙规则
- 限制 CORS 允许的域名
- 定期更新 Nginx
- 配置访问日志和错误日志

## 常见问题

### 1. 端口被占用

```bash
# Windows - 查看端口占用
netstat -ano | findstr :9080

# 停止占用端口的进程
taskkill /F /PID <进程ID>

# Linux/Mac
lsof -i :9080
kill -9 <进程ID>
```

### 2. 403 Forbidden

检查文件权限：

```bash
# Linux/Mac
chmod -R 755 nginx/html
```

### 3. 404 Not Found

- 确认构建产物已复制到 `nginx/html`
- 检查 nginx.conf 中的 `root` 路径是否正确

### 4. 子应用加载失败

- 检查子应用是否正确构建
- 验证 CORS 配置
- 检查浏览器控制台错误信息

## 监控和日志

### 访问日志

```bash
# 实时查看访问日志
tail -f nginx/logs/access.log
```

### 错误日志

```bash
# 实时查看错误日志
tail -f nginx/logs/error.log
```

## 更多资源

- [Nginx 官方文档](http://nginx.org/en/docs/)
- [Qiankun 部署指南](https://qiankun.umijs.org/zh/guide/tutorial#%E9%83%A8%E7%BD%B2)

