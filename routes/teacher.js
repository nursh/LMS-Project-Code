let express = require('express'),
    register = require('../models/courseRegistrationHelper.js'),
    courses = require('../models/courseManagementHelper.js'),
    router = express.Router();

router.get('/', function(req, res) {
  courses.getCourses(req.session.result.id);
  res.render('manageCourses', {layout: 'teacherMain', name: req.session.result.name });
});

router.get('/createCourse', function(req, res) {
  res.render('createCourse', {layout: 'teacherMain', name: req.session.result.name, course: req.session.courseExists});
  req.session.courseExists = null;
});

router.post('/createCourse', function(req, res) {
  let course = {
    code: req.body.code,
    instructor_id: req.session.result.id,
    name: req.body.name,
    number: req.body.number
  };

  register.courseExists(course, function(result) {
    if(!result){
      register.registerCourse(course);
      res.redirect('/teacher/createCourse');
    } else {
      req.session.courseExists = result;
      res.redirect('/teacher/createCourse');
    }
  });
})


module.exports = router;
