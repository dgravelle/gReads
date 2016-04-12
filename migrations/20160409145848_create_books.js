exports.up = function(knex, Promise) {
  return new Promise.all([
    knex.schema.createTable('books', function(table) {
      table.increments('book_id').primary();
      table.string('title');
      table.string('genre');
      table.text('description');
      table.string('cover');
    }),

    knex.schema.createTable('authors', function(table) {
        table.increments('auth_id').primary();
        table.string('first_name');
        table.string('last_name');
        table.text('biography');
        table.text('url');
    }),

    knex.schema.createTable('books_authors', function(table) {
      table.increments('id').primary();
      table.integer('author_id')
        .references('auth_id')
        .inTable('authors')
      table.integer('book_id')
        .references('book_id')
        .inTable('books');
    })
  ])
};

exports.down = function(knex, Promise) {
  return new Promise.all([
    knex.schema.dropTable('books_authors'),
    knex.schema.dropTable('books'),
    knex.schema.dropTable('authors')
  ])
};
