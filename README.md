## 亮点

 - 可自定义上传参数名 增加调试模式
/**
*element： 触发埋点元素class
*method：触发埋点函数
*name：收集数据的key值
*data：数据对应值 
[{ img: "playingFilms[$INDEX].imgUrls" }, { filmId: "playingFilms[$INDEX].filmId" }]
*remark : 备注
*userInfo :当前用户信息 (读取storage)
*is_debug:调试
*/

- 封装上传接口  uploadLog

具体参考demo/utils/apis.js


### 使用方法

1、App.js文件引入资源

```
// 引入埋点SDK
import Tracker from './eventTracking.min.js';
// 引入埋点配置信息，请自行参考tracks目录下埋点配置修改
import trackConfig from './tracks/index';
// 初始化
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
  elementTracks: [{
          element: '.playing-item',
          remark: '内容循环单条数据',
          dataList: [{
                  img: "playingFilms[$INDEX].imgUrls"
              },
              {
                  filmId: "playingFilms[$INDEX].filmId"
              },
              {
                  item: "playingFilms[0]"
              },
              {
                  testName: 'test.name'
              }
          ],
          is_debug: true, 
      }


  ],
  methodTracks: [{
          method: 'getBanner',
          dataList: [{
              bannerList: "bannerList"
          }],
          remark: '获取banner',
          is_debug: true, 
      },
      {
          method: 'getText',

          dataList: [{
              playingFilms: "playingFilms"
          }],
          remark: '获取内容',
          is_debug: false, 
      },
      {
          method: 'toBannerDetail',
          remark: '点击banner',

          dataList: [{
              imgUrls: "imgUrls"
          }, {
              test: "$DATASET.test"
          }],
          is_debug: false, 
      },
      {
          method: 'toTextDetail',
          remark: '点击内容',
          dataList: [{
              test: "$DATASET.test"
          }],
          is_debug: false, 
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

[小程序从手动埋点到自动埋点](https://www.jianshu.com/p/4c0c23b16ba1)


