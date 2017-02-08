let express = require('express'),
    register = require('../models/RegisterHelper'),
    signin = require('../models/SigninHelper');
    router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {layout: false});
});

router.get('/sign-in', function(req, res) {
  res.render('sign-in', {layout: false, success: req.session.success, errors: req.session.errors, notreg: req.session.notreg, details: req.session.details});
});

router.get('/register', function(req, res) {
  res.render('register', {layout: false,  success: req.session.success, errors: req.session.errors, exists: req.session.exists});
});

router.get('/student', function(req, res) {
  res.render('student', {layout: false, name: req.session.name});
});

router.get('/teacher', function(req, res) {
  res.render('teacher', {layout: false, name: req.session.name});
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
          switch (result.role) {
            case 'Teacher': req.session.success = true;
                            req.session.name = result.name;
                            res.redirect('teacher');
                            break;
            case 'Student': req.session.success = true;
                            req.session.name = result.name;
                            res.redirect('student');
                            break;
            default: req.session.details = 'Login details are not correct';
                     res.redirect('sign-in');

          }
        }
      });
    }
});

router.post('/regsubmit', function(req, res) {
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
      register.userExists(User, function(exists){
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
