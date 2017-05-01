// pages/usefuls/bookDetails/bookDetails.js
var util = require('../../../utils/util.js');
var bookDetails = require('../../../utils/bookDetail.js');
var bookLists = require('../../../utils/bookList.js');
var bookid = "";
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
  // 点击开始阅读
  startReading: function (ev) {
    // 获取书籍目录章节
    var that = this;
    var data = ev.target.dataset;
    var bookId = '';
    var id = '';
    var title = '';
    var datas = {
      pageNum: 1,
      pageSize: data.total
    }
    console.log(data)
    util.bookCaptures(data.bookid, datas, function (res) {
      res.data.records = res.data.records.reverse()
      console.log(res.data.records[0])
      bookId = res.data.records[0].bookId,
        id = res.data.records[0].id
      title = res.data.records[0].title
      let url = `../bookContents/bookContents?bookId=` + bookId + `&id=` + id + `&title=` + title + `&total=` + data.total;
      wx.redirectTo({
        url: url
      })
    })

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
    var datas = {
      pageNum: 1,
      pageSize: 10
    }

    // 获取书籍目录章节
    util.bookCaptures(options.id, datas, function (res) {
      console.log(res)
      res.data.records = res.data.records.reverse()
      that.setData({
        chapterList: res.data
      });

    })


    // 获取书籍详情
    // util.bookDetail(options.id,function(res){
    //   console.log(res)
    //    that.setData({
    //       chapterList: res.data
    //   });

    // })






    // 设置lyric-swiper的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          chapterListHeight: res.windowHeight - 66
        });
      }
    });


  },



  // 添加到书架
  addshelf: function (ev) {
    // 加入书架
    console.log(ev)
    var bookId = ev.target.dataset.bid
    util.addshelf(bookId, function (res) {
      console.log(res)
      wx.showToast({
        title: '添加成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    })

  },
  // 收藏该书
  addFavorite:function(ev){
    var bookId = ev.target.dataset.bid
    console.log(ev)
    util.addFavorite(bookId, function (res) {
      console.log(res)
      wx.showToast({
        title: '收藏成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
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