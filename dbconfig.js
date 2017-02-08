let mysql = require('mysql');

let pool =  mysql.createPool({
  connectionLimit: 50,
  host     : 'localhost',
  user     : 'project',
  password : 'Project',
  database : 'LMS'
});

const dbQuery = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
          connection.release();
          console.error('error connecting: ' + err.stack);
          return;
        }
        callback(null, connection);
    })
};

module.exports = dbQuery;
