const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // XAMPP's default MySQL host
  user: 'root', // Default user for XAMPP MySQL
  password: '', // Default password is empty
  database: 'email_marketing' // Your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = connection;