var app=getApp();
  app.globalData.border=[0,0,0,0,0,0,0,0,0]
Page({
    data: {
        borderStyle: "0;",
        items: [
            {
                "height": 160,
                "width": 160,
                "top": 294,
                "left": 158,
                "text": "文艺",
                "color": "#fe6a62"
            },
            {
                "height": 174,
                "width": 174,
                "top": 340,
                "left": 474,
                "text": "历史",
                color: "#feb72b"
            },
            {
                "height": 160,
                "width": 160,
                "top": 418,
                "left": 100,
                "text": "文学",
                "color": "#8d80f5"
            },
            {
                "height": 146,
                "width": 146,
                "top": 432,
                "left": 400,
                "text": "小说",
                "color": "#7796f4"
            },
            {
                "height": 138,
                "width": 138,
                "top": 512,
                "left": 263,
                "text": "摄影",
                "color": "#febb2b"
            },
            {
                "height": 135,
                "width": 135,
                "top": 586,
                "left": 380,
                "text": "古典",
                "color": "#3ecce7"
            },
            {
                "height": 172,
                "width": 172,
                "top": 634,
                "left": 128,
                "text": "经营",
                "color": "#40bcea"
            },
            {
                "height": 168,
                "width": 168,
                "top": 705,
                "left": 276,
                "text": "设计",
                "color": "#fe6a5e"
            },
            {
                "height": 152,
                "width": 152,
                "top": 685,
                "left": 476,
                "text": "管理",
                "color": "#b7ed1b"
            }

        ],
        animationData: {},//动画
        hidden: false,//动画隐藏
        shows: true,//动画显示
        arr: [],//点击之后存放数据,
      
        border:app.globalData.border//点击之后所加边框数据
    },
 showAnimate: function (ev) {//创建动画函数
        var that = this;
        animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease-in-out',
        }),
        animation.rotate(720).scale(1.5).step({ duration: 1000 }).scale(1).step({ duration: 1000 })
        setTimeout(function () {
            that.setData({
                animationData: animation.export(),//导出动画
                hidden: true,
                shows: false
            })
        })
    },

    touchstar: function (ev) {//手指开始触摸时，目标元素添加动画和边框
         if(ev.target.dataset.index == 0){
              app.globalData.border[ev.target.id]=1;
              var bdColor=this.data.borderStyle="3px solid #74C6D8;"
              console.log(this.data.borderStyle)
        }else{
            app.globalData.border[ev.target.id]=0;
             var bdColor=this.data.borderStyle="0"
        }
        var that = this;
        var arrIndex = [];
        var len = this.data.items.length;

        for (var i = 0; i < len; i++) {
            arrIndex.push(0)
        };
        arrIndex[ev.target.id] = 1;
        that.setData({
            arr: arrIndex,
            borderStyle:bdColor,
            border:app.globalData.border
        })
        this.showAnimate(ev);//调用动画
    },
    ok: function () {
        wx.showToast({
            title: '选好了,回到书架',
            icon: 'succes',
            duration: 1000,
            mask: true
        })
        setTimeout(function () {
           wx.switchTab({
            url: '../../bookcases/bookcase/bookcase',
            success: function (res) {
                // success
            },
            fail: function (res) {
                // fail
            },
            complete: function (res) {
                // complete
            }
        })

        },1000)
       
    },
    onHover: function () {

    },
    
    all: function (ev) {
       var that=this;
       var arr=[];
       var bdColor=this.data.borderStyle="3px solid #74C6D8;"
        for (var i = 0; i < app.globalData.border.length; i++) {
             app.globalData.border[i]=1
             arr.push(1)
        };

        that.setData({
            arr:arr,
            borderStyle:bdColor,
            border:app.globalData.border

        })
         this.showAnimate(ev);

    }
})