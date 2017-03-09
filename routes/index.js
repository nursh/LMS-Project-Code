let express = require('express'),
    register = require('../models/RegisterHelper'),
    chance = require('chance').Chance(),
    signin = require('../models/SigninHelper');
    router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {layout: false});
});

router.get('/sign-in', function(req, res) {
  res.render('sign-in', {layout: false, success: req.session.success, errors: req.session.errors, notreg: req.session.notreg, details: req.session.details});
  req.session.details = null;
  req.session.notreg = null;
  req.session.errors = null;
});

router.get('/register', function(req, res) {
  res.render('register', {layout: false,  success: req.session.success, errors: req.session.errors, exists: req.session.exists, newguy: req.session.newguy});
  req.session.newguy = null;
  req.session.errors = null;
  req.session.exists = null;
});


router.post('/sign-in', function(req, res) {
  req.check('email', 'Email is not valid').isEmail();

  let errors = req.validationErrors();
    if(errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('sign-in');
    } else {
      let User = {
        email: req.body.email,
        password: req.body.password
      };
      signin.getUser(User, function(result) {
        if(!result) {
          req.session.notreg = 'User is not registered';
          res.redirect('sign-in');
        } else {
          req.session.success = true;
          req.session.result = result;
          switch (result.role) {
            case 'Teacher': res.redirect('teacher');
                            break;
            case 'Student': res.redirect('student');
                            break;
            default: req.session.details = 'Login details are not correct';
                     res.redirect('sign-in');

          }
        }
      });
    }
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
        id: chance.integer({min: 100000, max: 999990}),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.userRole
      };
      register.userExists(User, function(exists){
        if(!exists) {
          req.session.success = true;
          req.session.newguy = 'User has successfully registered'
          register.registerUser(User);
          res.redirect('register');
        } else {
          req.session.exists = 'User is already registered';
          res.redirect('register');
        }
      });
    }
})

module.exports = router;
