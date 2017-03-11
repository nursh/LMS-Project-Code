const db = require('../dbconfig'),
      fs = require('fs');

const getCourseByNumber = function(number, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'SELECT * FROM `Courses` where `number` =  ? ',
      timeout: 40000
      },
      [number],
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
  getCourseByNumber
}
