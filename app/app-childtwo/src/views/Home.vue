<template>
  <div class="home">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>子应用二 - 首页</span>
        </div>
      </template>
      <el-alert
        title="欢迎访问子应用二"
        type="success"
        description="这是子应用二的首页内容"
        :closable="false"
        show-icon
      />

      <div class="nav-buttons">
        <el-button type="success" @click="goToSettings">设置页面</el-button>
        <el-button type="warning" @click="goToProfile">个人资料</el-button>
      </div>

      <div class="demo-section">
        <h3>使用公共工具函数</h3>
        <common-card title="工具函数演示">
          <div class="demo-item">
            <span class="label">当前时间：</span>
            <span>{{ currentTime }}</span>
          </div>
          <div class="demo-item">
            <span class="label">相对时间：</span>
            <span>{{ relativeTime }}</span>
          </div>
          <div class="demo-item">
            <span class="label">数字格式化：</span>
            <span>{{ formattedNumber }}</span>
          </div>
          <div class="demo-item">
            <span class="label">文件大小：</span>
            <span>{{ fileSize }}</span>
          </div>
          <div class="demo-item">
            <span class="label">手机号脱敏：</span>
            <span>{{ maskedPhone }}</span>
          </div>
        </common-card>
      </div>

      <div class="form-section">
        <h3>表单示例</h3>
        <el-form :model="form" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item>
            <common-button type="success" @click="handleSubmit">提交</common-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { CommonButton, CommonCard } from 'com-components';
import { formatDate, getRelativeTime, formatNumber, formatFileSize, maskPhone } from 'com-utils';
import { ElMessage } from 'element-plus';

const router = useRouter();
const currentTime = ref('');
const relativeTime = ref('');
const formattedNumber = ref('');
const fileSize = ref('');
const maskedPhone = ref('');

const form = reactive({
  name: '',
  email: '',
});

onMounted(() => {
  const now = new Date();
  currentTime.value = formatDate(now);

  const pastDate = new Date(now.getTime() - 1000 * 60 * 30); // 30分钟前
  relativeTime.value = getRelativeTime(pastDate);

  formattedNumber.value = formatNumber(1234567890);
  fileSize.value = formatFileSize(1234567890);
  maskedPhone.value = maskPhone('13800138000');
});

const goToSettings = () => {
  router.push('/settings');
};

const goToProfile = () => {
  router.push('/profile');
};

const handleSubmit = () => {
  ElMessage.success(`提交成功！姓名：${form.name}，邮箱：${form.email}`);
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

.demo-section,
.form-section {
  margin-top: 30px;
}

.demo-section h3,
.form-section h3 {
  margin-bottom: 15px;
  color: #67c23a;
}

.demo-item {
  margin: 10px 0;
  display: flex;
  gap: 10px;
}

.label {
  font-weight: 500;
  color: #606266;
}
</style>
