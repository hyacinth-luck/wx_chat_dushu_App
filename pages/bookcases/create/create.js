var util = require('../../../utils/util.js');
const datestr = JSON.stringify(new Date());
const dataes = datestr.substring(1, datestr.indexOf("T"));
let textLength = 500;
Page({
  data: {
    dateValue: dataes,
    disabledes: false,
    countfieldValue: 500,
    isAudio1: 1,
    isAudio2: 2,
    checkedes: false,
    disabledes: false,
    mediaActionSheetHidden: false

  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },

  // 点击保存创建的图书
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData)
    util.createBook(
      {
        categoryId: '856071846034817024',
        name: formData.booktitle,
        authorName: formData.authorName,
        intro: formData.introduction,
        description: formData.description,
        cover: 'http://pic.motieimg.com/_assets/pic-cover.jpg',
        "tags[]": formData.tags,
        isAudio: formData.gender
      },
      function (res) {
        console.log(res)
        if (res.httpCode == 200) {
          wx.showToast({
            title: '创建作品完成',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../bookcase/bookcase',
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

          }, 1000)


        }



      }
    )


  },
  //点击上传图片
  Upload: function () {
    var that = this
    var tokend = wx.getStorageSync('tokend')//存数据
    var indexId = wx.getStorageSync('indexId')//存数据
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 进行图片预览
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [] // 需要预览的图片http链接列表
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://..../' + indexId + '/....?token=' + tokend, //接口地址
          filePath: tempFilePaths[0],     //要上传文件资源的路径
          name: 'pic',                   //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
          header: { 'content-type': 'multipart/form-data' },     //客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data       HTTP 请求 Header , header 中不能设置 Referer
          formData: {         //HTTP 请求中其他额外的 form data
            'type': that.data.type,
            'time': that.data.paramTime,
            'site': that.data.address
          },
          success: function (res) {  //接口调用成功的回调函数
            var data = res.data   //开发者服务器返回的数据
            wx.redirectTo({   //关闭当前页面，跳转到应用内的某个页面。
              url: '../....',      //需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
              success: function (res) {
                wx.showToast({
                  title: '保存成功',
                  image: '../Image/suess.png',
                  duration: 2000
                })
              },
            })
          },
          fail: function (res) {    //接口调用失败的回调函数
            console.log('error' + ':' + res)
          }
        })
      }
    })
  },
  // 多行文本域中字数不超过1000字
  changeTxt: function (e) {
    if (e.detail.value.length < textLength) {
      this.setData({
        countfieldValue: textLength - e.detail.value.length,
      })
    } else {
      this.setData({
        disabledes: true,
        countfieldValue: 0
      })
    }

  },
  onLoad: function () {


  }
})