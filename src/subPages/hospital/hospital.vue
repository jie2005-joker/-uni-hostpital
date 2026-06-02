<template>
	<view>
		<T-NavBar title-text="" :isHeight="false" :isWhite="true" background="none" @navBarAttached="onNavBarAttached" />
		<view style="position: relative;">
			<image
				src="/static/419e25bf21ebbdab4230fa49cd11dbdc.jpeg"
				mode="aspectFill"
				style="filter: blur(50rpx) brightness(0.8); display: block; width: 100%; height: 550rpx; overflow: hidden"
			></image>
			<view :style="'position:absolute;top:' + navBarHeight + 'rpx;padding-top:65rpx;overflow:hidden;width:100%;'">
				<view class="hospital-hd">
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="showShareModal">
						<view class="weui-cell__hd">
							<image
								src="/static/419e25bf21ebbdab4230fa49cd11dbdc.jpeg"
								mode="aspectFill"
								style="position: absolute; top: -65rpx; display: block; width: 150rpx; height: 135rpx; border-radius: 10rpx; overflow: hidden"
							></image>
						</view>
						<view class="weui-cell__bd" style="padding-left: 170rpx">
							<view style="position: absolute; top: -65rpx">
								<text style="font-size: 36rpx; color: #ffffff; font-weight: bold">{{ hospital?.hospital?.name }}</text>
							</view>
							<view>
								<text class="hosp-rank">{{ hospital?.hospital?.rank }}</text>
								<text class="hosp-label">{{ hospital?.hospital?.label }}</text>
							</view>
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access"><text class="f4">转发</text></view>
					</view>
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="toMap">
						<view class="weui-cell__hd">
							<image
								src="/static/resource/images/ic_address.png"
								mode="aspectFill"
								style="margin-right: 10rpx; display: block; width: 40rpx; height: 40rpx"
							></image>
						</view>
						<view class="weui-cell__bd">
							<view>
								<text style="font-size: 24rpx">{{ hospital?.hospital?.city }}{{ hospital?.hospital?.district }}{{ hospital?.hospital?.address }}</text>
							</view>
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access"><text class="f4">导航</text></view>
					</view>
				</view>
				<view class="hospital-bd">
					<view class="weui-cells serv-list">
						<view class="weui-cell serv-item">
							<view class="weui-cell__bd">
								<view style="padding-top: 10rpx"><text class="serv-name">在线预约您需要的服务</text></view>
							</view>
							<view class="weui-cell__ft"></view>
						</view>
						<view class="weui-cell serv-item" @tap="toService" :data-svid="item.id" v-for="(item, index) in hospital?.services" :key="index">
							<block v-if="item?.use_switch == 1">
								<view class="weui-cell__hd">
									<image class="serv-logo" :src="item.logo_image ? '/static/419e25bf21ebbdab4230fa49cd11dbdc.jpeg' : '/static/resource/images/avatar.jpg'" mode="aspectFill" />
								</view>
								
								<view class="weui-cell__bd">
									<view>
										<text class="serv-name">{{ item.name }}</text>
									</view>
									<view class="serv-line serv-intro">{{ item.intro }}</view>
									<view class="serv-line">
										<text class="serv-price">{{ item.price }}</text>
										<text class="serv-unit">元/次</text>
									</view>
								</view>
								
								<view class="weui-cell__ft">
									<button class="btn1m">预约</button>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<T-share :shareModal="clone_shareModal" />
	</view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { getHospitalInfoAPI } from '@/api/index'
  import { onLoad } from '@dcloudio/uni-app'
  import { HospitalInfo } from '@/types/hospital'
  const navBarHeight = ref(0)
  const onNavBarAttached = (e: any) => {
    navBarHeight.value = e.detail.navBarHeight
  }

  const clone_shareModal = ref(false)
  const showShareModal = () => {
    clone_shareModal.value = true
  }
  const hospital = ref<HospitalInfo>()
  onLoad(async(options) => {
    console.log(options)
    const res = await getHospitalInfoAPI({hid: options?.hid})
    hospital.value = res.data
    // console.log('getHospitalInfoAPI 返回：', res)
    
  })
const app = getApp()
  const toMap = () => {
    const point = bMapTransQQMap(hospital?.value?.hospital?.lng as number, hospital?.value?.hospital.lat as number)
		const { qmap_key:key } = uni.getStorageSync('cfg')
		const referer = app.globalData?.name
		const endPoint = JSON.stringify({
			name: hospital?.value?.hospital?.name,
			latitude: point.lat,
			longitude: point.lng
		})
		uni.navigateTo({
			url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
		})
  }
  // 跳转服务预约页面
  const toService = (e: any) => {
    const {svid} = e.currentTarget.dataset
    uni.navigateTo({
      url: '/subPages/service/service?svid=' + svid + "&hid=" + hospital?.value?.hospital?.id
    })
  }

  const bMapTransQQMap = (lng: number, lat: number) => {
    let x_pi = (3.14159265358979 * 3000) / 180
    let x = lng - 0.0065
    let y = lat - 0.006
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
    let lngs = z * Math.cos(theta)
    let lats = z * Math.sin(theta)
    return { lng: lngs, lat: lats }
  }
</script>

<style scoped>
  page {
    background: #f4f4f4;
}

.hospital-hd {
    margin: 20rpx 20rpx 0 20rpx;
    background: #ffffff;
    border-radius: 10rpx;
}
.hospital-hd .weui-cell {
    padding: 20rpx;
}

.hospital-bd {
    margin: 20rpx 20rpx 0 20rpx;
    background: #ffffff;
    border-radius: 10rpx;
}
.hospital-bd .weui-cells {
    margin-top: 0;
}
.hospital-bd .weui-cell {
    padding: 20rpx;
}

.hospital-ft {
    margin: 20rpx 20rpx 0 20rpx;
    background: #ffffff;
    border-radius: 10rpx;
}
.hospital-ft .weui-cell {
    padding: 20rpx;
}

.hosp-rank {
    font-size: 26rpx;
    font-weight: bold;
    color: #0bb585;
    margin-right: 15rpx;
}
.hosp-label {
    font-size: 26rpx;
    font-weight: bold;
    color: #0ca7ae;
    margin-right: 15rpx;
}

.serv-list {
    margin: 0;
    background: none;
}
.serv-list::before {
    display: none;
}
.serv-list::after {
    display: none;
}

.serv-item {
    padding: 20rpx;
    background: #ffffff;
    border-radius: 10rpx;
    overflow: hidden;
}
.serv-item::before {
    display: none;
}
.serv-item::after {
    display: none;
}
.serv-name {
    font-weight: bold;
    font-size: 34rpx;
}
.serv-logo {
    display: block;
    width: 150rpx;
    height: 150rpx;
    border-radius: 10rpx;
    overflow: hidden;
    margin-right: 20rpx;
}
.serv-line {
    margin-top: 8rpx;
}
.serv-line text {
    font-size: 26rpx;
}
.serv-rank {
    font-weight: bold;
    color: #0bb585;
    margin-right: 15rpx;
}
.serv-label {
    font-weight: bold;
    color: #0ca7ae;
    margin-right: 15rpx;
}
.serv-intro {
    font-size: 26rpx;
    color: #999999;
    width: 350rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.serv-price {
    font-size: 34rpx !important;
    font-weight: bold;
    color: #0bb684;
}
.serv-unit {
    color: #0bb684;
}

</style>