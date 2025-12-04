const router = require('express').Router();
const ProductSituationController = require('../controllers/ProductSituationController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productSituationValidator = require('../validators/productSituationValidator');

router.get('/', ProductSituationController.index);

router.get('/:id', productSituationValidator.show, validate, ProductSituationController.show);

router.post('/', auth, productSituationValidator.store, validate, ProductSituationController.store);

router.put('/:id', auth, productSituationValidator.update, validate, ProductSituationController.update);

router.delete('/:id', auth, productSituationValidator.delete, validate, ProductSituationController.delete);

module.exports = router;