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