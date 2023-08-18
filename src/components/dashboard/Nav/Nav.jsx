import React, { useState } from "react";
import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as FaIcons2 from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import { Outlet, Link, useLocation } from "react-router-dom";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const Toggle = () => {
    setSidebar(!sidebar);
  };

  const initState = {
    id_usuario: "",
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  };

  const [usuario, setUsuario] = useState([initState]);
  const [iconoState, setIconoState] = useState(0);
  const getUsuario = () => {
    const data = JSON.parse(localStorage.getItem("usuarioData"));
    const initState2 = {
      id_usuario: data.id_usuario,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo2,
      password: data.password2,
    };
    setUsuario(initState2);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  const showNavbar = (navId) => {
    const nav = document.getElementById(navId),
      bodypd = document.getElementById("dash"),
      headerpd = document.getElementById("header");
    // show navbar
    nav.classList.toggle("show");
    headerpd.classList.toggle("dashpd");
    bodypd.classList.toggle("dashpd");
    iconoState === 0 ? setIconoState(1) : setIconoState(0);
  };

  const hideNavbar = () => {
    const nav = document.getElementById("nav-bar"),
      headerpd = document.getElementById("header"),
      bodypd = document.getElementById("dash");
    //hide navbar
    if (iconoState === 1) {
      nav.classList.toggle("show");
      headerpd.classList.toggle("dashpd");
      bodypd.classList.toggle("dashpd");
      setIconoState(0);
    }
  };

  /* className={
                location.pathname === "/usuario/dashboard" ? "active" : ""
              } */
  return (
    <>
      <header className="header" id="header">
        <Link
          to="#"
          className="header_toggle"
          onClick={() => showNavbar("nav-bar")}
        >
          {iconoState === 0 ? (
            <FaIcons.FaBars id="header_toggle" />
          ) : (
            <GrIcons.GrClose />
          )}
        </Link>

        <div className="header_img">
          {" "}
          <img src="https://i.imgur.com/hczKIze.jpg" alt="" />{" "}
        </div>
      </header>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            {" "}
            <Link to="#" className="nav_logo">
              <FaIcons.FaUserAlt className="nav_logo-icon" />
              <span className="nav_logo-name">Bash</span>
            </Link>
            <div className="nav_list">
              {" "}
              {/* Inicio*/}
              <Link
                to="/usuario/dashboard"
                className={`nav_link ${
                  location.pathname === "/usuario/dashboard" ? "active" : ""
                }`}
                onClick={hideNavbar}
              >
                <AiIcons.AiFillHome className="nav_icon" />
                <span className="nav_name">Inicio</span>
              </Link>
              {/* Gastos */}
              <Link
                to="/usuario/dashboard/gastos"
                className={`nav_link ${
                  location.pathname === "/usuario/dashboard/gastos"
                    ? "active"
                    : ""
                }`}
                onClick={hideNavbar}
              >
                <FaIcons2.FaMoneyBill1Wave className="nav_icon" />
                <span className="nav_name">Gastos</span>
              </Link>
              {/* Ingresos */}
              <Link
                to="/usuario/dashboard/ingresos"
                className={`nav_link ${
                  location.pathname === "/usuario/dashboard/ingresos"
                    ? "active"
                    : ""
                }`}
                onClick={hideNavbar}
              >
                <FaIcons2.FaMoneyBillTrendUp className="nav_icon" />
                <span className="nav_name">Gastos</span>
              </Link>
            </div>
          </div>{" "}
          <Link to="/" className="nav_link" onClick={handleLogout}>
            <FaIcons.FaSignOutAlt className="nav_icon" />
            <span className="nav_name">Salir</span>
          </Link>
        </nav>
      </div>

      <Outlet />
    </>
  );
}

export default Nav;
