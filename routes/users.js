'use strict';

const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const validate = require('../lib/validations');

router.get('/signup', (req, res) => {
  res.render('pages/signup');
});

router.post('/signup', (req, res) => {
  let newAccount = {
    email: req.body.email,
    password: req.body.password
  }

  // validate.emailIsUnique(newAccount.email).then((result) => {
  //   if(!result) {
  //     const error = 'Sorry, this email is already in user';
  //
  //     res.status(404);
  //     res.render('pages/signup', { error: error, attemptInfo: newAccount });
  //     return res.end();
  //   }

    Users.createUser(newAccount, (err, data) => {
      if (err)
      return res.render('pages/signup', { error: err });

      console.log('data: ', data);
      const alert = `Welcome ${data[0].email} \n You're all signed up for Galvanize Reads. Woohoo.`;
      res.render('pages/index', { alert: alert });
    });
  // });
});

module.exports = router;
