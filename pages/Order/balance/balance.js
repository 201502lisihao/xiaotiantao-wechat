// pages/order/balance/balance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    cupNumber: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中',
    })
    var that = this;
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    that.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      cutMonney: wx.getStorageSync('sumMonney') > 19 ? 3 : 0,
      cupNumber: wx.getStorageSync('cupNumber'),
    })
    //获取可用屏幕高度 55是底部操作框高度
    var usefulWindowHeight = wx.getSystemInfoSync().windowHeight;
    that.setData({
      usefulWindowHeight: usefulWindowHeight - 55
    });
  },
  gopay: function () {
    //调微信支付接口，获取支付结果，在成功的回调中跳转下一个页面，保存订单数据，展示下单成功
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  bindTimeChange: function (e) {
    this.setData({
      getOrderTime: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
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

  }
})