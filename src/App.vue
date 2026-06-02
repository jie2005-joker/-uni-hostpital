<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserStore } from '@/stores/user'
import { getMapHospital } from '@/api/index'

onLaunch(async () => {
  const userStore = useUserStore()

  const code = await userStore.login()
  console.log('登录code:', code)
  const res = await getMapHospital()
  uni.setStorageSync('cfg', res.data.cfg)
  // 拿到 code 后请求后端换取用户信息
  // const res = await request('/api/login', { code })
  // userStore.setUserInfo(res.data)
})
onShow(() => {
  console.log("App Show");
})
onHide(() => {
  console.log("App Hide");
})
</script>
<style lang="scss">
@import '@/app.css';
</style>
