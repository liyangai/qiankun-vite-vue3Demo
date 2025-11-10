#!/bin/bash

echo "========================================"
echo "  Qiankun 微前端项目 - Nginx 启动脚本"
echo "========================================"
echo ""

# 检查 nginx 是否已安装
if ! command -v nginx &> /dev/null; then
    echo "[错误] 未找到 nginx 命令"
    echo ""
    echo "请先安装 nginx："
    echo "  Ubuntu/Debian: sudo apt-get install nginx"
    echo "  CentOS/RHEL:   sudo yum install nginx"
    echo "  macOS:         brew install nginx"
    echo ""
    exit 1
fi

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "[信息] 正在启动 nginx..."
echo ""

# 切换到 nginx 目录
cd "$SCRIPT_DIR"

# 启动 nginx
nginx -p . -c conf/nginx.conf

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  Nginx 启动成功！"
    echo "========================================"
    echo ""
    echo "访问地址："
    echo "  主应用：    http://localhost:9080"
    echo "  子应用一：  http://localhost:9081"
    echo "  子应用二：  http://localhost:9082"
    echo ""
    echo "停止 nginx："
    echo "  nginx -s stop"
    echo ""
    echo "重新加载配置："
    echo "  nginx -s reload"
    echo ""
    echo "查看日志："
    echo "  tail -f logs/access.log  # 访问日志"
    echo "  tail -f logs/error.log   # 错误日志"
    echo "========================================"
else
    echo ""
    echo "[错误] Nginx 启动失败，请检查："
    echo "1. 端口 9080、9081、9082 是否被占用"
    echo "2. 配置文件是否正确"
    echo "3. 构建产物是否存在（html 目录）"
    echo ""
    echo "提示：运行 'pnpm build' 生成构建产物"
fi

echo ""

