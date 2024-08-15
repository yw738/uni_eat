import request from "./http.js"

const get = (url, data) =>
    request({
        url: url,
        data
    });

const post = (url, data) =>
    request({
        url: url,
        method: "POST",
        data
    });

const postFormData = (url, data) =>
    request({
        url: url,
        method: "POST",
        data,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
const del = (url, data) =>
    request({
        url: url,
        method: "DELETE",
        data
    });

//注册
export const loginApi = {
    login: (data) => post("/auth/login", data),
    // login: (data) => postFormData("/login", data), //登录  (主要用于学生注册)
    getList: (data) => get("/news", data), //)

}