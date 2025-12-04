const { body, param } = require('express-validator');

module.exports = {
  store: [
    body('name')
      .notEmpty().withMessage('Nome é obrigatório')
      .isLength({ min: 2 }).withMessage('Nome muito curto'),

    body('categoryId')
      .notEmpty().withMessage('Categoria é obrigatória')
      .isInt().withMessage('categoryId deve ser inteiro'),

    body('situationId')
      .notEmpty().withMessage('Situação é obrigatória')
      .isInt().withMessage('situationId deve ser inteiro'),

    body('price')
      .optional()
      .isFloat({ min: 0 }).withMessage('Preço deve ser positivo'),

    body('stock')
      .optional()
      .isInt({ min: 0 }).withMessage('Estoque deve ser positivo')
  ],

  update: [
    param('id').isInt().withMessage('ID do produto inválido'),
    
    body('name').optional().isLength({ min: 2 }),
    body('categoryId').optional().isInt(),
    body('situationId').optional().isInt(),
    body('price').optional().isFloat({ min: 0 }),
    body('stock').optional().isInt({ min: 0 })
  ],

  show: [
    param('id').isInt().withMessage('ID do produto inválido')
  ],

  delete: [
    param('id').isInt().withMessage('ID do produto inválido')
  ]
};