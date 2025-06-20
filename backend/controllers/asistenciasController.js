
const Asistencia = require('../models/Asistencia');

exports.clockIn = async (req, res) => {
  const { userId, location, timestamp } = req.body;

  try {
    const fecha = new Date(timestamp).toISOString().slice(0, 10);
    const nuevoRegistro = await Asistencia.create({
      userId,
      fecha,
      location,
      clockIn: timestamp
    });
    return res.status(200).json({ message: 'Entrada registrada con éxito', registro: nuevoRegistro });
  } catch (error) {
    console.error('Error al registrar entrada:', error);
    return res.status(500).json({ message: 'Error al registrar la entrada.' });
  }
};

exports.clockOut = async (req, res) => {
  const { userId, timestamp } = req.body;

  try {
    const fecha = new Date(timestamp).toISOString().slice(0, 10);
    const registro = await Asistencia.findOne({ where: { userId, fecha } });
    if (!registro) {
      return res.status(404).json({ message: 'Registro de asistencia no encontrado' });
    }
    await registro.update({ clockOut: timestamp });
    return res.status(200).json({ message: 'Salida registrada con éxito', registro });
  } catch (error) {
    console.error('Error al registrar salida:', error);
    return res.status(500).json({ message: 'Error al registrar la salida.' });
  }
};

exports.obtenerHistorial = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'Falta el parámetro userId' });
  }
  try {
    const registros = await Asistencia.findAll({
      where: { userId },
      order: [['fecha', 'DESC']]
    });
    return res.json(registros);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return res
      .status(500)
      .json({ message: 'Error al obtener el historial de asistencias.' });
  }
};