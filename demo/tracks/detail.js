const tracks = {
  path: 'pages/detail/detail',
  elementTracks: [
    {
      element: '.buy-now',
      dataKeys: ['film.filmId'],
    },
  ],
  methodTracks: [
    {
      method: 'getDetail',
      remark:"获取详情",
      dataKeys: ['film.filmId'],
    },
    {
      method: 'buy',
      remark:"购买按钮",
      dataKeys: ['film.filmId'],
    },
  ],
};

export default tracks;
