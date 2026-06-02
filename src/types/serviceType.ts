export interface Service {
  now: number
  service: serviceList
  hospitals: OrderItem[]
  my_staff: null
}

export interface serviceList {
  id: number
  app_id: number
  code: string
  stype: string
  name: string
  logo_image: string
  icon_image: string
  tags: string
  intro: string
  info: string
  content: string
  price: string
  priceo: string
  weigh: number
  use_switch: number
  createtime: number
  updatetime: number
  deletetime: null
  admin_id: number
  stype_text: string
  logo_image_url: string
  icon_image_url: string
}

export interface OrderItem {
  id: number
  name: string
  service_id: number
  service_price: string
}

export interface Client {
  id: number
  app_id: number
  user_id: number
  openid: string
  name: string
  sex: number
  age: number
  mobile: string
  idcard: string
  createtime: number
}

export interface CreateOrder {
  // 陪跑收件人信息
  address: {
    cityName: string
    countyName: string
    detailInfo: string
    userName: string
  }
  demand: string
  hospital_id: number
  hospital_name: string
  receiveAddress: string
  service_code: string
  service_id: number
  service_name: string
  service_stype: string
  starttime: number
  tel: string
  // 就诊人
  client: {
    age: number
    mobile: string
    name: string
    sex: number
  }
}