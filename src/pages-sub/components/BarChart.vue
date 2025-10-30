<script lang="ts" setup>
  defineProps({
    text: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <view class="w-full bg-red color-cyan">
    <text>{{ text }}</text>
  </view>
</template>
