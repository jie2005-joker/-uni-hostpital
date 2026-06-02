
<template>
  <view>
    <view class="od-banner">
      <image class="od-banner-icon" src="/static/resource/images/od_bg_icon.png" mode="widthFix" />
      <view class="od-jd od-jd-0">
        <view class="od-jd-out">
          <view class="od-jd-in"></view>
        </view>
        <view class="vp-flex od-jd-text">
          <view class="vp-flex_1">
            <text class="od-jd-st-0">填写订单</text>
          </view>
          <view class="vp-flex_1">
            <text class="od-jd-st-10">在线支付</text>
          </view>
          <view class="vp-flex_1">
            <text class="od-jd-st-20">专人服务</text>
          </view>
          <view class="vp-flex_1">
            <text class="od-jd-st-30">服务完成</text>
          </view>
        </view>
      </view>
    </view>
    <view class="pub-box">
      <view class="pub-box-bd">
        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <image class="serv-icon" :src="serviceList.service?.logo_image ? imgUrl : '/static/resource/images/avatar_def.png'" mode="aspectFill"></image>
          </view>
          <view class="weui-cell__bd">
            <text class="serv-name">{{ serviceList?.service?.name }}</text>
          </view>
          <view class="weui-cell__ft" @tap="handleTop">
            <view class="f5 ic_info">服务内容</view>
          </view>
        </view>
      </view>
    </view>
    <block v-if="serviceList?.service?.stype === '10' || serviceList?.service?.stype === '15' || serviceList?.service?.stype === '20'">
      <view class="pub-box">
        <view class="pub-box-bd">
          <!-- 就诊医院 -->
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label">就诊医院</view>
            </view>
            <view class="weui-cell__bd"></view>
            <view class="weui-cell__ft weui-cell__ft_in-access">
              <view>
                <picker @change="onHospitalChange" :value="hospital_index" :range="serviceList?.hospitals"
                    range-key="name">
                    <input type="text" :disabled="true" placeholder="请选择要就诊的医院"
                        :value="serviceList?.hospitals[hospital_index]?.name" placeholder-class="vp-placeholder" />
                </picker>
              </view>
            </view>
          </view>
          <!-- 就诊时间 -->
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
              <view class="weui-label">就诊时间</view>
            </view>
            <view class="weui-cell__bd"></view>
            <view class="weui-cell__ft weui-cell__ft_in-access">
              <view>
                <T-dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
                    placeholder="请选择就诊时间"></T-dtPicker>
              </view>
            </view>
          </view>
          <!-- 就诊人 -->
           <view class="weui-cell weui-cell_input" @click="onClientChange">
              <view class="weui-cell__hd">
                  <view class="weui-label">就诊人</view>
              </view>
              <view class="weui-cell__bd"></view>
              <view class="weui-cell__ft weui-cell__ft_in-access">
                  <view>
                    <input class="weui-input" placeholder-class="vp-placeholder" placeholder="请选择就诊人"
                      style="text-align: right;" :disabled="true" :value="client.name" type="text">
                  </view>
              </view>
           </view>
             <!-- 接送陪诊 -->
           <block v-if="serviceList?.service?.stype == '15'">
              <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">接送地址</view>
                <view class="weui-cell__bd">
                    <input class="weui-input" name="receiveAddress" style="text-align: right"
                        placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址" v-model="order.receiveAddress" />
                </view>
              </view>
           </block>

           <!-- 联系电话 -->
           <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">联系电话</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" type="number" name="tel" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
                    </view>
           </view>
        </view>
        </view>
        <view class="pub-box">
          <view class="pub-box-tt">服务需求</view>
          <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__bd">
                        <textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
                            placeholder-class="vp-placeholder" style="min-height: 150rpx" />
                    </view>
                </view>
          </view>
        </view>
    </block>
    <!-- 送取结果,代跑取药 -->
    <block v-if="serviceList?.service?.stype == '30' || serviceList?.service?.stype == '40'">
        
        <view class="pub-box">
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <view class="weui-label">所在医院</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <picker @change="onHospitalChange" :value="hospital_index" :range="serviceList?.hospitals"
                                range-key="name">
                                <input type="text" :disabled="true" placeholder="请选择就诊所在医院"
                                    :value="serviceList?.hospitals[hospital_index]?.name" placeholder-class="vp-placeholder" />
                            </picker>
                        </view>
                    </view>
                </view>

                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <view class="weui-label">服务时间</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
                                placeholder="请选择期望服务时间"></dtPicker>
                        </view>
                    </view>
                </view>

                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <view class="weui-label">收件信息</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access" @tap="selectAddress">
                        <input class="weui-input" :disabled="true" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请选择收件信息" :value="
                                                            order.address.userName
                                                                ? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')'
                                                                : ''
                                                        " />
                        <!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
                    </view>
                </view>
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">联系电话</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" type="number" name="tel" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
                    </view>
                </view>
            </view>
        </view>

        <view class="pub-box">
            <view class="pub-box-tt">服务需求</view>
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__bd">
                        <textarea name="demand" auto-height placeholder="如有其他服务要求请在此填写.."
                            placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
                    </view>
                </view>
            </view>
        </view>
    </block>
     <!-- 上门服务 -->
    <block v-if="serviceList?.service?.stype == '110'">
        <view class="pub-box">
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <view class="weui-label">服务时间</view>
                    </view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <view>
                            <dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
                                placeholder="请选择期望服务时间"></dtPicker>
                        </view>
                    </view>
                </view>

                <view class="weui-cell weui-cell_input" @click="onClientChange">
                    <view class="weui-cell__hd">服务对象</view>
                    <view class="weui-cell__bd"></view>
                    <view class="weui-cell__ft weui-cell__ft_in-access">
                        <input class="weui-input" :disabled="true" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请选择服务对象" :value="client.name" />
                    </view>
                </view>
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">服务地址</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" name="receiveAddress" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写服务所在地址" v-model="order.receiveAddress" />
                    </view>
                </view>
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">联系电话</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" type="number" name="tel" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
                    </view>
                </view>
            </view>
        </view>

        <view class="pub-box">
            <view class="pub-box-tt">服务需求</view>
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__bd">
                        <textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
                            placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
                    </view>
                </view>
            </view>
        </view>
    </block>
    <view style="height: 300rpx"></view>
    <!-- 悬浮提交按钮 -->
    <view class="vp-foot">
        <view style="background: #ffffff; padding: 20rpx">
            <view class="xieyi" style="text-align: center">
                <text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')" @tap="onXieyiChange">我已阅读并同意</text>
                <navigator :url="cfg.page_xy">《用户协议》</navigator>
                <text>和</text>
                <navigator :url="cfg.page_fw">《服务协议》</navigator>
            </view>
            <view>
                <button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @tap="submit">
                    确认下单
                    <block v-if="Number(order.price) > 0">（支付{{ Number(order.price) }}元）</block>
                </button>
            </view>
        </view>
    </view>
     <uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff" >
        <view class="popup-content">
            <view class="group">
                <input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="手机号" />
            </view>
            <view class="group">
                <input class="uni-input" v-model="validMobile.validCode" placeholder="验证码" />
                <text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
            </view>
        </view>
        <view class="btns">
            <view class="cancal" @click="cancal">取消</view>
            <view class="ok" @click="ok">确定</view>
        </view>
    </uni-popup>
    <uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image @tap="payment" src="/static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx"></image>
				<view class="text-center">微信支付</view>
				<canvas type="2d" id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx"></canvas>
				<view class="text-center">请用本人微信扫描以上二维码</view>
			</view>
		</uni-popup>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { getServiceListAPI, getCodeAPI, loginAPI, createOrderAPI } from '@/api'
