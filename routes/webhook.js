var router = require('express').Router();
const webHookController = require('../controllers/webHookController');


router.post('/test', webHookController.webhooktest);

module.exports = router;