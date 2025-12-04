const { body } = require('express-validator');

module.exports = {
  store: [
    body('name')
      .notEmpty().withMessage('Nome é obrigatório')
      .isLength({ min: 2 }).withMessage('Nome deve ter no mínimo 2 caracteres'),

    body('categoryId')
      .notEmpty().withMessage('ID da categoria é obrigatório')
      .isInt().withMessage('categoryId deve ser um número inteiro'),

    body('situationId')
      .notEmpty().withMessage('ID da situação é obrigatório')
      .isInt().withMessage('situationId deve ser um número inteiro'),

    body('price')
      .optional()
      .isFloat({ min: 0 }).withMessage('Preço deve ser um número maior ou igual a zero'),

    body('stock')
      .optional()
      .isInt({ min: 0 }).withMessage('Estoque deve ser um inteiro maior ou igual a zero')
  ]
};
