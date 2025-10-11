<template>
  <view :style="{ height: height }" class="base-layout flex flex-col">
    <slot v-if="success" />
    <view v-if="state.showLoading" class="state-layout state-layout--loading flex-col-center">
      <wd-loading color="#777777" />
      <text class="text-#777 m-t-10rpx">加载中...</text>
    </view>

    <view v-if="state.showEmpty" class="state-layout state-layout--empty flex-col-center text-#777">
      <wd-icon name="file" size="46" />
      <text class="m-t-10rpx">暂无数据</text>
    </view>

    <view v-if="state.showError" class="state-layout state-layout--error flex-col-center text-#777">
      <wd-icon name="file-excel" size="46" />
      <text class="m-t-10rpx">{{ state.errorStr || '加载失败' }}</text>
      <wd-button class="m-t-10rpx" type="warning" @click="handleRetry">重新加载</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';

defineOptions({
  name: 'BaseLayout',
  inheritAttrs: true,
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
});

interface Props {
  height?: string;
  autoLoading?: boolean;
  showLogin?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  height: '100%',
  autoLoading: false,
  showLogin: false
});

const state = reactive({
  showLoading: false,
  showError: false,
  showEmpty: false,
  errorStr: '',
  errorCallback: () => {}
});

const success: Ref<boolean> = computed(() => {
  return !(state.showLoading || state.showError || state.showEmpty);
});

onBeforeMount(() => {
  if (props.autoLoading) {
    state.showLoading = true;
  }
});

function resetState() {
  Object.assign(state, {
    showLoading: false,
    showError: false,
    showEmpty: false,
    errorStr: '',
    errorCallback: () => {}
  });
}

function showLoading() {
  resetState();
  state.showLoading = true;
}

function showEmpty() {
  resetState();
  state.showEmpty = true;
}

function showError(errorStr: string, errorCallback: () => void) {
  resetState();
  state.showError = true;
  state.errorStr = errorStr;
  state.errorCallback = errorCallback;
}

function showSuccess() {
  resetState();
}

function handleRetry() {
  state.errorCallback?.();
  showLoading();
}

defineExpose({
  showLoading,
  showEmpty,
  showSuccess,
  showError
});
</script>

<style scoped>
.base-layout {
  position: relative;
  width: 100%;
}

.state-layout {
  width: 100%;
  flex: 1;
  display: flex;
}
</style>
