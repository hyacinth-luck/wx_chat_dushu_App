var constants = require("Constants.js")
var httpUtil = require("HttpUtil.js")

function loadNewestBooks(params) {
    httpUtil.get(constants.BOOK_NEWEST_URL, {
        params: params,
        success: function (res) {
            console.log("书籍 %s", JSON.stringify(res));
        },
        fail: function (res) {
            console.log("书籍 出错");
        },

    });
}





function getAuthToken() {
    // 简单处理,
    return wx.getStorageSync('authToken');
}



module.exports = {
    loadNewestBooks: loadNewestBooks
}