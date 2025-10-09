<template>
  <view :style="{ height: height }" class="base-layout flex flex-col">
    <slot v-if="success" />
    <view v-if="state.showLoading" class="state-layout flex-col-center">
      <wd-loading :color="'#777777'" />
      <text class="text-#777 m-t-10rpx">加载中...</text>
    </view>

    <view v-if="state.showEmpty" class="state-layout flex-col-center text-#777">
      <wd-icon :size="46" name="file" />
      <text class="m-t-10rpx">暂无数据</text>
    </view>

    <view v-if="state.showError" class="state-layout flex-col-center text-#777">
      <wd-icon :size="46" name="file-excel" />
      <text class="m-t-10rpx">加载失败</text>
      <wd-button class="m-t-10rpx" type="warning" @click="(state.showErrorCallback(), showLoading())">重新加载</wd-button>
    </view>
  </view>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'baseLayout',
  inheritAttrs: true,
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
});

const props = defineProps({
  height: {
    type: String,
    default: '100%'
  },
  autoLoading: {
    type: Boolean,
    default: false
  },
  showLogin: {
    type: Boolean,
    default: false
  }
});

const state = ref({
  showLoading: false,
  showError: false,
  showErrorCallback: () => {},
  showEmpty: false
});

const success = computed(() => {
  return !state.value.showLoading && !state.value.showError && !state.value.showEmpty;
});

onBeforeMount(() => {
  if (props.autoLoading) {
    state.value.showLoading = true;
  }
});

function resetState() {
  state.value.showLoading = false;
  state.value.showError = false;
  state.value.showEmpty = false;
}
function showLoading() {
  resetState();
  state.value.showLoading = true;
}
function showEmpty() {
  resetState();
  state.value.showEmpty = true;
}
function showError(errorStr: string, showErrorCallback: () => void) {
  resetState();
  state.value.showError = true;
  state.value.showErrorCallback = showErrorCallback;
}

function showSuccess() {
  resetState();
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
