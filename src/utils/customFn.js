/**
 * ------------------------自定义的公共方法-----------------
 */

/**
 * 获取当前时间
 * 2021-01-01 00:00:00
 * @param {boolean} isHasHMS是否要包含时分秒
 */
export const getTime = (isHasHMS = false) => {
  const time = new Date();
  const year = time.getFullYear();
  let month = time.getMonth() + 1; //月份是从0开始的
  let day = time.getDate();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  month = month.toString().padStart(2, "00"); //补0
  day = day.toString().padStart(2, "00");
  h = h.toString().padStart(2, "00");
  m = m.toString().padStart(2, "00");
  s = s.toString().padStart(2, "00");
  if (isHasHMS) {
    return `${year}-${month}-${day} ${h}:${m}:${s}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};

/**
 * 时间戳 => 时间
 * @param {Number|string} timestamp 时间戳
 */
export const dateFormat = (timestamp, isHasHMS = false, isHasS = true) => {
  const time = new Date(timestamp); //先将时间戳转为Date对象，然后才能使用Date的方法
  const year = time.getFullYear();
  let month = time.getMonth() + 1; //月份是从0开始的
  let day = time.getDate();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  month = month.toString().padStart(2, "00"); //补0
  day = day.toString().padStart(2, "00");
  h = h.toString().padStart(2, "00");
  m = m.toString().padStart(2, "00");
  s = s.toString().padStart(2, "00");
  if (isHasHMS) {
    if (isHasS) {
      return `${year}-${month}-${day} ${h}:${m}:${s}`;
    } else {
      return `${year}-${month}-${day} ${h}:${m}`;
    }
  } else {
    return `${year}-${month}-${day}`;
  }
};

/**
 * 时间=>时间戳
 * @param {String} date 时间
 */
export const dateFormatNum = (date) => {
  return new Date(date).getTime();
};

/**
 * 时间=>时间戳
 * @param {String} time  iso 时间格式 => 日期
 */
export const ISO2Time = (time) => {
  if (!time) return "";
  return dateFormat(dateFormatNum(time), true, false);
};

/**
 * 获取今日
 * 2021-01-03
 */
export const getToDay = () => {
  return dateFormat(new Date().getTime());
};

/**
 * 获取昨日
 * 2021-01-02
 */
export const getYesterday = () => {
  const day = 86400000;
  return dateFormat(new Date().getTime() - day);
};

/**
 * 获取明日 或者后面几天 前面几天
 * 2021-01-04
 */
export const getTomorrow = (num = 0) => {
  const day = 86400000;
  if (num > 0) {
    let oldDay = +day * num;
    return dateFormat(new Date().getTime() + +oldDay);
  } else if (num == 0) {
    return dateFormat(new Date().getTime() + +day);
  } else {
    let oldDay = parseFloat(num * -1) * day;
    return dateFormat(new Date().getTime() - +oldDay);
  }
};

/**
 * 获取本周时间
 * 周第一天-最后一天
 * [2021-12-13,2021-12-19] 周一，周日
 */
export const getWeek = () => {
  const now = new Date();
  const nowTime = now.getTime();
  const day = now.getDay();
  const oneDayTime = 24 * 60 * 60 * 1000;
  //显示周一
  const MondayTime = nowTime - (day - 1) * oneDayTime;
  //显示周日
  const SundayTime = nowTime + (7 - day) * oneDayTime;
  const monday = new Date(MondayTime).getTime();
  const sunday = new Date(SundayTime).getTime();
  //打印查看结果
  return [dateFormat(monday), dateFormat(sunday)];
};

/**
 * 获取本月时间
 * ['2022-01-01', '2022-01-31']
 */
export const getMonth = () => {
  const newTimeArr = dateFormat(new Date().getTime()).split("-");
  const val = `${newTimeArr[0]}-${newTimeArr[1]}`;
  const arr = val.split("-");
  const timeStar = val + "-01";
  const day = 86400000;
  let nextM = null;
  let year = arr[0];
  if (arr[1] == 12) {
    nextM = 1; //判断是否跨年
    year++;
  } else {
    nextM = Number(arr[1]) + 1;
  }
  //选择月的最后一天的时间戳
  const mLastDay = new Date(`${year}-${nextM}-01`).getTime() - day;
  return [dateFormat(timeStar), dateFormat(mLastDay)];
};

/**
 * 获取本年时间段
 * ['2021-01-01', '2021-12-31']
 */
export const getYear = () => {
  const newTimeArr = dateFormat(new Date().getTime()).split("-");
  const timeStar = newTimeArr[0] + "-01-01";
  const day = 86400000;
  const nextY = Number(newTimeArr[0]) + 1;
  const yLastDay = new Date(`${nextY}-01-01`).getTime() - day; //选择今年的第一天的时间戳
  return [dateFormat(timeStar), dateFormat(yLastDay)];
};

/**
 * 获取两个日期中间的所有日期
 * @param {String} starDay 开始日期
 * @param {String} endDay 结束日期
 * ['2022-01-01', '2022-01-02', ... ,'2022-01-29', '2022-01-30', '2022-01-31']
 */
export const getTimeSpace = (starDay, endDay) => {
  const arr = [];
  const dates = [];
  // 设置两个日期UTC时间
  const db = new Date(starDay);
  const de = new Date(endDay);
  // 获取两个日期GTM时间
  const s = db.getTime() - 24 * 60 * 60 * 1000;
  const d = de.getTime() - 24 * 60 * 60 * 1000;
  // 获取到两个日期之间的每一天的毫秒数
  for (let i = s; i <= d; ) {
    i = i + 24 * 60 * 60 * 1000;
    arr.push(parseInt(i));
  }
  // 获取每一天的时间  YY-MM-DD
  for (const j in arr) {
    const time = new Date(arr[j]);
    const year = time.getFullYear();
    const mouth =
      time.getMonth() + 1 >= 10
        ? time.getMonth() + 1
        : "0" + (time.getMonth() + 1);
    const day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
    const YYMMDD = year + "-" + mouth + "-" + day;
    dates.push(YYMMDD);
  }
  return dates;
};

/**
 * 判断某个时间是否在一段时间内
 * @param {string} time 需要判断的时间 //2018-3-28 14:44
 * @param {string} startTime 开始的时间点 //2018-3-28 16:44
 * @param {string} endTime 结束的时间点 //2018-3-28 16:45
 * @returns {boolean} true 在时间内 false 在时间外
 * judgmentTime('2018-3-28 14:44','2018-3-28 9:30','2018-3-29 3:20') //true
 * judgmentTime('2018-3-28 9:20','2018-3-28 9:30','2018-3-29 3:20')  //false
 */
export const judgmentTime = (time = "", startTime = "", endTime = "") => {
  //把字符串格式转换为日期类
  const curTime = new Date(Date.parse(time));
  const sTime = new Date(Date.parse(startTime));
  const eTime = new Date(Date.parse(endTime));
  return curTime >= sTime && curTime <= eTime; //进行比较
};

// 枚举转数组
export function enum2Arr(enumData) {
  const arr = [];
  for (const [value, label] of Object.entries(enumData)) {
    arr.push({
      label,
      value,
    });
  }
  return arr;
}

/**
 * 平层列表转树形结构
 * id 与 pid 必有。
 * id = 当前节点id
 * pid = 当前节点的父id
 * @param {array} arr 数组
 * @param {number|string} id 唯一的id。第一次默认为顶层id = -1
 * @returns {array} array 返回一个列表树
 */
export const list2Tree = (arr = [], id = -1) => {
  const array = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (id == item.pid) {
      const children = list2Tree(arr, item.id);
      const json = {
        ...item,
        pid: id,
        id: item.id,
      };
      if (children?.length) json.children = children;
      array.push(json);
    }
  }
  // 代表是顶层
  if (id == -1) {
    return [
      {
        id,
        pId: null,
        children: array,
      },
    ];
  } else {
    return array;
  }
};

/**
 * 树形结构转平层列表
 * @param {array} arr 数组
 * @returns {array} array 返回一个列表树
 */
export const tree2List = (arr = []) => {
  const array = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    let children = [];
    if (item.children?.length) {
      children = tree2List(item.children);
    }
    const json = JSON.parse(JSON.stringify(item));
    if (json.children) delete json.children;
    if (children?.length) {
      array.push(...children);
    }
    array.push(json);
  }
  return array;
};

/**
 * 通过id查询label
 */
export function findLabel(arr = [], id) {
  return arr.filter((v) => v.value === id)[0]?.label ?? "";
}
/**
 * 通过id查询item
 */
export function findItem(arr = [], id) {
  return arr.filter((v) => v.value === id)[0] ?? {};
}
/**
 * 通过label 查询  id
 */
export function findValue(arr = [], label) {
  return arr.filter((v) => v.label === label)[0]?.value ?? "";
}

export const isJSON = (str) => {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
};

// 金额 保留2位小数
export const filterNum = (json) => {
  let item = { ...json };
  for (let [label, value] of Object.entries(item)) {
    item[label] = parseInt(+value * 100) / 100;
  }
  return item;
};

// 获取定位信息
export function getLocation() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'gcj02',
			// type: 'wgs84',
			geocode: true,
			accuracy: 'best',
			isHighAccuracy: true,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			},
			complete: (res) => {}
		})
	})
}