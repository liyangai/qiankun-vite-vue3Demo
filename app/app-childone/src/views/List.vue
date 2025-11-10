<template>
  <div class="list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>子应用一 - 列表</span>
          <el-button type="primary" size="small" @click="addItem">添加</el-button>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '活跃' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="editItem(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteItem(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="back-button">
        <el-button type="primary" @click="goBack">返回首页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();

interface TableItem {
  id: number;
  name: string;
  description: string;
  status: string;
}

const tableData = ref<TableItem[]>([
  { id: 1, name: '项目一', description: '这是项目一的描述', status: '活跃' },
  { id: 2, name: '项目二', description: '这是项目二的描述', status: '活跃' },
  { id: 3, name: '项目三', description: '这是项目三的描述', status: '归档' },
]);

const addItem = () => {
  const newId = tableData.value.length + 1;
  tableData.value.push({
    id: newId,
    name: `项目${newId}`,
    description: `这是项目${newId}的描述`,
    status: '活跃',
  });
  ElMessage.success('添加成功！');
};

const editItem = (row: TableItem) => {
  ElMessage.info(`编辑项目：${row.name}`);
};

const deleteItem = (row: TableItem) => {
  ElMessageBox.confirm('确定要删除这条记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    const index = tableData.value.findIndex((item) => item.id === row.id);
    if (index > -1) {
      tableData.value.splice(index, 1);
      ElMessage.success('删除成功！');
    }
  });
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.list {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
}

.back-button {
  margin-top: 20px;
}
</style>

