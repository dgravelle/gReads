'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const Users = require('../models/users');

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.post('/login', (req, res) => {
  let loginInfo = {
    email: req.body.email,
    password: req.body.password
  }

  Users.authenticateUser(loginInfo.email, loginInfo.password, (err, user) => {
    if(err) {
      console.log(err);
      res.sendStatus(404);
      res.render('/login', { error: err });
      return res.end();
    }

    req.session.userId = user.id;
    const alert = `Welcome ${user.email}`
    console.log(req.session);
    res.render('pages/index', { alert: alert })

  });
});

router.get('/logout', (req, res) => {
  res.redirect('/');
});

module.exports = router;
