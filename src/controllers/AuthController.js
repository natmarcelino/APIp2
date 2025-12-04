const { User } = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
  // -----------------------------
  // CADASTRO
  // -----------------------------
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;

      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(400).json({ error: "Email já cadastrado" });

      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hash });
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    } catch (err) {
      return res.status(500).json({ error: "Erro interno ao criar usuário" });
    }
  },

  // -----------------------------
  // LOGIN
  // -----------------------------
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Senha incorreta" });

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.json({ token });
    } catch (err) {
      return res.status(500).json({ error: "Erro interno ao fazer login" });
    }
  },

  // -----------------------------
  // GERAR TOKEN DE RECUPERAÇÃO
  // -----------------------------
  async forgot(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "Email não encontrado" });

      const token = crypto.randomBytes(20).toString("hex");
      const expires = new Date(Date.now() + 3600000); // 1h

      user.recoverPassword = token;
      user.resetExpires = expires;
      await user.save();

      return res.json({
        message: "Token gerado",
        token
      });

    } catch (err) {
      return res.status(500).json({ error: "Erro ao gerar token" });
    }
  },

  // -----------------------------
  // RESETAR SENHA
  // -----------------------------
  async reset(req, res) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await User.findOne({
        where: {
          recoverPassword: token
        }
      });

      if (!user)
        return res.status(400).json({ error: "Token inválido" });

      if (user.resetExpires < new Date())
        return res.status(400).json({ error: "Token expirado" });

      const hash = await bcrypt.hash(password, 10);

      user.password = hash;
      user.recoverPassword = null;
      user.resetExpires = null;
      await user.save();

      return res.json({ message: "Senha alterada com sucesso" });

    } catch (err) {
      return res.status(500).json({ error: "Erro ao redefinir senha" });
    }
  }
};
