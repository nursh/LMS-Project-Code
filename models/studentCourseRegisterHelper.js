const db = require('../dbconfig');

const studentExists = function(data, callback) {
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT * FROM `CourseStudents` where `coursenumber` =  ? AND `studentnumber` = ?',
          timeout: 40000
        },
        [data.coursenumber, data.studentnumber],
        function (error, results) {
          if(results.length === 0) {
            return callback(false);
          } else {
            return callback('You are already registered in the course');
          }
          if(error) {
            console.error('error connecting: ' + error.stack);
            return;
          }
      });
     connection.release();
    })
}

const studentRegister = function(data) {
  db(function(err, connection) {
        if(err) {
          console.log('error connecting: ' + err.stack);
          return;
        }
        connection.query({
            sql: 'INSERT INTO `CourseStudents` SET ?',
            timeout: 40000
          },
          [data],
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
  studentExists,
  studentRegister
}
