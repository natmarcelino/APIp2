const { Situation } = require('../database/models');

module.exports = {
  async index(req, res) {
    try {
      const situations = await Situation.findAll();
      return res.json(situations);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar situações de usuário' });
    }
  },

  async show(req, res) {
    try {
      const situation = await Situation.findByPk(req.params.id);
      if (!situation) return res.status(404).json({ error: 'Situação não encontrada' });
      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar situação' });
    }
  },

  async store(req, res) {
    try {
      const { nameSituation } = req.body; // Atenção: O model usa 'nameSituation'

      const exists = await Situation.findOne({ where: { nameSituation } });
      if (exists) return res.status(400).json({ error: 'Situação já cadastrada' });

      const situation = await Situation.create({ nameSituation });
      return res.status(201).json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar situação' });
    }
  },

  async update(req, res) {
    try {
      const { nameSituation } = req.body;
      const situation = await Situation.findByPk(req.params.id);

      if (!situation) return res.status(404).json({ error: 'Situação não encontrada' });

      situation.nameSituation = nameSituation || situation.nameSituation;
      await situation.save();

      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar situação' });
    }
  },

  async delete(req, res) {
    try {
      const situation = await Situation.findByPk(req.params.id);
      if (!situation) return res.status(404).json({ error: 'Situação não encontrada' });

      await situation.destroy();
      return res.json({ message: 'Situação removida com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover situação' });
    }
  }
};