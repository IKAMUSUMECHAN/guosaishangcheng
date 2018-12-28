// pages/shoppingCart/shoppingCart.js
var app = getApp();
const orginalPrice = 0; //由于0.00在赋值时是0，用toFixed()取余
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shoppingcartgoods: [
      {
        id: 0,
        business: 'business1',
        price: 23,
        images: "/images/goods/good1.png",
        title: '推荐商品1推荐商品1推荐商品1推荐商品1推荐商品1推荐商品1'
      },
      {
        id: 1,
        business: 'business2',
        price: 223,
        images: "/images/goods/good1.png",
        title: '推荐商品2'
      },
      {
        id: 2,
        business: 'business1',
        price: 823,
        images: "/images/goods/good1.png",
        title: '推荐商品3'
      },
      {
        id: 3,
        business: 'business2',
        price: 623,
        images: "/images/goods/good1.png",
        title: '推荐商品4'
      },
    ],

    hasList: false, // 列表是否有数据
    totalPrice: orginalPrice.toFixed(2), // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认不全选

    isMyCartShow: false,
    userId: '',
    myCartGoodLength: '5',//购物车长度
    goodPrice: 0, //物品价格
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
    var that = this;
    var userId = that.data.userId;
    var hasList = that.data.hasList;
    try {
      var value = wx.getStorageSync('userIdSync')
      if (value) {
        console.log(value); //同步得到userId的值
        that.setData({
          userId: value
        })
      }
    } catch (e) {
      console.log(0);
    }
    this.getGoodCartList()
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
    // 动态设置导航条标题
    wx.setNavigationBarTitle({
      title: '购物车'
    });
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.getGoodCartList()
  },

  //计量总价
  getTotalPrice() {
    let shoppingcartgoods = this.data.shoppingcartgoods; // 获取购物车列表
    let goodPrice = parseFloat(this.data.goodPrice);//初始化物品总价格
    let total = 0.00;
    for (let i = 0; i < shoppingcartgoods.length; i++) { // 循环列表得到每个数据
      if (shoppingcartgoods[i].selected) { // 判断选中才会计算价格
        total += parseFloat(shoppingcartgoods[i].price); // 所有价格加起来
      }
    }
    this.setData({
      goodPrice: total.toFixed(2)
    })
    this.setData({ // 最后赋值到data中渲染到页面
      shoppingcartgoods: shoppingcartgoods,
      totalPrice: total.toFixed(2) //保留小数后面2两位
    });
  },

  getGoodCartList() {
    console.log(1);
    var that = this;
    //var url = app.globalData.huanbaoBase + 'getbooksbystudentid.php'
    var ismyCartShow = that.data.ismyCartShow;
    var shoppingcartgoods = that.data.shoppingcartgoods;
    var myCartGoodLength = that.data.myCartGoodLength;
    var userId = that.data.userId;
    console.log( myCartGoodLength);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500,
    })
  },

 

  //选择事件
  selectList(e) {
    let that = this;
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    console.log(index);

    let selectAllStatus = that.data.selectAllStatus; //是否已经全选
    let str = true;  //用str与每一项进行状态判断
    let shoppingcartgoods = that.data.shoppingcartgoods;                    // 获取购物车列表
    const selected = shoppingcartgoods[index].selected;         // 获取当前商品的选中状态
    shoppingcartgoods[index].selected = !selected;              // 改变状态
    that.setData({
      shoppingcartgoods: shoppingcartgoods
    });
    
    that.getTotalPrice();                           // 重新获取总价

    for (var i = 0; i < shoppingcartgoods.length; i++) {
      str = str && shoppingcartgoods[i].selected;           //用str与每一项进行状态判断
    }

    if (str === true) {
      that.setData({
        selectAllStatus: true
      })
    } else {
      that.setData({
        selectAllStatus: false
      })
    }
  },

  //全选事件
  selectAll(e) {
    var that = this;
    let selectAllStatus = that.data.selectAllStatus;    // 是否全选状态
    let shoppingcartgoods = that.data.shoppingcartgoods;
      selectAllStatus = !selectAllStatus;
      for (let i = 0; i < shoppingcartgoods.length; i++) {
        shoppingcartgoods[i].selected = selectAllStatus;            // 改变所有商品状态
      }
      that.setData({
        selectAllStatus: selectAllStatus,
        shoppingcartgoods: shoppingcartgoods
      });
      that.getTotalPrice();                               // 重新获取总价
      if (shoppingcartgoods.length === 0) { //当没有物品时，不能再点“全选”
        wx.showModal({
          title: '提示',
          content: '购物车是空的哦',
          success: function (res) {   //模糊层成功出来后
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                selectAllStatus: false
              })
            } else {
              console.log('用户点击取消')
              that.setData({
                selectAllStatus: false
              })
            }
          },
        })
      }
  },

  //删除商品
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    var selectAllStatus = this.data.selectAllStatus;
    let shoppingcartgoods = this.data.shoppingcartgoods;
    let totalPrice = this.data.totalPrice;
    wx.showModal({
      title: '提示',
      content: '将此产品移除购物车？',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定')
          shoppingcartgoods.splice(index, 1);              // 删除购物车列表里这个商品
          this.setData({
            shoppingcartgoods: shoppingcartgoods
          });
          if (shoppingcartgoods.length == 0) {                  // 如果购物车为空
            this.setData({
              hasList: false,             // 修改标识为false，显示购物车为空页面
              selectAllStatus: false,
              totalPrice: orginalPrice.toFixed(2)              //此时价格为0
            });
          } else {                              // 如果不为空
            this.getTotalPrice();           // 重新计算总价格
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})