// pages/selectStore/selectStore.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:null,
    latitude:null,
    nearlyStoresInfo:[],
    hasNearlyStores:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中..',
    })
    //获取用户位置
    this.getUserLocal();
    //获取附近门店数据
    this.getNearlyStores();
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
   * 获取用户位置并放入data
   */
  getUserLocal: function () {
    var that = this;
    if (app.globalData.location) {
      that.setData({
        longitude: app.globalData.location.longitude,
        latitude: app.globalData.location.latitude
      })
    } else {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var longitude = res.longitude;
          var latitude = res.latitude;
          //将位置信息放入globalData
          app.globalData.location.longitude = longitude;
          app.globalData.location.latitude = latitude;
          //同时放入data
          that.setData({
            longitude: longitude,
            latitude: latitude
          })
        },
        fail: function (res) {
          console.log('附近门店页获取经纬度失败');
          console.log(res);
        }
      })
    }
  },

  /**
   * 获取附近门店的数据
   */
  getNearlyStores: function () {
    var that = this;
    wx.request({
      url: 'https://www.qianzhuli.top/wx/getnearlystores?longitude=' + that.data.longitude + '&latitude=' + that.data.latitude,
      success: function (res) {
        console.log(res.data);
        //遍历门店列表，将相关数据添加到data中
        var nearlyStores = res.data.nearly_stores_info;
        if (nearlyStores != false) {
          //刷新data
          that.setData({
            nearlyStoresInfo: nearlyStores,
            hasNearlyStores: true
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * button 返回首页
   */
  goIndex: function () {
    wx.switchTab({
      url: '/pages/Index/index/index',
    })
  }
})