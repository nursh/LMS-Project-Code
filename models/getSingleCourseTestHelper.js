const db = require('../dbconfig');

const getSingleTest = function(test, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'SELECT * FROM `Tests` WHERE `course_number` = ? AND `id` = ?',
      timeout: 40000
      },
      [test.cid, test.tid],
      function (error, results) {
        if(error) {
         console.error('error connecting: ' + error.stack);
         return;
        }
        return callback(results[0]);
      });
    connection.release();
    })
}


module.exports = {
  getSingleTest
}
