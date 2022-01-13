const mysql = require('mysql')

let pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'youtube_clone'
  });

export { pool };