<template>
  <!-- <view class="nav2-list">
    <view class="nav2-item" v-for="item in nav2" :key="item.id">
      <view class="nav2-pic">
        <image :src="item.pic_image_url" class="image"></image>
      </view>
    </view>
  </view> -->
  <view class="nav2-list">
    <view class="nav2-item" v-for="(item,index) in imgUrl" :key="index">
      <view class="nav2-pic">
        <image :src="item" @tap="handleToTap" class="image" mode="aspectFit" :data-index="index"></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import img1 from '@/static/299ec231895953ff27de0f63c7703f6b.png'
import img2 from '@/static/ac905fd8f9f1ca96ce614f0960a74820.png'
import type { NavItem } from '@/types/index'
import { handleNavigation } from '@/utils/index'
const props = defineProps<{
  nav2: NavItem[]
}>()

const imgUrl = [img1,img2]

const handleToTap = (e: any) => {
  handleNavigation(e, props.nav2)
}
</script>

<style scoped lang="scss">
  .nav2-list {
    margin: 10rpx 20rpx 0 20rpx;
    &:after {
        content: '';
        display: block;
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }
    .nav2-item{
        float: left;
        margin-top: 20rpx;
        width: 50%;
        text-align: center;
        box-sizing: border-box;
        padding: 0 5rpx;
        .nav2-pic {
            width: 100%;
            .image {
              display: block;
              width: 100%;
              height: 200rpx;
            }
        }
    }
}
</style>