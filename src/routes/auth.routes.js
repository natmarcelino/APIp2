const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const authValidator = require('../validators/authValidator');
const validate = require('../middlewares/validate');

// ROTAS DE LOGIN
router.post('/signup', authValidator.signup, validate, AuthController.signup);
router.post('/signin', authValidator.signin, validate, AuthController.signin);

// ROTAS DE RECUPERAÇÃO DE SENHA
router.post('/forgot', AuthController.forgot);
router.post('/reset/:token', AuthController.reset);

module.exports = router;
