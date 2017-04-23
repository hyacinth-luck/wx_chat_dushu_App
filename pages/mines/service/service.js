// pages/mines/service/service.js
Page({
  data:{},
  chat:function(){
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res)
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '13520969306' //仅为示例，并非真实的电话号码
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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