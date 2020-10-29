var router = require('express').Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const permission =  require("../config/permissions");

router.post('/create', protect, authorize(permission.USER_PERMISSION),productController.addProduct);
router.get('/', protect, authorize(permission.USER_PERMISSION),productController.getProducts);

router.post('/category/create', protect, authorize(permission.USER_PERMISSION), productController.createCategory);
router.get('/category', protect, productController.getCategory);

router.post('/product-type/create', protect, authorize(permission.USER_PERMISSION), productController.createProductType);
router.get('/product-type', protect, productController.getProductType);

module.exports = router;