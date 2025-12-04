const { body, param } = require('express-validator');

module.exports = {
  store: [
    body('name')
      .notEmpty().withMessage('Nome é obrigatório')
      .isLength({ min: 2 }).withMessage('Nome muito curto')
  ],

  update: [
    param('id').isInt().withMessage('ID inválido'),
    body('name').optional().isLength({ min: 2 })
  ],

  show: [
    param('id').isInt().withMessage('ID inválido')
  ],

  delete: [
    param('id').isInt().withMessage('ID inválido')
  ]
};