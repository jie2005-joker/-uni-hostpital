import request from '@/utils/request'
import { CreateOrder } from '@/types/serviceType'

// 获取首页信息
interface HomeInfo {
  aid: number,
  ssid?: string
}
export const getHomeInfoAPI = (data: HomeInfo) => {
  return request('/Index/index', 'GET', data)
}

// 获取服务项目列表
export const getServiceListAPI = (data: number) => {
  return request('/Service/order', 'GET', {
    svid: data
  })
}

// 获取就诊人列表
export const getClientListAPI = () => {
  return request('/User/clients', 'GET')
}

// 获取验证码
export const getCodeAPI = (data: {
  tel: string
}) => {
  return request('/get/code', 'POST', data)
}

// 验证码登录
export const loginAPI = (data: {
  tel: string,
  code: string
}) => {
  return request('/user/authentication', 'POST', data)
}

// 创建订单列表
export const createOrderAPI = (data: CreateOrder) => {
  return request('/pay/createOrder', 'POST', data)
}


// 获取订单列表
export const getOrderListAPI = (data: {
  state?: string
}) => {
  return request('/order/list', 'GET', data)
}

// 获取订单详情
export const getOrderDetailAPI = (data: {
  oid: string
}) => {
  return request('/order/detail', 'GET', data)
}

// 获取医院信息
export const getHospitalInfoAPI = (data: {
  hid: string
}) => {
  return request('/Hospital/index', 'GET', data)
}



// Utils.request({
// 				url: '/app/init',
// 				success:(res) => {
// 					uni.setStorageSync('cfg', res.data.cfg)
// 				}
// 			})
export const getMapHospital = () => {
  return request('/app/init', 'GET')
}

// 获取个人资料
export const getPersonInfoAPI = () => {
  return request('/User/index', 'GET')
}