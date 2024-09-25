<template>
  <view class="item" @click="toDetail">
    <view class="box">
      <u--image class="img" width="100%" height="200rpx" :showLoading="true" :src="item.videoImg"></u--image>
      <view class="img_mask flexCen">
        <view class="fw700 txtOverFlow" style="width: 100%">{{
          item.name
        }}</view>
        <!-- 距离99公里 -->
        <view> {{ item.cityName }} ￥{{ item.avgPrice }} /人</view>
      </view>
      <view class="txt_box">
        <view class="title">
          {{ item.videoTitle }}
        </view>
        <view class="flexCen bottom_box">
          <view class="name txtOverFlow"> {{ item.up_name }}</view>
          <view class="time"> {{ item.videoTime }} </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 收藏卡片
*/
import {
  onMounted,
  reactive,
  ref,
  toRefs,
  defineEmits,
  nextTick,
  computed,
} from "vue";
let props = defineProps({
  data: {
    type: Object,
    default: () => ({
      src: "https://cdn.uviewui.com/uview/album/1.jpg",
    }),
  },
});
let item = computed(() => props.data);

let toDetail = () => {
  let { id } = item.value;
  uni.navigateTo({
    url: `/pages/detail/index?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.item {
  padding: 12rpx 12rpx 12rpx 12rpx;

  .box {
    background: #fff;
    width: 100%;
    overflow: hidden;
    border-radius: 20rpx 20rpx 12rpx 12rpx;
    position: relative;
    box-shadow: 0rpx 1rpx 22rpx -46rpx rgba(0, 0, 0, 0.04), 0rpx -4rpx 27rpx rgba(0, 0, 0, 0.08);
  }

  .img_mask {
    width: 100%;
    height: 70rpx;
    background-color: rgba($color: #000000, $alpha: 0.3);
    // margin-top: -30rpx;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 10rpx;
    position: absolute;
    top: 170rpx;
    left: 0;

    view {
      color: #fff;
      font-size: 26rpx;
      line-height: 32rpx;
    }

    .fw700 {
      font-weight: 700;
    }
  }

  .txt_box {
    margin-top: 48rpx;
    padding: 0 10rpx 10rpx;

    view {
      color: #333;
      font-size: 28rpx;
    }

    .bottom_box {
      margin-top: 30rpx;

      view {
        width: 50%;
        font-size: 20rpx;
      }
    }

    .name {
      color: #666;
      font-size: 26rpx;
    }

    .time {
      color: #d5d5d5;
      font-size: 24rpx;
    }
  }

  .title {
    height: 72rpx;
    line-height: 36rpx;
    font-size: 36rpx;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}
</style>
