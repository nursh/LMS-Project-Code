let express = require('express'),
    course = require('../models/soloCourse'),
    router = express.Router();

router.get('/courses/:coursenumber', function(req, res) {
  course.getCourseByNumber(req.params.coursenumber, function(result){
    req.session.cnum = result;
    res.render('studentCourse', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name});
  });
});

router.get('/', function(req, res) {
  res.render('studentCourse', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name});
});

router.get('/tests', function(req, res) {
  res.render('studentCourseTests', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name});
});

router.get('/grades', function(req, res) {
  res.render('studentGrades', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name});
});

module.exports = router;
