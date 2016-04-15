'use strict';

const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const validate = require('../lib/validations');

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.post('/login', (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  res.redirect('/');
});

module.exports = router;
