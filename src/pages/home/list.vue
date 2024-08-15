<template>
  <view class="content">
    <scroll-view class="" scroll-x="true" scroll-left="120">
      <u-cell-group>
        <u-cell
          v-for="(item, index) in indexList"
          :key="index"
          :title="item.title"
          :label="item.tips"
          @click="detail(item)"
        ></u-cell>
      </u-cell-group>
    </scroll-view>
  </view>
</template>

<script>
import { loginApi } from "@/api/api.js";

export default {
  components: {},
  computed: {
    disabled() {
      return false;
    },
  },
  data() {
    return {
      indexList: [], //{}, {}
    };
  },
  async onShow() {
    this.getList();
  },
  methods: {
    getList() {
      loginApi
        .getList({
          page: 1,
          size: 999,
        })
        .then((res) => {
          let { data = [] } = res || {};
          this.indexList =
            data.map((v) => ({
              ...v,
              tips: v.content.slice(0, 30),
            })) || [];
        });
    },

    detail(item) {
      uni.setStorageSync("myName", item);
      uni.navigateTo({
        url: `/pages/detail/index`,
      });
    },
  },
};
</script>

<style  scoped>
.content_box {
  padding: 30rpx;
}
.item {
  display: flex;
  padding: 20rpx;
  font-size: 26rpx;
  border-bottom: 1rpx solid #e4e7ed;
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
</style>