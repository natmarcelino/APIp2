const router = require('express').Router();
const OccurrenceController = require('../controllers/OccurrenceController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const occurrenceValidator = require('../validators/occurrenceValidator');

// LISTAR TODAS AS OCORRÊNCIAS
router.get('/', OccurrenceController.index);

// CRIAR OCORRÊNCIA (somente usuário logado)
router.post('/', auth, occurrenceValidator.store, validate, OccurrenceController.store);

module.exports = router;
