
const express = require('express');
const router = express.Router();
const { generarReporteNomina } = require('../controllers/excelController');

router.get('/nomina', generarReporteNomina);

module.exports = router;
