// pages/common/playDetail/playDetail.js
var app = getApp();
var util = require('../../../utils/util.js');
var that;
Page({
  data: {
    playnoval: null,
    novallists: null,
    novalUrl: '',
    novalImg: '',
    novalTitle: '',
    novalState: {
      progress: 0,
      currentPosition: '00:00',
      duration: '00:00'
    },
    isPlaying: true,
    selectedIndex: 0,
    hasnovallists: true,
    lyricSwiperH: 400,
    lyric: null,
    dotsClass: [
      'on', ''
    ],
    novalFrom: 0,
    scrollTop: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    that = this;
    var novallists = app.globalData.novallists;
    var novaldata = app.globalData.novalData;

    var arr = [];

    // var index = options.no;
    // var id = options.id;
    // var mid = options.mid;
    // var albummid = options.albummid;

    // that.setData({novalFrom: options.novalFrom, novalTitle: novaldata.title})

    // if (options.novalFrom === 'searchlist') {
    //   that.setData({hasnovallists: false});
    // }
    // if (options.novalFrom === 'toplist') {
    //   for (var i = 0, len = novallists.length; i < len; i++) {
    //     novallists[i].data.title = novallists[i].data.novalname;
    //     novallists[i].data.mid = novallists[i].data.novalmid;
    //     arr[i] = novallists[i].data;
    //   }
    //   novallists = arr;
    //   that.setData({novallists: arr});
    // }

    // 设置lyric-swiper的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          lyricSwiperH: res.windowHeight - 180
        });
      }
    });
    // 修改配置
    // that.changeOption(index, id, mid, albummid, novallists);

  },
  onReady: function () {
    // 使用后台播放器播放音乐
    wx.playBackgroundAudio({dataUrl: that.data.novalUrl, title: that.data.novalTitle, coverImgUrl: that.data.novalImg});
    this.startPlay();
  },
  // 修改配置
  // changeOption: function (index, id, mid, albummid, novallists) {
  //   // 调用showapi站点的音乐歌词
  //   that.getLyric(id);
  //   // 获取歌曲信息
  //   util.getnovalInfo(id, mid, function (data) {
  //     that.setData({playnoval: data[0]});
  //   });
  //   that.setData({
  //     selectedIndex: index,
  //     novallists: novallists,
  //     novalUrl: 'http://ws.stream.qqmusic.qq.com/C100' + mid + '.m4a?fromtag=38',
  //     novalImg: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + albummid + '.jpg'
  //   });
  // },
  
  // 开始播放
  startPlay: function () {
    // 页面渲染完成
    that.novalPlay();
    // 监听音乐播放
    wx.onBackgroundAudioPlay(function () {
      that.novalPlay();
    });
  },
  // 歌词滚动
  scrollHandle: function () {},
  // 获取歌词
  getLyric: function (id) {
    util
      .getLyric(id, function (data) {
        
        var lyric = that
          .reconvert(data.showapi_res_body.lyric)
          .slice(4);
        lyric = that.parseLyric(lyric);
        that.setData({lyric: lyric})
      });
  },
  // 解码>>中文
  reconvert: function (str) {
    str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
      return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
      return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
      return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
    });
    return str;
  },
  // 解析歌词的方法
  parseLyric: function (lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for (var i = 0; i < lyrics.length; i++) {
      var lyric = decodeURIComponent(lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) 
        continue;
      var clause = lyric.replace(timeReg, '');
      if (clause.length > 0) {
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k];
          var min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/\:\d*/i)).slice(1));
          var time = min * 60 + sec;
          lrcObj[time] = clause;
        }
      }
    }
    return lrcObj;
  },
  // 转换时间格式
  timeToString: function (duration) {
    var str = '';
    var minute = parseInt(duration / 60) < 10
      ? ('0' + parseInt(duration / 60))
      : (parseInt(duration / 60));
    var second = duration % 60 < 10
      ? ('0' + duration % 60)
      : (duration % 60);
    str = minute + ':' + second;
    return str;
  },
  // 播放状态控制
  novalPlay: function () {
    clearInterval(timer);
    var timer = setInterval(function () {
      // 获取后台音乐播放状态
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          // 播放状态 1表示播放中
          if (res.status == 1) {
            that.setData({
              isPlaying: true,
              novalState: {
                progress: res.currentPosition / res.duration * 100,
                currentPosition: that.timeToString(res.currentPosition),
                duration: that.timeToString(res.duration)
              }
            });

          } else {
            that.setData({isPlaying: false});
            clearInterval(timer);
          }
        }
      });
    }, 1000);
  },

  // 切换播放状态按钮
  novalToggle: function () {
    console.log('bf')
    if (that.data.isPlaying) {
      wx.pauseBackgroundAudio();
    } else {
      wx.playBackgroundAudio({title: that.data.playnoval.title, coverImgUrl: that.data.novalImg});
      that.novalPlay();
    };

  },
  // 改变播放歌曲
  changenoval: function (ev) {
    var that = this;
    // var currentIndex = ev.currentTarget.dataset.index;
    // var novallists = that.data.novallists;
    // var currentData = novallists[currentIndex];

    // 修改配置
    var id = currentData.id;
    var mid = currentData.mid;

    if (that.data.novalFrom === 'toplist') {
      var albummid = currentData.albummid;
      id = currentData.novalid;
    } else {
      var albummid = currentData.album.mid;
    }

    that.setData({novalTitle: currentData.title});

    // that.changeOption(currentIndex, id, mid, albummid, novallists);
    wx.seekBackgroundAudio({position: 0});
    that.startPlay();
    // 使用后台播放器播放音乐
    wx.playBackgroundAudio({dataUrl: that.data.novalUrl, title: that.data.novalTitle, coverImgUrl: that.data.novalImg});
  },
  // 修改swiper 点样式
  swiperChange: function (ev) {
    var that = this;
    var dotsClass = ['', ''];
    dotsClass[ev.detail.current] = 'on';
    that.setData({dotsClass: dotsClass});
  }
})