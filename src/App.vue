<script>
import { eatApi } from "@/api/api.js";

export default {
  globalData: {
    userInfo: null,
    openId: "", //当前登录人的唯一id
    collectionList: [],

    statusBarHeight: 0, // 状态导航栏高度
    navHeight: 0, // 总体高度
    navigationBarHeight: 0, // 导航栏高度(标题栏高度)
  },
  onLaunch: function () {
    // 状态栏高度
    this.globalData.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    // #ifdef MP-WEIXIN
    // 获取微信胶囊的位置信息 width,height,top,right,left,bottom
    const custom = wx?.getMenuButtonBoundingClientRect() || {};
    // console.log(custom)

    // 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
    this.globalData.navigationBarHeight =
      custom.height + (custom.top - this.globalData.statusBarHeight) * 2;
    console.log("导航栏高度：" + this.globalData.navigationBarHeight);

    // 总体高度 = 状态栏高度 + 导航栏高度
    this.globalData.navHeight =
      this.globalData.navigationBarHeight + this.globalData.statusBarHeight;
    // #endif
    // #ifdef H5
    this.$options.globalData.navHeight = 45;
    // #endif

    // 获取 小程序用户唯一id
    const openId = uni.getStorageSync("openId");
    if (openId) {
      this.$options.globalData.openId = openId;
    } else {
      uni.login({
        provider: "weixin", //如果是uniapp，在这里需要标明平台的类型，支持的参数请查阅uniapp官网的uni.login()文档
        success: (res) => {
          eatApi.getOpenId({ code: res.code }).then((cts) => {
            let { openid } = cts;
            this.$options.globalData.openId = openid;
            uni.setStorageSync("openId", openid);
          });
        },
        fail: (err) => console.log(err), //登陆失败的回调
      });
    }
  },
  onShow: function () {
    // console.log("App Show");
  },
  onHide: function () {
    // console.log("App Hide");
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-plus/index.scss";
@import "./app.scss";
</style>
<style>
/**app.css**/
.container {
  box-sizing: border-box;
  background-color: #ffffff;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
}

view,
image,
text,
navigator {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

view,
text {
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  font-size: 29rpx;
  color: #333;
}

/*隐藏滚动条*/
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
/*  */

.home_box {
  background: #fff;
}
.head {
  /* height: 30rpx; */
  /* line-height: 30rpx; */
  padding: 20rpx;
}
.head .tit {
  font-size: 30rpx;
  color: #121212;
  letter-spacing: 2rpx;
  font-weight: bold;
}
.home_box .more span {
  margin-right: 06rpx;
  font-size: 14rpx;
}

.flex {
  display: flex;
}

.flexCen {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.textOverflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.index_border {
  background: #f8f8f9;
  border-top: 01rpx solid #f4f4f4;
  border-bottom: 01rpx solid #f4f4f4;
  height: 20rpx;
}

.list_box a {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 05rpx;
}
</style>
