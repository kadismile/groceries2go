var router = require('express').Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const permission =  require("../config/permissions");
const advancedResults = require("../middleware/advancedResults");
const Product = require('../models/Product');
const Category = require('../models/Category');

router.post('/create', protect, authorize(permission.USER_PERMISSION),productController.addProduct);
router.post('/update', protect, authorize(permission.USER_PERMISSION),productController.updateProduct);
router.get('/', protect, authorize(permission.USER_PERMISSION), advancedResults(Product), productController.getProducts);
router.get('/get/:productId', protect, authorize(permission.USER_PERMISSION),productController.getProductById);
router.post('/delete', protect, authorize(permission.USER_PERMISSION),productController.deleteProduct);
router.post('/update-image', protect, authorize(permission.USER_PERMISSION),productController.updateImages);
router.post('/upload-product-csv', protect, authorize(permission.USER_PERMISSION),productController.uploadProductCsv);
router.post('/upload-variant-csv', protect, authorize(permission.USER_PERMISSION),productController.uploadVariantCsv);
router.post('/delete-variant', protect, authorize(permission.USER_PERMISSION),productController.deleteVariant);
router.post('/update-variant', protect, authorize(permission.USER_PERMISSION),productController.updateVariant);
router.post('/update-all-variants', protect, authorize(permission.USER_PERMISSION), productController.populateProductVariants);

router.post('/search',productController.searchService);





router.post('/category/create', protect, authorize(permission.USER_PERMISSION), productController.createCategory);
router.get('/category', protect, advancedResults(Category), productController.getCategory);
router.post('/category/update', protect, productController.updateCategory);
router.post('/upload-category-csv', protect, authorize(permission.USER_PERMISSION),productController.uploadProductCsv);


router.post('/product-type/create', protect, authorize(permission.USER_PERMISSION), productController.createProductType);
router.get('/product-type', protect, productController.getProductType);
router.post('/product-type/update', protect, productController.updateProductType);
router.post('/upload-product-type-csv', protect, authorize(permission.USER_PERMISSION),productController.uploadProductTypeCsv);


/*MobileApp Api's*/
router.get('/get-random-products',productController.getRandomProducts);
router.get('/product-category/:categoryId',productController.getProductVariants);
router.get('/product-variant/:productId',productController.getVariants);
router.get('/variant/:variantId',productController.getVariantsById);
router.get('/product-type/:productTypeId',productController.getProductsByTypeId);

module.exports = router;