// pages/usefuls/albumDetails/albumDetails.js
Page({
  data:{
    navbar: [
          '详情', '目录'
        ],
        currentTab: 0, // 导航栏切换索引
  },
  onNavbarTap: function (ev) {
        this.setData({currentTab: ev.currentTarget.dataset.index});
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