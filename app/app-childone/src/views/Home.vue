<template>
  <div class="home">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>子应用一 - 首页</span>
        </div>
      </template>
      <el-alert
        title="欢迎访问子应用一"
        type="info"
        description="这是子应用一的首页内容"
        :closable="false"
        show-icon
      />

      <div class="nav-buttons">
        <el-button type="primary" @click="goToAbout">关于页面</el-button>
        <el-button type="success" @click="goToList">列表页面</el-button>
      </div>

      <div class="demo-section">
        <h3>使用公共组件</h3>
        <common-button type="success" @click="handleCommonClick">
          公共按钮（子应用一）
        </common-button>
        <common-card title="子应用一信息">
          <p>当前应用：app-childone</p>
          <p>端口：8081</p>
          <p>时间：{{ currentTime }}</p>
        </common-card>
      </div>

      <div class="stats">
        <el-statistic title="访问次数" :value="visitCount" />
        <el-button type="primary" @click="incrementCount">增加计数</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CommonButton, CommonCard } from 'com-components';
import { formatDate } from 'com-utils';
import { ElMessage } from 'element-plus';

const router = useRouter();
const currentTime = ref('');
const visitCount = ref(0);

onMounted(() => {
  currentTime.value = formatDate(new Date());
});

const goToAbout = () => {
  router.push('/about');
};

const goToList = () => {
  router.push('/list');
};

const handleCommonClick = () => {
  ElMessage.success('点击了子应用一的公共按钮！');
};

const incrementCount = () => {
  visitCount.value++;
};
</script>

<style scoped>
.home {
  width: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: 500;
}

.nav-buttons {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.demo-section {
  margin: 30px 0;
}

.demo-section h3 {
  margin-bottom: 15px;
  color: #409eff;
}

.stats {
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
