// 路由映射&&跳转处理

import { NavItem } from '@/types/index'
import { toRaw } from 'vue'
const urlMap: Record<string, string> = {
  '/pages/service/index': '/subPages/service/service',
  '/pages/hospital/index': '/subPages/hospital/hospital',
}

export const transformUrl = (url: string) => {
  for (let key in urlMap) {
    if (url.includes(key)) {
      return url.replace(key, urlMap[key])
    }
  }
  return url
}

export const handleNavigation = (e: any, list: NavItem[]) => {
  const index = e.currentTarget.dataset.index
  const item = toRaw(list)[index]
  if (item.stype === '1') {
    const url = transformUrl(item.stype_link)
    uni.navigateTo({ url: item.title ? url + '&title=' + item.title : url })
  }
}

// 格式化日期
export const formatDate = (ts: number) => {
  const d = new Date(ts * 1000)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}