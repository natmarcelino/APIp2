const { body, param } = require('express-validator');

module.exports = {
  store: [
    body('title')
      .notEmpty().withMessage('Título é obrigatório')
      .isLength({ min: 3 }).withMessage('Título muito curto'),

    body('description')
      .notEmpty().withMessage('Descrição é obrigatória')
      .isLength({ min: 5 }).withMessage('Descrição muito curta'),

    body('categoryId')
      .notEmpty().withMessage('Categoria é obrigatória')
      .isUUID(4).withMessage('categoryId deve ser um UUID válido'),

    body('productId')
      .optional()
      .isInt().withMessage('productId deve ser um número inteiro')
  ],

  update: [
    param('id').isUUID(4).withMessage('ID da ocorrência inválido (UUID)'),
    
    body('title').optional().isLength({ min: 3 }),
    body('description').optional().isLength({ min: 5 }),
    body('categoryId').optional().isUUID(4),
    body('productId').optional().isInt()
  ],

  show: [
    param('id').isUUID(4).withMessage('ID da ocorrência inválido (UUID)')
  ],

  delete: [
    param('id').isUUID(4).withMessage('ID da ocorrência inválido (UUID)')
  ]
};