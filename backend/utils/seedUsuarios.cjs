
const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcryptjs');
const sequelize = require('../models/index');
const User = require('../models/User');

sequelize.sync({ force: true }).then(() => {
  const usuarios = [];

  fs.createReadStream('./utils/Users.csv')
    .pipe(csv())
    .on('data', (row) => {
      const nombre = row['Nombre'];
      const email = row['Email'] || `${nombre.split(" ")[0].toLowerCase()}@ejemplo.com`;
      const rol = (nombre.includes('TREJO CONTRERAS JOSE ALEJANDRO')) ? 'SuperAdmin' :
                  (nombre.includes('BRENDA') || nombre.includes('KAREN')) ? 'Admin' : 'User';

      usuarios.push({
        nombre,
        email,
        puesto: row['Puesto'] || '',
        obra: row['Office / Name'] || '',
        residente: row['Residente '] || '',
        rol,
        sueldoHora: parseFloat(row['Sueldo por Hr.'] || 0),
        sueldoSemanal: parseFloat(row['Sueldo Semanal'] || 0),
        passwordHash: bcrypt.hashSync('123456', 10)
      });
    })
    .on('end', async () => {
      await User.bulkCreate(usuarios);
      console.log('Usuarios cargados correctamente.');
      process.exit();
    });
});
