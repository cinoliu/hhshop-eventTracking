//const httpServiceURL = "http://192.168.31.34:8089/yyh-app"; //my
const httpServiceURL = 'http://127.0.0.1:8360/api/';
const logUrl = httpServiceURL+'/log/uploadLog';

const formHeader = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
};
const jsonHead = {
    'content-type': 'application/json;charset=utf-8'
};


const requestUrl = {
   

};

module.exports = {
    httpServiceURL,
    logUrl,
    // get
    get: (method, data) => {
        return new Promise((resolve, reject) => {
            data = data || {};
            jsonHead.jwtToken = wx.getStorageSync('jwtToken');
            data.timestamp = new Date().getTime();
            // data.sign = utils.generateSign(data, signKey);
            wx.request({
                url: httpServiceURL + requestUrl[method],
                method: 'GET',
                data: data,
                header: jsonHead,
                success: res => {
                    // console.log('get' + JSON.stringify(res));
                    resolve(res);
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    },
    // 带地址参数的get请求
    getParmas: (method, parmas, data) => {
        return new Promise((resolve, reject) => {
            data = data || {};
            jsonHead.jwtToken = wx.getStorageSync('jwtToken');
            data.timestamp = new Date().getTime();
            // data.sign = utils.generateSign(data, signKey);
            wx.request({
                url: httpServiceURL + requestUrl[method] + parmas,
                method: 'GET',
                data: data,
                header: jsonHead,
                success: res => {
                    resolve(res);
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    },
    // postForm
    postForm: (method, data) => {
        return new Promise((resolve, reject) => {
            data = data || {};
            formHeader.jwtToken = wx.getStorageSync('jwtToken');
            data.timestamp = new Date().getTime();
            // data.sign = utils.generateSign(data, signKey);
            wx.request({
                url: httpServiceURL + requestUrl[method],
                method: 'POST',
                data: data,
                header: formHeader,
                success: res => {
                    resolve(res);
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    },
    // postJson
    postJson: (method, data) => {
        return new Promise((resolve, reject) => {
            data = data || {};
            jsonHead.jwtToken = wx.getStorageSync('jwtToken');
            data.timestamp = new Date().getTime();
            // data.sign = utils.generateSign(data, signKey);
            // console.log('postJson参数' + JSON.stringify(data));
            wx.request({
                url: httpServiceURL + requestUrl[method],
                method: 'POST',
                data: data,
                header: jsonHead,
                success: res => {
                    // console.log('postJson返回' + JSON.stringify(res));
                    resolve(res);
                },
                fail: res => {
                    wx.hideLoading();
                    wx.showToast({
                        title: "网络连接失败，请检查网络！",
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    })
                    reject(res);
                }
            });
        });
    },
    // postJson & urlParams
    postJsonParmas: (method, queryStr, data) => {
        return new Promise((resolve, reject) => {
            data = data || {};
            jsonHead.jwtToken = wx.getStorageSync('jwtToken');
            queryStr = queryStr + '&timestamp=' + new Date().getTime();
            // data.timestamp = new Date().getTime();
            // data.sign = utils.generateSign(data, signKey);
            // console.log('postJson参数' + JSON.stringify(data));
            wx.request({
                url: httpServiceURL + requestUrl[method] + queryStr,
                method: 'POST',
                data: data,
                header: jsonHead,
                success: res => {
                    // console.log('postJson返回' + JSON.stringify(res));
                    resolve(res);
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    },
    // 上传文件
    uploadFile: (method, filePath, data) => {
        return new Promise((resolve, reject) => {
            jsonHead.jwtToken = wx.getStorageSync('jwtToken');
            wx.uploadFile({
                filePath: filePath,
                url: httpServiceURL + requestUrl[method],
                name: 'file',
                formData: data,
                header: jsonHead,
                success: res => {
                    // console.log('uploadFile返回' + JSON.stringify(res));
                    if (res.statusCode == 200) {
                        var result = JSON.parse(res.data);
                        if (result.code != '200') {
                            result.msg = '系统繁忙，请稍后再试';
                        }
                        resolve(result);
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: "系统繁忙，请稍后再试",
                            icon: 'none'
                        });
                        reject("系统繁忙，请稍后再试");
                    }
                },
                fail: error => {
                    wx.hideLoading()
                    wx.showToast({
                        title: "网络连接失败，请检查网络",
                        icon: 'none'
                    });
                    reject("网络连接失败，请检查网络");
                }
            })
        });
    },

  

}