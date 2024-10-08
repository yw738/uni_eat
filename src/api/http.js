// const BASE_URL = "http://43.143.41.25:8888";
const BASE_URL = "/ngApi";
// const BASE_URL = "http://localhost:8081";
// const BASE_URL = "http://192.168.0.62:8081";

export default ({ url = "", method = "GET", data = {}, header = {} }) => {
  let token = uni.getStorageSync("openId");
  header.tk = token ? `tb-${token}` : ""; // 新增token
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url, //仅为示例，并非真实接口地址。
      data: data,
      method: method,
      header: header,
      success: (res) => {
        if (res.data.code !== 401) {
          if (res.data.status === 500) {
            // uni.showToast({
            //   icon: "none",
            //   position: "bottom",
            //   title: `error：${res.data.error}`,
            // });
            resolve(res.data);
          } else {
            resolve(res.data);
          }
        } else {
          resolve(res.data);
          uni.showToast({
            icon: "none",
            position: "bottom",
            title: "请先登录",
          });
          setTimeout(() => {
            uni.navigateTo({
              url: `/pages/login/index`,
            });
          }, 1000);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
