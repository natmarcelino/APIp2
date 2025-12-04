const { ProductCategory } = require('../database/models');

module.exports = {
  async index(req, res) {
    try {
      const list = await ProductCategory.findAll({
        order: [['id', 'DESC']]
      });

      return res.json(list);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar categorias de produto' });
    }
  },

  async store(req, res) {
    try {
      const { name } = req.body;

      const created = await ProductCategory.create({ name });
      return res.json(created);

    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar categoria de produto' });
    }
  }
};
