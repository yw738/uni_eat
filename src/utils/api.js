import { request, axios } from './util.js'
import { decode } from "./base64.min.js"; //encode,

export const homeApi = () => request(`/comic/search/comicType/少年/1/17`)
export const homePageApi = () => request(`/comic/search/comicType/少年/2/5`)
export const mhSerchApi = (str) =>
    request(`/comic/search/title/${encodeURIComponent(str)}/1/999`)
export const mhListApi = (id) => request(`/comicChapter/search/${id}`)
export const mhDetailsApi = (id) => request(`/comicContent/search/${id}`)

/**
 * 微信云开发接口
 */
export const cloudApi = {
    getHome: () => axios('getHome'), //首页
    search: (data) => axios('search', data), //查询
    getChapter: (id) => axios('getChapter', { id: id }), //id查列表
    getDetail: (id) => axios('getDetail', { id: id }), //列表id查详情
}