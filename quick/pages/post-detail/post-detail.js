// pages/post-detail/post-detail.js
import {postList} from '../../data/data.js'
const app = getApp();
console.log(app.test);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{},//文章信息
    collected:false,//控制收藏状态显示
    isPlaying:false,//控制音乐播放暂停
    _pid:null,//当前文章序号
    _postsCollected:{},//储存收藏内容
    _mgr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[options.pid];
    this.data._pid = options.pid;
    const postsCollected = wx.getStorageSync('posts_collected');
    this.data._postsCollected = postsCollected;
    let collected = postsCollected[this.data._pid];

    if(collected === undefined){
      //说明文章没有被收藏过
      collected = false
    }
    console.log(collected);
    this.setData({
      postData,
      collected,
      isPlaying:this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager();
    this.data._mgr = mgr;
    mgr.onPlay(this.onMusicStart);
    mgr.onPause(this.onMusicStop);
  },

  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic && app.gIsPlayingPostId === this.data._pid){
        return true
    }
    return false
  },

  onMusicStart(event){
    const mgr = this.data._mgr;
    const music = postList[this.data._pid].music;
    mgr.src = music.url;
    mgr.title = music.title;
    mgr.coverImgUrl = music.coverImg;

    //全局播放状态
    app.gIsPlayingMusice = true
    app.gIsPlayingPostId = this.data._pid

    this.setData({
      isPlaying:true
    })
  },
  onMusicStop(event){
    const mgr = this.data._mgr;
    mgr.pause();
    app.gIsPlayingMusice = false;
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
    })
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