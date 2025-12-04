const router = require('express').Router();
const SituationController = require('../controllers/SituationController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const situationValidator = require('../validators/situationValidator');

router.get('/', SituationController.index);

router.get('/:id', situationValidator.show, validate, SituationController.show);

router.post('/', auth, situationValidator.store, validate, SituationController.store);

router.put('/:id', auth, situationValidator.update, validate, SituationController.update);

router.delete('/:id', auth, situationValidator.delete, validate, SituationController.delete);

module.exports = router;