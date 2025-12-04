const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productValidator = require('../validators/productValidator');

// LISTAR PRODUTOS
router.get('/', ProductController.index);

// CRIAR PRODUTO
router.post('/', auth, productValidator.store, validate, ProductController.store);

module.exports = router;
