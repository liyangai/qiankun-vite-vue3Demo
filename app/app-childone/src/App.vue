<template>
  <div id="childone-app" class="child-app">
    <div class="app-header">
      <el-tag type="primary">子应用一</el-tag>
      <span class="app-title">App Child One</span>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('子应用一 App 组件已挂载');
});
</script>

<style scoped>
.child-app {
  padding: 20px;
  min-height: 100%;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.app-title {
  font-size: 20px;
  font-weight: 500;
  color: #409eff;
}
</style>
