<template>
  <view class="weui-cells hosp-list">
    <view 
      class="weui-cell hosp-item weui-cell_access"
      v-for="(item,index) in hospital"
      :key="item.id"
      :data-hid="item.id"
      @tap="handleToHospital"
    >
      <view class="weui-cell__hd">
        <image :src="imgUrl[index] ? imgUrl[index] : '/static/resource/images/avatar_def.png'" class="hosp-avatar" mode="aspectFill" ></image>
      </view>
      <view class="weui-cell__bd">
        <view>
          <text class="hosp-name">{{ item.name }}</text>
        </view>
        <view class="hosp-line">
          <text class="hosp-rank text">{{ item.rank }}</text>
          <text class="hosp-label text">{{ item.label }}</text>
        </view>
        <view class="hosp-line">
          <text class="hosp-intro text">{{ item.intro }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type { Hospital } from '@/types/index'
  const props = defineProps<{
    hospital: Hospital[]
  }>()

  const imgUrl = ['/static/wh.jpeg','/static/xh.jpeg','/static/xy.jpeg','/static/zyy.png','/static/zz.jpeg']

  const handleToHospital = (e: any) => {
    const hid = e.currentTarget.dataset.hid
    // console.log('hid', hid)
    uni.navigateTo({
      url: '/subPages/hospital/hospital?hid=' + hid
    })
  }
</script>

<style scoped lang="scss">
.hosp-list {
    margin: 10rpx 0 0 0;
    background: none;
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
    .hosp-item{
      -webkit-box-align: stretch;
      -webkit-align-items: stretch;
      align-items: stretch;
      padding: 20rpx;
      margin: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
      &:before{
        display: none;
      }
      &:after{
        display: none;
      }
      .hosp-name{
        font-weight: bold;
        font-size: 34rpx;
      }
      .hosp-avatar {
        display: block;
        width: 200rpx;
        height: 180rpx;
        border-radius: 10rpx;
        overflow: hidden;
        margin-right: 20rpx;
      }
      .hosp-line {
        margin-top: 5rpx;
        .text{
          font-size: 26rpx;
        }
        .hosp-rank {
          font-weight: bold;
          color: #0bb585;
          margin-right: 15rpx;
        }
        .hosp-label {
          font-weight: bold;
          color: #0ca7ae;
          margin-right: 15rpx;  
        }
        .hosp-intro {
          color: #999999;
        }
      }
    }
}


</style>