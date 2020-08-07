# eventTracking 小程序自动埋点
### 使用方法

1、App.js文件引入资源

```
// 引入埋点SDK
import Tracker from './eventTracking.min.js';
// 引入埋点配置信息，请自行参考tracks目录下埋点配置修改
import trackConfig from './tracks/index';
```

2、初始化

```
new Tracker({ tracks: trackConfig });
```

3、加入你的埋点信息

```
/**
 * path 页面路径
 * elementTracks 页面元素埋点
 * methodTracks 执行函数埋点
 * comMethodTracks: 执行组件内函数埋点
 */
const tracks = {
  path: 'pages/index/index',
  elementTracks: [
    {
      element: '.playing-item',
      remark:'内容循环',
      dataKeys: ['imgUrls', 'playingFilms[$INDEX].filmId', 'playingFilms[0]', 'test.name', '$APP.baseUrl', '$DATASET.test', '$INDEX'],
    },
    {
      element: '.more',
      remark:'更多',
      dataKeys: ['imgUrls', 'playingFilms', '$DATASET.test'],
    },
    {
      element: '.page >>> .sub-component',
      dataKeys: ['name', '$DATASET.test']
    }
  ],
  methodTracks: [
    {
      method: 'getBanner',
      dataKeys: ['bannerList'],
      remark:'获取banner',
    },
    {
      method: 'getText',
      dataKeys: ['textList'],
      remark:'获取内容',
    },
    {
      method: 'toBannerDetail',
      remark:'点击banner',
      dataKeys: ['imgUrls', '$DATASET.test'],
    },
    {
      method: 'toTextDetail',
      remark:'点击内容',
      dataKeys: [ '$DATASET.test'],
    },
  ],
};

export default tracks;

```

4、在wxml最外层插入监听方法

```
<view catchtap='elementTracker'>
	<view></view>
</view>
```

打开控制台，查看是否成功收集

![image](https://github.com/cinoliu/eventTracking/blob/master/img/1.jpg)

element： 触发埋点元素class

method：触发埋点函数

name：收集数据的key值

data：数据对应值

remark : 备注

userInfo :当前用户信息 (读取storage)


5、如果你要监听组件内元素

在elementTracks里加入

```javascript
{
  element: '.page >>> .sub-component',
    dataKeys: ['name', '$DATASET.test']
}
```

.page表示包裹组件的元素class，或者你可以使用id或者任意选择器

.sub-component 表示监听组件内元素class名

核心还是利用了微信提供的选择器，可以[参考文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.selectAll.html)


6、数据提交

 ```

 /**
   src/report.js
**/

  var data = {
        logList: logger,
        userInfo: wx.getStorageSync("userInfo")
    };
    wx.request({
        url: apis.logUrl,
        method: 'POST',
        data: data,
        header: apis.jsonHead,
        success: res => {
            console.log(res);
        },
        fail: res => {
            console.log(res);
        }
    });



 /**
   demo/utils/apis.js
**/

  const httpServiceURL = '';
  const logUrl = httpServiceURL+'/log/uploadLog'; 提交数据接口

  const formHeader = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  const jsonHead = {
      'content-type': 'application/json;charset=utf-8'
  };



 ```

### 特殊前缀

$APP 表示读取App下定义的数据

$DATASET.xxx 表示获取点击元素，定义data-xxx 中的 xxx值

$INDEX 表示获取列表，当前点击元素的索引

**需要获取$INDEX时，需要在wxml中加入data-index={{index}}标记**

```
<view class='playing-item' data-index="{{index}}" wx:for='{{playingFilms}}'></view>
```



### 兼容插件模式

由于SDK会改写Page对象，如果使用了插件，微信会禁止改写，可以通过以下方式改造。

```
// 初始化插件模式
const tracker = new Tracker({ tracks: trackConfig, isUsingPlugin: true });

// 将原来的App包装
tracker.createApp({
    
})

// 将原Page包装
tracker.createPage({
    
})

// 将原Component包装
tracker.createComponent({
    
})
```





### 方案实现说明

[小程序从手动埋点到自动埋点](https://www.jianshu.com/p/a4ff16840bfd)


