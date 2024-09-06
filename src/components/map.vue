<template>
  <view>
    <!-- 显示地图 -->
    <map
      id="myMap"
      ref="map1"
      :longitude="location.longitude"
      :latitude="location.latitude"
      :scale="scale"
      :markers="markers"
      :show-location="true"
      @markertap="markertap"
      style="width: 100%; height: 500px"
    >
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
import { getLocation } from "@/utils/customFn.js";

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
  latitude: 31.207867,
  longitude: 121.488601,
  scale: 14,
  address: "",
});
let { latitude, longitude, scale, address } = toRefs(location);
const markers = ref([
  {
    id: 1, //id必须有一个
    latitude: 110.299121, //纬度
    longitude: 25.274215, //经度
    width: 25, //markers的宽
    height: 38, //markers的高
  },
]);

//使用uni.createMapContext()方法获取地图对象
const MapContext = uni.createMapContext('myMap')
//接着调用方法
//调起app
const toMapApp = () =>{
    //openMapApp()方法主要用于拉起地图app选择导航
	MapContext.openMapApp({
		//因为不保证经纬度在传输过程中类型是否是number类型，所以使用Number转换
		latitude: Number(adressLatitude.value),
		longitude: Number(adressLongitude.value),
		//destination地址名称
		destination: adressName.value,
		success: function(e) {
			console.log(e)
			console.log('成功')
		},
		fail: function(e) {
			console.log(e)
			console.log('失败')
		}
	})
}
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
