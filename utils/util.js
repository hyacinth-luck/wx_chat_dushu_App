var httpUtil = require("HttpUtil.js");

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取男生美文列表
function getBoyGirlsBooks(callback) {
  wx.request({
    url: 'http://bookstoreapi.shuqireader.com/eva_bookstore/v1/module/query?appId=1&pageId=1&channelId=&versionId=&ver=&shuqi_h5=&md5key=&userId=8000000&timestamp=1492576266&type=2&resetcache=&func_id=33%2C11%2C33%2C11%2C19%2C33%2C11%2C33%2C11%2C19&orderid=6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15&sign=60F757437BD11E39CC748BB018F67EF0&key=shuqiapi&_=1492576266653',
    data: {
      // appId:1,
      // pageId:1,
      // channelId:'',
      // versionId:'',
      // ver:'',
      // shuqi_h5:'',
      // md5key:'',
      // userId:8000000,
      // timestamp:1492577406,
      // type:2,
      // resetcache:'',
      // func_id:[33,11,33,11,19,33,11,33,11,19],
      // orderid:[6,7,8,9,10,11,12,13,14,15],
      // sign:'00317BC1596ABA3A8739B5D927CAFFB0',
      // key:shuqiapi,
      // _:1492577406995
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: { 'content-Type': 'application/json' }, // 设置请求的 header
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        callback(data);
      }
    }

  })
}


//过滤器
function formatWan(n) {
  n = n.toString();
  return (n / 10000).toFixed(1) + '万';
}




//获取推荐频道数据
function getRecommend(callback) {
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        var songlist = data.data.songList;
        for (var i = 0; i < songlist.length; i++) {
          songlist[i].accessnum = formatWan(songlist[i].accessnum);
        }
        callback(data);
      }
    }
  })
}

//获取热门搜索
function getHotSearch(callback) {
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'jsonp',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        data.data.hotkey = data.data.hotkey.slice(0, 8)
        callback(data);
      }
    }
  })
}

//获取搜索结果
function getSearchMusic(keyword, page, callback) {
  wx.request({
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: keyword,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: page,
      remoteplace: 'txt.mqq.all',
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}


/*
** 排行榜相关api
*/

//获取排行榜频道数据
function getToplist(callback) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    data: {
      format: 'json',
      g_tk: 5381,
      uin: 0,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        var toplist = data.data.topList;
        for (var i = 0; i < toplist.length; i++) {
          toplist[i].listenCount = formatWan(toplist[i].listenCount);
        }
        callback(toplist);
      }
    }
  })
}
//获取排行榜详细信息
function getToplistInfo(id, callback) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      tpl: 3,
      page: 'detail',
      type: 'top',
      topid: id,
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}
//获取热门歌单数据
function getCdlistInfo(id, callback) {
  wx.request({
    url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      new_format: 1,
      pic: 500,
      disstid: id,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      nosign: 1,
      _: new Date().getTime()
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        var cdlist = data.cdlist;
        for (var i = 0; i < cdlist.length; i++) {
          cdlist[i].visitnum = formatWan(cdlist[i].visitnum);
        }
        callback(cdlist[0]);
      }
    }
  });
}

/**
 * 设置背景色
 */
function calculateBgColor(pic_url, callback) {
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_gedanpic_magiccolor.fcg',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      pic_url: pic_url,
      _: new Date().getTime()
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        callback(res.data);
      }
    }
  });
}


/**
 * 获取歌词
 */
function getLyric(id, callback) {
  wx.request({
    url: 'https://route.showapi.com/213-2',
    data: {
      musicid: id,
      showapi_appid: '23654',
      showapi_timestamp: new Date().getTime(),
      showapi_sign: 'd23793312daf46ad88a06294772b7aac'
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  });
}

/**
 * 获取单首歌曲的信息
 */
function getSongInfo(id, mid, callback) {
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_list_songinfo_cp.fcg',
    data: {
      url: 1,
      idlist: id,
      midlist: mid,
      typelist: 0
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data.data;
        callback(data);
      }
    }
  });
}


// 免费书籍列表
function freeBook(data, callback) {
  httpUtil.get('http://localhost/book/list/free', {
    params: data,
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });
}



