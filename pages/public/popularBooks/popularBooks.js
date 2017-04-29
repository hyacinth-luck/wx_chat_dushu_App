// pages/public/popularBooks/popularBooks.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    hidden: true,
    freeBooks: null

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight,
          options: options
        });
      }
    });
    //  获取免费书籍
    var params = {
      pageNum: options.num,
      pageSize: 10,
      lastRecordId: options.id
    };

    util.GetList(that, params, util.freeBook)
  },
  // 下拉刷新
  bindDownLoad: function (ev) {
    var that = this;
    var options = ev.target.dataset.opentions;
    var params = {
      pageNum: options.num,
      pageSize: 10,
      lastRecordId: options.id
    };
    util.GetList(that, params, util.freeBook)
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  // 上拉刷新
  refresh: function (event) {
    var options = event.target.dataset.opentions;
    var params = {
      pageNum: options.num,
      pageSize: 10,
      lastRecordId: options.id
    };
    this.setData({
      freeBooks: null,
      scrollTop: 0
    });
    util.GetList(this, params, util.freeBook)
  },
  onPullDownRefresh: function () {
    console.log("下拉")
  },
  onReachBottom: function () {
    console.log("上拉");
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