const apis = require('../../utils/apis.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [],
        playingFilms: [],

        test: {
            name: 'zgr'
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getBanner();
        this.getText()


    },
    getBanner() {
        this.setData({
            bannerList: [{
                    bannerId: 1,
                    imgUrl: "https://i04piccdn.sogoucdn.com/e6be10c95466b166",

                },
                {
                    bannerId: 2,
                    imgUrl: "http://pic1.bbzhi.com/dongwubizhi/maomigougoudequguaishentai/animal_funny_cats_dogs_31398_10.jpg",

                }
            ]
        })
    },
    getText() {
        this.setData({
            playingFilms: [{
                imgUrls:"http://pic1.bbzhi.com/dongwubizhi/maomigougoudequguaishentai/animal_funny_cats_dogs_31398_10.jpg",
                    filmId: 21,
                    name: "测试1",
                    grade: "8.3",

                },
                { imgUrls: "https://i04piccdn.sogoucdn.com/e6be10c95466b166",
                    filmId: 22,
                    name: "测试2",
                    grade: "7.3",

                }
            ]
        })
    },




    toTextDetail(e) {
        console.log(e.currentTarget.dataset.test)
        wx.navigateTo({
            url: '/pages/detail/detail',

        })

    },

    toBannerDetail() {
        wx.showModal({
            title: "提示",
            content: "因打开webview控件需要加入白名单，这里就不做跳转了"
        });
    },
    // 微信头像昵称、授权
    getUserInfo(e) {
        if (e.detail.errMsg !== 'getUserInfo:ok') {
            return;
        }
        wx.setStorageSync("userInfo", e.detail.userInfo)

    },
});