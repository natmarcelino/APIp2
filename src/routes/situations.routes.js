const express = require('express');
const router = express.Router();

const SituationController = require('../controllers/SituationController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const situationValidator = require('../validators/situationValidator');

// LISTAR SITUAÇÕES
router.get('/', SituationController.index);

// CRIAR SITUAÇÃO
router.post('/', auth, situationValidator.store, validate, SituationController.store);

module.exports = router;
