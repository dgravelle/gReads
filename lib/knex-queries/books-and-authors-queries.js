const knex = require('../../db/knex');

module.exports = {
  getAuthorsByBookId: (bookId) => {
    return knex('books_authors')
            .where({ book_id: bookId })
            .select('authors.auth_id',
                    'authors.first_name',
                    'authors.last_name')
            .innerJoin('authors',
                        'authors.auth_id',
                        '=',
                        'books_authors.author_id');

  }
  // getAuthorsByBookId: (bookId) => {
  //   return knex('books_authors').select('author_id').where({ book_id: bookId });
  // }
}

//
// SELECT
// books.book_id, books.title,
// authors.last_name, authors.first_name
// FROM books
// JOIN books_authors
// ON books.book_id = books_authors.book_id
// JOIN authors
// ON authors.auth_id = books_authors.author_id;
