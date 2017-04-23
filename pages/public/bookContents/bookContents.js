// bookContens.js
Page({
    backContensList:function (){
      wx.navigateTo({
        url: '../bookList/bookList',
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
  // 解析小说字符
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
  onLoad: function (options) {
        var that=this;
        // 获取内容存放高度
        wx.getSystemInfo({
            success: function(res) {
            that.setData({
                res:res
                })
            }
        })
        // 请求章节内容数据
        wx.request({
          url: 'http://c13.shuqireader.com/webapi/chapter/contentfree/?bookId='+options.bookid+'&chapterId='+options.chapterId+'&ut=1475130915&num=1&ver=1&aut=1488968227&sign=68b5b340a8d285b7f7d6c32ce789d1dc&imei=2b1deebc133b59d61bdbc47cc84e0d5c_shuqi_touch&sn=2b1deebc133b59d61bdbc47cc84e0d5c_shuqi_touch&_=1492846543149',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {"Content-Type":"application/json,gzip"}, // 设置请求的 header
          success: function(res){
            console.log(res)
           	
            // success
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