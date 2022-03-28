const mysql = require('mysql')

let pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'youtube_clone'
  });

export { pool };