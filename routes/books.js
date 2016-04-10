var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function books() {
    return knex('books');
}

function books_authors() {
  return knex('books_authors');
}

router.get('/books', (req, res) => {
  books().select().then(function(books) {
    if(!books) {
      console.error('books not found');
    }
    res.render('pages/books', { books: books});
  });
});

router.get('/books/new', (req, res) => {
  res.render('pages/book-form');
});

router.post('/books/new', (req, res) => {
  // console.log(req.body);
  const bookData = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover: req.body.coverImage,
  }
  console.log(req.body.authors);
  console.log(bookData);

  books().insert(bookData).then(function(data) {
    res.redirect('/books');
  });

  books_authors().insert()

});

router.delete('/books/:id/delete', (req, res) => {
  console.log('deleting');
  res.redirect('/books');
});

router.get('/books/:id/edit', (req, res) => {
  const id = req.params.id;
  books().where({ id: id}).first().then((book) => {
      res.render('pages/book-form', { book: book });
  });
});



router.put('/books/:id/edit/', (req, res) => {
  // update book
});

module.exports = router;
