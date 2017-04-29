// bookContens.js
var util = require('../../../utils/util.js');
Page({
  data: {
    content: '',
    loadingHidden: false,
    nextChapter: { bookId: 0 },
    prevChapter: 0
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    // 获取内容存放高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          res: res,
          options: options
        })
      }
    })



    // 请求章节内容数据
    that.showLoading()
    util.bookContent(options.bookId, options.id, function (res) { /** 需 */
      console.log("###### %s", JSON.stringify(res.data.nextChapter));
      that.setData({
        content: res.data.content.replace(/ 　　/g, "\n 　　"),
        //nextChapter: res.data.nextChapter,
        //prevChapter: res.data.prevChapter
      });

      that.nextChapter = res.data.nextChapter;
      that.prevChapter = res.data.prevChapter;

      that.hideLoading();

    })


  },


  showLoading: function () {
    this.setData({
      loadingHidden: 0
    });
  },

  hideLoading: function () {
    this.setData({
      loadingHidden: 1
    });
  },


  // 返回目录
  backCaptureList:function(ev){
    console.log(ev)
    var data=ev.target.dataset;
    console.log(data)
    let url = `../bookList/bookList?bookId=` + data.bookid + `&total=` + data.total;
    wx.redirectTo({
      url: url
    })

  },
  // 点击阅读下一章
  nextCapture: function () {
    if (!this.nextChapter) {
      return;
    }
    let url = `../bookContents/bookContents?bookId=` + this.nextChapter.bookId + `&id=` + this.nextChapter.id + `&title=` + this.nextChapter.title;
    wx.redirectTo({
      url: url
    })
  },
  prevCapture: function () {

    if (!this.prevChapter) {
      return;
    }
    let url = `../bookContents/bookContents?bookId=` + this.prevChapter.bookId + `&id=` + this.prevChapter.id + `&title=` + this.prevChapter.title;
    wx.redirectTo({
      url: url
    })
  }
}
)