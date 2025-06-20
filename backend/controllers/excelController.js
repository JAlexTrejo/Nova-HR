
const ExcelJS = require('exceljs');

exports.generarReporteNomina = async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const hoja = workbook.addWorksheet('Nómina Semanal');

  hoja.columns = [
    { header: 'Nombre', key: 'nombre' },
    { header: 'Horas Trabajadas', key: 'horas' },
    { header: 'Deducciones', key: 'deducciones' },
    { header: 'Pago Neto', key: 'neto' }
  ];

  hoja.addRows([
    { nombre: 'Claudia Berenice', horas: 40, deducciones: 100, neto: 1900 },
    { nombre: 'Jose Luis Malvaez', horas: 38, deducciones: 150, neto: 1750 }
  ]);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=nomina.xlsx');

  await workbook.xlsx.write(res);
  res.end();
};
