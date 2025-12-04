const { body } = require('express-validator');

module.exports = {
  store: [
    body('title')
      .notEmpty().withMessage('Título é obrigatório')
      .isLength({ min: 3 }).withMessage('Título deve ter no mínimo 3 caracteres'),

    body('description')
      .notEmpty().withMessage('Descrição é obrigatória')
      .isLength({ min: 5 }).withMessage('Descrição deve ter no mínimo 5 caracteres'),

    body('userId')
      .notEmpty().withMessage('userId é obrigatório')
      .isInt().withMessage('userId deve ser inteiro'),

    body('productId')
      .optional()
      .isInt().withMessage('productId deve ser inteiro')
  ]
};
