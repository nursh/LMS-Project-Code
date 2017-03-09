let express = require('express'),
    courseFinder = require('../models/searchCourseHelper'),
    courseRegister = require('../models/studentCourseRegisterHelper'),
    viewCourses = require('../models/studentViewCourses');
    fs = require('fs');
    router = express.Router();


router.get('/', function(req, res) {
  viewCourses.getCourses(req.session.result.id, function(result){
    if(result){
      req.session.regis = result;
      res.render('viewCourses', {layout: 'StudentMain.handlebars', name: req.session.result.name, regis: req.session.regis});
    } else {
      res.render('viewCourses', {layout: 'StudentMain.handlebars', name: req.session.result.name, regis: req.session.regis});
    }
  });
  req.session.regis = null
  clearFile();
});

router.get('/addCourse', function(req, res) {
  if(req.session.courseFound) {
    clearFile();
  }
  res.render('addCourse', {layout: 'StudentMain.handlebars', name: req.session.result.name, course: req.session.courseFound, reg: req.session.reg, notreg: req.session.notreg});
  req.session.reg = null;
  req.session.notreg = null;
  req.session.courseFound = null;
});

router.get('/register/:number', function(req, res) {
  let data = {
    coursenumber: req.params.number,
    studentnumber: req.session.result.id
  }
  courseRegister.studentExists(data, function(result) {
    if(!result) {
      courseRegister.studentRegister(data);
      req.session.reg = 'You have been successfully registered';
      res.redirect('/student/addCourse');
    } else {
      req.session.notreg = result;
      res.redirect('/student/addCourse');
    }
  });
})

router.post('/addCourse', function(req, res) {
  let type = req.body.search,
      code = req.body.searchinput;
  if (type === 'code') {
    courseFinder.getCourseByCode(code, function(result) {
      if(!result) {
        res.redirect('/student/addCourse');
      } else {
        req.session.courseFound = result;
        res.redirect('/student/addCourse');
      }
    });
  } else {
    courseFinder.getCourseByNumber(code, function(result) {
      if(!result) {
        res.redirect('/student/addCourse');
      } else {
        req.session.courseFound = result;
        res.redirect('/student/addCourse');
      }
    });
  }

});

const clearFile = function() {
  fs.writeFile('public/json/findCourse.json','', function (err) {
    if (err) throw err;
  });
}

module.exports = router;
