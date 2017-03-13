const db = require('../dbconfig'),
      fs = require('fs');



const getQuestions = function(question, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'SELECT * FROM `Questions` WHERE `cid` = ? AND `tid` = ?',
      timeout: 40000
      },
      [question.cid, question.tid],
      function (error, results) {
        if(error) {
         console.error('error connecting: ' + error.stack);
         return;
        }
        fs.writeFile('public/json/testQuestions.json', JSON.stringify(results), function (err) {
          if (err) throw err;
        });
        if(results.length === 0) {
          return callback('There are no questions in this test yet');
        }
        return callback(false);
      });
    connection.release();
    })
}


module.exports = {
  getQuestions
}
