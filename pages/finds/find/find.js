//search.js
//获取应用实例
var app = getApp();
var util = require('../../../utils/util.js');

Page({
  data: {
     loadingHidden:false,
     imgShow:true,
     imgHid:false,
     sortShow:true,//图书分类是否展示
     booksShow:true,//书架展示
     inputFocus: false, // 搜索框是否获取焦点
     searchKeyword: "", // 搜索关键词
     searchHotShow: false, // 是否显示热门搜索
     searchHistoryShow: false, // 是否显示搜索历史
     searchResultShow: false, // 是否显示搜索结果
     searchCancelShow: false, // 是否显示取消按钮

     searchHistorys: [], // 搜索历史记录
     searchSongList: [], // 搜索结果
     searchPageNum: 1, // 分页数
     searchLoading: false, // 加载更多
     searchLoadingComplete: false, // 加载更多结束
     scrollFlag: true, // 上拉分页加载条件

     searchPageSize: 0, // 每页多少
     searchTotalNum: 0, // 结果总条数
     scrollToView: 'scrollTop', // 返回顶部位置
     backToTop: false, // 返回顶部
     items:[
            {
               "imgUrl":"../../../images/sheji.png" ,
               "title":"设计",
            },
            {
               "imgUrl":"../../../images/sheying.png" ,
               "title":"摄影",
            },
            {
               "imgUrl":"../../../images/wenxue.png" ,
               "title":"文学",
            },
            {
               "imgUrl":"../../../images/fenlei.png" ,
               "title":"分类",
            }

        ],
     navels:[
           {
             "text":"热门小说",
             "textLabel":"全网高人气",    "imgUrl":"https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/doc/abpic/item/a8014c086e061d954024cf7272f40ad162d9ca1e.jpg"
           },
           {
             "text":"新书推荐",
             "textLabel":"新书看不停","imgUrl":"https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/doc/abpic/item/0df3d7ca7bcb0a460220f4966263f6246b60af1b.jpg"
           }
     ],
     imgUrls: [
      'http://ss.hlread.com/upload/book/32/32340.png',
      'http://ss.hlread.com/upload/book/31/31139.png',
      'http://ss.hlread.com/upload/book/12/122158.png'
    ], 
    groomImg:[
      {
        "url":'http://img.shucheng.platform.zongheng.com/novel/group2/M00/0E/78/CwsAh1cxsaiAdJu9AAAxQewD3fA629.jpg'
      },
      {
        "url":'http://img.shucheng.platform.zongheng.com/novel/group1/M00/02/CB/CgoAS1QTEIaAOIq9AAA0NnCJls4173.jpg',
      },
      {
        "url":'http://img.shucheng.platform.zongheng.com/novel/group2/M00/24/E4/CwsAhleXQNOAYeTGAAA6j7wnCDs945.jpg'
      }
    ],
    indicatorDots:true, 
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular:true
    
  },


  //推荐喜欢书籍，点击刷新
  refres:function(){
    var that=this;
    // 更换刷新图标
    that.setData({
      imgShow:false,
      imgHid:true
    })

    // 刷新推荐图书
    wx.request({
      url: 'http://bookstoreapi.shuqireader.com/eva_bookstore/v1/module/query?appId=1&pageId=1&channelId=&versionId=&ver=&shuqi_h5=&md5key=&userId=8000000&timestamp=1492572151&type=2&resetcache=&func_id=19&orderid=5&mid=6&lmkTxt=index&sign=038614E28B58069596FF25F8F111C0AB&key=shuqiapi&_=1492572151795',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'accept':'application/json'}, // 设置请求的 header
      success: function(res){
         // success
         console.log(res.data.data.module[0])
         that.setData({
             fines:res.data.data.module[0]
         })
        
       
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
        setTimeout(function(){
             that.setData({
                imgShow:true,
                imgHid:false
              })
          },500)
         
      }
    })
    console.log(1232321)
    
    

  },
  onLoad: function () {
    var that=this;
   

    // 获取所有分类列表
    wx.request({
        url: 'http://bookstoreapi.shuqireader.com/eva_bookstore/v1/module/query?appId=1&pageId=1&channelId=&versionId=&ver=&shuqi_h5=&md5key=&userId=8000000&timestamp=1492576266&type=2&resetcache=&func_id=33%2C11%2C33%2C11%2C19%2C33%2C11%2C33%2C11%2C19&orderid=6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15&sign=60F757437BD11E39CC748BB018F67EF0&key=shuqiapi&_=1492576266653',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {'accept':'application/json'}, // 设置请求的 header
        success: function(res){
           // success
         console.log(res.data.data.module[4])
          that.setData({
              modules:res.data.data.module,
              girls:res.data.data.module[4],
              boys:res.data.data.module[9],
              fine:res.data.data.module[1]
           });
         
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })




      //搜索频道 热门搜索
    util.getHotSearch(function (data) {
      that.setData({hotkey: data.data.hotkey, special: data.data.special_key});
    });
    // 设置search 结果scrollview的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollviewH: res.windowHeight - 90
        });
      }
    });

    // 历史浏览记录 从本地缓存中获取前10条数据
    var searchHistorys = wx.getStorageSync('searchHistorys') || [];
    if (searchHistorys.length > 0) {
      that.setData({
        searchHistorys: searchHistorys.length >= 10
          ? searchHistorys.slice(0, 10)
          : searchHistorys
      });
    }
    setTimeout(function () {
        that.setData({
            loadingHidden: true
        })
    }, 1500);
     //分类书籍数据
    wx.request({
       url: 'http://bookstoreapi.shuqireader.com/eva_bookstore/v1/module/query?appId=1&pageId=1&channelId=&versionId=&ver=&shuqi_h5=&md5key=&userId=8000000&timestamp=1491809865&type=2&resetcache=&func_id=20%2C24%2C33%2C11%2C19&orderid=1%2C2%2C3%2C4%2C5&sign=266E394E41052240CD6DA3F089FF075A&key=shuqiapi&_=1491809865143',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        var num=0;//数据处理
        for ( var i = 0; i < res.data.data.module[1].content.length; i++ ) {
          res.data.data.module[1].content[i].icon.y=num*100;
          num=num+1;
          console.log(res.data.data.module[1].content[i].icon.y)
        }
        // success
        console.log(res.data.data.module[4]);
        console.log(res.data.data.module[1]);
        console.log(res.data.data.module[1].icon_img_url);
        that.setData({
           modules:res.data.data.module[1],
           htmls:res.data.data.html,
           fines:res.data.data.module[4]
        });
        setTimeout(function () {//正在加载显示
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
  },
  bindInputChange:function(e){
  },
   // 搜索框获取焦点
  onSearchFocus: function (ev) {
    var that=this;
    var searchKeyword = that.data.searchKeyword;
    // that.data.searchHotShow=true;
    console.log(that.data.searchHotShow)
    if (searchKeyword.trim()) {//去掉字符串头和尾的空格
      this.setData({searchHotShow: true, searchHistoryShow: false, searchResultShow: true, searchCancelShow: true});
    } else {
      that.setData({searchHotShow: true, searchHistoryShow: true, searchResultShow: false, searchCancelShow: true});
    }

  },
  // 搜索取消
  onSearchCancel: function () {
    var that=this;
    that.setData({
      sortShow:true,
      searchHotShow: false,
      searchHistoryShow: false,
      searchResultShow: false,
      searchCancelShow: false,
      searchKeyword: '',
      inputFocus: false
    });
  },
  // 搜索输入值时的操作
  onSearchInput: function (ev) {
    var that=this;
    that.setData({searchKeyword: ev.detail.value,searchHotShow: false});
  },
  // 搜索框清除按钮
  onClearInput: function () {
    var that=this;
    that.setData({
      booksShow:true,
      searchHotShow: false,
      searchHistoryShow: true,
      searchResultShow: false,
      searchCancelShow: true,
      searchKeyword: '',
      inputFocus: true
    });
  },
  // 搜索确认搜索
  onSearchConfirm: function (ev) {
    var that=this;
    var searchKeyword = ev.detail.value;
    var searchHistorys = that.data.searchHistorys;
    that.setData({searchKeyword: searchKeyword});
    if (searchKeyword.trim()) {
      // 添加搜索历史记录
      if (searchHistorys.length > 0) {
        if (searchHistorys.indexOf(searchKeyword) < 0) {
          searchHistorys.unshift(searchKeyword);
        }
      } else {
        searchHistorys.push(searchKeyword);
      }
      wx.setStorage({
        key: "searchHistorysKey",
        data: searchHistorys,
        success: function () {
          that.setData({searchHistorys: searchHistorys});
        }
      });

      this.setData({searchHotShow: false, searchHistoryShow: false, searchResultShow: true, searchSongList: []});
      this.onFetchSearchList(1);
    }
  },
  // 搜索结果
  onFetchSearchList: function (searchPageNum) {
    var that=this;
    var searchKeyword = that.data.searchKeyword;
    that.setData({searchLoading: true, scrollFlag: false});
    util.getSearchMusic(searchKeyword, searchPageNum, function (res) {
      var res = res.data;
      that.setData({
        sortShow:false,
        searchSongList: that
          .data
          .searchSongList
          .concat(res.song.list),
        zhida: res.zhida,
        searchLoading: false,
        searchPageNum: res.song.curpage,
        searchTotalNum: res.song.totalnum,
        searchPageSize: res.song.curnum,
        scrollFlag: true
      });
    });
  },
  // 删除单条历史记录
  onSearchHistoryDelete: function (ev) {
    var that=this;
    var item = ev.currentTarget.dataset.item;
    var searchHistorys = wx.getStorageSync('searchHistorysKey');
    searchHistorys.splice(searchHistorys.indexOf(item), 1);
    wx.setStorage({
      key: "searchHistorysKey",
      data: searchHistorys,
      success: function () {
        that.setData({searchHistorys: searchHistorys});
      }
    });
  },
  // 清除所有历史记录
  onSearchHistoryDeleteAll: function () {
    var that=this;
    wx.removeStorage({
      key: 'searchHistorysKey',
      success: function (res) {
        that.setData({searchHistorys: []});
      }
    });
  },
  // 滚动分页加载
  onScrollLower: function () {
    var that=this;
    if (that.data.scrollFlag) {
      var num = that.data.searchPageNum + 1;
      var total = Math.ceil(that.data.searchTotalNum / that.data.searchPageSize);
      if (num > total) {
        that.setData({searchLoadingComplete: true});
        return;
      } else {
        if (num == total) {
          that.setData({searchLoading: true});
        } else {
          that.setData({searchLoading: false});
        }
        that.setData({searchPageNum: num});
        that.onFetchSearchList(that.data.searchPageNum);
      }
    }
  },
  // 滚动计算滚动条距离
  onScroll: function (ev) {
    var that=this;
    var scrollTop = ev.detail.scrollTop;
    if (scrollTop > 500) {
      that.setData({backToTop: true});
    } else {
      that.setData({backToTop: false});
    }
  },
  // 返回顶部
  onBackToTop: function () {
    that.setData({scrollToView: 'scrollTop', backToTop: false});
  },
  // 跳转到cdlist
  onCdlistTap: function (ev) {
    var that=this;
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../cdlist/cdlist?cdListId=' + id
    });
  },
  // 跳到到toplist
  onToplistTap: function (ev) {
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../toplist/toplist?topListId=' + id
    });
  },
  // 热门搜索点击执行搜索
  onHotkeyTap: function (ev) {
    var that=this;
    var word = ev.currentTarget.dataset.text;
    this.setData({
      searchSongList: [],
      searchHotShow: false,
      searchHistoryShow: false,
      searchResultShow: true,
      searchCancelShow: true,
      searchKeyword: ev
        .currentTarget
        .dataset
        .text
        .trim(),
      inputFocus: false
    });
    this.onFetchSearchList(1);
  },
  // 搜索结果跳到播放页
  onPlaysongTap: function (ev) {
    var that=this;
    app.setGlobalData({songData: ev.currentTarget.dataset.data});
    var id = ev.currentTarget.dataset.id;
    var mid = ev.currentTarget.dataset.mid;
    var albummid = ev.currentTarget.dataset.albummid;
    var songFrom = ev.currentTarget.dataset.from;
    wx.navigateTo({
      url: '../playsong/playsong?id=' + id + '&mid=' + mid + "&albummid=" + albummid + '&songFrom=' + songFrom
    });
  }

  
})
