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
      <view class="flexCen selBox"> <u-tabs :list="list1" @click="click"></u-tabs>
        <view class="flexCen" style="width:50%;">
          <u--text type="info" @click="show = true" suffixIcon="arrow-down" text="分类"></u--text>
          <u--text type="info" suffixIcon="arrow-down" text="城市"></u--text>
        </view>
      </view>
      <u-line></u-line>
    </u-sticky>
    <view>
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y " @scrolltoupper="upper" @scrolltolower="lower"
        @scroll="scroll">
        <view class="list_box">
          <view class="list" v-for="(item, index) in 10" :key="index">
            <Card style="width:100%"></Card>
          </view>
        </view>
      </scroll-view>
    </view>
    <u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm" @change="changeHandler"></u-picker>

  </view>
</template>

<script>
// import { loginApi } from "@/components/api/api.js";
import Card from "@/components/card.vue"
export default {
  components: { Card },
  computed: {
    disabled() {
      return false;
    },
  },
  data() {
    return {
      scrollTop: 0,
      list1: [{
        name: '最新',
      }, {
        name: '附近',
      }],
      show: false,
      columns: [
        ['中国', '美国'],
        ['深圳', '厦门', '上海', '拉萨']
      ],
      columnData: [
        ['深圳', '厦门', '上海', '拉萨'],
        ['得州', '华盛顿', '纽约', '阿拉斯加']
      ],
      list: [{
        thumb: "https://cdn.uviewui.com/uview/goods/1.jpg"
      }, {
        thumb: "https://cdn.uviewui.com/uview/goods/2.jpg"
      }, {
        thumb: "https://cdn.uviewui.com/uview/goods/3.jpg"
      }, {
        thumb: "https://cdn.uviewui.com/uview/goods/4.jpg"
      }, {
        thumb: "https://cdn.uviewui.com/uview/goods/5.jpg"
      }],
      list3: [
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      ],
      indexList: [{ title: 1, content: "4444444444" }, {}], //{}, {}
    };
  },
  async onShow() { },
  methods: {
    click(item) {
      console.log('item', item);
    },
    detail(item) {
      uni.setStorageSync("myName", item);
      uni.navigateTo({
        url: `/pages/detail/index`,
      });
    },
    upper: function (e) {
      console.log(e)
    },
    lower: function (e) {
      console.log(e)
    }, scroll: function (e) {
      console.log(e)
      this.old.scrollTop = e.detail.scrollTop
    },

    changeHandler(e) {
      const {
        columnIndex,
        value,
        values, // values为当前变化列的数组内容
        index,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs.uPicker
      } = e
      // 当第一列值发生变化时，变化第二列(后一列)对应的选项
      if (columnIndex === 0) {
        // picker为选择器this实例，变化第二列对应的选项
        picker.setColumnValues(1, this.columnData[index])
      }
    },
    // 回调参数为包含columnIndex、value、values
    confirm(e) {
      console.log('confirm', e)
      this.show = false
    }
  },
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