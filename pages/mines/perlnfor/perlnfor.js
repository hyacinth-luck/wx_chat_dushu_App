var app=getApp();
Page({
    data:{
       items:[
           {
               "title":"头像",
                "imgUrl":"../../../images/dushu.png",
                "cont":"1"
           },
           {
               "title":"昵称",
                "imgUrl":"../../../images/dushu.png",
                "cont":"2"

           },
           {
               "title":"地区",
                "imgUrl":"../../../images/dushu.png",
                "cont":"3"
           },
           {
               "title":"性别",
                "imgUrl":"../../../images/dushu.png",
                "cont":"4"
           },
       ],
       name:{}
    },
    name:function(){
           wx.setStorage({
            key:"key",
            data:"value"
            })
    },
 
    onLoad: function () {
        var that = this;
        // 调用应用实例的方法获取全局数据,获取已注册用户名和头像
        app.getUserInfo(function(userInfo,encryptedData){
        //     更新数据
            that.setData({
                userInfo:userInfo,
                encryptedData:encryptedData

            })
            console.log(encryptedData)
        })

      }
})