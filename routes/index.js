let express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/sign-in', function(req, res) {
  res.render('sign-in');
});

router.get('/register', function(req, res) {
  res.render('register');
})


module.exports = router;
