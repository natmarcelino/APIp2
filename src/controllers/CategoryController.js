const { Category } = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  async index(req, res) {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao listar categorias" });
    }
  },

  async show(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  },

  async store(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name } = req.body;

      // Verifica duplicidade
      const exists = await Category.findOne({ where: { name } });
      if (exists) {
        return res.status(400).json({ error: 'Categoria já existe' });
      }

      const category = await Category.create({ name });
      return res.status(201).json(category);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao criar categoria" });
    }
  },

  async update(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      const { name } = req.body;
      category.name = name || category.name;
      await category.save();

      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao atualizar categoria" });
    }
  },

  async delete(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      await category.destroy();
      return res.json({ message: "Categoria removida com sucesso" });
    } catch (err) {
      return res.status(500).json({ error: "Erro ao deletar categoria" });
    }
  }
};