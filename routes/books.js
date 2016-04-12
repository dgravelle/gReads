'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

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
    res.render('pages/books', { books: books});
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
  console.log(bookData);

  books().select().where({ title: bookData.title })
    .first().then((book) => {
      if(!book) {
        books().insert(bookData).then((book) => {
          if(!book) {
             return console.error('${ bookData.title } was not added');
          }

          req.body.authorsFirst.forEach((el) => {
            console.log(el);
            authors().where({ first_name: el }).first().then((author) => {
              if(!author) {
                console.log('could not id an author for this book');
              }
              books_authors().insert({ author_id: author.id, book_id: book.id }).then((data) => {
                if(!data) {
                  console.log('could not add to books_authors');
                }
              });
            });
          });
          res.redirect('/books');
        });
      } else {
        console.log('Looks like this book already exists in our records. \n Please enter a book with a different title.');
        bookData.errors = 'Looks like this book already exists in our records. \n Please enter a book with a different title.';

        res.render('pages/book-form', bookData);
      }
    });
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
