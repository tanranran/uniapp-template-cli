<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '我是首页'
  }
})
const { page, paging } = useGlobalPage()
const dataList = ref<ZPagingVirtualItem<{ title: string }>[]>([])
const queryList = (pageNo: number, pageSize: number) => {
  setTimeout(() => {
    let listData = []
    for (let i = 0; i < 80; i++) {
      listData.push({
        title: '测试数据' + i + pageSize
      })
    }
    if (pageNo == 3) {
      listData = []
    }
    paging?.value?.complete(listData)
    page?.value?.showSuccess()
  }, 500)
}
</script>

<template>
  <base-layout ref="page">
    <button @click="router.showTestA()">跳转到testA</button>
    <button @click="router.showTestB()">跳转到testB</button>
    <!--    <z-paging ref="paging" :cell-height-mode="'dynamic'" :force-close-inner-list="true" use-virtual-list @query="queryList" @virtualListChange="(vList: any) => (dataList = vList)">-->
    <!--      <view v-for="item in dataList" :id="`zp-id-${item.zp_index}`" :key="item.zp_index" class="block">-->
    <!--        <text>萨菲隆卡视角福利卡随机发立卡手机safsafa</text>-->
    <!--      </view>-->
    <!--    </z-paging>-->
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
