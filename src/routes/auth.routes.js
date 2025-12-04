const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const authValidator = require('../validators/authValidator');
const validate = require('../middlewares/validate');

// ROTAS COM VALIDAÇÃO
router.post('/signup', authValidator.signup, validate, AuthController.signup);
router.post('/signin', authValidator.signin, validate, AuthController.signin);

module.exports = router;
