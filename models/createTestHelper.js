const db = require('../dbconfig');

const testExists = function(test, callback) {
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT * FROM `Tests` where `title` =  ? AND `course_number` = ?',
          timeout: 40000
        },
        [test.title, test.course_number],
        function (error, results) {
          if(results.length === 0) {
            return callback(false);
          } else {
            if(results[0].title === test.title) {
              return callback('A test with this name already exists');
            }
          }
          if(error) {
            console.error('error connecting: ' + error.stack);
            return;
          }
      });
     connection.release();
    })
}

const registerTest= function(test) {
  db(function(err, connection) {
        if(err) {
          console.log('error connecting: ' + err.stack);
          return;
        }
        connection.query({
            sql: 'INSERT INTO `Tests` SET ?',
            timeout: 40000
          },
          [test],
          function (error, results) {
            if(error) {
                console.error('error connecting: ' + error.stack);
                return;
              }
            }
          );
        connection.release();
  })
}

module.exports = {
  testExists,
  registerTest
}
