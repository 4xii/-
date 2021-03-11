// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "detailsList": [],
    //购物车数量
    totalNum: 0
  },
  //跳转首页
  toIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  //跳转购物车
  toCart: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  //取消或收藏商品

  //加入购物车
  addCar: function () {
    var carList = wx.getStorageSync('carList')
    var num = 0;
    if (carList.length == 0) {
      //1.购物车没有商品
      wx.setStorageSync('carList', this.data.detailsList)
      num++
    } else {
      //2.购物车中有商品
      var isTrue = true;
      console.log(carList[0].id);
      for (let i = 0; i < carList.length; i++) {
        if (carList[i].id == this.data.detailsList[0].id) {
          console.log(1);
          //当前商品数量加1
          carList[i].num++
          //更新缓存数据
          wx.setStorageSync('carList', carList)
          isTrue = false;
        }
        if (isTrue) {
          carList.unshift(this.data.detailsList[0])
          //更新缓存
          wx.setStorageSync('carList', carList)
        }
        //计算总数
      }
      for (let j = 0; j < carList.length; j++) {
        num += carList[j].num
      }
    }
    this.setData({
      totalNum: num
    })
  },
  //立即购买
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var carList = wx.getStorageSync('carList')
    //初始商品数量
    var num = 0;
    //计算商品总数
    if (carList.length != 0) {
      for (let i = 0; i < carList.length; i++) {
        num += carList[i].num
      }
    }
    this.setData({
      detailsList: wx.getStorageSync('detailsList'),
      totalNum: num
    })

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