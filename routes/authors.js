const express = require('express');
const router = express.Router();
const knex = require('./db/knex');

function authors() {
  return knex('authors');
}

router.get('/authors', (req, res) => {
  res.render('pages/authors');
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

router.post('/authors/:id', (req, res) => {
  // get new author information
  res.render('pages/author-listing');
});

router.get('/authors/:id/edit', (req, res) => {
  res.render('pages/author-form');
});
