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
        this.setData({
          timer: '00:00'
        });
        console.log("点击")
      }
    },
  bingLongTap: function (e) {
      formatTime(this);
    }
  })
const timeUp = (callback) => {
  clearInterval(timers);
  let n = 0, timeee = '';
  setInterval(function () {
    n++;
    let m = parseInt(n / 60);
    let s = parseInt(n % 60);
    timeee = toDub(m) + ":" + toDub(s);
    callback(timeee);
  }, 1000 / 60);
}
const formatTime =(that)=> {
  timeUp(function(val){
     that.setData({
       timer: val
     });
  })
}
const toDub = (n) => {
  return n < 10 ? "0" + n : "" + n;
}

