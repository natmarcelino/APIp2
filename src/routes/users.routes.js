const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const usersValidator = require('../validators/usersValidator');
const UserController = require('../controllers/UserController');

// LISTAR TODOS OS USUÁRIOS
router.get('/', auth, UserController.index);

// LISTAR UM USUÁRIO
router.get('/:id', auth, usersValidator.show, validate, UserController.show);

// ATUALIZAR
router.put('/:id', auth, usersValidator.update, validate, UserController.update);

// DELETAR
router.delete('/:id', auth, usersValidator.delete, validate, UserController.delete);

module.exports = router;
