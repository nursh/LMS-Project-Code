const db = require('../dbconfig');


const messageExists = function(message, callback){
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT * FROM `Announcements` where `message` =  ? AND `cnumber` = ?',
          timeout: 40000
        },
        [message.message, message.cnumber],
        function (error, results) {
          if(results.length === 0) {
            return callback(false);
          } else {
              return callback('An announcement with this message already exists');
          }
          if(error) {
            console.error('error connecting: ' + error.stack);
            return;
          }
      });
     connection.release();
    })
}

const registerMessage = function(message) {
  db(function(err, connection) {
        if(err) {
          console.log('error connecting: ' + err.stack);
          return;
        }
        connection.query({
            sql: 'INSERT INTO `Announcements` SET ?',
            timeout: 40000
          },
          [message],
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
  messageExists,
  registerMessage
}
