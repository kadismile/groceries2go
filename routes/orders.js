var router = require('express').Router();
const orderController = require('../controllers/ordersController');
const { protect, authorize } = require('../middleware/auth');
const permission =  require("../config/permissions");


router.post('/create', orderController.createOrder);

module.exports = router;
