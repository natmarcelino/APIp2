const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productValidator = require('../validators/productValidator');

router.get('/', ProductController.index);

router.get('/:id', productValidator.show, validate, ProductController.show);

router.post('/', auth, productValidator.store, validate, ProductController.store);

router.put('/:id', auth, productValidator.update, validate, ProductController.update);

router.delete('/:id', auth, productValidator.delete, validate, ProductController.delete);

module.exports = router;