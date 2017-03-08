let express = require('express'),
    courseFinder = require('../models/searchCourseHelper'),
    fs = require('fs');
    router = express.Router();


router.get('/', function(req, res) {
  res.render('viewCourses', {layout: 'StudentMain.handlebars', name: req.session.result.name});
  clearFile();
});

router.get('/addCourse', function(req, res) {
  if(req.session.courseFound) {
    clearFile();
  }
  res.render('addCourse', {layout: 'StudentMain.handlebars', name: req.session.result.name, course: req.session.courseFound});
  req.session.courseFound = null;
});

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
