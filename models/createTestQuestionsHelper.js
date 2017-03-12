const db = require('../dbconfig');

const questionExists = function(question, callback) {
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT * FROM `Questions` where `question` =  ? AND `cid` = ? AND  `tid` = ?',
          timeout: 40000
        },
        [question.question, question.cid, question.tid],
        function (error, results) {
          if(results.length === 0) {
            return callback(false);
          } else {
            return callback('The test already contains this question.');
          }
          if(error) {
            console.error('error connecting: ' + error.stack);
            return;
          }
      });
     connection.release();
    })
}

const registerQuestion= function(question) {
  db(function(err, connection) {
        if(err) {
          console.log('error connecting: ' + err.stack);
          return;
        }
        connection.query({
            sql: 'INSERT INTO `Questions` SET ?',
            timeout: 40000
          },
          [question],
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
  questionExists,
  registerQuestion
}
