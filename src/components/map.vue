<template>
  <view>
    <!-- 显示定位信息 -->
    <view v-if="location">
      <text>经度: {{ location.longitude }}</text>
      <text>纬度: {{ location.latitude }}</text>
    </view>
    <!-- 显示地图 -->
    <map longitude="{{ location.longitude }}" latitude="{{ location.latitude }}" scale="14"
      style="width: 100%; height: 500px">
      <cover-view>
        <cover-image src="https://example.com/marker.png" style="width: 30px; height: 30px"></cover-image>
      </cover-view>
    </map>
  </view>
</template>

<script setup>
import {
  onMounted,
  reactive,
  ref,
  toRefs,
  defineEmits,
  nextTick,
  computed,
} from "vue";
import { getLocation } from "@/utils/customFn.js"

let props = defineProps({
  data: {
    type: Object,
    default: () => ({
      src: "https://cdn.uviewui.com/uview/album/1.jpg",
    }),
  },
});
let item = computed(() => props.data);
let location = reactive({
  latitude: 0,
  longitude: 0,
  scale: 6,
  address: "",
  marker: [],
});
let { latitude, longitude, marker, scale, address } = toRefs(location);

onMounted(() => {
  goMap();
});
//打开手机内置地图
let toMap = () => {
  console.log("点击导航");
  uni.openLocation({
    latitude: Number(location.latitude), //要去的纬度-地址
    longitude: Number(location.longitude), //要去的经度-地址
    address: location.address, //要去的具体地址
    //此处踩坑的问题2：
    //latitude 和 longitude的值一定要是number类型。
    //所以传递的时候需要使用Number将其转换一下。
  });
};
//获取位置授权
let goMap = async () => {
  // uniapp 需要先调取用户授权请求询问用户是否授权
  // let position = await getLocation()
  // console.log(position)



  //   uni.authorize({
  //     scope: "scope.userLocation",
  //     success(res) {
  //       uni.getLocation({
  //         type: "wgs84",
  //         success: (res) => {
  //           console.log(res);
  //           console.log("纬度：" + res.latitude);
  //           console.log("经度：" + res.longitude);
  //           location.latitude = res.latitude;
  //           location.longitude = res.longitude;
  //         },
  //       });
  //     },
  //     fail(err) {
  //       uni.$showMsg("获取位置失败！");
  //     },
  //   });
};

let tan = (val) => {
  console.log(val);
};
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
    box-shadow: 0rpx 12rpx 32rpx 4rpx rgba(0, 0, 0, 0.04),
      0rpx 8rpx 20rpx rgba(0, 0, 0, 0.08);
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
