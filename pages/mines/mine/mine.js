//mine.js
var app = getApp();
Page({
    data:{
          loadingHidden:false,
           items:[
                  {
                     datas:[
                       {
                        "imageUrl":"../../../images/message1.png",
                        "text":"客服服务",
                        "num":"5",
                        "cont":"-2",
                        "url":"../service/service"
                        
                        },
                        {
                        "imageUrl":"../../../images/wallet1.png",
                        "text":"我的账户",
                        "num":"-1",
                        "cont":"0",
                        "url":"../account/account"
                        } 
                     ]
                  },
                  {
                      datas:[
                            {
                            "imageUrl":"../../../images/rocord1.png",
                            "text":"阅史",
                            "num":"-1",
                            "cont":"-2",
                            "url":"../../common/popularBooks/popularBooks"
                            },
                            {
                            "imageUrl":"../../../images/download1.png",
                            "text":"清除缓存",
                            "num":"-1",
                            "cont":"0",
                           "url":"../../common/popularBooks/popularBooks"
                            }
                      ]
                  },
                  {
                      datas:[
                             {
                            "imageUrl":"../../../images/collection1.png",
                            "text":"收藏",
                            "num":"2本",
                            "cont":"-2",
                           "url":"../../common/popularBooks/popularBooks"
                            },
                            {
                            "imageUrl":"../../../images/note1.png",
                            "text":"笔记",
                            "num":"4处",
                            "cont":"0",
                            "url":"../../common/popularBooks/popularBooks"
                            }
                      ]
                  }
                    
           ],
           modalHidden:false,
           zheHidden:false,
           animationData: {},
    },
    modalTap:function(){
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        })
        setTimeout(function() {
            animation.top('100px').step()
            this.setData({
                animationData:animation.export()
            })
        }.bind(this), 500);

        this.setData({
            modalHidden:true,
            zheHidden:true
        })
       

    },
    modalChange:function(){
        this.setData({
            modalHidden:false,
            zheHidden:false
        })
    },
    onLoad: function () {
         var that = this;
        setTimeout(function () {
            that.setData({
                loadingHidden: true
            })
        }, 1500)
       
        // 调用应用实例的方法获取全局数据,获取已注册用户名和头像
        app.getUserInfo(function(userInfo){
        //     更新数据
            that.setData({
                userInfo:userInfo
            })
        })

      }
})