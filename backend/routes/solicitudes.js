
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  solicitarVacaciones,
  subirComprobante,
  solicitarAclaracion,
  obtenerSueldoVigente
} = require('../controllers/solicitudesController');

router.post('/vacaciones', solicitarVacaciones);
router.post('/comprobante', upload.single('archivo'), subirComprobante);
router.post('/aclaracion', solicitarAclaracion);
router.get('/sueldo', obtenerSueldoVigente);

module.exports = router;
