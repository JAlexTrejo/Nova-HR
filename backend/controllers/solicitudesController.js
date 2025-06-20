
const path = require('path');
const fs = require('fs');

exports.solicitarVacaciones = (req, res) => {
  const { userId, fechaInicio, fechaFin, motivo } = req.body;
  return res.status(200).json({
    message: 'Solicitud de vacaciones enviada para aprobación',
    datos: { userId, fechaInicio, fechaFin, motivo }
  });
};

exports.subirComprobante = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se recibió ningún archivo' });
  }
  return res.status(200).json({ message: 'Comprobante recibido correctamente', nombre: req.file.filename });
};

exports.solicitarAclaracion = (req, res) => {
  const { userId, mensaje } = req.body;
  return res.status(200).json({
    message: 'Aclaración recibida. Se revisará su caso.',
    datos: { userId, mensaje }
  });
};

exports.obtenerSueldoVigente = (req, res) => {
  const userId = req.query.userId;
  const sueldoBase = 50;
  const horasSemana = 40;
  const deducciones = 2.5 * sueldoBase;
  const horasExtra = 5;
  const pagoHorasExtra = horasExtra * sueldoBase * 1.5;

  const sueldo = {
    sueldoBase: (horasSemana * sueldoBase).toFixed(2),
    deducciones: deducciones.toFixed(2),
    horasExtra: horasExtra,
    pagoHorasExtra: pagoHorasExtra.toFixed(2),
    totalPagar: (horasSemana * sueldoBase - deducciones + pagoHorasExtra).toFixed(2)
  };

  return res.json(sueldo);
};
