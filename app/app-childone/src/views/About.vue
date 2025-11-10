<template>
  <div class="about">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>子应用一 - 关于</span>
        </div>
      </template>
      <el-descriptions title="应用信息" :column="2" border>
        <el-descriptions-item label="应用名称">app-childone</el-descriptions-item>
        <el-descriptions-item label="版本">1.0.0</el-descriptions-item>
        <el-descriptions-item label="端口">8081</el-descriptions-item>
        <el-descriptions-item label="框架">Vue 3 + TypeScript</el-descriptions-item>
        <el-descriptions-item label="构建工具">Vite</el-descriptions-item>
        <el-descriptions-item label="微前端">vite-plugin-qiankun</el-descriptions-item>
      </el-descriptions>

      <div class="back-button">
        <el-button type="primary" @click="goBack">返回首页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.about {
  width: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: 500;
}

.back-button {
  margin-top: 20px;
}
</style>

