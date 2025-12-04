const { ProductSituation } = require('../database/models');

module.exports = {
  async index(req, res) {
    try {
      const list = await ProductSituation.findAll({
        order: [['id', 'DESC']]
      });
      return res.json(list);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar situações de produto' });
    }
  },

  async store(req, res) {
    try {
      const { name } = req.body;

      const created = await ProductSituation.create({ name });
      return res.json(created);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar situação de produto' });
    }
  }
};
