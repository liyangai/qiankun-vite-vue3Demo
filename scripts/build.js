import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const nginxHtmlDir = path.join(rootDir, 'nginx', 'html');

console.log('🚀 开始构建项目...\n');

// 清理 nginx/html 目录
console.log('🧹 清理旧的构建文件...');
if (fs.existsSync(nginxHtmlDir)) {
  fs.removeSync(nginxHtmlDir);
}
fs.ensureDirSync(nginxHtmlDir);

// 构建公共库
console.log('\n📦 构建公共组件库...');
try {
  execSync('pnpm --filter com-components build', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ 公共组件库构建完成');
} catch (error) {
  console.error('❌ 公共组件库构建失败');
  process.exit(1);
}

console.log('\n📦 构建公共工具库...');
try {
  execSync('pnpm --filter com-utils build', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ 公共工具库构建完成');
} catch (error) {
  console.error('❌ 公共工具库构建失败');
  process.exit(1);
}

// 构建主应用
console.log('\n🏗️  构建主应用...');
try {
  execSync('pnpm --filter app-main build', { stdio: 'inherit', cwd: rootDir });
  const mainDistDir = path.join(rootDir, 'app', 'app-main', 'dist');
  const mainTargetDir = path.join(nginxHtmlDir, 'app-main');
  fs.copySync(mainDistDir, mainTargetDir);
  console.log('✅ 主应用构建完成并复制到 nginx/html/app-main');
} catch (error) {
  console.error('❌ 主应用构建失败');
  process.exit(1);
}

// 构建子应用一
console.log('\n🏗️  构建子应用一...');
try {
  execSync('pnpm --filter app-childone build', { stdio: 'inherit', cwd: rootDir });
  const childoneDistDir = path.join(rootDir, 'app', 'app-childone', 'dist');
  const childoneTargetDir = path.join(nginxHtmlDir, 'app-childone');
  fs.copySync(childoneDistDir, childoneTargetDir);
  console.log('✅ 子应用一构建完成并复制到 nginx/html/app-childone');
} catch (error) {
  console.error('❌ 子应用一构建失败');
  process.exit(1);
}

// 构建子应用二
console.log('\n🏗️  构建子应用二...');
try {
  execSync('pnpm --filter app-childtwo build', { stdio: 'inherit', cwd: rootDir });
  const childtwoDistDir = path.join(rootDir, 'app', 'app-childtwo', 'dist');
  const childtwoTargetDir = path.join(nginxHtmlDir, 'app-childtwo');
  fs.copySync(childtwoDistDir, childtwoTargetDir);
  console.log('✅ 子应用二构建完成并复制到 nginx/html/app-childtwo');
} catch (error) {
  console.error('❌ 子应用二构建失败');
  process.exit(1);
}

console.log('\n✨ 所有应用构建完成！');
console.log('\n📝 部署说明：');
console.log('1. 构建产物已复制到 nginx/html 目录');
console.log('2. 使用 nginx 配置文件：nginx/conf/nginx.conf');
console.log('3. 启动 nginx 后访问：');
console.log('   - 主应用：http://localhost:9080');
console.log('   - 子应用一：http://localhost:9081');
console.log('   - 子应用二：http://localhost:9082');

