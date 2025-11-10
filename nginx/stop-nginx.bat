@echo off
chcp 65001 >nul
echo ========================================
echo   Qiankun 微前端项目 - Nginx 停止脚本
echo ========================================
echo.

where nginx >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 nginx 命令
    pause
    exit /b 1
)

echo [信息] 正在停止 nginx...
nginx -s stop

if %errorlevel% equ 0 (
    echo.
    echo [成功] Nginx 已停止
) else (
    echo.
    echo [警告] 停止命令执行完成，但可能需要手动检查进程
    echo.
    echo 手动停止方法：
    echo 1. 查看 nginx 进程：
    echo    netstat -ano ^| findstr ":8080"
    echo.
    echo 2. 停止进程：
    echo    taskkill /F /PID ^<进程ID^>
)

echo.
pause

