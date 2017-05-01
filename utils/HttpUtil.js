var login = require("login.js")

var defaultResponseHandler = {
    params: {},
    success: function () {

    },
    fail: function () {

    },
    complete: function () {

    }
};

function handleJson(jsonStr) {
    var regP = /"\:\d+\.*\d+/; // "id":82122323232300100200
    var pattern = new RegExp(regP, "g");
    var result;
    while ((result = pattern.exec(jsonStr)) != null) {
        var matchedBigIntStr = result[0].substr("\":".length);
        jsonStr = jsonStr.replace(regP, "\":\"" + matchedBigIntStr + "\"");
    }
    return JSON.parse(jsonStr);
};

function request(url, method, responseHandler) {

    responseHandler = Object.assign(defaultResponseHandler, responseHandler);

    wx.request({
        url: url,
        data: responseHandler.params,
        dataType: 'text', /* 解决id等数值过大被截问题, 字符串*/
        header: {
            'authToken': getAuthToken(),
            "Content-type": "application/x-www-form-urlencoded",
        },

        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            // console.log("res %s", JSON.stringify(res));
            res = handleJson(res.data); /* 解决id等数值过大被截问题 */
            // success
            if (res.httpCode == 401) {/* 未登录 */
                // 重新登录
                login.login(url,method, responseHandler); // 传递登录前 请求信息, 以便完成授权重新发起请求

                return;
            }
            responseHandler.success(res);
        },
        fail: function (res) {
            // fail
            responseHandler.success(res);
        },
        complete: function () {
            // complete
            responseHandler.complete();
        }
    })
}

function getAuthToken() {
    // 简单处理,
    return wx.getStorageSync('authToken');
}


function _get(url, responseHandler) {
    request(url, "GET", responseHandler);
}

function _post(url, responseHandler) {
    request(url, "POST", responseHandler);
}

module.exports = {
    get: _get,
    post: _post,
    getAuthToken:getAuthToken
}

/*
    usage:

    var httpUtil = require("HttpUtil.js");
    var params = {};
    httpUtil.get("",{
        params: params,
        success:function(res){},
        fail: function(res){},

    });
 */