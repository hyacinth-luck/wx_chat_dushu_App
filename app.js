var util = require('/utils/util.js');

//app.js
App({
  onLaunch: function () {
    var that = this;
    //调用API从本地缓存中获取数据
    var bookcase = wx.getStorageSync('bookcase') || []
    bookcase.unshift(Date.now())
    wx.setStorageSync('bookcase', bookcase)


    var params = {
      pageNum: 1,
      pageSize: 10
    };
    util.getNewestBooks(params, function (res) {
      // console.log("books %s", JSON.stringify(res));
    });



    // #########
    /* 从 shuqi.com 导入书籍 */
    //var bookListUrl = "http://read.xiaoshuo1-sm.com/novel/i.php?do=is_novelrank&p=1&page=1&size=100&onlyCpBooks=1&gender=1&type=1&shuqi_h5=&_=1492932708057";
    //that.importBooksFromShuqi(bookListUrl);
  },

  importBooksFromShuqi: function (apiUrl) {
    wx.request({
      url: 'http://localhost/book/import-from-shuqi', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        bookListUrl: apiUrl
      },
      header: {
        "Content-type": "application/x-www-form-urlencoded",
        'authToken': util.getAuthToken()
      },
      success: function (res) {
        console.log("login %s", JSON.stringify(res));
        /*  */
        if (res.data.data) {

          var authToken = res.data.data.authToken;
          console.log("res.data %s", JSON.stringify(res.data));
          if (authToken) {
            wx.setStorageSync('authToken', authToken.replace(/"/g, ''));
          }
        }
      },
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({

        success: function (res) {
          console.log("授权code: %s", JSON.stringify(res));
          if (res.code) {
            that.login(res.code)

            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)

              }
            })
          }

        }
      })

    }
  },
  globalData: {
    userInfo: null,
    border: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    bookinfo: {

    }
  },

  onShareAppMessage: function () {

  },


  login: function (code) {
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
            wx.setStorageSync('authToken', authToken);
          }
        }
      },
    });




  },







  showModal: function (text) {
    wx.showModal({
      title: '提示',
      content: text,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })



  }
})