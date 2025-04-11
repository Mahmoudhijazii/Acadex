const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('u602274543_studentx_db', 'u602274543_student_x', 'AboHmed25', {
  host: 'srv1904.hstgr.io',
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
