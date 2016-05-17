const knex = require('../../db/knex');

module.exports = {
  addToJoinTable: (authorId, bookId) => {
    return knex('books_authors').insert({ author_id: authorId, book_id: bookId}, '*');
  },
  addAuthorToJoinTable: (index, authorId) => {
    return knex('books_authors').where({ id: index }).insert({ author_id: authorId }, '*');
  },
  addBookToJoinTable: (bookId) => {
    return knex('books_authors').insert({ book_id: bookId }, '*');
  },
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
  },
  getBooksByAuthorId: (authorId) => {
    return knex('books_authors')
            .where({ author_id: authorId })
            .select('books.book_id', 'books.title')
            .innerJoin('books',
                        'books.book_id',
                        '=',
                        'books_authors.book_id');
  }
}
