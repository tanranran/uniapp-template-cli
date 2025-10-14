<script lang="ts" setup>
const paging = ref<ZPagingRef>()
const dataList = ref<{ title: string }[]>([])
const pages = ref(BaseLayoutRefType)
const queryList = (pageNo: number, pageSize: number) => {
  setTimeout(() => {
    let listData = []
    for (let i = 0; i < 30; i++) {
      listData.push({
        title: '测试数据' + i + pageSize
      })
    }
    if (pageNo == 3) {
      listData = []
    }
    paging?.value?.complete(listData)
  }, 800)
}
const onTestClick = () => {
  // pages?.value?.showLoading()
  // setTimeout(() => {
  //   pages?.value?.showEmpty()
  // }, 1000)
  pages?.value?.showToast('测试')
}
</script>

<template>
  <base-layout ref="pages">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <wd-text v-for="i in dataList" :key="i.title" :text="i.title" class="title" @click="onTestClick" />
    </z-paging>
  </base-layout>
</template>

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
