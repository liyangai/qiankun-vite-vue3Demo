<template>
  <div class="profile">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>子应用二 - 个人资料</span>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="avatar-section">
            <el-avatar :size="120" src="https://via.placeholder.com/120" />
            <el-button type="primary" size="small" class="upload-btn">上传头像</el-button>
          </div>
        </el-col>
        <el-col :span="16">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户名">{{ profile.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ profile.name }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ profile.email }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ profile.phone }}</el-descriptions-item>
            <el-descriptions-item label="部门">{{ profile.department }}</el-descriptions-item>
            <el-descriptions-item label="职位">{{ profile.position }}</el-descriptions-item>
            <el-descriptions-item label="注册时间" :span="2">
              {{ profile.registerTime }}
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>

      <div class="edit-form">
        <h3>编辑资料</h3>
        <el-form :model="editForm" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="editForm.name" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editForm.email" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="editForm.phone" />
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="editForm.department" />
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="editForm.position" />
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="editForm.bio" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="updateProfile">更新资料</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();

const profile = reactive({
  username: 'user001',
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  department: '技术部',
  position: '前端工程师',
  registerTime: '2023-01-15',
});

const editForm = reactive({
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  department: '技术部',
  position: '前端工程师',
  bio: '一名热爱编程的前端工程师',
});

const updateProfile = () => {
  Object.assign(profile, editForm);
  ElMessage.success('资料更新成功！');
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.profile {
  width: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: 500;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.upload-btn {
  margin-top: 10px;
}

.edit-form {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #ebeef5;
}

.edit-form h3 {
  margin-bottom: 20px;
  color: #67c23a;
}
</style>
