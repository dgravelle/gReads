const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('short'));

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/static'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/books*', (req, res) => {
  console.log(req.url.includes('/new'));
  if (req.url.includes('/new')) {
    console.log('in');
    res.render('pages/new-book-form');
  }
  res.render('pages/books');
});
//
// app.get('/books/new', (req, res) => {
//
// });

app.listen(app.get('port'), () => {
  console.log('Listening on ', app.get('port'));
});
