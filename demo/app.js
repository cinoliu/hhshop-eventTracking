 import Tracker from './libs/eventTracking/eventTracking';

import trackConfig from './tracks/index';
// import Tracker from './libs/track/index';

new Tracker({ tracks: trackConfig });


App({
  onLaunch: function (options) {
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })  },
  getWxLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
       console.log(res)
        },
        fail: res => {
          wx.showToast({
            title: "系统繁忙，请稍后再试!",
            icon: 'none',
            duration: 2000,
            mask: true
          })
          reject(res);
        }
      })
    })
  },
});
