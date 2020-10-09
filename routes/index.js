var router = require('express').Router();

router.get('/', function(req, res) {
  res.send('Index Page');
});

router.get('/about', function(req, res) {
  res.send('About Page');
});

module.exports = router;