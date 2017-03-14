let express = require('express'),
    course = require('../models/soloCourse'),
    courseTests = require('../models/getCourseTestsHelper'),
    questions = require('../models/getTestQuestionsHelper'),
    getAnn = require('../models/getCourseAnnouncementsHelper'),
    ansReg = require('../models/testQuestionAnswerHelpers'),
    getSingleTest = require('../models/getSingleCourseTestHelper'),
    ansKey = require('../models/getAnswerKeyHelper'),
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
      res.render('studentCourseTests', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name, ctests: req.session.ctests, tans: req.session.tans, afail: req.session.afail});
  })
  req.session.ctests = null;
  req.session.tans = null;
  req.session.afail = null;
});

router.get('/test/:testid', function(req, res) {
  req.session.ttid = req.params.testid;
  let testAns = {
    test_id: req.session.ttid,
    course_id: req.session.cnum.number,
    student_id: req.session.result.id
  };
  ansReg.answersExists(testAns, function(result) {
    if(result) {
      req.session.afail = result;
      res.redirect('/studentcourse/tests');
    } else {
      res.redirect('/studentcourse/viewTest');
    }
  })
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

router.get('/revTest/:testid', function(req, res) {
  req.session.ttid = req.params.testid;
  res.redirect('/studentcourse/viewReviewTest');
})

router.get('/viewReviewTest', function(req, res) {
  let ques = {
    cid: req.session.cnum.number,
    tid: req.session.ttid
  }
  questions.getQuestions(ques, function(result){
    getSingleTest.getSingleTest(ques, function(result) {
      req.session.ttest = result;
      res.render('reviewTestQuestions', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name, testile: req.session.ttest.title, dur: req.session.ttest.duration})
    })
  })
})

router.post('/viewTest', function(req, res) {
  delete req.body.button;
  let ans = ''
  for (let key in req.body) {
    ans += req.body[key] + '-|-'
  }
  let testAns = {
    test_id: req.session.ttid,
    course_id: req.session.cnum.number,
    student_id: req.session.result.id,
    answers: ans
  }

  ansReg.registerAnswer(testAns);
  req.session.tans = 'Good Luck, You just submitted answers for a test';
  res.redirect('/studentcourse/tests');
})

router.get('/grades', function(req, res) {
  courseTests.getTests(req.session.cnum.number, function(result){
    if(result){
      req.session.ctests = result;
    }
    res.render('studentGrades', {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name, ctests: req.session.ctests, ttNot: req.session.ttNot});
    req.session.ctests = null;
    req.session.ttNot = null;
  })

});


router.get('/courses/stats/:testid', function(req, res) {
  req.session.ttid = req.params.testid;
  res.redirect('/studentcourse/getGrades');
})

router.get('/getGrades', function(req, res) {
  let answers = {
    cid: req.session.cnum.number,
    tid: req.session.ttid,
    sid: req.session.result.id
  }
  ansKey.getAnswerKeys(answers)
    ansReg.getAnswers(answers, function(result){
      if(!result) {
        res.redirect('/studentcourse/testGrades');
      } else {
        req.session.ttNot = result;
        res.redirect('/studentcourse/grades');
      }
    })
})

router.get('/testGrades', function(req, res) {
    res.render('studentTestGrades',  {layout: 'studentCourseView', name: req.session.result.name, cname: req.session.cnum.name});
})


module.exports = router;
