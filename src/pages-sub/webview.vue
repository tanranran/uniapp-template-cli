<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '...'
  }
})
const { url } = defineProps<{ url: string }>()
</script>

<template>
  <web-view :src="url" />
</template>
