import { get, post, postFormData } from "./public.js";

//api
export const eatApi = {
  getUpList: (data) => get("/api/v1/getUpList", data),
  getList: (data) => get("/api/v1/getList", data), //)
  getDetail: (data) => get("/api/v1/getDetail", data), //)

  getOpenId: (data) => get("/api/getOpenId", data), //)
  getUser: (id) => get(`/api/getUser/${id}`, {}), //)
  addUser: (data) => post("/api/addUser", data), //)
  updateUser: (data) => post("/api/updateUser", data), //)

  getAllCollection: (data) => get("/api/getAllCollection", data), //)
  addCollection: (data) => get("/api/addCollection", data), //)
  delCollection: (data) => get("/api/delCollection", data), //)
};
