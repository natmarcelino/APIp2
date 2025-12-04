const { body, param } = require('express-validator');

module.exports = {
  // Validação para atualização
  update: [
    param('id')
      .isInt().withMessage('ID inválido'),

    body('name')
      .optional()
      .isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),

    body('email')
      .optional()
      .isEmail().withMessage('E-mail inválido'),

    body('password')
      .optional()
      .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
  ],

  // Validação para visualizar usuário
  show: [
    param('id')
      .isInt().withMessage('ID inválido')
  ],

  // Validação para deletar usuário
  delete: [
    param('id')
      .isInt().withMessage('ID inválido')
  ]
};
