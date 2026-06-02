export interface HospitalInfo {
  now: number
  services: [{
    id: number
    code: string
    stype: string
    name: string
    logo_image: string
    icon_image: string
    intro: string
    price: string
    priceo: string
    use_switch: number
    stype_text: string
    logo_image_url: string
    icon_image_url: string
  }]
  hospital: {
    id: number
    app_id: number
    area_id: number
    name: string
    avatar: string
    rank: string
    label: string
    intro: string
    province: string
    city: string
    district: string
    address: string
    lat: number
    lng: number
    service: string
    weigh: number
    use_switch: number
    createtime: number
    updatetime: number
    deletetime: null
    admin_id: number
    avatar_url: string
  }
}