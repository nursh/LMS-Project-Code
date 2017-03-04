let express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('manageCourses', {layout: 'teacherMain', name: req.session.result.name});
});

router.get('/createCourse', function(req, res) {
  res.render('createCourse', {layout: 'teacherMain', name: req.session.result.name});
});

router.post('/manageCourses', function(req, res) {



  //res.render('manageCourses', {layout: 'teacherMain', name: req.session.result.name});
})


module.exports = router;
