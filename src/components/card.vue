<template>
    <view class="item">
        <view class="box">
            <!-- <image style="width: 100%; height: 160rpx;" class="img" :src="src"></image> -->
            <!-- <image style="width: 200px; height: 200px; background-color: #eeeeee;" :mode="item.mode" :src="src"
                        @error="imageError"></image> -->
            <u--image class="img" width="100%" height="200rpx" :showLoading="true" :src="src"></u--image>
            <view class="img_mask flexCen">
                <view class="fw700">地址11111</view>
                <view>距离999公里 遵义 ￥62/人</view>
            </view>
            <view class="txt_box">
                <view class="title">
                    噶升降开关撒谎精堪萨斯噶升降开关撒谎精堪萨斯
                </view>
                <view class="flexCen bottom_box">
                    <view class="name"> 吃不饱333</view>
                    <view class="time">
                        2023-14-12
                    </view>
                </view>
            </view>

        </view>
    </view>
</template>
  
<script>
import { loginApi } from "@/components/api/api.js";

export default {
    components: {},
    computed: {
    },
    data() {
        return {
            src: 'https://cdn.uviewui.com/uview/album/1.jpg'
        };
    },
    async onShow() { },
    methods: {

    },
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
        box-shadow: 0rpx 12rpx 32rpx 4rpx rgba(0, 0, 0, .04), 0rpx 8rpx 20rpx rgba(0, 0, 0, .08);
    }

    .img_mask {
        width: 100%;
        height: 70rpx;
        background-color: rgba($color: #000000, $alpha: .3);
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
    }
}
</style>