// src/pages/Dashboard.tsx
import React from "react";
// CORRECCIÓN: Rutas de importación apuntando directamente a los archivos de componentes
import Sidebar from "@/components/Sidebar/Sidebar"; 
import Topbar from "@/components/Topbar"; // Asumimos que Topbar.tsx está en /components
import DashboardCard from "@/components/DashboardCard"; // Asumimos que DashboardCard.tsx está en /components

// Definimos una interfaz para las rutas que necesita el Sidebar
interface RouteInfo {
  path: string;
  layout: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  upgrade?: boolean;
  redirect?: boolean;
}

// Un array vacío como placeholder si las rutas no son necesarias aquí
const dummyRoutes: RouteInfo[] = [];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* NOTA: El componente Sidebar de la plantilla original requiere las rutas para renderizar el menú.
        Aquí pasamos un array vacío. En una aplicación real, este estado vendría de un contexto o store.
      */}
      <Sidebar color="black" image="" routes={dummyRoutes} />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
          <DashboardCard title="Quién está" content="Jose Trejo está trabajando" />
          <DashboardCard title="Cumpleaños próximos" content="29 de Junio - Luis, 30 de Junio - Ana" />
          <DashboardCard title="Vacantes" content="Comercial (5), Técnico/a Financiero (4)" />
          <DashboardCard title="Tareas activas" content="No hay tareas activas por ahora" />
          <DashboardCard title="Reportes recientes" content="Cierre de jornada disponible" />
        </main>
      </div>
    </div>
  );
}