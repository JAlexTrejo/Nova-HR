/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// CORRECCIÓN: Se utiliza el alias @/ para apuntar a la carpeta src/
import Dashboard from "@/pages/Dashboard.tsx";
import UserProfile from "@/pages/Perfil.jsx";
import TableList from "@/pages/AdminUsuarios.jsx";
import ReporteNomina from "@/pages/ReporteNomina.jsx";
import Incidencias from "@/pages/Incidencias.jsx";
import AgregarUsuario from "@/pages/AgregarUsuario.jsx";


const dashboardRoutes = [
  {
    path: "dashboard", // Se quita el "/" inicial para rutas anidadas en v6
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "user",
    name: "Mi Perfil",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "usuarios",
    name: "Administrar Usuarios",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "agregar-usuario",
    name: "Agregar Usuario",
    icon: "nc-icon nc-simple-add",
    component: AgregarUsuario,
    layout: "/admin",
  },
  {
    path: "reporte-nomina",
    name: "Reporte de Nómina",
    icon: "nc-icon nc-paper-2",
    component: ReporteNomina,
    layout: "/admin",
  },
  {
    path: "incidencias",
    name: "Registrar Incidencias",
    icon: "nc-icon nc-bell-55",
    component: Incidencias,
    layout: "/admin",
  }
];

export default dashboardRoutes;