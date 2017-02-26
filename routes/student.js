let express = require('express'),
    router = express.Router();


router.get('/', function(req, res) {
  res.render('student', {layout: false, name: req.session.name});
});



module.exports = router;
