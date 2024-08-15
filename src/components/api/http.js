// const BASE_URL = "http://43.143.41.25:8888";
const BASE_URL = "/api";
// const BASE_URL = "http://localhost:8080";

export default ({ url = "", method = "GET", data = {}, header = {} }) => {
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