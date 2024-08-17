<template>
  <view class="content">
    <view class="up_box marginB20 flexBetween">
      <view class="flexStart">
        <up-image
          src="https://cdn.uviewui.com/uview/album/1.jpg"
          width="80rpx"
          height="80rpx"
          radius="10rpx"
        />
        <view class="up">
          <view class="f16 c333">阿斯顿</view>
          <view>
            <text class="f12 c999 marginR10">三天前</text>
            <text class="f12 c666">发布探店视频</text>
          </view>
        </view>
      </view>
      <!--  color="#fff" -->
      <view
        ><up-button
          icon="share"
          color="#666"
          type="primary"
          style="width: 140rpx"
          plain
        >
          分享</up-button
        ></view
      >
    </view>

    <view class="flexBetween marginT10 marginB20 flexItemSt">
      <view class="f16 c333"
        >瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，</view
      >
      <!-- <uni-fav
        :checked="isCollection"
        class="favBtn"
        @click="addCollection()"
      /> -->
      <!-- type="warning" -->
    </view>
    <view class="img_box">
      <up-image
        :show-loading="true"
        :src="'https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg'"
        width="100%"
        height="360rpx"
        radius="5rpx"
      ></up-image>
      <!-- <view > -->
      <up-icon class="btn" size="50" name="play-circle"></up-icon>
      <!-- </view> -->
    </view>
    <view class="dp_box" v-for="(item, index) in 3" :key="index">
      <view class="flexBetween marginB10">
        <view class="flexStart">
          <up-image
            src="https://cdn.uviewui.com/uview/album/2.jpg"
            width="160rpx"
            height="160rpx"
            radius="10rpx"
          />
          <view class="marginL20 marginR20">
            <view class="f16 c333 lh24">阿斯顿</view>
            <view class="f14 c999 lh20">阿斯顿</view>
            <view class="f14 c999 lh20 des">
              瓶身描绘的牡丹一如你瓶身描绘的牡丹一如你初妆初妆，冉冉檀香透过窗
            </view>
          </view>
        </view>
        <view>
          <up-button type="primary" shape="circle" color="#ED7043">
            大众点评
          </up-button></view
        >
      </view>
      <view class="flexBetween">
        <view style="width: 240rpx">
          <up-tag
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
          ></up-tag>
        </view>
        <view
          ><up-button
            type="primary"
            icon="map"
            style="width: 240rpx"
            plain
            color="#666"
          >
            导航
          </up-button></view
        >
        <view
          ><up-button
            type="primary"
            icon="phone"
            style="width: 180rpx"
            plain
            color="#666"
          >
            电话
          </up-button></view
        >
      </view>
    </view>

    <view> </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs, defineEmits, nextTick } from "vue";
import { onLoad, onShow, onHide, onPageScroll } from "@dcloudio/uni-app";
import { eatApi } from "@/api/api.js";

// import useStore from "@/store/index.js";
// const { app } = userStore();
// let app2 = app.appIndex;
// console.log(useStore);

let isCollection = ref(false);
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

  formData: {
    upId: "",
    city: "",
  },
  tableData: [],
  pagination: { pageSize: 20, pageIndex: 1, total: 0 },
});
let { scrollTop, formData, tableData } = toRefs(state);

onLoad((options) => {
  // 页面初始化 options为页面跳转所带来的参数
  let { id } = options;
  // init(id);
});
let handClick = (item) => {
  console.log("item", item);
};

let init = (id) => {
  eatApi.getDetail({ id: id }).then((res) => {
    state.formData = res.data;
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
  .btn {
    position: absolute;
    top: calc(50% - 25rpx);
    left: calc(50% - 25rpx);
  }
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
