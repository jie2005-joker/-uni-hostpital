import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import { setLogoutCallback } from '@/utils/request'
import { useUserStore } from '@/stores/user'

Date.prototype.VP_FORMAT = function (fmt: string) {
  const o: Record<string, number> = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').slice(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).slice(String(o[k]).length))
    }
  }
  return fmt
}

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)

  // 设置登出回调，避免循环依赖
  setLogoutCallback(() => {
    useUserStore().logout()
  })

  return {
    app,
  };
}
