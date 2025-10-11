<template>
  <base-layout ref="pages" :autoLoading=true class="bg-green">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <text v-for="i in dataList" :key="i" class="title">{{ i }}</text>
    </z-paging>
  </base-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseLayout from '@/layout/baseLayout.vue';
// 或使用简化写法
const paging = ref<ZPagingRef>();
const dataList = ref([]);
const pages = ref<InstanceType<typeof BaseLayout>>();
const queryList = (pageNo: number, pageSize: number) => {
  setTimeout(() => {
    let listData = [];
    for (let i = 0; i < 30; i++) {
      listData.push({
        title: '测试数据' + i
      });
    }
    if (pageNo == 3) {
      listData = [];
    }
    paging?.value?.complete(listData);
  }, 2000);
};
function onTestClick() {
  pages?.value?.showError('加载失败', () => {
    setTimeout(() => {
      pages?.value?.showSuccess();
    }, 100);
  });
}
</script>

<style>
.content {
  width: 100%;
  height: 100vh;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 56rpx;
  color: #8f8f94;
}
</style>
