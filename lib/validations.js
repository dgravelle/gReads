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
    
  }
}
