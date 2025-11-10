<template>
  <div id="main-app">
    <el-container class="layout-container">
      <el-header class="header">
        <div class="header-content">
          <h1 class="title">Qiankun 微前端主应用</h1>
          <div class="user-info">
            <el-tag type="success">主应用</el-tag>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical"
            @select="handleMenuSelect"
          >
            <el-menu-item index="/">
              <el-icon><home-filled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/childone">
              <el-icon><document /></el-icon>
              <span>子应用一</span>
            </el-menu-item>
            <el-menu-item index="/childtwo">
              <el-icon><setting /></el-icon>
              <span>子应用二</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view v-if="!isMicroApp" />
          <div id="micro-app-container"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HomeFilled, Document, Setting } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();

const activeMenu = computed(() => route.path);

const isMicroApp = computed(() => {
  return route.path.startsWith('/childone') || route.path.startsWith('/childtwo');
});

const handleMenuSelect = (index: string) => {
  router.push(index);
};
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.header {
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.aside {
  background: #f5f5f5;
  overflow-x: hidden;
}

.main {
  background: #fff;
  padding: 20px;
  min-height: calc(100vh - 60px);
}

#micro-app-container {
  width: 100%;
  height: 100%;
}
</style>

