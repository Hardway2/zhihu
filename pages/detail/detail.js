var URL = 'https://news-at.zhihu.com/api/4/news/'
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    art: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: URL+options.id,
      success(res){
        console.log(res.data)
        that.setData({
          art: res.data,
        })
        var article = res.data.body.replace(/查看知乎讨论/, "");
        WxParse.wxParse('article', 'html', article, that, 5);
      },
      complete() {
        wx.hideNavigationBarLoading();
      }
    })
  },
})