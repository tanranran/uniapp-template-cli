import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/login.ts'
import type { IUserInfoRes } from '@/api/types/login.ts'

const initState: IUserInfoRes = {
  avatar: '',
  nickname: '',
  userId: 0,
  username: ''
}

export const useUserStore = defineStore(
  'user',
  // Setup Store 写法，Vue3 推荐用这个种方法写
  () => {
    const userInfo = ref<IUserInfoRes>({ ...initState })

    // 设置用户信息 可设置部分信息（比如更新 token）
    const setUserInfo = (val: IUserInfoRes): void => {
      userInfo.value = val
    }

    // 清除用户信息
    const clearUserInfo = (): void => {
      userInfo.value = { ...initState }
    }

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
      const res = await getUserInfo()
      setUserInfo(res)
      return res
    }

    return {
      userInfo,
      fetchUserInfo,
      setUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true // 是否持久化
  }
)
