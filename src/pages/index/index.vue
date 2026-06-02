<template>
  <view>
    <T-NavBar :isHome="true"></T-NavBar>
    <view style="margin-top: 130rpx;">
      <view class="weui-cell" style="background-color: #fff9eb;">
        <view class="weui-cell__hd">
          <image src="/static/resource/images/ic_myapp.png" style="display:block;width:40rpx;height:40rpx;margin-right:14rpx;"></image>
        </view>
        <view class="weui-cell__bd">
          <text style="font-size: 13px;color: #be9719;">用户点击右上角"添加到我的小程序", 方便下次找到</text>
        </view>
        <view class="weui-cell__ft">
          <image src="/static/resource/images/modal_closer.png" style="display:block;width:15px;height:15px;"></image>
        </view>
      </view>
    </view>
    <homeBanner v-if="homeInfo.slides && homeInfo.slides.length > 0" :banner="homeInfo.slides"></homeBanner>
    <homeNav2 v-if="homeInfo.nav2s && homeInfo.nav2s.length > 0" :nav2="homeInfo.nav2s"></homeNav2>
    <homeService v-if="homeInfo.navs && homeInfo.navs.length > 0" :navs="homeInfo.navs"></homeService>
    <homeHospital v-if="homeInfo.hospitals && homeInfo.hospitals.length > 0" :hospital="homeInfo.hospitals"></homeHospital>
  </view>
</template>

<script setup lang="ts">
import homeHospital from './components/homeHospital.vue'
import homeNav2 from './components/homeNav2.vue'
import homeBanner from './components/homeBanner.vue'
import homeService from './components/homeService.vue'
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from '@/stores/user'
import { getHomeInfoAPI } from '@/api/index'
import { ref } from 'vue'
import { HomeInfo } from '@/types/index'

const userStore = useUserStore()

const homeInfo = ref<HomeInfo>({} as HomeInfo)
const getHomeInfo = async () => {
  const res = await getHomeInfoAPI({ aid: 1, ssid: userStore.userInfo?.sessionid })
  // 处理图片URL
  const data = JSON.stringify(res.data).replaceAll('http://', 'https://')
  homeInfo.value = JSON.parse(data)
}
onLoad(async () => {
  await getHomeInfo()
})

</script>

<style>
  page{
    background-color: #fff;
  }
</style>
