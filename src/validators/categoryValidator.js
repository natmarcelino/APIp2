const { body, param } = require('express-validator');

module.exports = {
  store: [
    body('name')
      .notEmpty().withMessage('Nome é obrigatório')
      .isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres')
  ],

  update: [
    param('id').isUUID(4).withMessage('ID da categoria inválido (deve ser UUID)'),
    body('name')
      .optional()
      .isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres')
  ],

  show: [
    param('id').isUUID(4).withMessage('ID da categoria inválido (deve ser UUID)')
  ],

  delete: [
    param('id').isUUID(4).withMessage('ID da categoria inválido (deve ser UUID)')
  ]
};