import { Service, OrderItem, Client, CreateOrder } from '@/types/serviceType'
import { ref, toRaw } from 'vue'
import UQRCode from 'uqrcodejs'
const hid = ref(0)
const cfg = ref({
  page_xy: '/pages/xy/xy',
  page_fw: '/pages/fw/fw',
  page_order: '/pages/order/order',
})
const is_xieyi = ref(false)
onLoad((options) => {
  // console.log(options)
  const title = options?.title
  if(title){
    uni.setNavigationBarTitle({
      title: title
    })
  }
  // 获取服务项目列表
  getServiceList(options?.svid)
  // 初始化选择医院
  if(options?.hid){
    // console.log(options?.hid)
    hid.value = Number(options?.hid)
  }
  // 监听选择就诊人事件
  uni.$on('patientSelected', (data: Client) => {
    client.value = data
  })
})

// 订单列表
const order = ref({
  price: '',
  starttime: 0,
  tel: '',
  demand: '',
  address: {
    userName: '',
    cityName: '',
    countyName: '',
    detailInfo: '',
  },
  fullAddress: '',
  hospital_id: 0,
  hospital_name: '',
  receiveAddress: '',
  service_code: '',
  service_id: 0,
	service_name: '',
	service_stype: '',
  client: {} as Client,
})
const serviceList = ref<Service>({} as Service)
const hostipals = ref<OrderItem[]>([] as OrderItem[])
const imgUrl = '/static/service.jpeg'
const getServiceList = async (svid: number) => {
  const res = await getServiceListAPI(svid) 
  // console.log("原始数据", res) 
  const result = JSON.stringify(res.data).replaceAll('http://','https://')
  serviceList.value = JSON.parse(result)
  hostipals.value = serviceList.value.hospitals
  // console.log("修改后的数据", serviceList.value)

   for(let i = 0; i < hostipals.value.length; i++){
      if(hostipals.value[i].id === hid.value){
        hospital_index.value = i
        hospital_selected.value = true
        order.value.price = hostipals.value[i].service_price
        break
      }
    }
}

