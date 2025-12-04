const { User, Situation } = require('../database/models');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        include: [{ model: Situation, as: 'situation' }],
        attributes: { exclude: ['password', 'recoverPassword'] }
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{ model: Situation, as: 'situation' }],
        attributes: { exclude: ['password', 'recoverPassword'] }
      });

      if (!user)
        return res.status(404).json({ error: 'Usuário não encontrado' });

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user)
        return res.status(404).json({ error: 'Usuário não encontrado' });

      const { name, email, password, situationId } = req.body;

      if (email && email !== user.email) {
        const exists = await User.findOne({ where: { email } });
        if (exists)
          return res.status(400).json({ error: 'Email já em uso' });
      }

      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.situationId = situationId ?? user.situationId;

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      await user.save();

      const out = user.toJSON();
      delete out.password;
      delete out.recoverPassword;

      res.json(out);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user)
        return res.status(404).json({ error: 'Usuário não encontrado' });

      await user.destroy();
      res.json({ message: 'Usuário removido com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover usuário' });
    }
  }
};
