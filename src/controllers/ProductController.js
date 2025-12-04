const { Product, Category, ProductSituation, ProductCategory } = require('../database/models');
const paginate = require('../services/pagination'); // Se estiver usando o arquivo que criamos

module.exports = {
  // INDEX COM PAGINAÇÃO
  async index(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const result = await paginate(Product, {
        include: [
          { model: ProductCategory, as: 'category' }, // Atenção: Model correto é ProductCategory
          { model: ProductSituation, as: 'situation' }
        ],
        order: [['id', 'DESC']]
      }, page, limit);

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  },

  async show(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { model: ProductCategory, as: 'category' },
          { model: ProductSituation, as: 'situation' }
        ]
      });

      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
      return res.json(product);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  async store(req, res) {
    try {
      const { name, categoryId, situationId, price, description } = req.body;

      // Mapeando: categoryId (front) -> productCategoryId (banco)
      const product = await Product.create({
        name,
        description,
        price: price || 0,
        productCategoryId: categoryId, 
        productSituationId: situationId
      });

      return res.status(201).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar produto' });
    }
  },

  async update(req, res) {
    try {
      const { name, categoryId, situationId, price, description } = req.body;
      const product = await Product.findByPk(req.params.id);

      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

      // Atualiza apenas se o campo foi enviado
      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (categoryId) product.productCategoryId = categoryId; // Mapeamento
      if (situationId) product.productSituationId = situationId; // Mapeamento

      await product.save();
      return res.json(product);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

      await product.destroy();
      return res.json({ message: 'Produto removido com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover produto' });
    }
  }
};