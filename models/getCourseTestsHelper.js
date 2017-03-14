const db = require('../dbconfig'),
      fs = require('fs');



const getTests = function(number, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'SELECT * FROM `Tests` WHERE `course_number` = ?',
      timeout: 40000
      },
      [number],
      function (error, results) {
        if(error) {
         console.error('error connecting: ' + error.stack);
         return;
        }
        fs.writeFile('public/json/coursetests.json', JSON.stringify(results), function (err) {
          if (err) throw err;
        });
        if(results.length === 0) {
          return callback('There are no tests in this course yet');
        }
        return callback(false);
      });
    connection.release();
    })
}



module.exports = {
  getTests
}
