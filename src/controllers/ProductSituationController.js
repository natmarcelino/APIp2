const { ProductSituation } = require('../database/models');

module.exports = {
  async index(req, res) {
    try {
      const list = await ProductSituation.findAll({ order: [['id', 'DESC']] });
      return res.json(list);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar situações' });
    }
  },

  async show(req, res) {
    try {
      const situation = await ProductSituation.findByPk(req.params.id);
      if (!situation) {
        return res.status(404).json({ error: 'Situação não encontrada' });
      }
      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar situação' });
    }
  },

  async store(req, res) {
    try {
      const { name } = req.body;
      const created = await ProductSituation.create({ name });
      return res.status(201).json(created);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar situação' });
    }
  },

  async update(req, res) {
    try {
      const { name } = req.body;
      const situation = await ProductSituation.findByPk(req.params.id);

      if (!situation) return res.status(404).json({ error: 'Situação não encontrada' });

      situation.name = name || situation.name;
      await situation.save();

      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar situação' });
    }
  },

  async delete(req, res) {
    try {
      const situation = await ProductSituation.findByPk(req.params.id);
      if (!situation) return res.status(404).json({ error: 'Situação não encontrada' });

      await situation.destroy();
      return res.json({ message: 'Situação removida com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover situação' });
    }
  }
};