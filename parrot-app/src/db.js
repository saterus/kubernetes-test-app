const mariadb = require('mariadb');

function pool() {
  return mariadb.createPool({
    host: process.env.MARIADB_SERVICE_HOST,
    port: process.env.MARIADB_SERVICE_PORT,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'parrot',
    connectionLimit: 5
  });
}

module.exports = {
  pool,
};
