const { Occurrence, User, Category } = require('../database/models');

module.exports = {
  async index(req, res) {
    try {
      const occurrences = await Occurrence.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Category, as: 'category' }
        ],
        order: [['createdAt', 'DESC']]
      });
      return res.json(occurrences);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar ocorrências' });
    }
  },

  async show(req, res) {
    try {
      const occurrence = await Occurrence.findByPk(req.params.id, {
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Category, as: 'category' }
        ]
      });

      if (!occurrence) return res.status(404).json({ error: 'Ocorrência não encontrada' });
      return res.json(occurrence);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar ocorrência' });
    }
  },

  async store(req, res) {
    try {
      const { title, description, categoryId } = req.body;
      // userId vem do token de autenticação (segurança)
      const userId = req.userId; 

      const occurrence = await Occurrence.create({
        title,
        description,
        userId,
        categoryId
      });

      return res.status(201).json(occurrence);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar ocorrência' });
    }
  },

  async update(req, res) {
    try {
      const { title, description, categoryId } = req.body;
      const occurrence = await Occurrence.findByPk(req.params.id);

      if (!occurrence) return res.status(404).json({ error: 'Ocorrência não encontrada' });

      // Opcional: Verificar se o usuário que está editando é o dono da ocorrência
      // if (occurrence.userId !== req.userId) return res.status(403).json({ error: 'Sem permissão' });

      if (title) occurrence.title = title;
      if (description) occurrence.description = description;
      if (categoryId) occurrence.categoryId = categoryId;

      await occurrence.save();
      return res.json(occurrence);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar ocorrência' });
    }
  },

  async delete(req, res) {
    try {
      const occurrence = await Occurrence.findByPk(req.params.id);
      if (!occurrence) return res.status(404).json({ error: 'Ocorrência não encontrada' });

      await occurrence.destroy();
      return res.json({ message: 'Ocorrência removida com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover ocorrência' });
    }
  }
};