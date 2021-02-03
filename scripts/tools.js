/**
 * afterloe - king-core/web-site/scripts/tools.js
 *
 * Copyright(c) afterloe.
 * MIT Licensed
 *
 * Authors:
 *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
 *
 * Date:
 *   2020-8-11 10:02:35
 */

"use strict";

const bgColor = ["#009eff", "#2c88d8", "#427ed0", "#6967c1", "#9a61ba", "#b268b8", "#d974ba", "#e672b4", "#f58dbf", "#f2f2f2"];

const guid2 = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const cleanArray = actual => {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
};

const passerDate = data => {
    if (!data) return "";
    return cleanArray(Object.keys(data).map(key => {
        if (data[key] === undefined) return "";
        return encodeURIComponent(key) + "=" +
            encodeURIComponent(data[key])
    })).join("&");
};

const Req = ({method = "GET", url, data}) => new Promise((resolve, reject) => {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.withCredentials = true;
    xhr.open(method, url);
    xhr.setRequestHeader("token", localStorage.getItem("token"));
    if ("POST" === method || "PUT" === method) {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    if (null != data) {
        xhr.send(passerDate(data))
    } else {
        xhr.send()
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let res = xhr.response;
                if (typeof res !== "object") {
                    res = JSON.parse(res);
                }
                if (200 !== res.code) {
                    reject({
                        msg: res.message,
                        code: res.code,
                    })
                }
                resolve(res.context)
            } else {
                reject({
                    code: 500,
                    msg: "远程服务器关闭"
                });
            }
        }
    }
});

const strToHex = str => {
    if (str === "")
        return "";
    const hexCharCode = [];
    hexCharCode.push("0x");
    for (let i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
};

const checkErrorCode = code => {
    if (401 === code) {
        sessionStorage.setItem("lastPage", location.toString());
        window.location.href = "/video-storage/login.html";
    }
};

/**
 * 阻塞式睡眠
 *
 * @param time 毫秒
 */
const sleep = (time) => {
    let startTime = new Date().getTime() + parseInt(time, 10);
    while (new Date().getTime() < startTime) {
    }
};

/**
 *  获取输出设备尺寸信息
 *
 * @returns {Object} {width: number, height: number}
 */
const dimensions = () => {
    let winWidth, winHeight;
    //获取窗口宽度
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    //获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    return {width: winWidth, height: winHeight};
};

/**
 * 获取当前是星期几
 *
 * @returns {string}
 */
const getWeekDate = () => {
    const [now, weeks] = [new Date(), ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]];
    return weeks[now.getDay()];
};

/**
 * 时间格式化
 *
 * @param {string}  fmt     日期格式: YYYY-mm-dd HH:MM:SS
 * @param {Date}    date    时间对象：new Date()
 *
 * @returns {string}
 */
const dateFormat = (fmt = "YYYY-mm-dd HH:MM:SS", date = new Date()) => {
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    };
    let ret;
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
};

const getTarget = (key = "target") => {
    let url = location.search;
    let index = url.indexOf("?");
    if (-1 === index) {
        return
    }
    let str = url.substr(1).split("&");
    return decodeURIComponent(str[0].replace(key + "=", ""));
};

const checkParameter = value => {
    if (!value) return true;
    try {
        if ("" === value) return true;
        if (0 === value.length) return true;
    } catch (e) {
        return true
    }
    return false
};
