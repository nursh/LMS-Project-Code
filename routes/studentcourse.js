let express = require('express'),
    course = require('../models/soloCourse'),
    courseTests = require('../models/getCourseTestsHelper'),
    questions = require('../models/getTestQuestionsHelper'),
    getAnn = require('../models/getCourseAnnouncementsHelper'),
    getSingleTest = require('../models/getSingleCourseTestHelper');
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

router.get('/test/:testid', function(req, res) {
  req.session.ttid = req.params.testid;
  res.redirect('/studentcourse/viewTest');
})

router.get('/viewTest', function(req, res) {
  let ques = {
    cid: req.session.cnum.number,
    tid: req.session.ttid
  }
  questions.getQuestions(ques, function(result){
    getSingleTest.getSingleTest(ques, function(result) {
      req.session.ttest = result;
      res.render('studentViewTest', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name, testile: req.session.ttest.title, dur: req.session.ttest.duration})
    })
  })
})

module.exports = router;
