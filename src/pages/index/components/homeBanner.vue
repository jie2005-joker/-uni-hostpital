<template>
  <view class="banner">
    <swiper autoplay :interval="3000" circular indicator-dots indicator-active-color="#fff" class="swiper">
      <swiper-item v-for="item in imgUrl" :key="item">
        <image class="img" :src="item" mode="aspectFill" show-menu-by-longpress></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
  import { Slides } from '@/types/index'
const imgUrl = [
  '/static/banner/a61db76c4e6af763502380870bc16a73.jpeg',
  '/static/banner/d5fbaecc9e415c717fe6f2fd15c24d29.jpeg',
  '/static/banner/d8a65ed47ea29c347894faa8a0f071b4.jpeg',
  '/static/banner/96145d599d9d9686699eb4231d29963d.jpeg',
  '/static/banner/291d590a3a717a7402971137c256e7bf.jpg'
]  
const props = defineProps<{
  banner: Slides[]
}>()
</script>

<style scoped lang="scss">
  .banner {
    width: 100%;
    padding: 20rpx 20rpx 0 20rpx;
    overflow: hidden;
    box-sizing: border-box;
    .swiper {
      width: 100%;
      height: 320rpx;
      overflow: hidden;
      border-radius: 20rpx;
      .img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>