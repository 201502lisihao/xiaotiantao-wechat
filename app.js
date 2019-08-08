//app.js
App({
  globalData: {
    userInfo: null,
    location: {}
  },
  onLaunch: function () {
    //初始化app登录
    this.getUserDataToken();
  },
  onUnlaunch: function () {
    //小程序销毁时调用
    wx.clearStorageSync();
  },
  getUserDataToken: function (){
    var that = this;
    //获取用户缓存的utoken
    var utoken = wx.getStorageSync('utoken');
    wx.login({
      success: function (res){
        var code = res.code;
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo;
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                  wx.request({
                    url: 'https://www.qianzhuli.top/wx/userauthlogin',
                    method: 'POST',
                    data: {
                      utoken: utoken,
                      code: code,
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    },
                    fail: function (res) {
                      console.log('请求userAuthLogin失败,res=' + res)
                    },
                    success: function (res) {
                      console.log('获取utoken成功');
                      console.log(res.data);
                      //设置用户缓存
                      var utoken = res.data.utoken;
                      try {
                        wx.setStorageSync('utoken', utoken);
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },
})