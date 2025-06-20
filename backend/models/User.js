
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  nombre: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  puesto: DataTypes.STRING,
  obra: DataTypes.STRING,
  residente: DataTypes.STRING,
  rol: { type: DataTypes.STRING, defaultValue: 'User' },
  sueldoHora: DataTypes.FLOAT,
  sueldoSemanal: DataTypes.FLOAT,
  passwordHash: DataTypes.STRING
});

module.exports = User;
