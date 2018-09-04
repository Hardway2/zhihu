var URL = 'https://news-at.zhihu.com/api/4/news/latest'
var BeforeURL = 'https://news-at.zhihu.com/api/4/news/before/'
var utils = require('../../utils/util.js')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    top_stories:[],
    stories:[],
    beforeStories:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: URL,
      success(res) {
        console.log(res.data)
        that.setData({
          top_stories: res.data.top_stories,
          stories: res.data.stories
        })
      },
      complete() {
        wx.hideNavigationBarLoading();
      }
    })
    this.index = 1
  },

  //获取日期
  getNextDate: function () {
    var now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },

  //点击事件
  showDetail(e){
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    var that = this;
    var date = this.getNextDate()
    wx.request({
      url: BeforeURL + (Number(utils.formatDate(date)) + 1),
      success(res){
        console.log(res.data)
        that.setData({
          beforeStories: that.data.beforeStories.concat([{ header: utils.formatDate(date, '-')}]).concat(res.data.stories),
        })
      },
      complete() {
        wx.hideNavigationBarLoading();
      }
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'Hardway邀请您看看小程序',
      path: '/pages/latest/latest'
    }
  }
})