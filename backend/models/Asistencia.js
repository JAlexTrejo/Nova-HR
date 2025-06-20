const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Asistencia = sequelize.define('Asistencia', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  location: DataTypes.STRING,
  clockIn: DataTypes.DATE,
  comidaInicio: DataTypes.DATE,
  comidaFin: DataTypes.DATE,
  clockOut: DataTypes.DATE,
});

module.exports = Asistencia;
