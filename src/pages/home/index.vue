<template>
  <view class="content">
    <!-- <view class="header">
      <view></view>
      <u-scroll-list :indicator="false">
        <view v-for="(item, index) in 10" :key="index">
          <view>君在西安</view>
        </view>
      </u-scroll-list>

      <view>更多</view>
    </view> -->
    <u-sticky>
      <view class="flexCen selBox">
        <u-tabs :list="list1" @click="handClick"></u-tabs>
        <view class="flexCen" style="width: 50%">
          <u--text
            type="info"
            @click="show = true"
            suffixIcon="arrow-down"
            text="分类"
          ></u--text>
          <u--text type="info" suffixIcon="arrow-down" text="城市"></u--text>
        </view>
      </view>
      <u-line></u-line>
    </u-sticky>
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
    <up-picker
      :show="show"
      ref="uPickerRef"
      :columns="columns"
      @confirm="confirm"
      @change="changeHandler"
    ></up-picker>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs, defineEmits, nextTick } from "vue";
import { onLoad, onShow, onHide, onPageScroll } from "@dcloudio/uni-app";
import Card from "@/components/card.vue";

import { eatApi } from "@/api/api.js";
// import useStore from "@/store/index.js";
// const { app } = userStore();
// let app2 = app.appIndex;
// console.log(useStore);
let state = reactive({
  scrollTop: 0,
  list1: [
    {
      name: "最新",
    },
    {
      name: "附近",
    },
  ],
  list: [
    {
      thumb: "https://cdn.uviewui.com/uview/goods/1.jpg",
    },
    {
      thumb: "https://cdn.uviewui.com/uview/goods/2.jpg",
    },
    {
      thumb: "https://cdn.uviewui.com/uview/goods/3.jpg",
    },
    {
      thumb: "https://cdn.uviewui.com/uview/goods/4.jpg",
    },
    {
      thumb: "https://cdn.uviewui.com/uview/goods/5.jpg",
    },
  ],
  list3: [
    "https://cdn.uviewui.com/uview/swiper/swiper3.png",
    "https://cdn.uviewui.com/uview/swiper/swiper2.png",
    "https://cdn.uviewui.com/uview/swiper/swiper1.png",
  ],
  indexList: [{ title: 1, content: "4444444444" }, {}], //{}, {}

  searchData: {
    upId: "",
    city: "",
  },
  tableData: [],
  pagination: { pageSize: 20, pageIndex: 1, total: 0 },
});
let { scrollTop, list1, searchData, tableData, pagination } = toRefs(state);

onShow(() => {
  getList();
});
let handClick = (item) => {
  console.log("item", item);
};

let getList = () => {
  let params = JSON.parse(JSON.stringify(state.searchData));
  // Object.assign(params, {});
  params.pageIndex = state.pagination.pageIndex;
  params.pageSize = state.pagination.pageSize;
  eatApi.getList(params).then((res) => {
    if (!state.tableData.length) {
      state.tableData = res.data;
    } else {
      state.tableData.push(res.data);
    }
  });
};

let upper = (e) => {
  console.log(e);
};

let lower = (e) => {
  console.log(e);
};
let scroll = (e) => {};

const show = ref(false);
const columns = reactive([
  ["中国", "美国"],
  ["深圳", "厦门", "上海", "拉萨"],
]);
const columnData = reactive([
  ["深圳", "厦门", "上海", "拉萨"],
  ["得州", "华盛顿", "纽约", "阿拉斯加"],
]);

const uPickerRef = ref(null);
const changeHandler = (e) => {
  const { columnIndex, value, values, index } = e;

  if (columnIndex === 0) {
    uPickerRef.value.setColumnValues(1, columnData[index]);
  }
};

const confirm = (e) => {
  console.log("confirm", e);
  show.value = false;
};
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
