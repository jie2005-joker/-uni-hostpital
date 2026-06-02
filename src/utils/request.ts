// 登出回调，由外部设置，避免循环依赖
let logoutCallback: (() => void) | null = null
export const setLogoutCallback = (cb: () => void) => {
  logoutCallback = cb
}

const BASE_URL = 'https://code.itndedu.com/pz'
const Timeout = 500000

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ResponseData<T> {
  code: number,
  msg: string,
  data?: T,
  wx_code?: string,
}

const request = <T = any>(
  url: string,
  method: Method = 'GET',
  data?: any,
): Promise<ResponseData<T>> => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '加载中...',
      mask: true,
    })
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        token: uni.getStorageSync('token') || ''
      },
      timeout: Timeout,
      success: (res) => {
        const result = res.data as ResponseData<T>
        if (result.code === 10000) {
          resolve(result)
        } else if (result.code === 401) {
          logoutCallback?.()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(result.msg)
        } else {
          uni.showToast({ title: result.msg || '请求失败', icon: 'none' })
          reject(result.msg)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络异常，请稍后重试',
          icon: 'none',
        })
        reject(err)
      },
      complete: () => {
        uni.hideLoading()
      }
    })

  })
}

export default request