# Nginx 快速启动指南

## 🚀 快速开始（3步搞定）

### 1️⃣ 构建项目

在项目根目录运行：

```bash
pnpm build
```

✅ 构建完成后，所有文件会自动复制到 `nginx/html` 目录。

### 2️⃣ 启动 Nginx

#### Windows 用户

双击运行 `start-nginx.bat` 或在命令行执行：

```bash
cd nginx
start-nginx.bat
```

#### Linux/Mac 用户

```bash
cd nginx
chmod +x start-nginx.sh
./start-nginx.sh
```

或者手动启动：

```bash
cd nginx
nginx -p . -c conf/nginx.conf
```

### 3️⃣ 访问应用

打开浏览器访问：

- **主应用**：http://localhost:9080
- **子应用一**：http://localhost:9081（可独立访问）
- **子应用二**：http://localhost:9082（可独立访问）

## 🛑 停止 Nginx

#### Windows

双击运行 `stop-nginx.bat` 或：

```bash
nginx -s stop
```

#### Linux/Mac

```bash
./stop-nginx.sh
```

或者：

```bash
nginx -s stop
```

## 🔄 重新加载配置

修改 nginx 配置后无需重启：

```bash
nginx -s reload
```

## 📝 常见问题

### 问题 1：nginx 命令未找到

**Windows：**
1. 下载 nginx：http://nginx.org/en/download.html
2. 解压到 `C:\nginx`
3. 将 `C:\nginx` 添加到系统环境变量 PATH

或者使用完整路径：
```bash
C:\nginx\nginx.exe -p D:\Code\frot\qiankunDemo\nginx -c conf/nginx.conf
```

**Linux/Mac：**
```bash
# Ubuntu/Debian
sudo apt-get install nginx

# CentOS/RHEL
sudo yum install nginx

# macOS
brew install nginx
```

### 问题 2：端口被占用

**Windows：**
```bash
# 查看占用端口的进程
netstat -ano | findstr ":9080"

# 结束进程
taskkill /F /PID <进程ID>
```

**Linux/Mac：**
```bash
# 查看占用端口的进程
lsof -i :9080

# 结束进程
kill -9 <进程ID>
```

### 问题 3：403 Forbidden

检查文件权限（Linux/Mac）：

```bash
chmod -R 755 html
```

### 问题 4：页面显示空白

1. 检查浏览器控制台错误
2. 确认已运行 `pnpm build`
3. 检查 `nginx/html` 目录是否有文件
4. 查看 nginx 错误日志：`nginx/logs/error.log`

## 📊 查看日志

### 访问日志

```bash
# 实时查看
tail -f logs/access.log

# 查看最后 100 行
tail -n 100 logs/access.log
```

### 错误日志

```bash
# 实时查看
tail -f logs/error.log

# 查看最后 100 行
tail -n 100 logs/error.log
```

## ⚙️ 自定义配置

### 修改端口

编辑 `conf/nginx.conf`：

```nginx
server {
    listen       9080;  # 修改为你需要的端口
    server_name  localhost;
    # ...
}
```

**重要**：修改子应用端口后，需要同步更新主应用中的子应用地址！

### 配置域名

```nginx
server {
    listen       80;
    server_name  your-domain.com;  # 你的域名
    # ...
}
```

### 启用 HTTPS

```nginx
server {
    listen       443 ssl;
    server_name  your-domain.com;
    
    ssl_certificate      /path/to/cert.pem;
    ssl_certificate_key  /path/to/cert.key;
    # ...
}
```

## 🎯 生产环境建议

1. **使用 HTTPS**
2. **配置防火墙**
3. **定期备份**
4. **监控日志**
5. **定期更新 nginx**

## 📚 更多资源

- [完整部署指南](../DEPLOY.md)
- [Nginx 配置详解](./README.md)
- [项目文档](../README.md)

