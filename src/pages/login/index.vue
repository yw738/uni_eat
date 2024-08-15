<template>
  <view class="login">
    <view class="content">
      <!-- 头部logo -->
      <view class="header"> </view>
      <!-- 表单 -->
      <view class="main">
        <wInput
          v-model="form.username"
          type="text"
          maxlength="30"
          placeholder="用户名"
          :focus="isFocus"
        ></wInput>
        <wInput
          v-model="form.password"
          type="password"
          maxlength="30"
          placeholder="密码"
        ></wInput>
      </view>
      <view class="tips">
        <text>tips：请输入账号和密码！</text>
      </view>

      <wButton
        class="wbutton"
        text="登 录"
        :rotate="isRotate"
        @click="submit"
      ></wButton>
    </view>
  </view>
</template>
<script>
//登录
import { loginApi } from "@/components/api/api.js";
import wInput from "../../components/watch-login/watch-input.vue"; //input
import wButton from "../../components/watch-login/watch-button.vue"; //button
export default {
  data() {
    return {
      //logo图片 base64
      phoneData: "", //用户/电话
      passData: "", //密码
      form: {
        password: "",
        username: "",
      },
      isRotate: false, //是否加载旋转
      isFocus: true, // 是否聚焦
      show: false,
    };
  },
  components: {
    wInput,
    wButton,
  },
  onShow() {
    // 账号
    Object.assign(this.form, {
      password: "123456",
      username: "user",
    });
  },
  methods: {
    submit() {
      if (!this.form.username.length) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "用户名不能为空",
        });
        return;
      }
      if (!this.form.password.length) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "密码不正确",
        });
        return;
      }
      
      loginApi
        .login({
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          if (res.data) {
            uni.switchTab({
              url: "/pages/employment/index",
            });
          }

          return;
        });
    }
  },
};
</script>

<style>
.main {
  height: 400rpx;
}

.tips {
  /* align-items: center; */
  /* color: #333333; */
  /* padding-left: 70rpx; */
  /* padding-right: 70rpx; */
  margin: 0 48rpx;
  text-align: center;
}
</style>