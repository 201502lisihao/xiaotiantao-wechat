Page({
  data: {
    "bnrUrl": [{
      "url": "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640"
    }, {
        "url": "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
    }, {
        "url": "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
    }],
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    //地图
    markers: [{
      iconPath: "/images/icons/index.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/icons/index.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
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
      url: 'https://www.qianzhuli.top/wx/test?id='+1, //仅为示例，并非真实的接口地址
      success(res) {
        console.log(res.data)
      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
});
