'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const validate = require('../lib/validations');
const Queries = require('../lib/knex-queries');

function isLoggedIn (req, res, next) {
  if (!req.session.userId) {
    res.user = false;
    next();
  }
  else {
    res.user = true;
    next()
  }
}

router.get('/authors', isLoggedIn, (req, res) => {
  const user = res.user;

  Queries.Authors.getAuthors().then((authors) => {
    if (!authors)
      console.error('could not retrieve authors');

    var promises = [];

    for (let i = 0; i < authors.length; i++) {
      promises.push(Queries.Books_Authors.getBooksByAuthorId(authors[i].auth_id));
    }

    Promise.all(promises).then((books) => {
      for (var i = 0; i < authors.length; i++) {
        authors[i].booksWritten = books[i];
      }
      res.render('pages/authors', { authors: authors, user: user });
    })
    .catch((err) => {
      console.log(err);
    });
  });
});

router.get('/authors/new', (req, res) => {
  // get new author information
  res.render('pages/author-form');
});

router.post('/authors/new', (req, res) => {
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

router.get('/authors/:id', (req, res) => {
  const id = req.params.id;

  Queries.Authors.getAuthorById(id).then((authors) => {
    Queries.Books_Authors.getBooksByAuthorId(id).then((books) => {
      authors[0].booksWritten = books;
      res.render('pages/authors', { authors: authors });
    });
  });
});

router.get('/authors/:id/edit', isLoggedIn, (req, res) => {
  const id = req.params.id;

  Queries.Authors.getAuthorById(id).then((authors) => {
    Queries.Books_Authors.getBooksByAuthorId(id).then((books) => {
      authors[0].booksWritten = books;
      console.log(authors);
      res.render('pages/author-form', { author: authors[0] });
    });
  });
});

module.exports = router;
