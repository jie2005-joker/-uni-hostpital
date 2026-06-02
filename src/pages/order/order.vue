<template>
  <view>
    <view style="width: 100%; position: fixed; z-index: 2">
        <view style="background: #ffffff; position: relative">
            <view class="h-tab vp-flex">
                <view :class="'h-tab-item vp-flex_1 ' + (filt == '' ? 'deep(.on)' : '')" data-filt=""
                    @tap="onFilterChange">全部</view>
                <view :class="'h-tab-item vp-flex_1 ' + (filt === '1' ? 'deep(.on)' : '')" data-filt="1"
                    @tap="onFilterChange">待支付</view>
                <view :class="'h-tab-item vp-flex_1 ' + (filt === '2' ? 'deep(.on)' : '')" data-filt="2"
                    @tap="onFilterChange">待服务</view>
                <view :class="'h-tab-item vp-flex_1 ' + (filt === '3' ? 'deep(.on)' : '')" data-filt="3"
                    @tap="onFilterChange">已完成</view>
                <view :class="'h-tab-item vp-flex_1 ' + (filt === '4' ? 'deep(.on)' : '')" data-filt="4"
                    @tap="onFilterChange">已取消</view>
            </view>
        </view>
    </view>
    <block v-if="list != null">
        <view v-if="list != null && list.length == 0" style="padding: 40rpx 40rpx 40rpx 40rpx; text-align: center">
            <image src="/static/resource/images/empty.png" mode="widthFix" style="width: 200rpx" />
            <view class="f5">没有相关内容~</view>
        </view>
        <scroll-view 
          v-else 
          scroll-y
          refresher-enabled
          :refresher-triggered="isRefreshing"
          :refresher-threshold="100" 
          refresher-background="lightgreen"
          @refresherrefresh="onRefresh" 
          class="od-scroll">
          <view class="od-list" style="padding-top: 110rpx;">
            <block v-for="(item, index) in list" :key="index">
                <view class="od-item" @tap="toOrder" :data-id="item.out_trade_no">
                    <view class="weui-cell weui-cell_access">
                        <view class="weui-cell__hd">
                            <view>
                                <image :src="imgUrl" mode="widthFix" class="od-logo"
                                    style="width: 100rpx; height: 100rpx; margin-right: 20rpx" />
                            </view>
                        </view>
                        <view class="weui-cell__bd">
                            <view>
                                <text style="font-weight: bold">{{ item.service_name }}</text>
                            </view>
                            <view class="od-info">
                                <block v-if="Number(item.service_stype) <= 20">
                                    <view>
                                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
                                    </view>
                                    <view>
                                        预约时间：
                                        <T-formater :timestamp="item.starttime" format="MM-dd hh:mm"></T-formater>
                                    </view>
                                    <view>
                                        就诊人员：
                                        <text>{{ item.service_name }}</text>
                                    </view>
                                </block>
                                <block v-if="Number(item.service_stype) > 20 && Number(item.service_stype) < 100">
                                    <view>
                                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
                                    </view>
                                    <view>
                                        处理时间：
                                        <T-formater :timestamp="item.starttime" format="MM-dd hh:mm"></T-formater>
                                    </view>
                                </block>
                                <block v-if="Number(item.service_stype) > 100">
                                    <view>
                                        服务时间：
                                        <T-formater :timestamp="item.starttime" format="MM-dd hh:mm"></T-formater>
                                    </view>
                                    <view>
                                        服务对象：
                                        <text>{{ item.service_name }}</text>
                                    </view>
                                    <!-- <view>服务地址：<text>{{item.address.address}}</text> </view> -->
                                </block>
                            </view>
                        </view>
                        <view class="weui-cell__ft">
                            <!-- 待付款 -->
                            <block v-if="item.trade_state == '待支付'">
                                <view style="color: #ffa200"><text>待支付</text></view>
                                <view style="color: #ffa200">
                                    <T-counter style="font-size: 24rpx" :second="item._exp_time"
                                        @counterOver="onCounterOver" />
                                </view>
                            </block>
                            <!-- 进行中 -->
                            <block v-if="item.trade_state == '待服务'">
                                <view style="color: #1da6fd"><text>待服务</text></view>
                            </block>
                            <!-- 已完成 -->
                            <block v-if="item.trade_state == '已完成'">
                                <view style="color: #21c521"><text>已完成</text></view>
                            </block>
                            <!-- 已取消 -->
                            <block v-if="item.trade_state == '已取消'">
                                <view style="color: #999999"><text>已取消</text></view>
                            </block>
                        </view>
                    </view>
                </view>
            </block>
          </view>
        </scroll-view>
    </block>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getOrderListAPI } from '@/api/index'
import { OrderParams } from '@/types/order'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const imgUrl = '/static/419e25bf21ebbdab4230fa49cd11dbdc.jpeg'
const list = ref<OrderParams[] | null>(null)
const filt = ref('')
const onFilterChange = async (e: any) => {
  const {filt: datasetFilt} = e.currentTarget.dataset
  // console.log('datasetFilt=', datasetFilt)
  filt.value = datasetFilt as string
  changeFilter()
}

onShow(() => {
    console.log('status=', userStore.status, 'filt=', filt.value)
  if(userStore.status){
    filt.value = String(userStore.status)
    userStore.setStatus('')
    //  console.log('赋值后 filt=', filt.value)
  }else{
    filt.value = ''
  }
  changeFilter()
})

const changeFilter = async () => {
  const res = await getOrderListAPI({state: filt.value})
  list.value = res.data
  // console.log('getOrderListAPI 返回：', res)
}

// 跳转订单详情
const toOrder = (e: any) => {
  const {id} = e.currentTarget.dataset
  uni.navigateTo({
    url: '/subPages/orderDetail/orderDetail?id=' + id
  })
}

// 订单倒计时结束回调
const onCounterOver = () => {
  changeFilter()
}

const isRefreshing = ref(false)
const onRefresh = async () => {
  isRefreshing.value = true
  await changeFilter()
  isRefreshing.value = false
}
 </script>

<style scoped>
  page {
    background: #f4f4f4;
}

.od-scroll{
  height: calc(100vh - 110rpx);
}

.od-item {
    margin: 20rpx;
    background: #ffffff;
    border: 1rpx solid #eeeeee;
    border-radius: 10rpx;
    overflow: hidden;
}
.od-item .weui-cell {
    padding: 30rpx;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
}
.od-logo {
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
    border-radius: 10rpx;
}
.od-info view {
    font-size: 24rpx;
    color: #999999;
}
.od-info text {
    font-size: 24rpx;
    color: #999999;
}
.od-item .weui-cell__ft text {
    font-size: 24rpx;
}

</style>