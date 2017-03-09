const db = require('../dbconfig'),
      fs = require('fs');



const getCourses = function(user_id, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'SELECT * FROM `Courses` where `instructor_id` =  ? ',
      timeout: 40000
      },
      [user_id],
      function (error, results) {
        if(error) {
         console.error('error connecting: ' + error.stack);
         return;
        }
        fs.writeFile('public/json/courses.json', JSON.stringify(results), function (err) {
          if (err) throw err;
        });
        if(results.length === 0) {
          return callback('You have not created any course(s).')
        }
        return callback(false);
      });
    connection.release();
    })
}


module.exports = {
  getCourses
}
