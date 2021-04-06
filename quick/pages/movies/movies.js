// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:[],//正在上映
    comingSoon:[],//即将上映
    top250:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //正在上映
    wx.request({
      url: 'http://t.talelin.com/v2/movie/in_theaters?start=6&count=3',
      success:(res)=>{
        this.setData({
          inTheaters:res.data.subjects
        })
      }
    })
    //即将上映
    wx.request({
      url: 'http://t.talelin.com/v2/movie/coming_soon?start=1&count=3',
      success:(res)=>{
        this.setData({
          comingSoon:res.data.subjects
        })
      }
    })

    wx.request({
      url: 'http://t.talelin.com/v2/movie/top250?start=6&count=3',
      success:(res)=>{
        this.setData({
          top250:res.data.subjects
        })
      }
    })
  },

  onGotoMore(event){
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url:'/pages/more-movie/more-movie?type='+type
    })
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