const router = require('express').Router();
const ProductCategoryController = require('../controllers/ProductCategoryController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productCategoryValidator = require('../validators/productCategoryValidator');

router.get('/', ProductCategoryController.index);

router.get('/:id', productCategoryValidator.show, validate, ProductCategoryController.show);

router.post('/', auth, productCategoryValidator.store, validate, ProductCategoryController.store);

router.put('/:id', auth, productCategoryValidator.update, validate, ProductCategoryController.update);

router.delete('/:id', auth, productCategoryValidator.delete, validate, ProductCategoryController.delete);

module.exports = router;