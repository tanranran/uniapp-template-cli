<script lang="ts" setup>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';

onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style lang="scss">
page,
html,
body,
#app {
  height: 100%;
  background-color: #f5f5f5;
  @apply max-w-[750rpx] mx-auto;
}

/* 隐藏 scroll-view 的滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
</style>
