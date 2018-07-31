//index.js
const util = require('../../utils/util.js')
Page({
  data: {
    timer: "00:000",
    isRunning:false,
    color:'black',
    tips:'长按屏幕任意位置离开后开始计时',
    formula:'',
    showTips:true,
    showFormula:true,
    showModalStatus: false
  },
  preventTouchMove: function (e) {
    //阻止mask出现后点击屏幕
  },
  onReady:function(){
    let formula = this.randomFormula();
    this.setData({
      formula: formula
    });
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
          showTips: false,
          showFormula:false
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
    let formula = this.randomFormula();
    this.setData({
      timer: "00:000",
      isRunning: false,
      color: 'black',
      tips: '长按屏幕任意位置离开后开始计时',
      showTips: true,
      showModalStatus: false,
      showFormula:true,
      formula: formula
    });
  },
  powerGood: function(){
    console.log('无惩罚');
    let time = this.data.timer;
    let formula = this.randomFormula();
    this.setData({
      showModalStatus: false,
      isRunning: false,
      color: 'black',
      showTips: true,
      showFormula:true,
      formula: formula,
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
    let formula = this.randomFormula();
    this.setData({
      showModalStatus: false,
      isRunning: false,
      color:'black',
      showTips: true,
      showFormula:true,
      formula: formula,
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
  },
  randomFormula:function(){
    let item = Math.floor(Math.random() * 19);
    let formulArr = [
      "L2 R2 F D' U R' D U L2 R D U2 B2 F L' D2 U L' R' U' L2 D U L' F",
      "L R D2 U' F D' U2 L2 R D U' B D2 R B L2 D' U' F U' L R' D' U' B",
      "L B2 L' R D' U L' D' B' D' L2 D2 L' R D U2 B F2 U B D F U L' R",
      "B L R' D' U F2 D' U B' F' U R D2 U B D2 F' U' L' D2 F2 U2 B2 U L",
      "D' R' U' L B' L R B' F2 U B2 D B' F' L2 D2 L2 D F2 R' D2 U' F2 R' D",
      "R2 U2 B' U' B' F L2 R2 B' U B' D2 U2 L D' U L' R' D U2 R D2 B2 R' D'",
      "B' L' R B2 D' U2 L' R B' F U2 L B' U' F2 U2 R B2 F' D2 L2 R D2 F2 L",
      "U2 L D' U2 F D2 U B' U' L' R' U L' D2 U2 F' R' F' R F' D2 L2 B2 F2 L'",
      "B2 L' R' D R' B2 U2 F2 L B2 F2 L2 B' L2 F2 U2 L R2 B F' U' R2 B2 D' L",
      "L2 D U2 B' F U2 B R U' L2 R' D2 B2 D2 U' B F2 R2 B' F L2 B' F' L R2",
      "L2 R2 B' D U2 B D' U R B' D U L R2 B2 D U2 B' L R' D' B' F' D U",
      "U B F2 D' U' B' D F' R B' D2 F2 D2 U L R2 F U' L R2 D R' D L2 R2",
      "B' D2 U' R2 D B' F2 L2 R B D' L2 D U L D2 U' B' F D' U R' B2 F2 R'",
      "R U L' R2 F' L B' U2 R B F D2 R2 F2 L D2 L2 R' D U' R' B F2 L2 R2",
      "F L D2 U F L2 R B L D' F2 D2 U2 L' B' F' R F' L R2 B' F2 D' U R",
      "D2 U' L' B' L2 F' U L' R' B F L' R D2 R' D2 U R2 B2 L' B F2 L2 R2 D2",
      "L B' D2 U B U' F L2 U2 F2 U2 B2 R U2 R' F U2 L B2 D' L2 R B' F2 L2",
      "U B' F2 D U2 B2 U B' F R' B R' F2 R' D2 U2 B F L R2 F' L' U F2 D",
      "B2 D2 U' F2 R' B U' B2 F' L' R2 D2 B2 U2 L2 R' B' F L R D' F L' F2 D'",
    ]

    return formulArr[item];
  }
})