console.log(111)
// 显示服务内容
const dialogVisible = ref(false)
const handleTop = () => {
  dialogVisible.value = true
}

// 修改选择医院
const hospital_index = ref(0)
const hospital_selected = ref(false)
const onHospitalChange = (e: any) => {
  hospital_index.value = parseInt(e.detail.value)
  hospital_selected.value = true
  order.value.price = hostipals.value[hospital_index.value].service_price
}

// 修改就诊时间
const onStartTimeChanged = (e: any) => {
  order.value.starttime = e.detail.value
}

// 修改就诊人
const client = ref<Client>({} as Client)
const onClientChange = () => {
  uni.navigateTo({
    url: '/subPages/clients/clients?act=select'
  })
}

// 选择地址
const selectAddress = () => {
  uni.chooseAddress({
    success: res => {
      // console.log(res)
      order.value.address.cityName = res.cityName,
      order.value.address.countyName = res.countyName,
      order.value.address.detailInfo = res.detailInfo,
      order.value.address.userName = res.userName
    },
    fail: err => {
      console.log(err)
    }
  })
}

onUnload(() => {
  // 移除选择就诊人事件监听
  uni.$off('patientSelected')
})

// 同意或不同意协议
const onXieyiChange = () => {
  is_xieyi.value = !is_xieyi.value
}

// 提交订单
const popup = ref<any>(null)

