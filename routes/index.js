var router = require('express').Router();
const path = require("path")
;
router.get('/:image', function(req, res) {
  res.sendFile(path.join(__dirname, `../public${req.url}`));
  //res.send('Index Page');
});

router.get('/about', function(req, res) {
  res.send('About Page');
});

module.exports = router;