const { body, param } = require('express-validator');

module.exports = {
  update: [
    param('id').isInt().withMessage('ID inválido'),
    body('name').optional().isLength({ min: 2 }),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 })
  ],

  show: [
    param('id').isInt().withMessage('ID inválido')
  ],

  delete: [
    param('id').isInt().withMessage('ID inválido')
  ]
};