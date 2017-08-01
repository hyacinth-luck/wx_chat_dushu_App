// pages/public/popularBooks/popularBooks.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    hidden: true,
    freeBooks: [],
    //pageNum: 1,
    params: {
      pageNum: 1,
      pageSize: 10,
      lastRecordId: 0
    },
    scrollHeight: 0,
    options: {},
    isLoading: false


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

    that.params = {
      pageNum: 1,
      pageSize: 10,
      lastRecordId: 0
    };
    that.freeBooks = [];

    util.printLog("err", JSON.stringify(that.params));
    that.params.pageNum = options.num || 1;
    //  获取免费书籍

    util.printLog("", "XXXXX " + that.params.pageNum);
    that.loadBooks();
  },
  // 上拉加载更多
  bindDownLoad: function (ev) {
    var that = this;
    var options = ev.target.dataset.opentions;


    that.loadBooks();
  },

  loadBooks: function () {
    let that = this
    if (that.isLoading) {
      return;
    }
    that.showLoading();
    util.freeBook(that.params, function (res) {
      that.hideLoading();

      util.printLog("err", JSON.stringify(res.data.records));
      that.trimTags(res.data.records); // 临时解决 tags 空白 问题
      that.freeBooks = that.freeBooks.concat(res.data.records);
      that.setData({
        freeBooks: that.freeBooks
      });
      that.params.pageNum++;
      util.printLog("", "yyY " + that.params.pageNum);


    });
  },

  trimTags: function (records) {
    records.forEach((e) => {
      util.printInfoLog("###" + e.tags + "####");

      e.tags = e.tags.length != 0 ? e.tags.split(",") : []
      let tags = [];
      e.tags.forEach((t) => {
        t = t.length != 0 ? t.replace(/^\s+/g, '').replace(/\s+$/g, '') : '';
        if (t.length != 0) {
          tags.push(t);
        }
      });
      e.tags = tags;
    });
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  // 下拉刷新
  refresh: function (event) { // 这是 刷新 -_-!!
    var that = this
    var options = event.target.dataset.opentions;
    that.params.pageNum = 1;
    that.freeBooks = [];
    that.loadBooks();
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
  },

  showLoading: function () {
    this.setData({
      hidden: 0
    });
    this.isLoading = true;
  },
  hideLoading: function () {
    this.setData({
      hidden: true
    });

    this.isLoading = 0;
  }
})