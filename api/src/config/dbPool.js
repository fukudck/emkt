const mysql = require('mysql2');

// Sử dụng connection pool thay vì createConnection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'email_marketing',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Sử dụng promise() để có thể sử dụng async/await
const promisePool = pool.promise();

module.exports = promisePool;
