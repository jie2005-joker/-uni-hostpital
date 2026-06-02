<template>
  <!-- <view class="nav-list">
    <view class="nav-item" v-for="(item,index) in navs" :key="item.id">
      <view class="nav-pic">
        <image
          :src="item.pic_image_url"
          mode="scaleToFill"
          class="image"
          :data-index="index"
        />
      </view>
      <view class="nav-text" :style="{'color': item.tcolor ? item.tcolor : '#0bb584'}">{{item.title}}</view>
    </view>
  </view> -->
  <view class="nav-list">
    <view class="nav-item" v-for="(item,index) in imgUrl" :key="index">
      <view class="nav-pic">
        <image
          :src="item"
          mode="scaleToFill"
          class="image"
          :data-index="index"
          @tap="handleToTap"
        />
      </view>
      <view class="nav-text" style="color: #0bb584">{{navs[index].title}}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { NavItem } from '@/types/index'
import { handleNavigation } from '@/utils/index'
const props = defineProps<{
  navs: NavItem[]
}>()

const imgUrl = ['/static/dpqy.png','/static/smzy.png','/static/sqjg.png','/static/zqyh.png','/static/zxpz.png']
const handleToTap = (e: any) => {
  handleNavigation(e, props.navs)
}
</script>

<style scoped lang="scss">
  .nav-list{
    &:after{
      content: '';
      display: block;
      height: 0;
      line-height: 0;
      clear: both;
      visibility: hidden;
    }
    .nav-item {
      float: left;
      margin-top: 20rpx;
      width: 20%;
      text-align: center;
      padding: 10rpx 0;
      .nav-pic{
        .image{
          display: block;
          margin: 0 auto;
          width: 110rpx;
          height: 110rpx;
        }
      }
      .nav-text {
        font-size: 24rpx;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

</style>