
function login(callbackData) {
    //调用登录接口

    wx.login({

        success: function (res) {
            console.log("授权code: %s", JSON.stringify(res));
            if (res.code) {

                loginToServer(res.code, callbackData)

                wx.getUserInfo({
                    success: function (res) {
                        // that.globalData.userInfo = res.userInfo
                        // typeof cb == "function" && cb(that.globalData.userInfo)

                    }
                })
            }

        }
    })
}


function loginToServer(code, callbackData) {

    wx.request({
        url: 'http://localhost/login/wx_mini_program?code=' + code, //仅为示例，并非真实的接口地址
        method: "GET",
        data: {
            code: code
        },
        header: {
            'authToken': ''
        },
        success: function (res) {
            console.log("login %s", JSON.stringify(res));
            /*  */
            if (res.data.data) {

                var authToken = res.data.data.authToken;
                console.log("res.data %s", JSON.stringify(res.data));
                if (authToken) {
                    setAuthToken(authToken);
                }



                wx.request({
                    url: callbackData.url,
                    data: callbackData.responseHandler.params,
                    dataType: 'text', /* 解决id等数值过大被截问题, 字符串*/
                    header: {
                        'authToken': getAuthToken(),
                        "Content-type": "application/x-www-form-urlencoded",
                    },

                    method: callbackData.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function (res) {
                        // console.log("res %s", JSON.stringify(res));
                        res = handleJson(res.data); /* 解决id等数值过大被截问题 */
                        // success
                        if (res.httpCode == 401) {/* 未登录 */
                            // 重新登录
                            login.login(callbackData);

                            return;
                        }
                        callbackData.responseHandler.success(res, callbackData.url);
                    },
                    fail: function (res) {
                        // fail
                        callbackData.responseHandler.fail(res);
                    },
                    complete: function () {
                        // complete
                        callbackData.responseHandler.complete();
                    }
                })
            }
        },
    });
}

function setAuthToken(authToken) {

    wx.setStorageSync('authToken', authToken);

}

function getAuthToken() {
    return wx.getStorageSync('authToken');
}


function handleJson(jsonStr) {
    var regP = /"\:\d+\.*\d+/; // "id":82122323232300100200
    var pattern = new RegExp(regP, "g");
    var result;
    while ((result = pattern.exec(jsonStr)) != null) {
        var matchedBigIntStr = result[0].substr("\":".length);
        jsonStr = jsonStr.replace(regP, "\":\"" + matchedBigIntStr + "\"");
    }
    return JSON.parse(jsonStr);
}


module.exports = {
    login: login
}