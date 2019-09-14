Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    cutMoney: 0,
    orderIdPay: 0,
  },

  /**
   * 支付成功
   */
  paySuccess: function () {
    var that = this;
    wx.request({
      url: 'https://www.qianzhuli.top/wx/orderpay?orderId=' + that.data.orderIdPay,
      success(res) {
        wx.redirectTo({
          url: '../orderResult/orderResult?orderId=' + that.data.orderIdPay,
        })
      },
      fail(res) {
        console.log('支付成功告知服务器更新订单状态失败');        
        console.log(res);
      }
    })
  },

  /**
   * 支付失败
   */
  payFail: function () {
    wx.navigateTo({
      url: '../orderResult/orderResult',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '努力加载中',
    });
    //请求服务端保存订单
    wx.request({
      url: 'https://www.qianzhuli.top/wx/createorder',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId'),
        cartList: wx.getStorageSync('cartList'),
        sumMoney: wx.getStorageSync('sumMoney'),
        cutMoney: wx.getStorageSync('sumMoney') > 19 ? 3 : 0,
        storeName: wx.getStorageSync('storeName'),
        orderNote: wx.getStorageSync('orderNote')
      },
      fail: function (res) {
        //清除订单备注的缓存
        wx.removeStorageSync('orderNote');
        console.log('下单失败,res=' + res)
      },
      success: function (res) {
        //清除订单备注的缓存
        wx.removeStorageSync('orderNote');
        //下单成功，执行支付操作
        console.log(res)
        that.setData({
          orderIdPay: res.data.orderId,
        })
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