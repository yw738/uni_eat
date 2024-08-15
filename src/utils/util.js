const formatTime = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' + [hour, minute, second].map(formatNumber).join(':')
    )
}

const formatNumber = (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
const BaseURL = `https://api.pingcc.cn/`

/**
 * 封装微信的的request
 */

function request(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        wx.request({
            url: BaseURL + url,
            data: data,
            method: method,
            header: {
                'Content-Type': 'application/json',
                'X-token': wx.getStorageSync('token'),
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(res.data)
                } else {
                    reject(res.errMsg)
                }
            },
            fail: function(err) {
                reject(err)
            },
        })
    })
}

/**
 * 封装的云request
 */
let axios = (url, data = {}) => {
    return new Promise((response, reject) => {
        wx.cloud.callFunction({
            name: url,
            data: data,
            complete: (res) => {
                response(res)
            },
        })
    })
}

module.exports = {
    formatTime,
    request,
    axios,
}