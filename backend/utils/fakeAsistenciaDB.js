
exports.obtenerRegistros = (userId, semana) => {
  // Simulación de registros de asistencia para una semana
  return {
    lunes: {
      clockIn: '2025-06-09T09:05:00',
      comidaInicio: '2025-06-09T14:00:00',
      comidaFin: '2025-06-09T15:10:00',
      clockOut: '2025-06-09T18:00:00',
    },
    martes: {
      clockIn: '2025-06-10T08:55:00',
      comidaInicio: '2025-06-10T14:00:00',
      comidaFin: '2025-06-10T15:00:00',
      clockOut: '2025-06-10T18:00:00',
    },
    miercoles: {
      clockIn: '2025-06-11T09:15:00',
      comidaInicio: '2025-06-11T14:00:00',
      comidaFin: '2025-06-11T15:30:00',
      clockOut: '2025-06-11T18:00:00',
    },
    jueves: {
      clockIn: '2025-06-12T09:00:00',
      comidaInicio: '2025-06-12T14:00:00',
      comidaFin: '2025-06-12T15:00:00',
      clockOut: '2025-06-12T18:00:00',
    },
    viernes: {
      clockIn: '2025-06-13T09:00:00',
      comidaInicio: '2025-06-13T14:00:00',
      comidaFin: '2025-06-13T15:00:00',
      clockOut: '2025-06-13T18:00:00',
    },
    sabado: {
      clockIn: '2025-06-14T09:00:00',
      comidaInicio: '2025-06-14T13:00:00',
      comidaFin: '2025-06-14T14:10:00',
      clockOut: '2025-06-14T14:00:00',
    }
  };
};
