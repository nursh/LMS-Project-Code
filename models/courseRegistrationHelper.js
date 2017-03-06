const db = require('../dbconfig');

const courseExists = function(course, callback) {
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT * FROM `Courses` where `code` =  ? OR `name` = ? OR `number` = ?',
          timeout: 40000
        },
        [course.code, course.name, course.number],
        function (error, results) {
          if(results.length === 0) {
            return callback(false);
          } else {
            if(results[0].name === course.name && results[0].code === course.code) {
              return callback('This course already exists');
            } else if(results[0].name === course.name) {
              return callback('The course name already exists');
            } else if(results[0].code === course.code) {
              return callback('The course code already exists')
            } else if(results[0].number === course.number) {
              return callback('The course number already exists')
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

const registerCourse = function(course) {
  db(function(err, connection) {
        if(err) {
          console.log('error connecting: ' + err.stack);
          return;
        }
        connection.query({
            sql: 'INSERT INTO `Courses` SET ?',
            timeout: 40000
          },
          [course],
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
  courseExists,
  registerCourse
}
