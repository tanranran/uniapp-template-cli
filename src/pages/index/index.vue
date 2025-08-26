<template>
  <view class="content flex-center">
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('Hello');
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
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
