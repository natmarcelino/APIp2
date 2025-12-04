const { Occurrence, User, Product } = require('../database/models');

module.exports = {

  async index(req, res) {
    try {
      const occurrences = await Occurrence.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Product, as: 'product' }
        ],
        order: [['id', 'DESC']]
      });

      return res.json(occurrences);

    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar ocorrências' });
    }
  },

  async store(req, res) {
    try {
      const { title, description, userId, productId } = req.body;

      const occurrence = await Occurrence.create({
        title,
        description,
        userId,
        productId: productId ?? null
      });

      return res.json(occurrence);

    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar ocorrência' });
    }
  }
};
