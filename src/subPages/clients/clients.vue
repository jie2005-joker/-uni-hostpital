<template>
  <view class="container">
    <view class="header">
      <text class="title">接诊人列表</text>
      <view class="add-btn">
        <uni-icons type="plus" size="16" color="#333"></uni-icons>
        <text>新增接诊人</text>
      </view>
    </view>
    <view v-if="clients.length === 0" class="empty">
      <uni-icons type="person" size="40" color="#ccc"></uni-icons>
      <text class="empty-text">暂无接诊人信息</text>
    </view>

    <view
      v-for="(item,index) in clients"
      :key="item.id"
      class="card"
      v-else
    >
      <view class="card-top">
        <view class="avatar" :class="item.sex === 1 ? 'avatar-male' : 'avatar-female'">
          <text class="avatar-text">{{ item.name.slice(0, 1) }}</text>
        </view>
        <view class="name-wrap">
          <view class="name-row">
            <text class="name">{{ item.name }}</text>
            <view class="badge" :class="item.sex === 1 ? 'badge-male' : 'badge-female'">
              <text class="badge-text">{{ item.sex === 1 ? '男' : '女' }}</text>
            </view>
          </view>
          <text class="sub">{{ item.age }} 岁 · 编号 #{{ item.id }}</text>
        </view>
      </view>

      <view class="divider"></view>

      <view class="info-grid">
        <view class="info-item">
          <text class="info-label">手机号</text>
          <text class="info-value">{{ item.mobile }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">身份证</text>
          <text class="info-value">{{ item.idcard }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">添加时间</text>
          <text class="info-value">{{ formatDate(item.createtime) }}</text>
        </view>
      </view>

      <view class="card-actions">
        <view class="btn-edit">
          <text>编辑</text>
        </view>
        <view class="btn-select" @tap="handleSelect" :data-index="index">
          <text>选择此接诊人</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils'
import { getClientListAPI } from '@/api'
import {onLoad} from '@dcloudio/uni-app'
import { Client } from '@/types/serviceType'
import { ref } from 'vue'

const clients = ref<Client[]>([])
onLoad(async (options) => {
  if(options?.act === 'select') {
    uni.setNavigationBarTitle({
      title: "请选择就诊人"
    })
  }
  const res = await getClientListAPI()
  // console.log(res)
  clients.value = res.data.clients
})

// 选择接诊人
const handleSelect = (e: any) => {
  console.log(e.currentTarget.dataset.index)
  const index = Number(e.currentTarget.dataset.index)
  uni.$emit('patientSelected', clients.value[index])
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
  .container {
  padding: 20rpx;
  background: #f5f5f5;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;

  .title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
  }

  .add-btn {
    display: flex;
    align-items: center;
    gap: 6rpx;
    padding: 10rpx 20rpx;
    border: 1rpx solid #ddd;
    border-radius: 8rpx;
    font-size: 26rpx;
    color: #333;
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;

  .empty-text {
    font-size: 28rpx;
    color: #ccc;
    margin-top: 20rpx;
  }
}

.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;

  .card-top {
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 20rpx;
  }

  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &-male { background: #E6F1FB; }
    &-female { background: #FBEAF0; }

    .avatar-text {
      font-size: 30rpx;
      font-weight: 500;
      color: #0C447C;
    }
  }

  .name-wrap {
    flex: 1;

    .name-row {
      display: flex;
      align-items: center;
      gap: 10rpx;
      margin-bottom: 6rpx;
    }

    .name {
      font-size: 30rpx;
      font-weight: 500;
      color: #333;
    }

    .sub {
      font-size: 24rpx;
      color: #999;
    }
  }

  .badge {
    padding: 2rpx 12rpx;
    border-radius: 100rpx;
    &-male { background: #E6F1FB; }
    &-female { background: #FBEAF0; }

    .badge-text {
      font-size: 22rpx;
      &-male { color: #185FA5; }
      &-female { color: #993556; }
    }
  }
}

.divider {
  height: 1rpx;
  background: #f0f0f0;
  margin-bottom: 20rpx;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-bottom: 20rpx;

  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .info-label {
    font-size: 24rpx;
    color: #999;
  }

  .info-value {
    font-size: 26rpx;
    color: #333;
  }
}

.card-actions {
  display: flex;
  gap: 16rpx;

  .btn-edit {
    flex: 1;
    padding: 16rpx;
    border: 1rpx solid #ddd;
    border-radius: 8rpx;
    text-align: center;
    font-size: 26rpx;
    color: #333;
  }

  .btn-select {
    flex: 2;
    padding: 16rpx;
    border: 1rpx solid #185FA5;
    border-radius: 8rpx;
    background: #E6F1FB;
    text-align: center;
    font-size: 26rpx;
    color: #0C447C;
    font-weight: 500;
  }
}
</style>