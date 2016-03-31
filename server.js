const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const knex = require('./db/knex');

function books() {
    return knex('books');
}

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

app.get('/books', (req, res) => {
  console.log(req.url);

  books().select().then(function(data) {
    console.log(data.book_title);

    res.render('pages/books', { book: data});
  });
  // console.log(req.url.includes('/new'));
  // if (req.url.includes('/new')) {
  //   console.log('in');
  //   res.render('pages/new-book-form');
  // }

});

app.get('/books/new', (req, res) => {
  res.render('pages/book-form');
});

app.get('/books/:id/edit', (req, res) => {
  res.render('pages/book-form');
});

app.put('/books/:id/edit/', (req, res) => {
  // update book
});

app.get('/authors', (req, res) => {
  res.render('pages/authors');
});

app.get('/authors/:id/edit', (req, res) => {
  res.render('pages/author-form');
});

app.post('/authors', (req, res) => {
  // get new author information
});

app.listen(app.get('port'), () => {
  console.log('Listening on ', app.get('port'));
});
