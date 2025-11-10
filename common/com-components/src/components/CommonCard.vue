<template>
  <el-card :shadow="shadow" class="common-card">
    <template #header v-if="title">
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus';

interface Props {
  title?: string;
  shadow?: 'always' | 'hover' | 'never';
}

withDefaults(defineProps<Props>(), {
  shadow: 'hover',
});
</script>

<style scoped>
.common-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

