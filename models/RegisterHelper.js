const db = require('../dbconfig'),
  bcrypt = require('bcryptjs');

function encrypt(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function decrypt(password, hash) {
  return bcrypt.compareSync(password, hash);
}

const userExists = function(user, callback) {
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
              return callback(true);
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

const registerUser = function(user) {
  db(function(err, connection) {
        if(err) {
          console.log('error connecting: ' + err.stack);
          return;
        }
        user.password = encrypt(user.password);
        connection.query({
            sql: 'INSERT INTO `Users` SET ?',
            timeout: 40000
          },
          [user],
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
  userExists,
  registerUser
}
