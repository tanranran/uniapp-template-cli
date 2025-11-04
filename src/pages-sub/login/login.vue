<script lang="ts" setup>
  import { useTokenStore } from '@/store/useTokenStore.ts'
  import { useUserStore } from '@/store/user'
  import { ensureDecodeURIComponent } from '@/utils'
  import { parseUrlToObj } from '@/utils'

  definePage({
    style: {
      navigationBarTitleText: '登录'
    }
  })

  const redirectUrl = ref('')
  onLoad(options => {
    console.log('login options: ', options)
    if (options.redirect) {
      redirectUrl.value = ensureDecodeURIComponent(options.redirect)
    } else {
      redirectUrl.value = tabbarList[0].pagePath
    }
    console.log('redirectUrl.value: ', redirectUrl.value)
  })

  const tokenStore = useTokenStore()
  async function doLogin() {
    if (tokenStore.hasLogin) {
      uni.navigateBack()
      return
    }
    try {
      // 调用登录接口
      await tokenStore.login({
        username: '菲鸽',
        password: '123456'
      })
      console.log(redirectUrl.value)
    } catch (error) {
      console.log('登录失败', error)
    }
    let path = redirectUrl.value
    if (!path.startsWith('/')) {
      path = `/${path}`
    }
    const { path: _path, query } = parseUrlToObj(path)
    console.log('_path:', _path, 'query:', query, 'path:', path)
    console.log('isPageTabbar(_path):', isPageTabbar(_path))
    uni.navigateBack()
  }
</script>

<template>
  <view class="login">
    <view class="text-center">登录页</view>
    <button class="mt-4 w-40 text-center" @click="doLogin">点击模拟登录</button>
  </view>
</template>
