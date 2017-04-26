
function login(callback, params) {
    //调用登录接口

    wx.login({

        success: function (res) {
            console.log("授权code: %s", JSON.stringify(res));
            if (res.code) {
                loginToServer(res.code, callback)

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


function loginToServer(code, callback, params) {

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

                if (callback) callback(params);
            }
        },
    });
}

function setAuthToken(authToken) {

    wx.setStorageSync('authToken', authToken);

}


module.exports = {
    login: login
}