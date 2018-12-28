// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "/images/home/lunbotu7.jpg",
      "/images/home/lunbotu6.jpg",
      "/images/home/lunbotu3.jpg",
      "/images/home/lunbotu2.jpg",
    ],
    tuijian:[
      {
        id:0,
        price:23,
        details:'详情详情详情详情详情详情详情详情详情详情',
        images:"/images/goods/good1.png",
        title:'推荐商品1推荐商品1推荐商品1推荐商品1推荐商品1推荐商品1'
      },
      {
        id: 1,
        price: 223,
        details: '详情详情详情详情详情详情详情详情详情详情',
        images: "/images/goods/good1.png",
        title: '推荐商品2'
      },
      {
        id: 2,
        price: 823,
        details: '详情详情详情详情详情详情详情详情详情详情',
        images: "/images/goods/good1.png",
        title: '推荐商品3'
      },
      {
        id: 3,
        price: 623,
        details: '详情详情详情详情详情详情详情详情详情详情',
        images: "/images/goods/good1.png",
        title: '推荐商品4'
      },
    ],
    autoplay: true,
    interval: 3700,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",
    currentSwiper: 0,
    circular: true,//使用衔接滑动
  },

  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },

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
    wx.setNavigationBarTitle({
      title: '商城首页'
    });
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 600)//刷新时间
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 点击搜索跳转到搜索界面
   */
  bindSearch() {
    wx.navigateTo({
      //保留当前页面跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面
      url: '../search/search',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})