const router = require('express').Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const usersValidator = require('../validators/usersValidator');

// Usuários geralmente são dados sensíveis, então protegi o index com auth também
router.get('/', auth, UserController.index);

router.get('/:id', auth, usersValidator.show, validate, UserController.show);

router.put('/:id', auth, usersValidator.update, validate, UserController.update);

router.delete('/:id', auth, usersValidator.delete, validate, UserController.delete);

module.exports = router;