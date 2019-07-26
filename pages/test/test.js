Page({
  data: {
    "bnrUrl": [{
      "url": "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640"
    }, {
        "url": "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
    }, {
        "url": "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
    }],
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 两个表单函数
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

  /**
   * 请求服务器
   */
  doRequest: function () {
    wx.request({
      url: 'https://www.qianzhuli.top/wx/test', //仅为示例，并非真实的接口地址
      data: {
        x: '10',
        y: '20'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  }
});
