const router = require('express').Router();
const OccurrenceController = require('../controllers/OccurrenceController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const occurrenceValidator = require('../validators/occurrenceValidator');


router.get('/', OccurrenceController.index);


router.get('/:id', occurrenceValidator.show, validate, OccurrenceController.show);

// CRIAR (Autenticado)
router.post('/', auth, occurrenceValidator.store, validate, OccurrenceController.store);

// ATUALIZAR (Autenticado + Validação)
router.put('/:id', auth, occurrenceValidator.update, validate, OccurrenceController.update);

// DELETAR (Autenticado)
router.delete('/:id', auth, occurrenceValidator.delete, validate, OccurrenceController.delete);

module.exports = router;