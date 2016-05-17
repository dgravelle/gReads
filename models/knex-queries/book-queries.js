const knex = require('../../db/knex');

module.exports = {
  getAllBooks: () => {
    return knex('books').select();
  },
  getBookByTitle: (title) => {
    return knex('books').where({ title: title});
  },
  getBookById: (id) => {
    return knex('books').where({ book_id: id });
  },
  insertBook: (bookData) => {
    return knex('books').insert(bookData, '*');
  },
  updateBook: (id, bookData) => {
    return knex('books').where({ book_id: id }).update(bookData, '*');
  },
  deleteBook: (id) => {
    return knex('books').where({ book_id: id}).del();
  }
}
