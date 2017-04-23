// pages/usefuls/bookDetails/bookDetails.js
var  message;
Page({
  data:{
    loadingHidden:false
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    //detaildata
    wx.request({
      url: 'http://walden1.shuqireader.com/webapi/book/info/?bookid='+ options.bookid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.setData({
          // album:res.data.data.album,
          books:res.data.data,
          message:res.data. message
        });
        setTimeout(function () {
              that.setData({
                  loadingHidden: true
              })
         }, 1500)
      },
      fail: function() {
        // fail
        that.setData({
                  message:res.data. message
              })
      },
      complete: function() {
        // complete
      }
    });

    //audio
   
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})