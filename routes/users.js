const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const userController = require('../controllers/userController');
const permission =  require("../config/permissions");

//router.post('/create', userController.userCreate);
router.post('/get', protect, authorize(permission.USER_PERMISSION), userController.userGet);
router.post('/category', protect, authorize(permission.USER_PERMISSION), userController.createCategory);
router.get('/category', protect, authorize(permission.USER_PERMISSION), userController.getCategory);
router.get('/all-users', protect, authorize(permission.USER_PERMISSION), userController.getAllUsers);

module.exports = router;