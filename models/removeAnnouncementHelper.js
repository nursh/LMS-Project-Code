const db = require('../dbconfig'),
      fs = require('fs');



const removeAnnouncement = function(ann, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'DELETE FROM `Announcements` WHERE `message` = ? ',
      timeout: 40000
      },
      [ann],
      function (error, results) {
        if(error) {
         console.error('error connecting: ' + error.stack);
         return;
        }
      });
    connection.release();
    })
}


module.exports = {
  removeAnnouncement
}
