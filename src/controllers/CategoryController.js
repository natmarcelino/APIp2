const { Category } = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  },

  async show(req, res) {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    return res.json(category);
  },

  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const exists = await Category.findOne({ where: { name } });
    if (exists) {
      return res.status(400).json({ error: 'Categoria já existe' });
    }

    const category = await Category.create({ name });
    return res.status(201).json(category);
  },

  async update(req, res) {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const { name } = req.body;
    category.name = name || category.name;
    await category.save();

    return res.json(category);
  },

  async delete(req, res) {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await category.destroy();
    return res.json({ message: "Categoria removida com sucesso" });
  }
};
