// pages/usefuls/bookDetails/bookDetails.js
var util = require('../../../utils/util.js');
var bookDetails = require('../../../utils/bookDetail.js');
var bookLists = require('../../../utils/bookList.js');
// var httpUtil=require('../../../utils/httpUtil.js') 
Page({
  data: {
    loadingHidden: false,
    actionSheetHidden: true,
    chapter: null,
    chapterList: [],
    chapterListHeight: 0,
    scrollTop: 66,
    chapterListMessage: null,
    chapterList1: [],
    price: ''
  },
  // 点击阅读
  startReading: function () {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    var that = this;
    // 获取书籍信息
    if (options.tag) {
      options.tag = options.tag.split(",")
    }

    that.setData({
      options: options
    });
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      })
    }, 1500)


    // 获取书籍目录章节
    var datas = {
      bookId: options.id
    }

    util.createBooks(
      {
        title: options.title,
        extName:  options.desc,
        freeType: 1,
        content: '花儿为什么这样红',
        audioFileUrl: "http://xx.com/xx.mp3"
      },
      datas.bookId,
      function (res) {
        console.log(res)
          
      }
    )

    util.bookCaptures(datas.bookId, function (res) {
      console.log(res)
    })

    // 设置lyric-swiper的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          chapterListHeight: res.windowHeight - 66
        });
      }
    });


  },
  // 点击显示付费提示框payStatus  chapterPrice
  spend: function (ev) {
    console.log(ev)
    if (ev.currentTarget.dataset.status == 3) {
      this.setData({
        price: ev.currentTarget.dataset.price,
        actionSheetHidden: !this.data.actionSheetHidden
      })
    }
  },
  // 确定充值
  reacarge: function () {

    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
        requestPayment: ok

      },
      'fail': function (res) {
      }
    })
  },
  // 点击隐藏付费提示框
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
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