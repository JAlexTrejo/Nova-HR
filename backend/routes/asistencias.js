
const express = require('express');
const router = express.Router();
const {
  clockIn,
  clockOut,
  obtenerHistorial
} = require('../controllers/asistenciasController');

router.post('/clock-in', clockIn);
router.post('/clock-out', clockOut);
router.get('/historial', obtenerHistorial);

module.exports = router;
