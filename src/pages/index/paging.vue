<template>
  <base-layout ref="page">
    <z-paging ref="paging" :cell-height-mode="'dynamic'" :force-close-inner-list="true" use-virtual-list @query="queryList" @virtualListChange="(vList: any) => (dataList = vList)">
      <view v-for="item in dataList" :id="`zp-id-${item.zp_index}`" :key="item.zp_index" class="block">
        <text>测试列表XXXXXXXXXX</text>
      </view>
    </z-paging>
  </base-layout>
</template>

<script lang="ts" setup>
  definePage({
    type: 'home',
    style: {
      navigationBarTitleText: '我是首页'
    },
    needLogin: true
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
  onMounted(() => {
    // paging?.value.
  })
</script>
