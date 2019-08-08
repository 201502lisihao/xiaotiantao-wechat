const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [{
      "id":"1",
      "order_no": "C179",
      "order_status": "已确认",
      "store_name": "小甜桃（水上公园店）",
      "get_time": "2019-07-29 10:11:29",
      "type": "预约单",
      "price": "27.10",
      "order_time": "2019-07-29 10:11:29"
    }, {
      "id":"2",
      "order_no": "C179",
      "order_status": "已确认",
      "store_name": "小甜桃（水上公园店）",
      "get_time": "2019-07-29 10:11:29",
      "type": "预约单",
      "price": "27.10",
      "order_time": "2019-07-29 10:11:29"
    }],
    userInfo: {},
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //回调，保证获取到全局userInfo
    app.userInfoReadyCallback = function(){
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (that.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
      console.log(that.data.userInfo)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  
  /**
   * 带参数跳转订单详情页
   */
  orderDetail: function (id) {
    var id = id.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id='+id,
    })
  }
})