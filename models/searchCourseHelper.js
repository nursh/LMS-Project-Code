const db = require('../dbconfig'),
      fs = require('fs');



const getCourseByCode = function(code, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'SELECT * FROM `Courses` where `code` =  ? ',
      timeout: 40000
      },
      [code],
      function (error, results) {
        if(error) {
         console.error('error connecting: ' + error.stack);
         return;
        }
        if(results.length === 0) {
          return callback('A course with that course code does not exist');
        }
        fs.writeFile('public/json/findCourse.json', JSON.stringify(results), function (err) {
          if (err) throw err;
        });
        return callback(false);
      });
    connection.release();
    })
}

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
        if(results.length === 0) {
          return callback('A course with that course number does not exist');
        }
        fs.writeFile('public/json/findCourse.json', JSON.stringify(results), function (err) {
          if (err) throw err;
        });
        return callback(false);
      });
    connection.release();
    })
}


module.exports = {
  getCourseByCode,
  getCourseByNumber
}
