
// Simulación de BD será reemplazada por llamadas reales a Sequelize
// const asistenciaDB = require('../utils/fakeAsistenciaDB'); 
const Asistencia = require('../models/Asistencia'); // Asumiendo que has creado este modelo
const User = require('../models/User');

// La configuración de horarios debería venir de la base de datos
const HORARIO_POR_DEFECTO = {
  entrada: { hora: 9, minuto: 0 },
  salida: { lunesViernes: { hora: 18, minuto: 0 }, sabado: { hora: 14, minuto: 0 } },
  comidaMaxMinutos: 60
};

exports.obtenerNominaSemanal = async (req, res) => {
  const { userId, semana } = req.query;
  
  // 1. Obtener datos del usuario, incluyendo su tarifa por hora
  const usuario = await User.findByPk(userId);
  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  const sueldoBaseHora = usuario.sueldoHora; // Obtener de la DB
  const HORARIO = HORARIO_POR_DEFECTO; // TODO: Esto debería ser configurable por usuario/empresa
  
  // 2. Obtener registros de asistencia reales de la base de datos
  // const registros = await Asistencia.findAll({ where: { userId, semana }});
  const registros = {}; // Reemplaza esto con tu lógica de DB real
  
  // ... (el resto de tu lógica de cálculo de nómina permanece igual)
  // Asegúrate de que `registros` tenga la misma estructura que la que usabas de `fakeAsistenciaDB`
  const diasSemana = ['lunes','martes','miércoles','jueves','viernes','sábado'];
  let totalHoras = 0;
  let deducciones = 0;
  let faltas = 0;

  const detalles = diasSemana.map((dia) => {
    const registro = registros[dia];

    if (!registro || !registro.clockIn || !registro.clockOut) {
      faltas += 1;
      deducciones += 8; // Falta = 8 horas
      return { dia, status: 'Falta', horasTrabajadas: 0, deduccion: 8 };
    }

    const entradaReal = new Date(registro.clockIn);
    const salidaReal = new Date(registro.clockOut);
    const comidaInicio = new Date(registro.comidaInicio || registro.clockIn);
    const comidaFin = new Date(registro.comidaFin || comidaInicio);

    const horaEntradaPermitida = new Date(entradaReal);
    horaEntradaPermitida.setHours(HORARIO.entrada.hora, HORARIO.entrada.minuto, 0, 0);

    let retardo = entradaReal > horaEntradaPermitida ? true : false;
    if (retardo) deducciones += 0.5;

    let minutosComida = (comidaFin - comidaInicio) / (1000 * 60);
    if (minutosComida > HORARIO.comidaMaxMinutos) {
      const exceso = (minutosComida - HORARIO.comidaMaxMinutos) / 60;
      deducciones += exceso;
    }

    let horasDelDia = (salidaReal - entradaReal - (comidaFin - comidaInicio)) / (1000 * 60 * 60);
    horasDelDia = Math.max(horasDelDia, 0);
    totalHoras += horasDelDia;

    return {
      dia,
      status: 'Asistencia',
      horasTrabajadas: horasDelDia.toFixed(2),
      deduccion: retardo ? 0.5 : 0,
      excesoComida: minutosComida > HORARIO.comidaMaxMinutos ? (minutosComida - HORARIO.comidaMaxMinutos).toFixed(0) : 0
    };
  });

  const sueldoBruto = totalHoras * sueldoBaseHora;
  const sueldoNeto = sueldoBruto - (deducciones * sueldoBaseHora);

  return res.json({
    userId,
    semana,
    sueldoBruto: sueldoBruto.toFixed(2),
    deducciones: (deducciones * sueldoBaseHora).toFixed(2),
    sueldoNeto: sueldoNeto.toFixed(2),
    faltas,
    detalles
  });
};