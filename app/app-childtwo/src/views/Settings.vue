<template>
  <div class="settings">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>子应用二 - 设置</span>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="基础设置" name="basic">
          <el-form :model="basicSettings" label-width="120px">
            <el-form-item label="应用名称">
              <el-input v-model="basicSettings.appName" />
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="basicSettings.language">
                <el-option label="简体中文" value="zh-CN" />
                <el-option label="English" value="en-US" />
              </el-select>
            </el-form-item>
            <el-form-item label="主题">
              <el-radio-group v-model="basicSettings.theme">
                <el-radio label="light">浅色</el-radio>
                <el-radio label="dark">深色</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="通知设置" name="notification">
          <el-form :model="notificationSettings" label-width="120px">
            <el-form-item label="邮件通知">
              <el-switch v-model="notificationSettings.email" />
            </el-form-item>
            <el-form-item label="短信通知">
              <el-switch v-model="notificationSettings.sms" />
            </el-form-item>
            <el-form-item label="浏览器推送">
              <el-switch v-model="notificationSettings.push" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="安全设置" name="security">
          <el-form label-width="120px">
            <el-form-item label="修改密码">
              <el-button type="primary">修改密码</el-button>
            </el-form-item>
            <el-form-item label="双因素认证">
              <el-switch v-model="securitySettings.twoFactor" />
            </el-form-item>
            <el-form-item label="登录历史">
              <el-button type="info">查看登录历史</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="button-group">
        <el-button type="success" @click="saveSettings">保存设置</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const activeTab = ref('basic');

const basicSettings = reactive({
  appName: 'app-childtwo',
  language: 'zh-CN',
  theme: 'light',
});

const notificationSettings = reactive({
  email: true,
  sms: false,
  push: true,
});

const securitySettings = reactive({
  twoFactor: false,
});

const saveSettings = () => {
  ElMessage.success('设置保存成功！');
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.settings {
  width: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: 500;
}

.button-group {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}
</style>

