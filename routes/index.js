let express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {layout: false});
});

router.get('/sign-in', function(req, res) {
  res.render('sign-in', {layout: false});
});

router.get('/register', function(req, res) {
  res.render('register', {layout: false});
})


module.exports = router;
