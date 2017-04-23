// girl.js
Page({ 


    // http://walden1.shuqireader.com/webapi/rank/classrelation?_=1491824173476
    onLoad:function(){
        var that=this;
        wx.request({
          url: 'http://walden1.shuqireader.com/webapi/rank/classrelation?_=1491826718894',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          
          success: function(res){
            // success
            that.setData({
             sorts:res.data.data,
             message:res.data. message
            })
            console.log(res)
            
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
    }

})