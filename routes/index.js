let express = require('express'),
    user = require('../models/RegisterHelper'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {layout: false});
});

router.get('/sign-in', function(req, res) {
  res.render('sign-in', {layout: false});
});

router.get('/register', function(req, res) {
  res.render('register', {layout: false,  success: req.session.success, errors: req.session.errors, exists: req.session.exists});
});

router.post('/submit', function(req, res) {
  req.check('name',  'Name should not be empty or contain numbers').matches(/^[A-Za-z\s]+$/);
  req.check('email', 'Email should not be empty or is invalid').isEmail();
  req.check('password', 'Password length must be greater than 6').isLength({min: 6});
  req.check('confirmPassword', 'Confirm Password does not match Password').equals(req.body.password);

  let errors = req.validationErrors();
    if(errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('register');
    } else {
      let User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.userRole
      };
      user.userExists(User, function(exists){
        if(!exists) {
          req.session.success = true;
          user.registerUser(User);
          res.redirect('sign-in');
        } else {
          req.session.exists = 'User is already registered';
          res.redirect('register');
        }
      });
    }
})

module.exports = router;
