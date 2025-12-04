const router = require('express').Router();
const ProductCategoryController = require('../controllers/ProductCategoryController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productCategoryValidator = require('../validators/productCategoryValidator');

// LISTAR
router.get('/', ProductCategoryController.index);

// CRIAR
router.post('/', auth, productCategoryValidator.store, validate, ProductCategoryController.store);

module.exports = router;
