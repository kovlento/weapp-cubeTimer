//index.js
const util = require('../../utils/util.js')

Page({
  data: {
    timer: "00:00",
    isRunning:false,
    color:'black',
    tips:'长按屏幕任意位置离开后开始计时',
    showTips:true,
    showModalStatus: false
  },
  onLoad: function () {
    
  },
  onShow:function(){
   
  },
  preventTouchMove: function (e) {
    //阻止mask出现后点击屏幕
  },
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function (e) {
      this.endTime = e.timeStamp;
      if (this.endTime - this.startTime < 350) {
        // clear timer
        this.timers && clearInterval(this.timers);
      } else {
        this.formatTime(this);
        this.setData({
          showTips: false
        });
        console.log(this.data.showTips);
      }
  },
  bindTap: function (e) {
    this.timers && clearInterval(this.timers);
    console.log("点击")
    this.setData({
      showModalStatus: true
    });
  },
  bindLongPress: function (e) {
     console.log("长按");
     this.setData({
       color: '#04BF02',
     });
  },
  timeUp:function (callback){
    let _this =this
    let n = 0, timeee = '';
    _this.timers = setInterval(function () {
      n++;
      let m = parseInt(n / 60);
      let s = parseInt(n % 60);
      timeee = _this.toDub(m) + ":" + _this.toDub(s);
      callback(timeee);
    }, 1000 / 60);
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
  powerRestart: function(){
    console.log('重新开始');
    this.setData({
      showModalStatus: false
    });
  },
  powerGood: function(){
    console.log('无惩罚');
    this.setData({
      showModalStatus: false
    });
  },
  powerDnf: function(){
    console.log('DNF');
    this.setData({
      showModalStatus: false
    });
  },
  powerAddSecond: function(){
    console.log('+2');
    this.setData({
      showModalStatus: false
    });
  }
})


