@echo off
chcp 65001 >nul
echo ========================================
echo   Qiankun 微前端项目 - Nginx 重载脚本
echo ========================================
echo.

where nginx >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 nginx 命令
    echo.
    echo 请手动重新加载 nginx 配置：
    echo C:\nginx\nginx.exe -s reload
    echo.
    pause
    exit /b 1
)

echo [信息] 正在重新加载 nginx 配置...
nginx -s reload

if %errorlevel% equ 0 (
    echo.
    echo [成功] Nginx 配置已重新加载
    echo.
    echo 新的构建文件已生效
    echo 请刷新浏览器查看更新
) else (
    echo.
    echo [警告] 重新加载可能失败
    echo.
    echo 建议停止后重新启动：
    echo   stop-nginx.bat
    echo   start-nginx.bat
)

echo.
pause

