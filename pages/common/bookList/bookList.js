// bookList.js
var bookLists=require('../../../utils/bookList.js');
Page({
  data:{
    actionSheetHidden:true,
    chapter:null,
    chapterList:[],
    chapterListHeight:0,
    scrollTop:66,
    chapterListMessage:null,
    chapterList1:[],
    price:''

  },
 
   onLoad:function(options){
    var that = this;
    // 设置lyric-swiper的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          chapterListHeight: res.windowHeight - 66
        });
      }
    });
    // 页面初始化 options为页面跳转所带来的参数
    console.log(bookLists.bookList[0].data)
    console.log(bookLists.bookList[0].data.chapterList[0])
    console.log(bookLists.bookList[0].data.chapterList[0].volumeList[0])
    that.setData({
       chapter:bookLists.bookList[0].data,
       chapterListMessage:bookLists.bookList[0].data.chapterList[0],
       chapterList:bookLists.bookList[0].data.chapterList[0].volumeList
    })
    


    //audio
   
  },
   // 点击显示付费提示框payStatus  chapterPrice
  spend:function(ev){
    console.log(ev)
    if ( ev.currentTarget.dataset.status==3 ){
          this.setData({
            price:ev.currentTarget.dataset.price,
            actionSheetHidden:!this.data.actionSheetHidden
         })
    }
  },
  // 确定充值
 reacarge:function(){
     
      wx.requestPayment({
            'timeStamp': '',
            'nonceStr': '',
            'package': '',
            'signType': 'MD5',
            'paySign': '',
            'success':function(res){
              requestPayment:ok
               
            },
            'fail':function(res){
            }
          })  
 },
   // 点击隐藏付费提示框
  actionSheetbindchange:function(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  }
})