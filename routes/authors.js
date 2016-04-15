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
  const alert = req.alert;

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

      res.render('pages/authors', { authors: authors, user: user, alert: alert });
    })
    .catch((err) => {
      console.log(err);
    });
  });
});

router.get('/authors/new', isLoggedIn, (req, res) => {
  if (!req.user) {
    res.redirect('/');
  }
  res.render('pages/author-form');
});

router.post('/authors/new', (req, res) => {
  const authorData = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    url: req.body.bioUrl,
    biography: req.body.biography
  }
  // console.log(authorData);

  Queries.Authors.createAuthor(authorData).then((author) => {
    const alert = `${author.first_name + author.last_name} has been added.  Good job.`
    req.alert = alert;
    res.redirect('/authors');
  });
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

router.put('/authors/:id/edit/', (req, res) => {
  const id = req.params.id;
  const authorData = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    url: req.body.bioUrl,
    biography: req.body.biography
  }

  Queries.Authors.updateAuthor(id, authorData).then((author) => {
    console.log('author updated: ', author);
    res.redirect('/authors');
  });
});

module.exports = router;
