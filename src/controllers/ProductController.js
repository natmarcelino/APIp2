const { Product, Category, ProductSituation } = require('../database/models');

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Category, as: 'category' },
          { model: ProductSituation, as: 'situation' }
        ]
      });

      return res.json(products);

    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  },

  async store(req, res) {
    try {
      const { name, categoryId, situationId, price, stock } = req.body;

      const exists = await Product.findOne({ where: { name } });
      if (exists)
        return res.status(400).json({ error: 'Produto já cadastrado' });

      const product = await Product.create({
        name,
        categoryId,
        situationId,
        price: price ?? 0,
        stock: stock ?? 0
      });

      return res.json(product);

    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar produto' });
    }
  }
};
