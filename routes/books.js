'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const validate = require('../lib/validations');
const Queries = require('../lib/knex-queries');

router.get('/books', (req, res) => {
  Queries.Books.getAllBooks().then((books) => {
    if(!books) {
      console.error('books not found');
    }

    var promises = [];

    for (let i = 0; i < books.length; i++) {
      promises.push(Queries.Books_Authors.getAuthorsByBookId(books[i].book_id));
    }

    Promise.all(promises).then((authors) => {
      for (let i = 0; i < books.length; i++) {
        books[i].authors = authors[i];
        console.log(books[i].authors);
      }

      res.render('pages/books', { books: books });
    });
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

router.get('/books/:id', (req, res) => {
  const id = req.params.id;
  Queries.Books.getBookById(id).then((books) => {
    Queries.Books_Authors.getAuthorsByBookId(id).then((authors) => {
      books[0].authors = authors;
      console.log('book.authors: ', books[0].authors);
      res.render('pages/books', { books: books });
    });
  });
});

router.delete('/books/:id/delete', (req, res) => {
  res.send('not done yet dude')
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
