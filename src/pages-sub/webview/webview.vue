<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '...'
  }
})
const url = ref()
onLoad((op) => {
  if (op?.title) {
    uni.setNavigationBarTitle({
      title: op.title
    })
  }
  if (op?.url || op?.src) {
    url.value = decodeURIComponent(op?.url || op?.src)
  }
})

function handleMessage(e: WebViewOnMessageEvent) {
  uni.showModal({
    content: JSON.stringify(e.detail),
    showCancel: false
  })
}
</script>

<template>
  <web-view :src="url" @message="handleMessage" />
</template>
