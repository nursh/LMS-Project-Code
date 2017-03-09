let express = require('express'),
    chance = require('chance').Chance(),
    register = require('../models/courseRegistrationHelper.js'),
    courses = require('../models/courseManagementHelper.js'),
    router = express.Router();

router.get('/', function(req, res) {
  courses.getCourses(req.session.result.id, function(result){
    if(result){
      req.session.cre = result;
      res.render('manageCourses', {layout: 'teacherMain', name: req.session.result.name, cre: req.session.cre });
    } else {
      res.render('manageCourses', {layout: 'teacherMain', name: req.session.result.name, cre: req.session.cre });
    }
  });
  req.session.cre = null;
});

router.get('/createCourse', function(req, res) {
  res.render('createCourse', {layout: 'teacherMain', name: req.session.result.name, course: req.session.courseExists, created: req.session.created});
  req.session.courseExists = null;
  req.session.created = null;
});

router.post('/createCourse', function(req, res) {
  // check course name and course field before querring database

  let course = {
    code: req.body.code,
    instructor_id: req.session.result.id,
    name: req.body.name,
    number: chance.integer({min: 10000, max: 99999})
  };

  register.courseExists(course, function(result) {
    if(!result){
      req.session.created = 'You have successfully created a course';
      register.registerCourse(course);
      res.redirect('/teacher/createCourse');
    } else {
      req.session.courseExists = result;
      res.redirect('/teacher/createCourse');
    }
  });
})


module.exports = router;
