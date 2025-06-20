import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";

// CORRECCIÓN: Usar el alias '@' para apuntar a la carpeta 'src'
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/Sidebar/Sidebar";
// import FixedPlugin from "@/components/FixedPlugin/FixedPlugin"; // Descomenta si lo necesitas

// Asumimos que routes.js está en la raíz de src. Ajusta si es necesario.
import routes from "@/routes.js"; 

import sidebarImage from "@/assets/img/sidebar-3.jpg"; // Usando alias también para los assets

// Definimos una interfaz para las props para mayor seguridad de tipos
interface RouteInfo {
  path: string;
  layout: string;
  name: string; // Añadido para que coincida con el uso en AdminNavbar
  icon: string; // Añadido para que coincida con el uso en Sidebar
  component: React.ComponentType<any>;
  upgrade?: boolean; // Propiedad opcional
  redirect?: boolean; // Propiedad opcional
}

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef<HTMLDivElement>(null);

  const getRoutes = (routes: RouteInfo[]) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path} // En v6, las rutas anidadas son relativas al padre
            element={<prop.component />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  
  // Limpieza del efecto para evitar errores de memoria
  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
        document.documentElement.scrollTop = 0;
        const scrollingElement = document.scrollingElement as HTMLElement;
        if(scrollingElement) {
            scrollingElement.scrollTop = 0;
        }
        if(mainPanel.current){
            mainPanel.current.scrollTop = 0;
        }
    }
    return () => { isMounted = false; };
  }, [location]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>{getRoutes(routes)}</Routes>
          </div>
          <Footer />
        </div>
      </div>
      {/* <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      /> */}
    </>
  );
}

export default Admin;