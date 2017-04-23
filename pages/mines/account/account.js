// pages/mines/account/account.js
Page({
  data:{
    hidden:true
  },
  // 余额详情
  overCaption:function(){
      wx.navigateTo({
        url: '../overCaption/overCaption',
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
  
  spend:function(){
    var that=this;
     that.setData({
                hidden:false
            })
        
  },
  // 输入密码
  change:function(ev){
    console.log(ev)
    var pwd = e.detail.value.length;
   
    for (var i = 0, len = pwd.length; i < len; i++) {
					$input.eq("" + i + "").val(pwd[i]);
				}
				$input.each(function() {
					var index = $(this).index();
					if (index >= len) {
						$(this).val("");
					}
				});
				if (len == 6) {
					//执行其他操作
				}
  },
  // 点击取消
  cancel:function(){
    var that=this;
     that.setData({
                hidden:true
            })
  },
// 点击确定充值
  confirm:function(){
      wx.requestPayment({
            'timeStamp': '',
            'nonceStr': '',
            'package': '',
            'signType': 'MD5',
            'paySign': '',
            'success':function(res){
               
            },
            'fail':function(res){
            }
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