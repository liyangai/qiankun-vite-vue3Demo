@echo off
chcp 65001 >nul
echo ========================================
echo   Qiankun 微前端项目 - Nginx 启动脚本
echo ========================================
echo.

REM 检查 nginx 是否已安装
where nginx >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 nginx 命令
    echo.
    echo 请先安装 nginx：
    echo 1. 下载 nginx: http://nginx.org/en/download.html
    echo 2. 解压到任意目录，例如 C:\nginx
    echo 3. 将 nginx 目录添加到系统 PATH 环境变量
    echo.
    echo 或者直接指定 nginx 路径：
    echo C:\nginx\nginx.exe -p "%~dp0" -c conf/nginx.conf
    echo.
    pause
    exit /b 1
)

echo [信息] 正在启动 nginx...
echo.

REM 切换到 nginx 目录
cd /d "%~dp0"

REM 启动 nginx
nginx -p . -c conf/nginx.conf

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   Nginx 启动成功！
    echo ========================================
    echo.
    echo 访问地址：
    echo   主应用：    http://localhost:9080
    echo   子应用一：  http://localhost:9081
    echo   子应用二：  http://localhost:9082
    echo.
    echo 停止 nginx：
    echo   nginx -s stop
    echo.
    echo 重新加载配置：
    echo   nginx -s reload
    echo.
    echo 查看日志：
    echo   logs/access.log  - 访问日志
    echo   logs/error.log   - 错误日志
    echo ========================================
) else (
    echo.
    echo [错误] Nginx 启动失败，请检查：
    echo 1. 端口 9080、9081、9082 是否被占用
    echo 2. 配置文件是否正确
    echo 3. 构建产物是否存在（html 目录）
    echo.
    echo 提示：运行 'pnpm build' 生成构建产物
)

echo.
pause

