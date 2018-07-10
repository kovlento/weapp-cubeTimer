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
    this.timeAo5();
    this.timeAo12();
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
  },
  timeAo5:function(){
    let that = this;
    let score = wx.getStorageSync('scores');
    let newArr = this.filter_array(score);
    let arr1 = [];
    if (score != '') {
      newArr.forEach(function (item) {
        let items = item.replace(':', '.')
        arr1.push(items)
      });
      let arr2 = (arr1.map(Number)).reverse();
      console.log(arr2);
      if (arr2 != '' && arr2.length>4) {
        let sum = arr2.length - 4;
        for (let j = 0; j < sum;j++){
          let totalTime = 0;
          for (let i = j; i < j+5; i++) {
            totalTime = (arr2[i] * 1000) - 0 + totalTime;
          }
          let ao5 = (totalTime / 5000).toString();
          console.log(ao5);
          let tofixao5 = parseFloat(ao5).toFixed(2);
          console.log(tofixao5);
          let ao51 = tofixao5.replace('.', ':');
          let ao52 = ao51.split(':');
          let trueAo5 = that.toDub(ao52[0]) + ':' + ao52[1];
          console.log(trueAo5);
          // let obj = {};
          // obj.ao5Times = trueAo5
          // array.push(obj);
          let array = this.data.scores
          console.log(array);
          array[j].ao5Times = trueAo5;
          this.setData({
            scores: array
          })
        }
      }
    }
  },
  timeAo12: function () {
    let that = this;
    let score = wx.getStorageSync('scores');
    let newArr = this.filter_array(score);
    let arr1 = [];
    if (score != '') {
      newArr.forEach(function (item) {
        let items = item.replace(':', '.')
        arr1.push(items);
      });
      let arr2 = (arr1.map(Number)).reverse();
      console.log(arr2);
      if (arr2 != '' && arr2.length > 11) {
        let sum = arr2.length - 11;
        for (let j = 0; j < sum; j++) {
          let totalTime = 0;
          for (let i = j; i < j + 12; i++) {
            totalTime = (arr2[i] * 1000) - 0 + totalTime;
          }
          let ao12 = (totalTime / 12000).toString();
          console.log(ao12);
          let tofixao5 = parseFloat(ao12).toFixed(2);
          console.log(tofixao5);
          let ao51 = tofixao5.replace('.', ':');
          let ao52 = ao51.split(':');
          let trueAo12 = that.toDub(ao52[0]) + ':' + ao52[1];
          console.log(trueAo12);
          // let obj = {};
          // obj.ao5Times = trueAo5
          // array.push(obj);
          let array = this.data.scores
          console.log(array);
          array[j].ao12Times = trueAo12;
          this.setData({
            scores: array
          })
        }
      }
    }
  },
  toDub: function (n) {
    return n < 10 ? "0" + n : "" + n;
  },
})