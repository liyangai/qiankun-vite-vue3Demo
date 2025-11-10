<template>
  <div class="home">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <span>欢迎使用 Qiankun 微前端项目</span>
        </div>
      </template>
      <div class="content">
        <el-alert
          title="这是主应用首页"
          type="success"
          description="请通过左侧菜单访问不同的子应用"
          :closable="false"
          show-icon
        />

        <div class="info-section">
          <h2>项目信息</h2>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="主应用">app-main</el-descriptions-item>
            <el-descriptions-item label="端口">8080</el-descriptions-item>
            <el-descriptions-item label="子应用1">app-childone (8081)</el-descriptions-item>
            <el-descriptions-item label="子应用2">app-childtwo (8082)</el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="demo-section">
          <h2>公共组件示例</h2>
          <common-button type="primary" @click="handleClick">公共按钮组件</common-button>
          <common-card title="公共卡片组件">
            <p>这是一个来自公共组件库的卡片组件</p>
            <p>当前时间：{{ currentTime }}</p>
          </common-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CommonButton, CommonCard } from 'com-components';
import { formatDate } from 'com-utils';
import { ElMessage } from 'element-plus';

const currentTime = ref('');

onMounted(() => {
  currentTime.value = formatDate(new Date());
});

const handleClick = () => {
  ElMessage.success('点击了公共按钮组件！');
};
</script>

<style scoped>
.home {
  width: 100%;
}

.welcome-card {
  max-width: 1200px;
  margin: 0 auto;
}

.card-header {
  font-size: 20px;
  font-weight: 500;
}

.content {
  padding: 20px 0;
}

.info-section,
.demo-section {
  margin-top: 30px;
}

h2 {
  margin-bottom: 20px;
  color: #409eff;
}
</style>