const submit = () => {
		// console.log(popup.value)
		if (!is_xieyi.value) {
			return uni.showToast({
				title: '请先阅读并同意用于协议和服务协议',
				icon: 'none',
				duration: 1000
			})
		}
		const orderData = toRaw(order)
		const serviceData = toRaw(serviceList.value.service)
		const hospitalsData = toRaw(hostipals.value)
		const clientData = toRaw(client)
		
		orderData.value.service_code = serviceData.code
		orderData.value.service_id = serviceData.id
		orderData.value.service_name = serviceData.name
		orderData.value.service_stype = serviceData.stype
		// 医院的选择校验
		if (Number(serviceData.stype) < 100) {
			if (!hospital_selected.value) {
				return uni.showToast({
					title: '请选择医院',
					icon: 'none',
					duration: 1000
				})
			}
			orderData.value.hospital_id = hospitalsData[hospital_index.value].id
			orderData.value.hospital_name = hospitalsData[hospital_index.value].name
		}
		// 就诊时间
		if (!orderData.value.starttime) {
			return uni.showToast({
				title: '请选择时间',
				icon: 'none',
				duration: 1000
			})
		}
		// 服务类型为陪诊
		if (serviceData.stype == '10' || serviceData.stype == '15' || serviceData.stype == '20') {
			// 就诊人验证
			if (!clientData.value.id) {
				return uni.showToast({
					title: '请选择就诊人',
					icon: 'none',
					duration: 1000
				})
			}
			orderData.value.client = {
        id: 0,
        app_id: 0,
        user_id: 0,
        openid: '',
        name: '',
        sex: 0,
        age: 0,
        mobile: '',
        idcard: '',
        createtime: 0,
      }
			orderData.value.client.age = clientData.value.age
			orderData.value.client.mobile = clientData.value.mobile
			orderData.value.client.name = clientData.value.name
			orderData.value.client.sex = clientData.value.sex
			
			// 接送地址验证
			if (serviceData.stype == '15') {
				if (!orderData.value.receiveAddress) {
					return uni.showToast({
						title: '请填写就诊人所在地址',
						icon: 'none',
						duration: 1000
					})
				}
			}
		}
		if (serviceData.stype == '30' || serviceData.stype == '40') {
			// 收件地址
			if (!orderData.value.address.userName) {
				return uni.showToast({
					title: '请选择收件信息',
					icon: 'none',
					duration: 1000
				})
			}
		}
		// 判断联系电话
		if (!orderData.value.tel) {
			return uni.showToast({
				title: '请填写您的联系方式',
				icon: 'none',
				duration: 1000
			})
		}
		// console.log(orderData.value, 'orderData')
		// submitOrder.value = orderData.value
		// // 判断当前用户是否存在
		// if (!uni.getStorageSync('token')) {
		// 	popup.value.open('center')
		// } else {
		// 	// 下单的逻辑
		// 	createOrder(submitOrder.value)
		// }

    // submit 里最后一段
console.log('orderData=', orderData.value)
	submitOrder.value = orderData.value // 强制赋值

if (!uni.getStorageSync('token')) {
  popup.value.open('center')
} else {
  createOrder(submitOrder.value)
}

}
const submitOrder = ref<CreateOrder>({} as CreateOrder)
const validMobile = ref({
  phone: '',
  validCode: '',
})
const countdown = ref({
		validText: '获取验证码',
		time: 60
	})
let flag = false
const countdownChange = async () => {
		// 判断手机号是否存在
		if (!validMobile.value.phone) {
			return uni.showToast({
				title: '请输入手机号',
				icon: 'none',
				duration: 1000
			})
		}
		if (flag) return
		const time = setInterval(() => {
			if (countdown.value.time <= 0) {
				countdown.value.validText = '再次获取验证码'
				countdown.value.time = 60
				flag = false
				clearInterval(time)
			} else {
				countdown.value.time -= 1
				countdown.value.validText = `剩余${countdown.value.time}s`
			}
		}, 1000)
    flag = true
    try{
      await getCodeAPI({
      tel: validMobile.value.phone
      })
        uni.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 1000
        })
    }catch(err: any){
      uni.showToast({
        title: err.msg || '获取验证码失败',
        icon: 'none',
        duration: 1000
      })
    }
}

// 下单
// 下单（完美修复 TS 报错 + 二维码正常显示）
// const createOrder = async (order: CreateOrder) => {
//   console.log(order, 'order')
//   try {
//     const res = await createOrderAPI(order)

//     // 打开弹窗
//     qrcodePopup.value.open('center')

