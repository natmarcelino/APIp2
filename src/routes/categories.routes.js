const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const categoryValidator = require('../validators/categoryValidator');

router.get('/', CategoryController.index);

router.get('/:id', categoryValidator.show, validate, CategoryController.show);

router.post('/', auth, categoryValidator.store, validate, CategoryController.store);

router.put('/:id', auth, categoryValidator.update, validate, CategoryController.update);

router.delete('/:id', auth, categoryValidator.delete, validate, CategoryController.delete);

module.exports = router;