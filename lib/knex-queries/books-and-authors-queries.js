const knex = require('../../db/knex');

module.exports = {
  getBooksAndAuthors: () => {
    return knex('books').select()
            .innerJoin('books_authors',
                        'books_authors.book_id',
                        '=',
                        'books.book_id')
            .innerJoin('authors',
                        'books_authors.author_id',
                        '=',
                        'authors.auth_id')
  },
  getAuthorsByBookId: (bookId) => {
    return knex('books_authors').select('author_id').as('auth_id').where({ book_id: bookId });
  }
}
