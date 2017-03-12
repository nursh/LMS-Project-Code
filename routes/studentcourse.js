let express = require('express'),
    course = require('../models/soloCourse'),
    courseTests = require('../models/getCourseTestsHelper'),
    getAnn = require('../models/getCourseAnnouncementsHelper');
    router = express.Router();

router.get('/courses/:coursenumber', function(req, res) {
  course.getCourseByNumber(req.params.coursenumber, function(result){
    req.session.cnum = result;
    res.redirect('/studentcourse/');
  });
});

router.get('/', function(req, res) {
  getAnn.getAnnouncements(req.session.cnum.number, function(result){
      if(result){
        req.session.stanns = result;
      }
  res.render('studentCourse', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name, stanns: req.session.stanns});
  })
  req.session.stanns = null;
});

router.get('/tests', function(req, res) {
  courseTests.getTests(req.session.cnum.number, function(result){
    if(result){
      req.session.ctests = result;
    }
    res.render('studentCourseTests', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name, ctests: req.session.ctests});

  })
  req.session.ctests = null;
});

router.get('/grades', function(req, res) {
  res.render('studentGrades', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name});
});

module.exports = router;
