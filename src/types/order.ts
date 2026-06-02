export interface OrderParams {
  out_trade_no: string
  demand: string
  hospital_id: number
  hospital_name: string
  price: string
  receiveAddress: string
  service_code: string
  service_id: number
  service_name: string
  service_stype: string
  starttime: number
  tel: string
  order_start_time: number
  transaction_id: string
  trade_state: string
  time_end: number
  uid: string
  code_url: string
  other: string
  service_state: string
  paidPrice: string
  area_name: string
  service_logo_image_url: string
  address?: {
    userName: string
    cityName: string
    countyName: string
    detailInfo: string
  }
  _exp_time?: number
  client_time?: string
}
