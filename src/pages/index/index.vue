<script lang="ts" setup>
const paging = ref<ZPagingRef>()
const dataList = ref<ZPagingVirtualItem<{ title: string }>[]>([])
const pages = ref<BaseLayoutRef>()
const queryList = (pageNo: number, pageSize: number) => {
  setTimeout(() => {
    let listData = []
    for (let i = 0; i < 300; i++) {
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
// 监听虚拟列表数组改变并赋值给virtualList进行重新渲染
// const virtualListChange = (vList: Array<ZPagingVirtualItem<{ title: string }>>) => {
//   dataList.value = vList
//   console.log('测his互数据 啊啊', vList)
// }
</script>

<template>
  <base-layout ref="pages" :autoLoading="true">
    <z-paging ref="paging" :cell-height-mode="'dynamic'" :force-close-inner-list="true" use-virtual-list @query="queryList" @virtualListChange="(vList: any) => (dataList = vList)">
      <view v-for="item in dataList" :id="`zp-id-${item.zp_index}`" :key="item.zp_index" class="block">
        <text>萨菲隆卡视角福利卡随机发立卡手机</text>
      </view>
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
