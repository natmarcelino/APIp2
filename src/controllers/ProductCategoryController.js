const { ProductCategory } = require('../database/models');

module.exports = {
  // LISTAR TODOS
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

  // EXIBIR UM
  async show(req, res) {
    try {
      const category = await ProductCategory.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Categoria de produto não encontrada' });
      }
      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  },

  // CRIAR
  async store(req, res) {
    try {
      const { name } = req.body;
      const created = await ProductCategory.create({ name });
      return res.status(201).json(created);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar categoria de produto' });
    }
  },

  // ATUALIZAR
  async update(req, res) {
    try {
      const { name } = req.body;
      const category = await ProductCategory.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({ error: 'Categoria de produto não encontrada' });
      }

      category.name = name || category.name;
      await category.save();

      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  },

  // DELETAR
  async delete(req, res) {
    try {
      const category = await ProductCategory.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({ error: 'Categoria de produto não encontrada' });
      }

      await category.destroy();
      return res.json({ message: 'Categoria removida com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover categoria' });
    }
  }
};