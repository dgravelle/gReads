const express = require('express');
const router = express.Router();
const knex = require('./db/knex');

function books() {
    return knex('books');
}

router.get('/books', (req, res) => {
  books().select().then(function(data) {
    res.render('pages/books', { books: data});
  });
});

router.get('/books/new', (req, res) => {
  res.render('pages/book-form');
});

router.post('/books/new', (req, res) => {
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

router.get('/books/:id/edit', (req, res) => {
  const id = req.params.id;
  books().where({ id: id}).first().then((book) => {
      res.render('pages/book-form', { book: book });
  });
});

router.put('/books/:id/edit/', (req, res) => {
  // update book
});
