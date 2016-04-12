'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const validate = require('../lib/validations');
const Queries = require('../lib/knex-queries');

function books() {
    return knex('books');
}

function authors() {
    return knex('authors');
}

function books_authors() {
  return knex('books_authors');
}

router.get('/books', (req, res) => {
  books().select().then(function(books) {
    if(!books) {
      console.error('books not found');
    }
    res.render('pages/books', { books: books });
  });
});

router.get('/books/new', (req, res) => {
  res.render('pages/book-form');
});

router.post('/books/new', (req, res) => {
  // console.log(req.body);
  let bookData = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover: req.body.coverImage
  }

  // Check to see if entered book already exists in the db
  validate.isBookDuplicate(bookData.title).then((result) => {
    if (result) {
      const error = 'Looks like this book already exists in our records. \n Please enter a book with a different title.';
      return res.render('pages/book-form', { book: bookData, error: error });
    }
  });

  // console.log(typeof req.body.authorsLast === 'string');
  if (typeof req.body.authorsLast === 'string') {
    var authorsLast = req.body.authorsLast.split();
  }
  else {
    var authorsLast = req.body.authorsLast;
  }

  // console.log(bookData);
  console.log(authorsLast);

  Queries.Books.insertBook(bookData)
    .then((book) => {
      if(!book) {
         return console.error(`${bookData.title} was not added`);
      }
      console.log(`${bookData.title} added to books`);
    })
    .catch((err) => {
      console.log(err);
    });

  Queries.Authors.getAuthorsByLastName(authorsLast).then(authors => {
    console.log(authors);
  });

    // res.redirect('/books');
  });

router.delete('/books/:id/delete', (req, res) => {
  res.redirect('/books');
});

router.get('/books/:id/edit', (req, res) => {
  const id = req.params.id;

  books().where({ book_id: id }).first().then((book) => {
      res.render('pages/book-form', { book: book });
  });
});

router.put('/books/:id/edit/', (req, res) => {
  // update book
});

module.exports = router;
