export interface Slides {
  id: number
  pic_image: string
  stype: string
  stype_link: string
  title: string
  stype_text: string
  pic_image_url: string
}

export interface NavItem {
  id: number
  pic_image: string
  stype: string
  stype_link: string
  title: string
  tcolor: string
  cat_text: string
  stype_text: string
  pic_image_url: string
}

export interface Hospital {
  id: number
  avatar_url: string
  avatar: string
  intro: string
  label: string
  name: string
  rank: string
}

export interface MyStaff {
  id: number
  nickname: string
  avatar: string
  sex: string
  age: number
  mobile: string
  sex_text: string
  odmanar_text: string
  master_text: string
  status_text: string
  status_time_text: string
  avatar_url: string
}

export interface HomeInfo {
  hospitals: Hospital[]
  my_staff: MyStaff
  navs: NavItem[]
  nav2s: NavItem[]
  now: number
  slides: Slides[]
}