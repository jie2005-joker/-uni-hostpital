import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '@/utils/request'

interface UserInfo {
  openid: string,
  sessionid: string,
  userinfo: object
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const code = ref('')

  // 判断订单状态
  const status = ref('')
  const setStatus = (s: string) => {
    status.value = s
  }

  // 是否已登录
  const isLogin = computed(() => !!userInfo.value?.openid)

  // 获取登录 code

  const login = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      uni.login({
        success: async (res) => {
          code.value = res.code
          const resLogin = await request('/auth/wxLogin', 'GET', { code: code.value })
          // 本地存储用户信息
          setUserInfo(resLogin.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  // 设置用户信息
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  // 退出登录
  const logout = () => {
    userInfo.value = null
    code.value = ''
  }

  return { userInfo, code, isLogin, status, login, setUserInfo, setStatus, logout }
})