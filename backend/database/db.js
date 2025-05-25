const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'visitor_tracking_app'
});


db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});


//connection.end();

module.exports = db;
