// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    activeIndex: 0,
    toView: 'a0',
    scrollTop: 100,
    screenWidth: 667,
    showModalStatus: false,
    currentType: 0,
    currentIndex: 0,
    sizeIndex: 0,
    sugarIndex: 0,
    temIndex: 0,
    sugar: ['常规糖', '无糖', '微糖', '半糖', '多糖'],
    tem: ['常规冰', '多冰', '少冰', '去冰', '温', '热'],
    size: ['常规', '珍珠', '西米露'],
    cartList: [],
    sumMonney: 0,
    cupNumber: 0,
    showCart: false,
    loading: false,
    storeId: null,
    storeName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中',
    })
    var that = this;
    //获取可用窗口高度 rpx
    //请求商品数据
    wx.request({
      //url: 'https://easy-mock.com/mock/59abab95e0dc66334199cc5f/coco/aa',
      url: 'https://www.qianzhuli.top/wx/goodslist?storeId=' + options.id,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res);
        //页面参数都request请求后set
        that.setData({
          listData: res.data.good_list,
          loading: true,
          storeId: options.id,
          storeName: options.store_name,
          storeDistance: options.store_distance,
        });
        //获取一些高度信息，异步调用，所以放在时间最久的请求函数的回调函数中去
        var usefulWindowHeight = wx.getSystemInfoSync().windowHeight;
        that.setData({
          usefulWindowHeight: usefulWindowHeight          
        });
        //获取下方操作框高度
        that.createSelectorQuery().select('#bottom-disk').boundingClientRect(function (rect) {
          console.log(rect.height);
          that.setData({
            bottomDisk: rect.height
          });
        }).exec();
        //获取满减框高度
        that.createSelectorQuery().select('#bottom-strip').boundingClientRect(function (rect) {
          console.log(rect.height);
          that.setData({
            bottomStrip: rect.height
          });
        }).exec();
        wx.hideLoading();
      },
      fail: function (res) {
        console.log('请求服务器无响应');
        console.log(res);
      }
    });
  },
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
      // scrollTop: 1186
    })
    console.log(this.data.toView);
  },
  scroll: function (e) {
    //todo打这个e日志时，选择的menu会自动往下跳一个，有bug，记得修复
    console.log(e)
    var dis = e.detail.scrollTop
    if (dis > 0 && dis <= 200) {
      this.setData({
        activeIndex: 0,
      })
    }
    if (dis > 200 && dis < 1867) {
      this.setData({
        activeIndex: 1,
      })
    }
    if (dis > 1867 && dis < 2180) {
      this.setData({
        activeIndex: 1,
      })
    }
    if (dis > 2180 && dis < 2785) {
      this.setData({
        activeIndex: 3,
      })
    }
    if (dis > 2785 && dis < 2879) {
      this.setData({
        activeIndex: 4,
      })
    }
    if (dis > 2879 && dis < 4287) {
      this.setData({
        activeIndex: 5,
      })
    }
    if (dis > 4287 && dis < 4454) {
      this.setData({
        activeIndex: 6,
      })
    }
    if (dis > 4454 && dis < 4986) {
      this.setData({
        activeIndex: 7,
      })
    }
    if (dis > 4986) {
      this.setData({
        activeIndex: 8,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  selectInfo: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    this.setData({
      showModalStatus: !this.data.showModalStatus,
      currentType: type,
      currentIndex: index,
      sizeIndex: 0,
      sugarIndex: 0,
      temIndex: 0
    });
  },

  chooseSE: function (e) {
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    if (type == 0) {
      this.setData({
        sizeIndex: index
      });
    }
    if (type == 1) {
      this.setData({
        sugarIndex: index
      });
    }
    if (type == 2) {
      this.setData({
        temIndex: index
      });
    }
  },

  addToCart: function () {
    var a = this.data
    var addItem = {
      "name": a.listData[a.currentType].goods[a.currentIndex].name,
      "price": a.listData[a.currentType].goods[a.currentIndex].price,
      "detail": a.size[a.sizeIndex] + "+" + a.sugar[a.sugarIndex] + "+" + a.tem[a.temIndex],
      "number": 1,
      "sum": a.listData[a.currentType].goods[a.currentIndex].price,
    }
    var sumMonney = a.sumMonney + a.listData[a.currentType].goods[a.currentIndex].price;
    var cartList = this.data.cartList;
    cartList.push(addItem);
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMonney: sumMonney,
      cupNumber: a.cupNumber + 1
    });
    console.log(this.data.cartList)
  },
  showCartList: function () {
    console.log(this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }

  },
  clearCartList: function () {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0
    });
  },
  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price;
    cartList[index].sum += cartList[index].price;

    this.setData({
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber + 1
    });
  },
  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;

    var sum = this.data.sumMonney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber - 1
    });
  },
  goBalance: function () {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMonney', this.data.sumMonney);
      wx.setStorageSync('cupNumber', this.data.cupNumber);
      wx.navigateTo({
        url: '../balance/balance'
      })
    }
  },

  /**
   * 清空购物车
   */
  clearCupNumber: function () {
    this.data.cupNumber = 0;
  },

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

  }
})