//app.js
App({
  globalData: {
    userInfo: null,
    location: {}
  },
  onLaunch: function () {
    
  },
  onUnlaunch: function () {
    //小程序销毁时调用
    wx.clearStorageSync();
  },
})