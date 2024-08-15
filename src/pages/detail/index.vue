<template>
  <view class="content">
    <view class="tit">{{ obj.title }}</view>
    <view class="text">{{ obj.content }}</view>
  </view>
</template>

<script>
import { loginApi } from "@/components/api/api.js";

export default {
  components: {},
  computed: {
    disabled() {
      return false;
    },
  },
  data() {
    return {
      obj: {}, //{}, {}
    };
  },
  async onShow() {
    this.getList();
  },
  methods: {
    getList() {
      let a = uni.getStorageSync("myName");
      this.obj = a || {};
    },
  },
};
</script>

<style  scoped>

.text {
  font-size: 24rpx;
  padding: 30rpx;
}
.tit {
  font-size: 48rpx;
  text-align: center;
  margin-bottom: 40rpx;
}
</style>