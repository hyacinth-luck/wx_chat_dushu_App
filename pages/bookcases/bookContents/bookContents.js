// bookContens.js
Page({
    data:{
       navbar: [
          '目录', '书签', '摘录'
        ],
        currentTab: 0, // 导航栏切换索引
    },
    backContensList:function (){
      wx.navigateTo({
        url: '../bookList/bookList',
        success: function(res){
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
    onLoad: function () {
      //  that = this;
      // wx.showLoading({title: '数据加载中...', mask: true});
      // 导航栏操作
     
        // var that=this;
        // wx.getSystemInfo({
        //     success: function(res) {
        //     that.setData({
        //         res:res
        //         })
        //     }
        // })
  },
  onNavbarTap: function (ev) {
        this.setData({currentTab: ev.currentTarget.dataset.index});
  }
})