const bcrypt = require('bcrypt');
const saltRounds = 10;
const Queries = require('../lib/knex-queries');
const Users = Queries.Users;

Users.createUser = (data, callback) => {
  bcrypt.hash(data.password, saltRounds, function(err, hash) {
    if (err) {
      callback(err);
    }
    // Store hash in your password DB.
    data.password_digest = hash;
    delete data.password;
    Users.create(data).then((data) => {
      console.log(`user created ${data}`);
      callback(undefined, data);
    });
  });
}

Users.authenticateUser = (email, password, callback) => {
  Users.getUser(email).then((user) => {
    if (!user) {
      return callback('Sorry, that email and password does not match');
    }
    brcypt.compare(password, user.password_digest, (err, res) => {
      if(err || !res) {
        return callback('Sorry, that email and password does not match');
      }
      callback(undefined, user)
    });
  });
}

module.exports = Users;
