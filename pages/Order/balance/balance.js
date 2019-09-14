// pages/order/balance/balance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    cutMoney: 0,
    storeName: null,
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
      sumMoney: wx.getStorageSync('sumMoney'),
      cutMoney: wx.getStorageSync('sumMoney') > 19 ? 3 : 0,
      storeName: wx.getStorageSync('storeName'),
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
      url: '../orderPay/orderPay'
    })
  },

  //选择取餐时间，暂时注释
  // bindTimeChange: function (e) {
  //   this.setData({
  //     getOrderTime: e.detail.value
  //   })
  // },

  /**
   * 获取备注,和其它订单信息一起放入缓存
   */
  bzInput: function (e) {
    wx.setStorageSync('orderNote', e.detail.value);
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