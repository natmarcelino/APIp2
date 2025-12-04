const { body, param } = require('express-validator');

module.exports = {
  store: [
    body('nameSituation') // Ajustado para bater com o Model
      .notEmpty().withMessage('Nome da situação é obrigatório')
      .isLength({ min: 2 }).withMessage('Deve ter ao menos 2 caracteres')
  ],

  update: [
    param('id').isInt().withMessage('ID inválido'),
    body('nameSituation')
      .optional()
      .isLength({ min: 2 }).withMessage('Deve ter ao menos 2 caracteres')
  ],

  show: [
    param('id').isInt().withMessage('ID inválido')
  ],

  delete: [
    param('id').isInt().withMessage('ID inválido')
  ]
};