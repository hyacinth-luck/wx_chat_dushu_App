Page({
    data:{
        items:[
             {
            "url":"http://www.miit.gov.cn/n11293472/n11294912/n11296092/11904851.html",
            "text":"全国人民代表大会常务委员会关于维护互联网安全的决定"
        },{"url":"http://baike.baidu.com/item/%E4%BA%92%E8%81%94%E7%BD%91%E4%BF%A1%E6%81%AF%E6%9C%8D%E5%8A%A1%E7%AE%A1%E7%90%86%E5%8A%9E%E6%B3%95#2",
            "text":"互联网信息服务管理办法"
        },{
            "url":"http://www.miit.gov.cn/n11293472/n11294912/n11296542/11957379.html",
            "text":"互联网电子公告服务管理规定"
        }, {
            "url":"http://www.mps.gov.cn/n16/n1282/n3493/n3778/n492863/493115.html",
            "text":"中华人民共和国计算机信息网络国际联网管理暂行规定"
        },{
            "url":"http://news.xinhuanet.com/eworld/2010-06/05/c_12185613.htm",
            "text":"中华人民共和国计算机信息网络国际联网管理暂行规定实施办法"
        },{
            "url":"http://www.mps.gov.cn/n16/n1282/n3493/n3778/n492863/493042.html",
            "text":"中华人民共和国计算机信息系统安全保护条例"
        }, {
            "url":"http://www.mps.gov.cn/n16/n1282/n3493/n3823/n442104/452202.html",
            "text":"计算机信息网络国际联网安全保护管理办法"
        }
        ]
       
    },
    onLoad: function(options) {
        this.setData({
        title: options.title
        })
        console.log(options)
  }
})