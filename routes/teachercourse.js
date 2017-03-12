let express = require('express'),
    chance = require('chance').Chance(),
    testReg = require('../models/createTestHelper');
    courseTests = require('../models/getCourseTestsHelper');
    announcement = require('../models/makeAnnouncementHelper');
    getAnn = require('../models/getCourseAnnouncementsHelper');
    course = require('../models/soloCourse'),
    router = express.Router();

router.get('/course/:coursenumber', function(req, res) {
  course.getCourseByNumber(req.params.coursenumber, function(result){
    req.session.tnum = result;
    res.redirect('/teachercourse/');
  });
});

router.get('/', function(req, res) {
  getAnn.getAnnouncements(req.session.tnum.number, function(result){
      if(result){
        req.session.anns = result;
      }
      res.render('teacherCourse', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name, anns: req.session.anns});
  })
  req.session.anns = null;
});

router.get('/createTest', function(req, res) {
  res.render('teacherCreateTest', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name, tsucc: req.session.tsucc, tfail: req.session.tfail});
  req.session.tsucc = null;
  req.session.tfail = null;
});

router.post('/createTest', function(req, res) {
  let test = {
    title: req.body.testname,
    course_number: req.session.tnum.number,
    id: chance.integer({min: 100, max: 999}),
    duration: req.body.testduration
  };

  testReg.testExists(test, function(result) {
    if(!result){
      testReg.registerTest(test);
      req.session.tsucc = 'A new test was successfully created';
      res.redirect('/teachercourse/createTest');
    } else {
      req.session.tfail = result;
      res.redirect('/teachercourse/createTest');
    }
  });
})

router.get('/tests', function(req, res) {
  courseTests.getTests(req.session.tnum.number, function(result){
    if(result){
      req.session.ctests = result;
    }
    res.render('teacherCourseTests', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name, ctests: req.session.ctests});
    req.session.ctests = null;
  })

});

router.get('/testTemplates', function(req, res) {
    res.render('testTemplates', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name});
})

router.get('/basicTemplate', function(req, res) {
    res.render('basicTemplate', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name});
})

router.get('/makeAnnouncements', function(req, res) {
    res.render('courseAnnouncements', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name, msg: req.session.ann, msgfail: req.session.annfail});
    req.session.annfail = null;
    req.session.ann = null;
})

router.post('/makeAnnouncements', function(req, res) {
    let message = {
      message: req.body.message,
      cnumber: req.session.tnum.number
    };
    announcement.messageExists(message, function(result){
      if(!result) {
        req.session.ann = 'You have successfully created an announcement';
        announcement.registerMessage(message);
      } else {
        req.session.annfail = result;
      }
      res.redirect('/teachercourse/makeAnnouncements');
    });
})

router.get('/grades', function(req, res) {
  res.render('teacherGradeView', {layout: 'teacherCourseView', name: req.session.result.name, tname: req.session.tnum.name});
});



module.exports = router;
