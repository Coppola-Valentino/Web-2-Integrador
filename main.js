const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('web2.2', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false
});

module.exports = sequelize;

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });