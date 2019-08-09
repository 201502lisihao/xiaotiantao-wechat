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
    wx.showLoading({
      title: '努力加载中..',
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
    
  },
  
  /**
   * button带参数跳转订单详情页
   */
  orderDetail: function (id) {
    var id = id.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id='+id,
    })
  }
})