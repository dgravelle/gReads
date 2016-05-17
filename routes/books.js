'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const knex = require('../db/knex');
const validate = require('../lib/validations');
const Queries = require('../models/knex-queries');



app.use('/', validate.isLoggedIn)

router.get('/books', validate.isLoggedIn, (req, res) => {
  const user = res.user;
  console.log(user);
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
        // console.log(books[i].authors);
      }

      res.render('pages/books', { books: books, user: user });
    });
  });
});

router.get('/books/new', (req, res) => {
  res.render('pages/book-form');
});

router.post('/books/new', (req, res) => {
  let bookData = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover: req.body.coverImage
  }

  // Check to see if entered book already exists in the db
  validate.isBookDuplicate(bookData.title).then((result) => {
    console.log('validation result: ', result);
    if (result) {
      const error = 'Looks like this book already exists in our records. \n Please enter a book with a different title.';
      return res.render('pages/book-form', { book: bookData, error: error });
    }
  });

  Queries.Books.insertBook(bookData)
    .then((book) => {
      if(!book) {
         return console.error(`${bookData.title} was not added`);
      }

      console.log('book id added to books table: ', book[0].book_id);
    })
    .catch((err) => {
      console.log(err);
      res.render('pages/book-form', { error: err });
    });
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

router.delete('/books/:id/delete', validate.isLoggedIn, (req, res) => {
  const id = req.params.id;

  Queries.Books.delete(id).then(() => {
    const alert = ''
    res.render('pages/books', { alert: alert });
  });
});

router.get('/books/:id/edit', validate.isLoggedIn, (req, res) => {
  const id = req.params.id;

  Queries.Books.getBookById(id).then((books) => {
    Queries.Books_Authors.getAuthorsByBookId(id).then((authors) => {
      books[0].authors = authors;
      console.log('book.authors: ', books[0].authors);
      res.render('pages/book-form', { book: books[0] });
    });
  });
});

router.put('/books/:id/edit/', validate.isLoggedIn, (req, res) => {
  const id = req.params.id;
  let bookData = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover: req.body.coverImage
  }

  console.log('putting');
  console.log(bookData);

  Queries.Books.updateBook(id, bookData).then((books) => {
    Queries.Books_Authors.getAuthorsByBookId(id).then((authors) => {
      const alert = `${books[0].title} successfully updated`;

      console.log(res.user);
      books[0].authors = authors;
      res.render('pages/books', { books: books, alert: alert, user: res.user });
    });
  });
});

module.exports = router;
