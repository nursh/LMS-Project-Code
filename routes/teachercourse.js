let express = require('express'),
    course = require('../models/soloCourse'),
    router = express.Router();

router.get('/course/:coursenumber', function(req, res) {
  course.getCourseByNumber(req.params.coursenumber, function(result){
    req.session.tnum = result;
  });
  res.render('teacherCourse', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name});
});

router.get('/', function(req, res) {
  res.render('teacherCourse', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name});
});

router.get('/tests', function(req, res) {
  res.render('teacherCourseTest', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name});
});

router.get('/grades', function(req, res) {
  res.render('teacherGradeView', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name});
});



module.exports = router;
