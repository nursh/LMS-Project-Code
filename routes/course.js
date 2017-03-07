let express = require('express'),
    router = express.Router();

router.get('/:coursenumber', function(req, res) {
  res.render('course', {layout: false, name: req.params.coursenumber });
});

module.exports = router;
