const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const categoryValidator = require('../validators/categoryValidator');
const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.index);
router.post('/', auth, categoryValidator.store, validate, CategoryController.store);

module.exports = router;
