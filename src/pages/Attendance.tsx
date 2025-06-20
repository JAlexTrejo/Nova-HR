
import { useState } from 'react';
import { Clock, MapPin, Calendar, Download } from 'lucide-react';
import { useHRStore } from '@/hooks/useHRStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';

export const Asistencia = () => {
  const { currentUser, timeEntries } = useHRStore();
  const [selectedWeek, setSelectedWeek] = useState(0);

  const userEntries = timeEntries.filter(entry => entry.userId === currentUser?.id);
  
  // Obtener semanas
  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const currentWeekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekStart = new Date(currentWeekStart);
    weekStart.setDate(weekStart.getDate() + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedWeek);
  const weekEntries = userEntries.filter(entry => weekDates.includes(entry.date));

  const calculateTotalHours = () => {
    return weekEntries.reduce((total, entry) => total + (entry.totalHours || 0), 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short' 
    });
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Control de Asistencia</h1>
            <p className="text-gray-600 mt-1">
              Gestiona tu tiempo de trabajo y revisa tu historial
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Week Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Resumen Semanal</span>
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedWeek(selectedWeek - 1)}
                >
                  ← Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedWeek(selectedWeek + 1)}
                  disabled={selectedWeek >= 0}
                >
                  Siguiente →
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {calculateTotalHours().toFixed(1)}h
                </div>
                <div className="text-sm text-blue-800">Total Semana</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {weekEntries.length}
                </div>
                <div className="text-sm text-green-800">Días Trabajados</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {(calculateTotalHours() / Math.max(weekEntries.length, 1)).toFixed(1)}h
                </div>
                <div className="text-sm text-purple-800">Promedio Diario</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  40h
                </div>
                <div className="text-sm text-orange-800">Meta Semanal</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Entries */}
        <div className="space-y-4">
          {weekDates.map((date) => {
            const entry = weekEntries.find(e => e.date === date);
            const isToday = date === new Date().toISOString().split('T')[0];
            
            return (
              <Card key={date} className={`${isToday ? 'ring-2 ring-purple-200' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{formatDate(date)}</span>
                      {isToday && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                          Hoy
                        </span>
                      )}
                    </span>
                    {entry?.totalHours && (
                      <span className="text-lg font-bold text-green-600">
                        {entry.totalHours}h
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {entry ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-500">Entrada</div>
                        <div className="text-lg font-mono">
                          {entry.clockIn || '--:--'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-500">Almuerzo</div>
                        <div className="text-lg font-mono">
                          {entry.lunchOut && entry.lunchIn 
                            ? `${entry.lunchOut} - ${entry.lunchIn}`
                            : entry.lunchOut 
                            ? `${entry.lunchOut} - --:--`
                            : '--:-- - --:--'
                          }
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-500">Salida</div>
                        <div className="text-lg font-mono">
                          {entry.clockOut || '--:--'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-500">Ubicación</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {entry.location || 'No registrada'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p>Sin registros para este día</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
