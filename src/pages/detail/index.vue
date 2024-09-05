<template>
  <view class="content" enable-flex>
    <view class="up_box marginB20 flexBetween">
      <view class="flexStart">
        <up-image :src="upObj.up_avatar" width="80rpx" height="80rpx" radius="10rpx" />
        <view class="up">
          <view class="f16 c333">{{ upObj.up_name }}</view>
          <view>
            <text class="f12 c999 marginR10">{{ upObj.videoTime }}</text>
            <text class="f12 c666">发布探店视频</text>
          </view>
        </view>
      </view>
      <!--  color="#fff" -->
      <view>
        <up-button icon="share" color="#666" size="small" type="primary" style="width: 140rpx" plain @click="shareFn"
          open-type="share">
          分享</up-button>
        <!-- <button
          class="u-button u-reset-button u-button--square u-button--small u-button--plain"
          open-type="share"
        >
          分享
        </button> -->
      </view>
    </view>

    <view class="flexBetween marginT10 marginB20 flexItemSt">
      <view class="f16 c333">{{ videoObj.videoTitle }}</view>
      <!-- <uni-fav
        :checked="isCollection"
        class="favBtn"
        @click="addCollection()"
      /> -->
      <!-- type="warning" -->
    </view>
    <view class="img_box" :enable-flex="true" @click="openBili">
      <up-image :show-loading="true" :src="videoObj.videoImg" width="100%" height="320rpx" radius="5rpx"></up-image>
      <!-- <view > -->
      <!-- bof.png -->
      <view class="btton">
        <image src="@/static/play.svg" style="width:100rpx;height:100rpx;" />
      </view>

      <!-- <up-icon class="btn" size="50" name="play-circle"></up-icon> -->
      <!-- </view> -->
    </view>
    <up-sticky bgColor="#fff">
      <up-tabs lineWidth="30" :list="list1" class="marginT10" @click="tabClick"></up-tabs>
    </up-sticky>
    <view v-show="active == 0">
      <view class="dp_box" v-for="(item, index) in shopList" :key="index">
        <view class="flexBetween marginB10">
          <view class="flexStart">
            <!-- <up-image
              src="https://cdn.uviewui.com/uview/album/2.jpg"
              width="160rpx"
              height="160rpx"
              radius="10rpx"
            /> -->
            <view class="marginL20 marginR20">
              <view class="f16 c333 lh24">{{ item.name }}</view>
              <view class="f14 c999 lh20">
                ￥{{ item.avgPrice }}/人 {{ item.dpCategory }}</view>
              <view class="f14 c999 lh20 des"> {{ item.address }} </view>
            </view>
          </view>
          <view>
            <up-button type="primary" shape="circle" color="#ED7043" @click="openDP(item.shopUuid)" v-if="item.shopUuid">
              大众点评
            </up-button>
          </view>
        </view>
        <view class="flexBetween">
          <view style="width: 240rpx">
            <up-button type="primary" icon="star" style="width: 240rpx" plain color="#666" size="small"
              v-if="isCollection" @click="addCollection()">
              收藏
            </up-button>
            <up-button type="primary" icon="star-fill" style="width: 240rpx" plain color="#666" size="small"
              v-if="!isCollection" @click="addCollection()">
              取消收藏
            </up-button>
            <!-- <up-tag
            text="收藏"
            @click="addCollection()"
            v-if="isCollection"
            plain
            size="large"
            icon="star"
          ></up-tag>
          <up-tag
            text="收藏"
            @click="addCollection()"
            v-else
            icon="star-fill"
          ></up-tag> -->
          </view>
          <view><up-button v-if="item.latitude && item.longitude" type="primary" icon="map" style="width: 240rpx" plain
              size="small" color="#666">
              导航
            </up-button></view>
          <view>
            <up-button v-if="item.tel && item.tel != '暂无'" type="primary" icon="phone" style="width: 180rpx" plain
              size="small" color="#666" @click="callPhone(item.tel)">
              电话
            </up-button>
            <view v-else style="width:120rpx;"></view>
          </view>
        </view>
      </view>
    </view>
    <view v-show="active == 1">
      <MapCom></MapCom>
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs, defineEmits, nextTick } from "vue";
import {
  onLoad,
  onShow,
  onHide,
  onPageScroll,
  onShareTimeline,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import MapCom from "@/components/map.vue";
import { eatApi } from "@/api/api.js";
import BfImg from "@/static/play.svg";
// import useStore from "@/store/index.js";
// const { app } = userStore();
// let app2 = app.appIndex;
// console.log(useStore);

let isCollection = ref(false);
let state = reactive({
  scrollTop: 0,
  active: 0, //
  list1: [
    {
      name: "探店列表",
    },
    {
      name: "地图",
    },
  ],

  tableData: [],

  upObj: {},
  videoObj: {},
  shopList: [],


});
let { scrollTop, active, list1, upObj, videoObj, shopList } = toRefs(state);

onLoad((options) => {
  // 页面初始化 options为页面跳转所带来的参数
  let { id } = options;
  init(id);
});

//分享朋友圈
onShareTimeline((res) => {
  return {
    title: "", //分享的标题
    imageUrl: "../../static/logo.png", //展示的图片，这里是本地路径的写法，也可以写http或https开头的图片路径
    query: "from=shareTimeline", //页面打开的传参
  };
});

// 分享到好友
onShareAppMessage((res) => {
  return {
    title: "分享测试", //分享的标题
    imageUrl: "../../static/logo.png", //展示的图片，这里是本地路径的写法，也可以写http或https开头的图片路径
    path: "/pages/detail/index", //点击链接后跳转的页面，可以带参数
  };
});

let handClick = (item) => {
  console.log("item", item);
};

let init = (id) => {
  eatApi.getDetail({ id: id }).then((res) => {
    if (res.code == 0) {
      state.upObj = res.data.upDto;
      state.videoObj = res.data;
      state.shopList = res.data.shopList;
    }
  });
};
// 打开b站
let openBili = () => {
  let { videoId } = state.videoObj
  // 微信小程序执行的方法
  uni.navigateToMiniProgram({
    appId: 'wx7564fd5313d24844',
    path: `pages/video/video?page=0&share_times=2&avid=${videoId}`, // 不填默认首页
    success(res) {
      console.log(res)
    }
  })
}
// 打开大众点评
let openDP = (shopUuid) => {
  // 微信小程序执行的方法
  uni.navigateToMiniProgram({
    appId: 'wx734c1ad7b3562129',
    path: `pages/poi/poi?redirect_from=pages%2Fdetail%2Fdetail&shopType=10&shopUuid=${shopUuid}&shopStyle=multipic`, // 不填默认首页
    success(res) {
      console.log(res)
    }
  })
}
let upper = (e) => {
  console.log(e);
};

let lower = (e) => {
  console.log(e);
};

// share
let shareFn = () => { };

// 电话 ok
let callPhone = (phoneStr) => {
  let str = phoneStr
  if (phoneStr.includes(",")) {
    str = phoneStr.split(",")[0];
  }
  if (str == '暂无') return;
  uni.makePhoneCall({
    phoneNumber: str, //仅为示例
  });
};
const show = ref(false);
const uPickerRef = ref(null);

const confirm = (e) => {
  console.log("confirm", e);
  show.value = false;
};

// 定义方法
function tabClick(item) {
  state.active = item.index;
  console.log("item", item.name, state.active);
}
/**
 * 添加||取消收藏 0.8s的请求cd
 */
let addCollection = async () => {
  isCollection.value = !isCollection.value;
  // return;
  // let { id, isCollection } = this;
  // let { openId } = app.globalData;
  // if (this.isLoading) {
  //   uni.showToast({
  //     title: "请不要频繁点击！",
  //     icon: "none",
  //   });
  //   return;
  // }
  // this.isLoading = true;
  // setTimeout(() => {
  //   this.isLoading = false;
  // }, 800);
  // try {
  //   /**
  //    * true 为已收藏， false 为未收藏
  //    */
  //   if (isCollection) {
  //     await userApi
  //       .delCollection({
  //         id: this.params.collectionId,
  //       })
  //       .then((res) => {
  //         if (res.code == 0) {
  //           this.isCollection = false;
  //           uni.showToast({
  //             title: "取消成功",
  //             icon: "none",
  //           });
  //         }
  //       });
  //   } else {
  //     await userApi
  //       .addCollection({
  //         itemId: id,
  //         userId: openId,
  //       })
  //       .then((res) => {
  //         if (res.code == 0) {
  //           this.isCollection = true;
  //           this.params.collectionId = res.data.id;
  //           uni.showToast({
  //             title: "收藏成功",
  //             icon: "none",
  //           });
  //         }
  //       });
  //   }
  // } catch (err) {
  //   uni.showToast({
  //     title: "系统异常",
  //     icon: "none",
  //   });
  // }
};
</script>

<style lang="scss" scoped>
.content {
  // padding: 30rpx;
  min-height: 100vh;
  padding: 0 10rpx;
  background-color: #f6f6f6;
}

.up_box {
  padding: 30rpx 0;

  .up {
    margin: 0 20rpx;

    .btn text {
      color: #fff;
    }
  }
}

.img_box {
  position: relative;
  display: inline-block;
  width: 100%;

}

.img_box .btton {
  position: absolute;
  top: calc(50% - 50rpx);
  left: calc(50% - 50rpx);
  // border: 1px solid red;
  z-index: 99;
}

.dp_box {
  margin-top: 20rpx;
  padding: 10rpx;
  background: #fff;
  border-radius: 10rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);

  .des {
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}
</style>
