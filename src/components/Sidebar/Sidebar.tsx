import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

// Interfaz para la definición de rutas
interface RouteInfo {
  path: string;
  layout: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  upgrade?: boolean;
  redirect?: boolean;
}

// Interfaz para las props del componente
interface SidebarProps {
  color: string;
  image: string;
  routes: RouteInfo[];
}

function Sidebar({ color, image, routes }: SidebarProps) {
  const location = useLocation();
  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              {/* Nota: 'require' no es estándar en el frontend con Vite. Importa la imagen arriba. */}
              {/* import logo from "assets/img/reactlogo.png"; */}
              {/* <img src={logo} alt="..." /> */}
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Nova HR
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;