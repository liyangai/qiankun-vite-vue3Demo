#!/bin/bash

echo "========================================"
echo "  Qiankun 微前端项目 - Nginx 停止脚本"
echo "========================================"
echo ""

if ! command -v nginx &> /dev/null; then
    echo "[错误] 未找到 nginx 命令"
    exit 1
fi

echo "[信息] 正在停止 nginx..."
nginx -s stop

if [ $? -eq 0 ]; then
    echo ""
    echo "[成功] Nginx 已停止"
else
    echo ""
    echo "[警告] 停止命令执行完成，但可能需要手动检查进程"
    echo ""
    echo "手动停止方法："
    echo "1. 查看 nginx 进程："
    echo "   ps aux | grep nginx"
    echo ""
    echo "2. 停止进程："
    echo "   sudo kill -9 <进程ID>"
fi

echo ""

