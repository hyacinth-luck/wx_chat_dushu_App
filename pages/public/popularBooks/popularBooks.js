// pages/public/popularBooks/popularBooks.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {

    pageNum: 1,
    pageSize: 10,

  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    //  获取免费书籍
    // console.log(that.pager.pageNum)
    var params = {
      pageNum: options.num,
      pageSize: 10,
      lastRecordId: options.id
    };
    util.freeBook(params, function (res) {
      console.log(res)
      if (res.data) {
        for (var i = 0, n = res.data.records.length; i < n; ++i) {
          res.data.records[i].tags = res.data.records[i].tags.split(",");
        }
      }
      that.setData({
        freeBooks: res.data
      })

    });



  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})