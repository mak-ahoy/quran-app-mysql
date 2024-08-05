import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'quran_app'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL: ', error.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

export default connection;
