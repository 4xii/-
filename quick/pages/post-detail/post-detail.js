// pages/post-detail/post-detail.js
import {postList} from '../../data/data.js'
const app = getApp()
console.log(app.test);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{},
    collected:false,
    _pid:null,
    _postsCollected:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[options.pid]
    this.data._pid = options.pid;
    const postsCollected = wx.getStorageSync('posts_collected')
    this.data._postsCollected = postsCollected
    let collected = postsCollected[this.data._pid]

    if(collected === undefined){
      collected = false
    }
    console.log(collected);
    this.setData({
      postData,
      collected
    })
  },

  onMusic(event){
    const mgr = wx.getBackgroundAudioManager()
    mgr.src = postList[0].music.url
    mgr.title = postList[0].music.title
    console.log(postList[0].music.url);
  },

  async onShare(event){
    const result = await wx.showActionSheet({
      itemList:['分享到QQ','分享到微信','分享到朋友圈']
    })
    console.log(result);
  },

  onCollect(event){
    //假设 未收藏 => 收藏
    //数据结构 多篇文章是否被收藏
    //轻提示
    const postsCollected = this.data._postsCollected
    postsCollected[this.data._pid] = !this.data.collected;
    this.setData({
      collected :!this.data.collected
    })
    wx.setStorageSync('posts_collected', postsCollected)

    wx.showToast({
      title: this.data.collected?'收藏成功':'取消收藏',
      duration:3000
    })

    //强提示
    /* const result =await wx.showModal({
      title:'是否收藏文章',
    })
    if(result.confirm){
     //假设 未收藏 => 收藏
     //数据结构 多篇文章是否被收藏
     const postsCollected = this.data._postsCollected
     postsCollected[this.data._pid] = !this.data.collected;
     this.setData({
       collected :!this.data.collected
     })
     wx.setStorageSync('posts_collected', postsCollected)
    } */
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