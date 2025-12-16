<script lang="ts" setup>
interface Props {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: ''
})
</script>

<template>
  <view class="w-full bg-red color-cyan">
    <text>{{ text }}</text>
  </view>
</template>
