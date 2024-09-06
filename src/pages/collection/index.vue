<template>
  <view class="content">
    <view>
      <scroll-view
        :scroll-top="scrollTop"
        scroll-y="true"
        class="scroll-Y"
        @scrolltoupper="upper"
        @scrolltolower="lower"
        @scroll="scroll"
      >
        <view class="list_box">
          <view class="list" v-for="(item, index) in tableData" :key="index">
            <Card style="width: 100%" :data="item" />
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
/**
 * 收藏
 */
import { onMounted, reactive, ref, toRefs, defineEmits, nextTick } from "vue";
import { onLoad, onShow, onHide, onPageScroll } from "@dcloudio/uni-app";
import Card from "@/components/card.vue";
import { eatApi } from "@/api/api.js";
//获取应用实例
const app = getApp();

// import useStore from "@/store/index.js";
// const { app } = userStore();
// let app2 = app.appIndex;
// console.log(useStore);
let state = reactive({
  scrollTop: 0,

  indexList: [{ title: 1, content: "4444444444" }, {}], //{}, {}

  searchData: {
    userId: "96110",
  },
  tableData: [],
  pagination: { pageSize: 20, pageIndex: 1, total: 0 },
});
let { scrollTop, searchData, tableData, pagination } = toRefs(state);

onShow(() => {
  getList();
});
let handClick = (item) => {
  console.log("item", item);
};
let getList = () => {
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  let params = { userId: app.globalData.openId };
  eatApi
    .getAllCollection(params)
    .then((res) => {
      state.tableData = res.data;
      // app.globalData.collectionList = res.data;
      uni.hideLoading();
    })
    .catch(() => uni.hideLoading());
};
let onClick = (e, item) => {
  //点击选项按钮时触发事件
  //e = {content,index} ，content（点击内容）、index（下标）、position (位置信息)
  uni.showModal({
    title: "提示",
    content: "确定取消收藏吗？",
    // confirmColor: "#FF7E05",
    success: (res) => {
      if (res.confirm) {
        console.log("用户点击确定");
        del(item);
      } else if (res.cancel) {
        console.log("用户点击取消");
      }
    },
  });
};
let del = (item) => {
  eatApi
    .delCollection({
      id: item.id,
    })
    .then(() => getList());
};

let upper = (e) => {
  console.log(e);
};

let lower = (e) => {
  console.log(e);
};
let scroll = (e) => {};
</script>

<style lang="scss" scoped>
.content {
  // padding: 30rpx;
  height: 100vh;
  background-color: #ced7e13b;
}

.selBox {
  background-color: #fff;
}

.list_box {
  // padding: 10rpx 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .list {
    width: 50%;
  }
}

.header {
  border: 1px solid red;
  height: 120rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.title-wrap {
  width: 100%;
}

.checkbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.wrap {
  padding: 12px;
}

.demo-layout {
  height: 25px;
  border-radius: 4px;
}

.bg-purple {
  background: #ced7e1;
}

.bg-purple-light {
  background: #e5e9f2;
}

.bg-purple-dark {
  background: #99a9bf;
}

text {
  font-size: 24rpx;
}

.tips {
  font-size: 32rpx;
  text-align: center;
  margin: 60rpx;
  letter-spacing: 10rpx;
}
</style>
