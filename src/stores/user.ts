import type { IUserInfoRes } from '@/api/types/login.ts'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/login.ts'

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
    const setUserInfo = (val?: IUserInfoRes): void => {
      if (val) {
        userInfo.value = val
      }
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
      setUserInfo(res.data)
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
