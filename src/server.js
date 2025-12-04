const app = require('./app');
const db = require('./database/models');

const PORT = process.env.PORT || 3000;

// O método sync() verifica os modelos e cria as tabelas se não existirem
// { force: false } é o padrão: garante que ele NÃO apague dados existentes
db.sequelize.sync({ force: false }) 
  .then(() => {
    console.log("DATABASE CONNECTED AND SYNCED");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("DATABASE ERROR:", err));