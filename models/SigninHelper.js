const db = require('../dbconfig'),
  bcrypt = require('bcryptjs');

function encrypt(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function decrypt(password, hash) {
  return bcrypt.compareSync(password, hash);
}

const getUser = function(user, callback) {
  db(function(err, connection) {
      if(err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
  connection.query({
          sql: 'SELECT * FROM `Users` where `email` =  ? ',
          timeout: 40000
        },
        [user.email],
        function (error, results) {
          if(results.length === 0) {
            return callback(false);
          } else {
            let hash = (results[0].password);
            if(decrypt(user.password, hash)) {
              return callback(results[0]);
            } else {
              return callback('Login not valid');
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

module.exports = {
  getUser
}
