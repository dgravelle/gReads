const knex = require('../../db/knex');

module.exports = {
  getAllBooks: () => {
    return knex('books').select();
  },
  getBookById: (id) => {
    return knex('books').where({ book_id: id }).first();
  },
  insertBook: (bookData) => {
    return knex('books').insert(bookData);
  }
}
