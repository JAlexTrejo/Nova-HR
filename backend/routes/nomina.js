
const express = require('express');
const router = express.Router();
const { obtenerNominaSemanal } = require('../controllers/nominaController');

router.get('/semana', obtenerNominaSemanal);

module.exports = router;
