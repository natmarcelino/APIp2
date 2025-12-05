const { body, param } = require('express-validator');

module.exports = {
  store: [
    body('name')
      .notEmpty().withMessage('Nome é obrigatório')
      .isLength({ min: 2 }).withMessage('Nome muito curto'),

    body('productCategoryId')
      .notEmpty().withMessage('Categoria é obrigatória')
      .isInt().withMessage('productCategoryId deve ser inteiro'),

    body('productSituationId')
      .notEmpty().withMessage('Situação é obrigatória')
      .isInt().withMessage('productSituationId deve ser inteiro'),

    body('price')
      .notEmpty().withMessage('Preço é obrigatório')
      .isFloat({ min: 0 }).withMessage('Preço deve ser positivo'),
  ],

  update: [
    param('id').isInt().withMessage('ID do produto inválido'),
    
    body('name').optional().isLength({ min: 2 }),

    body('productCategoryId')
      .optional()
      .isInt().withMessage('productCategoryId deve ser inteiro'),

    body('productSituationId')
      .optional()
      .isInt().withMessage('productSituationId deve ser inteiro'),

    body('price')
      .optional()
      .isFloat({ min: 0 }).withMessage('Preço deve ser positivo'),
  ],

  show: [
    param('id').isInt().withMessage('ID do produto inválido')
  ],

  delete: [
    param('id').isInt().withMessage('ID do produto inválido')
  ]
};
