
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Load environment variables from `.env` or fallback to `.env.example`
const envPath = fs.existsSync(path.join(__dirname, '.env'))
  ? path.join(__dirname, '.env')
  : path.join(__dirname, '.env.example');
require('dotenv').config({ path: envPath });

const sequelize = require('./models');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/excel', require('./routes/excel'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/nomina', require('./routes/nomina'));
app.use('/api/solicitudes', require('./routes/solicitudes'));
// Rutas de asistencias (clock-in/out e historial)
app.use('/api/asistencias', require('./routes/asistencias'));

// Puerto
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Base de datos conectada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar la base de datos:', err);
  });
