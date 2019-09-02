//获取应用实例
const app = getApp()

Page({
  data: {
    //banner
    "bnrUrl": [{
      "url": "/images/banner/banner.png"
    }, {
        "url": "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
    }, {
        "url": "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
    }],
    //列表图标样式
    "icon": [{
      "one": "/images/icon_nav_feedback.png",
      "two": "/images/icon_nav_feedback.png",
      "three": "/images/icon_intro.png"
    }],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    welcome: "你好！",
    naerestStore: {
      'storeName': "您附近暂无门店"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // 给app.js 定义一个方法。
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //获取欢迎词
    this.getWelcome();

    //获取最近门店
    this.getNearestStore();
  },
  
  /**
   * 页面加载完成触发
   */
  onReady: function () {

  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    //将用户信息放入globaldata中
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 自助点单button
   */
  onOrder: function (){
    wx.navigateTo({
      url: '/pages/Order/selectStore/selectStore',
    })
  },

  /**
   * 获取欢迎词
   */
  getWelcome: function (){
    var that = this;
    var nowDate = new Date();
    var nowHour = nowDate.getHours();
    //console.log(nowHour);
    if (nowHour >= 6 && nowHour <= 8) {
      that.setData({
        welcome: '早上好！'
      })
    }
    if(nowHour >= 9 && nowHour <= 11){
      that.setData({
        welcome: '上午好！'
      })
    }
    if (nowHour >= 12 && nowHour <= 14) {
      that.setData({
        welcome: '中午好！'
      })
    }
    if (nowHour >= 15 && nowHour <= 18) {
      that.setData({
        welcome: '下午好！'
      })
    }
    if ((nowHour >= 19 && nowHour <= 23) || (nowHour >= 0 && nowHour <= 5)) {
      that.setData({
        welcome: '晚上好！'
      })
    }
  },

  /**
   * 获取离用户最近的门店信息
   */
  getNearestStore: function (){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var longitude = res.longitude;
        var latitude = res.latitude;
        //将位置信息放入globalData
        app.globalData.location.longitude = longitude;
        app.globalData.location.latitude = latitude;
        //调服务器获取最近门店
        wx.request({
          url: 'https://www.qianzhuli.top/wx/getneareststore?longitude=' + longitude + '&latitude=' + latitude,
          success: function (res) {
            console.log('获取最近门店成功');
            console.log(res.data);
            if (res.data.nearest_store_info){
              that.setData({
                'naerestStore.storeName': res.data.nearest_store_info.store_name
              })
            }
          },
          fail: function (res) {
            console.log('请求getneareststore失败');
            console.log(res);
          }
        }) 
      },
      fail: function (res) {
        console.log('首页获取经纬度失败');
        console.log(res);
      }
    })
  }
});
