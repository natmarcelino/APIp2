const { Situation } = require('../database/models');

module.exports = {
  async index(req, res) {
    try {
      const situations = await Situation.findAll();
      return res.json(situations);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar situações' });
    }
  },

  async store(req, res) {
    try {
      const { name } = req.body;

      const exists = await Situation.findOne({ where: { name } });
      if (exists)
        return res.status(400).json({ error: 'Situação já cadastrada' });

      const situation = await Situation.create({ name });

      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar situação' });
    }
  }
};
