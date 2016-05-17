const knex = require('../db/knex');

module.exports = {
  isBookDuplicate: (title) => {
    return knex('books').where({ title: title }).first().then((book) => {
      if (book)
        return true;
      else
        return false;
    });
  },
  isEmail: (email) => {
    var emailRegEx = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/;

    return emailRegEx.test(email);
  }
}
