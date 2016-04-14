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

// SELECT books.book_id, books.title
// FROM books_authors
// INNER JOIN books
// ON books.book_id = books_authors.book_id
// WHERE (books_authors.author_id = 1);


//
// SELECT
// books.book_id, books.title,
// authors.last_name, authors.first_name
// FROM books
// JOIN books_authors
// ON books.book_id = books_authors.book_id
// JOIN authors
// ON authors.auth_id = books_authors.author_id;
