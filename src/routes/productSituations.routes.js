const router = require('express').Router();
const ProductSituationController = require('../controllers/ProductSituationController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productSituationValidator = require('../validators/productSituationValidator');

// LISTAR
router.get('/', ProductSituationController.index);

// CRIAR
router.post('/', auth, productSituationValidator.store, validate, ProductSituationController.store);

module.exports = router;
