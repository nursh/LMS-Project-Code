const db = require('../dbconfig'),
      fs = require('fs');



const getAnnouncements = function(number, callback) {
    db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    connection.query({
      sql: 'SELECT * FROM `Announcements` WHERE `cnumber` = ? ORDER BY date DESC',
      timeout: 40000
      },
      [number],
      function (error, results) {
        if(error) {
         console.error('error connecting: ' + error.stack);
         return;
        }
        fs.writeFile('public/json/courseannouncements.json', JSON.stringify(results), function (err) {
          if (err) throw err;
        });
        if(results.length === 0) {
          return callback('There are no announcements at the moment')
        }
        return callback(false);
      });
    connection.release();
    })
}


module.exports = {
  getAnnouncements
}
