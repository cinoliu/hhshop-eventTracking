
Page({
    /**
     * 页面的初始数据
     */
    data: {
        film: {},
     
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.getDetail(options)
    },
 
   
    getDetail(options) {
        this.setData({
            film:{
                filmId: 21,
                name: "测试1",
                grade: "8.3",

            }
            
        })
    },
    buy() {
        wx.showModal({
            title: '提示',
            content: '是否购买',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          

    }
});