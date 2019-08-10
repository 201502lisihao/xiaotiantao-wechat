const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
      "id":"1",
      "order_no": "C179",
      "order_status": "已确认",
      "store_name": "小甜桃（水上公园店）",
      "get_time": "2019-07-29 10:11:29",
      "type": "预约单",
      "price": "27.10",
      "create_at": "2019-07-29 10:11:29"
    }, {
      "id":"2",
      "order_no": "C179",
      "order_status": "已确认",
      "store_name": "小甜桃（水上公园店）",
      "get_time": "2019-07-29 10:11:29",
      "type": "预约单",
      "price": "27.10",
      "create_at": "2019-07-29 10:11:29"
    }],
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
      url: '/pages/orderDetail/orderDetail?id='+id,
    });
  },

  /**
   * 根据userId获取用户订单
   */
  getOrderListByUserId: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');
    //读缓存，有缓存直接用缓存数据，否则请求数据库，获取最新的订单数据
    //todo 下单时要清除对应缓存，保证用户进订单页时能拿到正确数据
    var key = userId + '_OrderList';
    var cache = wx.getStorageSync(key);
    if(cache != false){
      that.setData({
        orderList: cache
      });
    } else {
      //请求服务器，获取该用户实时的orderList并放入缓存
      wx.request({
        url: 'https://www.qianzhuli.top/wx/getorderlistbyuserid?userId=' + userId,
        success: function (res) {
          var orderList = res.data.order_list
          console.log(orderList);
          //放入本地缓存
          //wx.setStorageSync(key, orderList);
          //放入页面data
          if(orderList != false){
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
    }
  },
  /**
   * 即刻下单
   */
  goOrder: function (){
    wx.navigateTo({
      url: '/pages/selectStore/selectStore',
    })
  }
})