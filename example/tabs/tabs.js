//index.js
//获取应用实例
var app = getApp();
Page({
  rules: [125, 115.5, 92.2, 110.5, 98, 87.5, 134, 76.5, 7, 7, 172, 302, 304.5, 62, 315],
  LatConfig: [1, -1],
  data: {
    array1: ['中星6A-125°E','中星6B-115.5°E', '中星9号-92.2°E','中星10号-110.5°E','中星11号-98°E','中星12号-87.5°E', '亚太6号-134°E', '亚太7号-76.5°E','E7A-7°E','E7B-7°E','E172-172°E','IS21-302°E','IS34-304.5°E', 'IS39-62°E', 'IS14-315°E'],
    array2: ['N-北纬','S-南纬'],
    array3: ['E-东经', 'W-西经'],
    index1: 0,
    index2: 0,
    index3: 0,
    score1: 0,
    score2: 0,
    Lat: 0,
    Lon: 0,
    shipHead: 0,
    left_init: 0,
    right_init: 0,
    shadowCondition: '无固定遮挡',
    location_lat: 0,
    location_lon: 0,
    hasLocation:false
  },
  onLoad: function () {

  },

  bindSatPickerChange: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindLatPickerChange: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  bindLonPickerChange: function (e) {
    this.setData({
      index3: e.detail.value
    })
  },
  LatInput: function (e) {
    this.setData({
      Lat: e.detail.value
    })
  },
  LonInput: function (e) {
    this.setData({
      Lon: e.detail.value
    })
  },
  ShipHead_direction: function (e) {
    this.setData({
      shipHead: e.detail.value
    })
  },
  a1: function (e) {
    this.setData({
      left_init: e.detail.value
    })
  },
  a2: function (e) {
    this.setData({
      right_init: e.detail.value
    })
  },

  //获取当前位置所在地的经纬度
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location_lat: res.latitude.toFixed(3),
          location_lon: res.longitude.toFixed(3),
          Lat: res.latitude.toFixed(3),
          Lon:res.longitude.toFixed(3)
        })
      }
    })
  },

  calculateBtn: function (e) {
    if (!this.data.Lat) {
      wx.showToast({
        title: '请输入纬度'
      })
      return false;
    }

    if (!this.data.Lon) {
      wx.showToast({
        title: '请输入经度'
      })
      return false;
    }

    this.calculate1();
    this.calculate2();
    this.shadowConditionCalculate();
  
  },
  
  //计算方位角度
  calculate1: function () {
    let score1 = 0;
    let Lon = ((this.data.Lon-this.rules[this.data.index1])*Math.PI)/180;
    let Lat = this.data.Lat*this.LatConfig[this.data.index2]*Math.PI/180;
    if(Lat>0){
      score1=Math.PI+Math.atan(Math.tan(Lon)/Math.sin(Lat));
    }else if(Lat<0){
        if(Lon>0)
          score1=Math.PI*2+Math.atan(Math.tan(Lon)/Math.sin(Lat));
          else{
          score1=Math.atan(Math.tan(Lon)/Math.sin(Lat));
        }
      }else{
        if(Lon>0){
          score1=Math.PI*1.5;
        }else
        score1=Math.PI*0.5;
      }
    this.setData({
      score1: (score1*180/Math.PI).toFixed(2)
      })
  },
  //计算俯仰角度
  calculate2: function () {
    let score2 = 0;
    let Lon = ((this.data.Lon-this.rules[this.data.index1])*Math.PI)/180;
    let Lat = this.data.Lat*this.LatConfig[this.data.index2]*Math.PI/180;
    score2 = Math.atan((Math.cos(Lat)*Math.cos(Lon)-0.151)/(Math.sqrt(1-(Math.pow(Math.cos(Lat)*Math.cos(Lon),2)))));
    this.setData({
      score2: (score2*180/Math.PI).toFixed(2)
    })
  },
  
  //遮挡情况计算
  shadowConditionCalculate: function () {
    let left = Number(this.data.left_init) + Number(this.data.shipHead);
    let right = Number(this.data.right_init) + Number(this.data.shipHead);
    var shadowCondition = " ";
    if(left<360 && right<=360){
            if(this.data.score1<=right && this.data.score1>=left){
              shadowCondition = "遮挡";
            }else{
              shadowCondition = "无固定遮挡";
            }
          }else if(left<360 && right>360){
            right -= 360;
            if(left<this.data.score1 && this.data.score1<=360){
              shadowCondition = "遮挡";
            }else if(this.data.score1>=0 && this.data.score1<= right){
              shadowCondition = "遮挡";
            }else
            shadowCondition = "无固定遮挡";
          }else{
            left -= 360;
            right -= 360;
            if(this.data.score1<=right && this.data.score1>=left){
              shadowCondition = "遮挡";
            }else{
              shadowCondition = "无固定遮挡";
            }
          }
    this.setData({
      shadowCondition: shadowCondition
    })
  },
})
