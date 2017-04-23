Page({
    data:{},
    register:function(){
        wx.navigateTo({
          url: '../register/register',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    weixin:function(){
      console.log("2222")

      wx.redirectTo({
        url: '../mine/mine',
        success: function(res){
          // success
          // logins:false;
          // logined:true;
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