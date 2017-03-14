const db = require('../dbconfig'),
      fs = require('fs');



const getAnswerKeys = function(test, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'SELECT answer, points FROM `Questions` where `cid` =  ? AND  `tid` = ? ORDER BY  date_created ASC',
      timeout: 40000
      },
      [test.cid, test.tid],
      function (error, results) {
        if(error) {
         console.error('error connecting: ' + error.stack);
         return;
        }
        fs.writeFile('public/json/answerkeys.json', JSON.stringify(results), function (err) {
          if (err) throw err;
        });
      });
    connection.release();
    })
}


module.exports = {
  getAnswerKeys
}
