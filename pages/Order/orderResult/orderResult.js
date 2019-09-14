Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    cutMoney: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中',
    })
    var that = this;
    var orderId = options.orderId;
    //请求服务端获取订单信息
    wx.request({
      url: 'https://www.qianzhuli.top/wx/getorderinfobyid?orderId=' + orderId,
      success(res) {
        console.log(res);
        that.setData({
          getNo: res.data.getNo,
          orderNo: res.data.orderNo,
          cartList: res.data.cartList,
          sumMoney: res.data.sumMoney,
          cutMoney: res.data.sumMoney > 19 ? 3 : 0,
          orderNote: res.data.orderNote,
          createAt: res.data.createAt,
          orderStatus: res.data.orderStatus
        })
      },
      fail(res) {
        console.log('根据订单id获取订单信息失败');
        console.log(res);
      }
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
    wx.switchTab({
      url: '/pages/Order/orderList/orderList',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    })
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