//     // 延迟等待弹窗渲染
//     setTimeout(() => {
//       const qr = new UQRCode()
//       qr.data = res.data.wx_code
//       qr.size = 300
//       qr.make()
//       uni.createSelectorQuery()
//         .select('#qrcode')
//         .fields({ node: true, size: true }, (result: any) => {
//           if (!result || !result.node) return

//           const canvas = result.node
//           const ctx = canvas.getContext('2d')
//           qr.canvasContext = ctx
//           qr.drawCanvas()
//         })
//         .exec()
//     }, 300)

//   } catch (err: any) {
//     uni.showToast({
//       title: err.msg || '下单失败',
//       icon: 'none'
//     })
//   }
// }

const createOrder = async (order: CreateOrder) => {
  console.log('🔥 createOrder 真的进来了！order=', order)
  try {
    const res = await createOrderAPI(order)
    console.log('createOrderAPI 返回：', res)
    
    // 先看弹窗能不能打开
    console.log('准备打开二维码弹窗')
    qrcodePopup.value?.open('center')

    setTimeout(() => {
      console.log('准备绘制二维码')
      const qr = new UQRCode()
      qr.data = res.wx_code
      qr.size = 150
      qr.make()

      uni.createSelectorQuery()
        .select('#qrcode')
        .fields({ node: true, size: true }, (result: any) => {
          console.log('canvas 查询结果：', result)
          if (!result || !result.node) {
            console.error('canvas 没拿到 node')
            return
          }
          const canvas = result.node
          const ctx = canvas.getContext('2d')
          qr.canvasContext = ctx
          qr.drawCanvas()
          console.log('二维码绘制完成')
        })
        .exec()
    }, 500)

  } catch (err: any) {
    console.error('createOrder 出错：', err)
    uni.showToast({ title: err.msg || '下单失败', icon: 'none' })
  }
}



const cancal = () => {
  popup.value.close()
}

// const ok = async () => {
//   if (!validMobile.value.validCode) {
//     return uni.showToast({
//       title: '请输入验证码',
//       icon: 'none',
//       duration: 1000
//     })
//   }
//   if(!validMobile.value.phone){
//     return uni.showToast({
//       title: '请输入手机号',
//       icon: 'none',
//       duration: 1000
//     })
//   }
//   try{
//     const res = await loginAPI({
//       tel: validMobile.value.phone,
//       code: validMobile.value.validCode
//     })
//     uni.showToast({
//       title: '登录成功',
//       icon: 'none',
//       duration: 1000
//     })
//     uni.setStorageSync('token', res.data.token)
//     popup.value.close()
//     createOrder(submitOrder.value)
//   }catch(err: any){
//     uni.showToast({
//       title: err.msg || '登录失败',
//       icon: 'none',
//       duration: 1000
//     })
//   }
// }

const ok = async () => {
  console.log('=== ok 开始 ===')
  if (!validMobile.value.validCode) {
    return uni.showToast({ title: '请输入验证码', icon: 'none' })
  }
  if (!validMobile.value.phone) {
    return uni.showToast({ title: '请输入手机号', icon: 'none' })
  }
  try {
    console.log('调用 loginAPI')
    const res = await loginAPI({
      tel: validMobile.value.phone,
      code: validMobile.value.validCode
    })
    console.log('login 成功：', res.data)
    uni.setStorageSync('token', res.data.token)
    popup.value.close()

    console.log('准备调用 createOrder，submitOrder=', submitOrder.value)
    await createOrder(submitOrder.value)
    console.log('createOrder 调用完毕')
  } catch (err: any) {
    console.error('ok 出错：', err)
    uni.showToast({ title: err.msg || '登录失败', icon: 'none' })
  }
}


const qrcodePopup = ref<any>(null)
const payment = () => {
  // qrcodePopup.value.open('center')
  // uni.navigateTo({
  //   url: '/subPages/order/order'
  // })
  uni.switchTab({
    url: '/pages/order/order'
  })
}
</script>

<style scoped>
@import './index.css';
</style>