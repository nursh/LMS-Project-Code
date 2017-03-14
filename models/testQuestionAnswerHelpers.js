const db = require('../dbconfig');
      fs = require('fs');

const answersExists = function(answer, callback){
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT * FROM `TestAnswers` where `test_id` =  ? AND `course_id` = ? AND `student_id` = ?',
          timeout: 40000
        },
        [answer.test_id, answer.course_id, answer.student_id],
        function (error, results) {
          if(results.length === 0) {
            return callback(false);
          } else {
            return callback('Only one try allowed. You have already taken the test');
          }
          if(error) {
            console.error('error connecting: ' + error.stack);
            return;
          }
      });
     connection.release();
    })
}

const getAnswers = function(answer, callback){
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT answers FROM `TestAnswers` where `test_id` =  ? AND `course_id` = ? AND `student_id` = ?',
          timeout: 40000
        },
        [answer.tid, answer.cid, answer.sid],
        function (error, results) {
          fs.writeFile('public/json/studentanswers.json', JSON.stringify(results), function (err) {
            if (err) throw err;
          });
          if(results.length === 0) {
            return callback('You have not taken this test yet');
          }
          return callback(false);
          if(error) {
            console.error('error connecting: ' + error.stack);
            return;
          }

      });
     connection.release();
    })
}


const getAllAnswers = function(answer, callback){
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT * FROM `TestAnswers` where `test_id` =  ? AND `course_id` = ?',
          timeout: 40000
        },
        [answer.tid, answer.cid],
        function (error, results) {
          fs.writeFile('public/json/studentsanswers.json', JSON.stringify(results), function (err) {
            if (err) throw err;
          });
          if(results.length === 0) {
            return callback('No one has not taken this test yet');
          }
          return callback(false);
          if(error) {
            console.error('error connecting: ' + error.stack);
            return;
          }

      });
     connection.release();
    })
}

const registerAnswer = function(answer) {
  db(function(err, connection) {
        if(err) {
          console.log('error connecting: ' + err.stack);
          return;
        }
        connection.query({
            sql: 'INSERT INTO `TestAnswers` SET ?',
            timeout: 40000
          },
          [answer],
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
  answersExists,
  getAnswers,
  getAllAnswers,
  registerAnswer
}
