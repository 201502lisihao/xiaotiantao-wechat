const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    hasOrderList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '努力加载中..',
    });
    //获取用户订单信息
    that.getOrderListByUserId();
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
    console.log('test');
    this.getOrderListByUserId();
    wx.stopPullDownRefresh();
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
   * button带参数跳转订单详情页
   */
  orderDetail: function (id) {
    var id = id.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderResult/orderResult?orderId=' + id,
    });
  },

  /**
   * 根据userId获取用户订单
   */
  getOrderListByUserId: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');
    //请求服务器，获取该用户实时的orderList并放入缓存
    wx.request({
      url: 'https://www.qianzhuli.top/wx/getorderlistbyuserid?userId=' + userId,
      success: function (res) {
        var orderList = res.data.order_list
        console.log(orderList);
        //放入本地缓存
        //wx.setStorageSync(key, orderList);
        //放入页面data
        if (orderList != false) {
          that.setData({
            orderList: orderList,
            hasOrderList: true
          })
        }
      },
      fail: function (res) {
        console.log('请求服务器获取用户orderlist失败');
        console.log(res);
      }
    })
  },
  /**
   * 即刻下单
   */
  goOrder: function (){
    wx.navigateTo({
      url: '/pages/Order/selectStore/selectStore',
    })
  }
})