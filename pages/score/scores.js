// pages/score/scores.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    revert:'0/0',
    fastest:'00:000',
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
    if(score!=''){
      var scoreArr = score.reverse();
      for (let i = 1; i < scoreArr.length; i++) {
        let obj = {};
        obj.times = score[i]
        array.push(obj);
      }
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
        let items = item.replace(/:/g,'');
        arr1.push(items)
      });
      let arr2 = arr1.map(Number);
      console.log(arr2);
      let indexs = this.indexOfSmallest(arr2);
      this.setData({
        fastest: newArr[indexs]
      })
    }
    
  },
  filter_array:function(array) {
    if(array!=''){
      return array.filter(item => item);
    }  
  },
  indexOfSmallest:function(a) {
    return a.indexOf(Math.min.apply(Math, a));
  },
  timeAo5:function(){
    let n = 5, _that = this;
    this.avgCommon(n, _that);
  },
  timeAo12: function () {
    let n = 12,_that = this;
    this.avgCommon(n,_that);
  },
  avgCommon:function(n,_that){
    let that = _that;
    let score = wx.getStorageSync('scores');
    let newArr = this.filter_array(score);
    let arrs = newArr.reverse();
    let arr1 = [],arr2=[];
    if (score != '') {
      console.log(arrs);
      arrs.forEach(function (item) {
        let items = item.split(':');
        console.log(items);
        let sumItem='';
        if (items.length==3){
          sumItem = parseInt(items[0]) * 60000 + parseInt(items[1]) * 1000 + parseInt(items[2]);
        }else if(items.length==2){
          sumItem =parseInt(items[0]) * 1000 + parseInt(items[1]);
        }
        arr2.push(sumItem);
      });
      console.log(arr2);
      // let arr2 = (arr1.map(Number)).reverse();
      // console.log(arr2);
      if (arr2 != '' && arr2.length > n-1) {
        let sum = arr2.length - (n - 1);
        for (let j = 0; j < sum; j++) {
          let totalTime = 0;
          for (let i = j; i < j + n; i++) {
            totalTime = arr2[i]  + totalTime;
          };
          let timesavg = totalTime/5;
          let m='',s='',ms='',ism='',iss='',isms='',avg='';
          console.log(timesavg);
          if (parseInt(timesavg / 60000)>0){
            m = parseInt(timesavg / 60000);
            ism = timesavg % 60000;
            if (parseInt(ism / 1000)>0){
              s = parseInt(ism / 1000);
              iss = timesavg % 1000;
              avg = that.toDub(m)+':'+that.toDub(s)+':'+iss
            }else{
              avg = that.toDub(m) + ':00' + ':' + ism
            }
          } else if (parseInt(timesavg / 60000)==0){
            if (parseInt(timesavg / 1000) > 0) {
              console.log(11111111);
              s = parseInt(timesavg / 1000);
              iss = timesavg % 1000;
              avg =  that.toDub(s) + ':' + iss;
            } else {
              avg = '00' + ':' + timesavg
            }
          }
          let array = this.data.scores;
          if(n===5){
            array[j].ao5Times = avg;
          }else if(n===12){
            array[j].ao12Times = avg;
          }
          console.log(array);
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