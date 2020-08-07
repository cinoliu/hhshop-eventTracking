const tracks = {
  path: 'pages/index/index',
  elementTracks: [
    {
      element: '.playing-item',
      remark:'循环',
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