// 书籍章节列表
function bookCaptures(bookId, data, callback) {
  httpUtil.get('http://localhost/book/' + bookId + '/chapter/list', {
    params: data,
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });

}
/**
 * 
 */
// 最新书籍列表
function getNewestBooks(data, callback) {
  httpUtil.post('http://localhost/book/list/newest', {
    params: data,
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });
}
// 创建图书
function createBook(data, callback) {
  httpUtil.post('http://localhost/book/create', {
    params: data,
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    },
    fail: function (res) {

    }
  });

}

/**
 *  创建图书章节
 */
function createBooks(data, bookId, callback) {

  httpUtil.post('http://localhost/book/' + bookId + '/chapter/create', {
    params: data,
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    },
    fail: function (res) {

    }
  });

}

// 关键字搜索图书
function searchBook(keyword, callback) {
  httpUtil.get('http://localhost/book/list/search', {
    params: keyword,
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });

}

// 书架书籍列表
function shelf(callback) {
  httpUtil.post('http://localhost/book/shelf/list', {
    params: {},
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });
}

// 添加到书架
function addshelf(bookId, callback) {
  httpUtil.get('http://localhost/book/' + bookId + '/add-to-shelf', {
    params: {},
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });
}


// 书籍的阅读历史
function historyBook(callback) {
  httpUtil.get('http://localhost/book/history/list', {
    params: {},
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });

}


// 书籍详情
function bookDetail(bookId,callback){
   httpUtil.get('http://localhost/book/'+bookId+'/info', {
    params: {},
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });

}

// 热门/新书/(可选条件:免费, 有声,全本,出版)

// 书籍章节
// 书籍详情
// 书籍评论
// 书架相关
// 书籍收藏
// 阅读历史

function getAuthToken() {
  // 简单处理,
  return wx.getStorageSync('authToken');
  //return "DAtMctt1rnCRP3+uZkg8Pq==";
}

// 书籍正文内容
function bookContent(bookId, chapterId, callback) {
  httpUtil.get('http://localhost/book/' + bookId + '/chapter/' + chapterId + '/content', {
    params: {},
    success: function (res) {
      if (callback && typeof callback == "function") {
        callback(res);
      }
    }
  });

}

// 懒加载
var l = [];
function GetList(that, data, url) {
  that.setData({
    hidden: false
  });
  console.log(data)
  var params = {
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    lastRecordId: data.lastRecordId
  };
  url(params, function (res) {
    console.log(res)

    if (res.data) {
      res.data.records.forEach((e) => {
        e.tags = e.tags ? e.tags.split(",") : [];
      });

    }
    for (var i = 0; i < res.data.records.length; i++) {
      l.push(res.data.records[i])
    }
    res.data.records = l;
    that.setData({
      freeBooks: res.data,
      hidden: true
    });
    params.pageNum++;
  });
}



/* ################################

!function importFromQidian(bookListUrl) {
  httpUtil.post("http://localhost/book/import-from-qidian", { params: { bookListUrl: bookListUrl } }
  )
}("http://f.qidian.com/all?size=-1&sign=-1&tag=-1&chanId=4&subCateId=-1&orderId=5&update=-1&page=1&month=-1&style=1&action=-1");



#####################################*/

module.exports = {
  formatTime: formatTime,
  getRecommend: getRecommend,
  getHotSearch: getHotSearch,
  getSearchMusic: getSearchMusic,
  getToplist: getToplist,
  getToplistInfo: getToplistInfo,
  getCdlistInfo: getCdlistInfo,
  calculateBgColor: calculateBgColor,
  getLyric: getLyric,
  getSongInfo: getSongInfo,
  getBoyGirlsBooks: getBoyGirlsBooks,
  getNewestBooks: getNewestBooks,
  getAuthToken: getAuthToken,
  freeBook: freeBook,
  bookCaptures: bookCaptures,
  createBooks: createBooks,
  createBook: createBook,
  searchBook: searchBook,
  shelf: shelf,
  addshelf: addshelf,
  GetList: GetList,
  bookContent: bookContent,
  bookDetail:bookDetail
}