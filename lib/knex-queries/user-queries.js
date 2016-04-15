const knex = require('../../db/knex');

module.exports = {
  create: (data) => {
    return knex('users').insert(data, '*');
  },
  getUser: (userEmail) => {
    return knex('users').select('*').where({ email: userEmail }).first();
  }
}
