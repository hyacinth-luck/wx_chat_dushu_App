//index.js
//获取应用实例
//  wx.getSystemInfo({
//         success: function(res) {
//           console.log(res)
//         }
//     })
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    indicatorDots:true,
    duration:500,
    color:"#04ADDE"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
      url: '../bookcase/bookcase'
      });
  },
  onLoad: function () {
    var that=this;
    wx.getSystemInfo({
        success: function(res) {
           that.setData({
              res:res
            })
        }
    })

        
  }
})
