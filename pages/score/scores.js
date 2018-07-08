// pages/score/scores.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    revert:'0/0',
    fastest:'00:00',
    scores:[],
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
    let array = [];
    let score = wx.getStorageSync('scores');
    console.log(score);
    if(score!=''){
      var scoreArr = score.reverse();
      for (let i = 1; i < scoreArr.length; i++) {
        let obj = {};
        obj.times = score[i]
        array.push(obj);
      }
      console.log(array);
      this.setData({
        scores: array
      })
    }
    this.refreshRevert();
    this.refreshFastest();
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
  refreshRevert:function(){
    var that = this;
    let score = wx.getStorageSync('scores');
    if(score!=''){
      console.log(score.length);
      this.setData({
        revert: score.length - 1 + '/' + (score.length - 1)
      })
    }
  },
  refreshFastest:function(){
    let score = wx.getStorageSync('scores');
    let newArr = this.filter_array(score);
    let arr1 = [];
    if (score != '') {
      newArr.forEach(function (item) {
        let items = item.replace(':','')
        arr1.push(items)
      });
      let arr2 = arr1.map(Number)
      let indexs = this.indexOfSmallest(arr2);
      this.setData({
        fastest: newArr[indexs]
      })
    }
    
  },
  filter_array:function(array) {  
    return array.filter(item => item); 
  },
  indexOfSmallest:function(a) {
    return a.indexOf(Math.min.apply(Math, a));
  }
})