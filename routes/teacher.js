let express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('createCourse', {layout: 'teacherMain', name: req.session.name});
});


module.exports = router;
