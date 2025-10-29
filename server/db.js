const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Connected to PostgreSQL successfully'))
  .catch(err => console.error('❌ Connection failed:', err));

module.exports = sequelize;
