const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Acadex_db', 'root', 'MySQL2002mif', {
  host: 'localhost',
  dialect: 'mysql', 
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the MySQL database with Sequelize');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
