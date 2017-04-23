// popularBooks.js
 Page({  
      onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: 'http://read.xiaoshuo1-sm.com/novel/i.php?do=is_novelrank&p=1&page=1&size=10&onlyCpBooks=1&gender=1&type=1&shuqi_h5=&_=1492154823479',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {"Content-Type":"application"}, // 设置请求的 header
      success: function(res){
        console.log(res)
        for ( var i=0; i<res.data.data.length; i++){
            res.data.data[i].words=Math.round(res.data.data[i].words/10000);
            res.data.data[i].tags= res.data.data[i].tags.substring(0, res.data.data[i].tags.indexOf(","))
        }
        // success
        console.log(res.data.info)
        that.setData({
          info:res.data.info,  
          bookInfo:res.data.data
        })

      },
      fail: function() {
        // fail
        that.setData({
        })
      },
      complete: function() {
        // complete
      }
    })
  },
})