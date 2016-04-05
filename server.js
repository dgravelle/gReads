const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const knex = require('./db/knex');

function books() {
    return knex('books');
}

function authors() {
  return knex('authors');
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('short'));

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
// app.set('view engine', 'ejs');
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/static'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/books', (req, res) => {
  books().select().then(function(data) {
    res.render('pages/books', { books: data});
  });
});

app.get('/books/new', (req, res) => {
  res.render('pages/book-form');
});

app.post('/books/new', (req, res) => {
  // console.log(req.body);
  const bookData = {
    book_title: req.body.title,
    book_genre: req.body.genre,
    book_description: req.body.description,
    book_cover_url: req.body.coverImage,
    book_authors: req.body.authors
  }
  console.log(bookData);

  books().insert(bookData).then(function(data) {
    res.redirect('/books');
  });
});

app.get('/books/:id/edit', (req, res) => {
  const id = req.params.id;
  books().where({ id: id}).first().then((book) => {
      res.render('pages/book-form', { book: book });
  });
});

app.put('/books/:id/edit/', (req, res) => {
  // update book
});

app.get('/authors', (req, res) => {
  res.render('pages/authors');
});

app.get('/authors/new', (req, res) => {
  // get new author information
  res.render('pages/author-form');
});

app.post('/authors/new', (req, res) => {
  // get new author information
  // console.log(req.body);
  // const authorData = {
  //   first_name: req.body.
  //   last_name:
  //   book_genre:
  //   portrait_url:
  //   biography:
  //
  // }

  authors().insert()
  books().insert()

  res.send(req.body, 200);
});

app.post('/authors/:id', (req, res) => {
  // get new author information
  res.render('pages/author-listing');
});

app.get('/authors/:id/edit', (req, res) => {
  res.render('pages/author-form');
});



app.listen(app.get('port'), () => {
  console.log('Listening on ', app.get('port'));
});
