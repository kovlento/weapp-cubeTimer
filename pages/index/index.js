//index.js
const util = require('../../utils/util.js')
Page({
  data: {
    timer: "00:000",
    isRunning:false,
    color:'black',
    tips:'长按屏幕任意位置离开后开始计时',
    showTips:true,
    showModalStatus: false
  },
  preventTouchMove: function (e) {
    //阻止mask出现后点击屏幕
  },
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function (e) {
      let that = this
      this.endTime = e.timeStamp;
      if (this.endTime - this.startTime < 350) {
        // clear timer
        this.timers && clearInterval(this.timers);
      } else if (this.data.showTips == true && that.data.showModalStatus == false){
        this.formatTime(this);
        this.setData({
          showTips: false
        });
      }
  },
  bindTap: function (e) {
    if (this.data.isRunning == true && this.data.showModalStatus == false){
      this.timers && clearInterval(this.timers);
      console.log("点击");
      this.setData({
        isRunning: false,
        showModalStatus: true
      });
    }
  },
  bindLongPress: function (e) {
    if (this.data.isRunning == false && this.data.showModalStatus == false){
      console.log("长按");
      this.setData({
        color: '#04BF02',
        isRunning: true,
      });
    }
  },
  timeUp:function (callback){
    let _this =this
    let n = 0, timeee = '';
    let hour, minute, second;//时 分 秒
    hour = minute = second = 0;//初始化
    let millisecond = 0;//毫秒
    _this.timers = setInterval(function () {
      millisecond = millisecond + 50;
      if (millisecond >= 1000) {
        millisecond = 0;
        console.log(millisecond);
        second = second + 1;
      }
      if (second >= 60) {
        second = 0;
        minute = minute + 1;
      }
      if (minute >= 60) {
        minute = 0;
        hour = hour + 1;
      }
      if ( minute == 0 && second<60){
        timeee = _this.toDub(second) + ':' + _this.toDus(millisecond)
      }else{
        timeee = _this.toDub(minute) + ':' + _this.toDub(second) + ':' + _this.toDus(millisecond);
      }
      callback(timeee);
    }, 50);
  },
  formatTime:function (that){
    this.timeUp(function (val) {
      that.setData({
        timer: val
      });
    })
  },
  toDub:function (n) {
    return n < 10 ? "0" + n : "" + n;
  },
  toDus: function (n) {
   if(n>=50&&n<100){
      n ="0" + n
   }else if(n>100&&n<1000){
     n = "" + n
   }else if(n==0){
     n = "00" + n
   }
   return n;
  },
  powerRestart: function(){
    console.log('重新开始');
    this.setData({
      timer: "00:000",
      isRunning: false,
      color: 'black',
      tips: '长按屏幕任意位置离开后开始计时',
      showTips: true,
      showModalStatus: false
    });
  },
  powerGood: function(){
    console.log('无惩罚');
    let time = this.data.timer;
    this.setData({
      showModalStatus: false,
      isRunning: false,
      color: 'black',
      showTips: true,
      timer: time
    });
    this.passData(time)
  },
  powerDnf: function(){
    console.log('DNF');
    this.setData({
      showModalStatus: false
    });
  },
  powerAddSecond: function(){
    let newTime = '';
    let time = this.data.timer;
    let strs = time.split(":"); //字符分割
    if(strs.length==2){
      newTime = this.toDub(strs[0] - 0 + 2) + ':' + strs[1]; 
    }else if(strs.length==3){
      newTime = strs[0]+':'+this.toDub(strs[1] - 0 + 2) + ':' + strs[2]; 
    }  
      
    this.setData({
      showModalStatus: false,
      isRunning: false,
      color:'black',
      showTips: true,
      timer: newTime
    });
    this.passData(newTime)
  },
  clearTab:function(){
    wx.setTabBarItem({
      index: 0,
      text: '',
      iconPath: '',
      selectedIconPath: ''
    })
  },
  addTab:function(){
    wx.setTabBarItem({
      index: 0,
      text: '计时',
      iconPath: 'images/time.png',
      selectedIconPath: 'images/timeActive.png'
    }, {
        index: 1,
        text: '成绩',
        iconPath: 'images/manage.png',
        selectedIconPath: 'images/manageActive.png'
      })
  },
  passData: function (newTime){
    let sarray = wx.getStorageSync('scores');
    sarray += newTime + ','
    let data = sarray.split(',');
    wx.setStorageSync('scores', data)
  }
})


