// bookcase.js
var util = require('../../../utils/util.js');
Page({
  data: {
    loadingHidden: false,
    booksShow: true,//书架展示
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
    imgInfo: [
      {
        "imgUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/doc/abpic/item/a8014c086e061d954024cf7272f40ad162d9ca1e.jpg",
        "imgTitle": "三生三世十里桃花"
      }, {
        "imgUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/doc/abpic/item/a8014c086e061d954024cf7272f40ad162d9ca1e.jpg",
        "imgTitle": "三生三世十里桃花"
      }, {
        "imgUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/doc/abpic/item/a8014c086e061d954024cf7272f40ad162d9ca1e.jpg",
        "imgTitle": "三生三世十里桃花"
      }, {
        "imgUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/doc/abpic/item/a8014c086e061d954024cf7272f40ad162d9ca1e.jpg",
        "imgTitle": "三生三世十里桃花"
      }, {
        "imgUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/doc/abpic/item/a8014c086e061d954024cf7272f40ad162d9ca1e.jpg",
        "imgTitle": "三生三世十里桃花"
      }
    ]


  },
  // 点击申请创建自己的图书
  deitBookshelf: function () {
    wx.showModal({
      title: '申请成为作者',
      content: '确定创建自己的图书 ？',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../create/create',
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
        }
      }
    })
  },
  onLoad: function () {
   var that = this;
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      })
    }, 1500)

    // 获取最新书籍


    
    // 获取书架书籍
    util.shelf(function (res) {
        console.log(res.data)
      that.setData({
       sheltBooks:res.data
      })
      
    

    })

   
   
    //搜索频道 热门搜索
    util.getHotSearch(function (data) {
      that.setData({ hotkey: data.data.hotkey, special: data.data.special_key });
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
  },
  // 导航栏操作
  onNavbarTap: function (ev) {
    this.setData({ currentTab: ev.currentTarget.dataset.index });
  },
  // 搜索框获取焦点
  onSearchFocus: function (ev) {
    var that = this;
    var searchKeyword = that.data.searchKeyword;
    if (searchKeyword.trim()) {
      this.setData({ searchHotShow: true, searchHistoryShow: false, searchResultShow: true, searchCancelShow: true });
    } else {
      that.setData({ searchHotShow: true, searchHistoryShow: true, searchResultShow: false, searchCancelShow: true });
    }

  },
  // 搜索取消
  onSearchCancel: function () {
    var that = this;
    that.setData({
      booksShow: true,
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
    var that = this;
    that.setData({ searchKeyword: ev.detail.value, searchHotShow: false });
  },
  // 搜索框清除按钮
  onClearInput: function () {
    var that = this;
    that.setData({
      booksShow: true,
      searchHotShow: true,
      searchHistoryShow: true,
      searchResultShow: false,
      searchCancelShow: true,
      searchKeyword: '',
      inputFocus: true
    });
  },
  // 搜索确认搜索
  onSearchConfirm: function (ev) {
    var that = this;
    var searchKeyword = ev.detail.value;
    var searchHistorys = that.data.searchHistorys;
    that.setData({ searchKeyword: searchKeyword });
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
          that.setData({ searchHistorys: searchHistorys });
        }
      });

      this.setData({ searchHotShow: false, searchHistoryShow: false, searchResultShow: true, searchSongList: [] });
      this.onFetchSearchList(1);
    }
  },
  // 搜索结果
  onFetchSearchList: function (searchPageNum) {
    var that = this;
    var searchKeyword = that.data.searchKeyword;
    that.setData({ searchLoading: true, scrollFlag: false });
    util.getSearchMusic(searchKeyword, searchPageNum, function (res) {
      var res = res.data;
      that.setData({
        booksShow: false,
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
    var that = this;
    var item = ev.currentTarget.dataset.item;
    var searchHistorys = wx.getStorageSync('searchHistorysKey');
    searchHistorys.splice(searchHistorys.indexOf(item), 1);
    wx.setStorage({
      key: "searchHistorysKey",
      data: searchHistorys,
      success: function () {
        that.setData({ searchHistorys: searchHistorys });
      }
    });
  },
  // 清除所有历史记录
  onSearchHistoryDeleteAll: function () {
    var that = this;
    wx.removeStorage({
      key: 'searchHistorysKey',
      success: function (res) {
        that.setData({ searchHistorys: [] });
      }
    });
  },
  // 滚动分页加载
  onScrollLower: function () {
    var that = this;
    if (that.data.scrollFlag) {
      var num = that.data.searchPageNum + 1;
      var total = Math.ceil(that.data.searchTotalNum / that.data.searchPageSize);
      if (num > total) {
        that.setData({ searchLoadingComplete: true });
        return;
      } else {
        if (num == total) {
          that.setData({ searchLoading: true });
        } else {
          that.setData({ searchLoading: false });
        }
        that.setData({ searchPageNum: num });
        that.onFetchSearchList(that.data.searchPageNum);
      }
    }
  },
  // 滚动计算滚动条距离
  onScroll: function (ev) {
    var that = this;
    var scrollTop = ev.detail.scrollTop;
    if (scrollTop > 500) {
      that.setData({ backToTop: true });
    } else {
      that.setData({ backToTop: false });
    }
  },
  // 返回顶部
  onBackToTop: function () {
    that.setData({ scrollToView: 'scrollTop', backToTop: false });
  },
  // 跳转到cdlist
  onCdlistTap: function (ev) {
    var that = this;
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
    var that = this;
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
    var that = this;
    app.setGlobalData({ songData: ev.currentTarget.dataset.data });
    var id = ev.currentTarget.dataset.id;
    var mid = ev.currentTarget.dataset.mid;
    var albummid = ev.currentTarget.dataset.albummid;
    var songFrom = ev.currentTarget.dataset.from;
    wx.navigateTo({
      url: '../playsong/playsong?id=' + id + '&mid=' + mid + "&albummid=" + albummid + '&songFrom=' + songFrom
    });
  }

  // }
})
