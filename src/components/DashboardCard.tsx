import React from 'react';

// Definimos la interfaz para las props del componente
interface DashboardCardProps {
  title: string;
  content: string;
  icon?: React.ReactNode; // Icono opcional
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, content, icon }) => {
  return (
    // Aplicamos los estilos de Tailwind directamente aquí
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <p className="text-2xl font-bold mt-2 text-primary">{content}</p>
    </div>
  );
};

export default DashboardCard;