// pages/usefuls/bookDetails/bookDetails.js
var util = require('../../../utils/util.js');
var bookDetails=require('../../../utils/bookDetail.js');
var bookLists=require('../../../utils/bookList.js');
Page({
  data:{
    loadingHidden:false
  },
  // 点击阅读
  startReading:function(){
        
  },
  onLoad:function(options){
    var that = this;
    // 获取精品推荐，男生美文，女生美文等数据等数据
    util.getBoyGirlsBooks(function (data) {
      console.log (data)
      // that.setData({hotkey: data.data.hotkey, special: data.data.special_key});
    });
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'http://read.xiaoshuo1-sm.com/novel/i.php?do=sp_get&authorId='+options.authorId+'&bookId='+options.id+'&fetch=merge&sqUid=8000000&source=store&size='+options.size+'&page='+options.page+'&shuqi_h5=&_=1491809375288',
      data:{},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     
      header: {"Content-Type":"application/json;charset=utf-8"}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        if(res.data.data){
           res.data.data=res.data.data[0]
        }else{
          res.data.data=res.data.data
        }
        if( options.tag ){
            options.tag=options.tag.split(",")       
        }
        
        that.setData({
          books:res.data.data,
          message:res.data. message,
          bookImg:options.bookImg,
          desc:options.desc,
          options:options
        });
        setTimeout(function () {
              that.setData({
                  loadingHidden: true
              })
         }, 1500)
      },
      fail: function() {
        // fail
        that.setData({
           message:res.data. message
          })
      },
      complete: function() {
        // complete
      }
    });
  // 获取书页数据
    wx.request({
      url: 'http://walden1.shuqireader.com/webapi/book/info/?do=is_novelrank&p=1&page=1&size=10&onlyCpBooks=1&gender=1&type=1&shuqi_h5=&_=1492592770139',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'Content-Type':'application'}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })


    //audio
   
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