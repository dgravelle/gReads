module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize_reads',
    migrations: './migrations',
    seeds: './seeds'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: './migrations',
    seeds: './seeds'
  },
};
