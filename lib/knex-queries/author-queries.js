const knex = require('../../db/knex');

module.exports = {
  getAuthors: () => {
    return knex('authors').select();
  },
  getAuthorById: (id) => {
    return knex('authors').where({auth_id: id}).first();
  },
  getAuthorsByLastName: (lastName) => {
    return knex('authors').select('auth_id').whereIn('last_name', lastName );
  }
}
