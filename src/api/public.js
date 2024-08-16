import request from "./http.js";

export const get = (url, data) =>
  request({
    url: url,
    data,
  });

export const post = (url, data) =>
  request({
    url: url,
    method: "POST",
    data,
  });

export const postFormData = (url, data) =>
  request({
    url: url,
    method: "POST",
    data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
export const del = (url, data) =>
  request({
    url: url,
    method: "DELETE",
    data,
  });

