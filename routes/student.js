let express = require('express'),
    router = express.Router();


router.get('/', function(req, res) {
  res.render('viewCourses', {layout: 'StudentMain.handlebars', name: req.session.result.name});
});

router.get('/addCourse', function(req, res) {
  res.render('addCourse', {layout: 'StudentMain.handlebars', name: req.session.result.name});
});



module.exports = router;
