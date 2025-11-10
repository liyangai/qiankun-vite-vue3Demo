#!/bin/bash

echo "========================================"
echo "  Qiankun 微前端项目 - Nginx 重载脚本"
echo "========================================"
echo ""

if ! command -v nginx &> /dev/null; then
    echo "[错误] 未找到 nginx 命令"
    exit 1
fi

echo "[信息] 正在重新加载 nginx 配置..."
nginx -s reload

if [ $? -eq 0 ]; then
    echo ""
    echo "[成功] Nginx 配置已重新加载"
    echo ""
    echo "新的构建文件已生效"
    echo "请刷新浏览器查看更新"
else
    echo ""
    echo "[警告] 重新加载可能失败"
    echo ""
    echo "建议停止后重新启动："
    echo "  ./stop-nginx.sh"
    echo "  ./start-nginx.sh"
fi

echo ""

