const express = require('express');
const app = express();

const port = 3000;
app.set('view engine', 'ejs');

app.use(express.static('assets'));
app.get('/', (_, res) => {
    res.render('index');
});

/**
 * 引数が`image${1|2|3|4}`を満たすか判定する
 * @param {string} value 
 */
const isImageName = (value) => {
  return !!value.match(/image[1-4]/)
}

const getImageFetchQuerys = (query) => {
  const imageFetchQuerys = {}
  const imageNames = new Array(4).fill().map((_,i) => `image${i+1}`)
  // 優先度の設定
  for (const key of imageNames) {
    const value = query[key]
    imageFetchQuerys[`${key}Priority`] = value === 'low' || value === 'high' ? value : 'auto';
  }
  imageFetchQuerys['sameImageQuery'] = isImageName(query['same-image']) ? query['same-image'] : 'none';

  // 画像pathの生成
  for (const [index, key] of imageNames.entries()) {
    imageFetchQuerys[`${key}Path`] = imageFetchQuerys['sameImageQuery'] !== 'none' ? `${imageFetchQuerys['sameImageQuery']}/${index + 1}.jpg` : `${key}/1.jpg`
  }
  return imageFetchQuerys
}

app.get('/body-image-tag', (req, res) => {
    const imageFetchQuerys = getImageFetchQuerys(req.query)
    console.log(JSON.stringify(imageFetchQuerys, null, 2));
    res.render('body-image-tag', imageFetchQuerys);
});

app.get('/preload-image-tag', (req, res) => {
  const imageFetchQuerys = getImageFetchQuerys(req.query)
  console.log(JSON.stringify(imageFetchQuerys, null, 2));
  res.render('preload-image-tag', imageFetchQuerys);
});

app.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました。 http://localhost:${port}`);
});

module.exports = app