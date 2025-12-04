const app = require('./app');
const db = require('./database/models');

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
  .then(() => {
    console.log("DATABASE CONNECTED");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("DATABASE ERROR:", err));
