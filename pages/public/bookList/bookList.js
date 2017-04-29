// bookList.js
var bookLists = require('../../../utils/bookList.js');
var util = require('../../../utils/util.js');
Page({
  data: {
    actionSheetHidden: true,
    chapterList:null,
    chapterListHeight: 0,
    scrollTop: 66,
    chapterListMessage: null,
    price: '',
    sortCapture: '正序',
    status: 0,//正序,
    loadingHidden: false

  },
  // 排序
  sortCapture: function (event) {
    console.log(event)
    var that = this;
    var options = event.target.dataset.options;
    var status = event.target.dataset.status;
    var datas = {
      pageNum: 1,
      pageSize: options.total
    }
    if (status == 0) {
      util.bookCaptures(options.bookId, datas, function (res) {
        that.setData({
          chapterList: res.data,
          sortCapture: '倒叙',
          status: 1
        });
      })


    } else {
      util.bookCaptures(options.bookId, datas, function (res) {
        res.data.records = res.data.records.reverse()
        that.setData({
          chapterList: res.data,
          sortCapture: '正序',
          status: 0
        });
      })
    }

  },
  onLoad: function (options) {
    var that = this;
    // 设置lyric-swiper的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          chapterListHeight: res.windowHeight - 66,
          options: options
        });
      }
    });
    // 获取全部章节列表
    var datas = {
      pageNum: 1,
      pageSize: options.total
    }
    // 获取书籍目录章节
    util.bookCaptures(options.bookId, datas, function (res) {
      console.log("Captures")
      console.log(res)
      res.data.records = res.data.records.reverse()
       that.setData({
         chapterList: res.data
        });
        that.hideLoading(); 
    })
  },
  showLoading:function(){
   this.setData({
      loadingHidden: 0
    });
  },

  hideLoading: function () {
    this.setData({
      loadingHidden: 1
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
  }
})