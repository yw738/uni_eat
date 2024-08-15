<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-plus/index.scss";
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
