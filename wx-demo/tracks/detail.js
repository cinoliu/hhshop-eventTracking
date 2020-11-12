const tracks = {
  path: 'pages/detail/detail',
  elementTracks: [
    {
      element: '.buy-now',
  
      dataList:[{filmId:"film.filmId"}],
    },
  ],
  methodTracks: [
    {
      method: 'getDetail',
      remark:"获取详情",
      dataList:[{filmId:"film.filmId"}],
    },
    {
      method: 'buy',
      remark:"购买按钮",
      dataList:[{filmId:"film.filmId"}],
    },
  ],
};

export default tracks;
