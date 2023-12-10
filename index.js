const express = require('express');
const app = express();
const path = require('path');

const port = 3000;
// const htmlDir = `${__dirname}/html/`
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.get('/', (_, res) => {
    res.render('index');
});

const getImageFetchQuerys = (query) => {
  const imageFetchQuerys = {}
  for (const key of new Array(4).fill().map((_,i) => `image${i+1}`)) {
    const value = req.query[key]
    imageFetchQuerys[key] = value === 'low' || value === 'high' ? value : 'auto';
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

// reload(app).then(() => {
//     // reloadReturned is documented in the returns API in the README
  
//     // Reload started, start web server
//     server.listen(app.get('port'), function () {
//       console.log('Web server listening on port ' + port)
//     })
//   }).catch( (err) => {
//     console.error('Reload could not start, could not start server/sample app', err)
//   })