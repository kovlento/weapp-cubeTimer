//index.js
const util = require('../../utils/util.js')

Page({
  data: {
    timer: "00:00",
    isRunning:false,

  },
  onLoad: function () {
    
  },
  onShow:function(){
   
  },
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function (e) {
      this.endTime = e.timeStamp;
    },
  bindTap: function (e) {
      if (this.endTime - this.startTime < 350) {
        // clear timer
        this.timers && clearInterval(this.timers);
        console.log("点击")
      }
  },
  bingLongTap: function (e) {
    this.formatTime(this);
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
  }
})


