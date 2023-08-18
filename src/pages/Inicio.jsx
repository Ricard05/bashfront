import { useEffect, useState } from "react";
import { Container, Row, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cartas from "../components/common/Cartas/Cartas";
import "../stylesheets/Inicio.css";
import Logo from "../assets/images/logoBash.svg";
import Skills from "../components/common/Skills/Skills";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";

function Inicio() {
  function handleNavScroll() {
    var miBoton = document.getElementById("nav");
    var login = document.getElementById("login");
    var signin = document.getElementById("signin");
    var scrollPosY = window.scrollY;

    if (scrollPosY > 0) {
      miBoton.classList.add("bg-light");
      miBoton.classList.remove("navbar-dark");
      miBoton.classList.add("navbar-light");
      login.style.color = "#000";
      signin.style.color = "#000";
    } else if (scrollPosY < 100) {
      miBoton.classList.remove("bg-light");
      miBoton.classList.remove("navbar-light");
      miBoton.classList.add("navbar-dark");
      login.style.color = "#fff";
      signin.style.color = "#fff";
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleNavScroll);

    return () => {
      window.removeEventListener("scroll", handleNavScroll);
    };
  }, []);

  function handleRevealScroll() {
    var revelarse = document.getElementsByClassName("inicio-seccion");

    for (var i = 0; i < revelarse.length; i++) {
      var ventanaHeight = window.innerHeight;
      var revealTop = revelarse[i].getBoundingClientRect().top;
      var punto = 150;

      if (revealTop < ventanaHeight - punto) {
        revelarse[i].classList.add("inicio-activar");
      } else {
        revelarse[i].classList.remove("inicio-activar");
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleRevealScroll);

    return () => {
      window.removeEventListener("scroll", handleRevealScroll);
    };
  }, []);

  const cartas = [
    {
      imagen: "../assets/images/Dashboard.png",
      titulo: "Un sistema cómodo, entendible y fácil de manejar",
      texto:
        "Te ofrecemos un sistema simple de manejar, intuitivo y amigable para facilitar tu contabilidad y el acceso a la información estratégica que necesitas, cuando la necesitas.",
    },
    {
      imagen: "../assets/images/Dashboard.png",
      titulo: "Intuitivo desde la primera vez que lo usas",
      texto:
        "Ten toda la información de tus finanzas integrada en una sola plataforma y en un mismo lugar.",
    },
    {
      imagen: "../assets/images/Dashboard.png",
      titulo: "Da un seguimiento a tus ingresos de una forma comoda",
      texto:
        "Estaras informado del estado de tus ingresos y gastos en todo momento",
    },
    {
      imagen: "../assets/images/Dashboard.png",
      titulo: "Empieza a usar Bash ya",
      texto:
        "Una plataforma que ofrece una experiencia completamente gratuita.",
    },
  ];

  const skills = [
    {
      icono: <BiIcons.BiRun />,
      titulo: "Deja de perseguir",
      texto:
        "Nuestra plataforma te brinda un control integral de tus ingresos y egresos de dinero sin esfuerzo adicional. Deja de perseguir números y comienza a tomar el control de tus finanzas de manera sencilla y eficaz.",
    },
    {
      icono: <BsIcons.BsShuffle />,
      titulo: "Flexibilidad",
      texto:
        "Tu vida financiera no debería ser rígida. Con nuestra plataforma, la flexibilidad es clave. Personaliza tus categorías, ajusta tus objetivos y realiza un seguimiento de tus gastos e ingresos de acuerdo con tu propio estilo de vida.",
    },
    {
      icono: <AiIcons.AiFillSmile />,
      titulo: "Interfaz amistosa",
      texto:
        "Nuestra interfaz amistosa te guiará paso a paso en el control de tus ingresos y egresos. Gráficos claros, colores intuitivos y navegación sencilla hacen que gestionar tu dinero sea un proceso fácil y agradable para todos.",
    },
    {
      icono: <AiIcons.AiFillTool />,
      titulo: "Mejores funciones",
      texto:
        "Te ofrecemos las mejores herramientas para administrar tus ingresos y gastos de manera efectiva.",
    },
    {
      icono: <IoIcons.IoDocumentSharp />,
      titulo: "Buena organizacion",
      texto:
        "No pierdas el tiempo pensando donde te gastaste el dinero, mejor usa bash y ahorrate los problemas",
    },
  ];

  const [empresa, setEmpresa] = useState({
    title: "Mision",
    text: "Como empresa la misión de Bash es simplificar el proceso de gestión financiera para las personas y emprendedores, facilitando una plataforma que les permita llevar de forma confiable el control del flujo de dinero que se realiza dentro de sus diferentes negocios. Se busca brindar una plataforma sencilla para que las personas encargadas de gestionar un negocio tengan una experiencia amigable. Nuestro objetivo como empresa es ayudar a nuestros usuarios a optimizar el proceso al momento de gestionar las operaciones financieras que se llevan a cabo en las empresas de nuestros usuarios.",
  });

  const cambiarVision = () => {
    setEmpresa({
      ...empresa,
      title: "Vision",
      text: "Nuestra visión en Bash es transformar la forma en que las personas y gestionan sus finanzas, brindándoles una plataforma revolucionaria que les permita tomar el control completo de sus ingresos y lograr el éxito financiero de manera efectiva. Nuestra visión es convertirnos en el referente confiable y la herramienta indispensable para el crecimiento y la prosperidad financiera de nuestros clientes, generando un impacto positivo en la forma en que se gestionan los negocios a nivel global.",
    });
  };

  const cambiarMision = () => {
    setEmpresa({
      ...empresa,
      title: "Mision",
      text: "Como empresa la misión de Bash es simplificar el proceso de gestión financiera para las personas y emprendedores, facilitando una plataforma que les permita llevar de forma confiable el control del flujo de dinero que se realiza dentro de sus diferentes negocios. Se busca brindar una plataforma sencilla para que las personas encargadas de gestionar un negocio tengan una experiencia amigable. Nuestro objetivo como empresa es ayudar a nuestros usuarios a optimizar el proceso al momento de gestionar las operaciones financieras que se llevan a cabo en las empresas de nuestros usuarios.",
    });
  };

  return (
    <Container fluid={true} className="inicio-contenedor">
      <Container fluid={true} className="p-0">
        <Row className="p-0">
          {/* Navbar */}
          <header className="inicio-encabezado">
            <Navbar
              id="nav"
              expand="lg"
              className="row fixed-top px-4"
              variant="dark"
            >
              <Container>
                <Navbar.Brand as={Link} to="/">
                  <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{" "}
                  Bash
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Link to="/" className="nav-link active">
                      Inicio
                    </Link>
                    <a href="#nosotros" className="nav-link">
                      Nosotros
                    </a>
                    <a href="#ubicacion" className="nav-link">
                      Ubicacion
                    </a>
                  </Nav>
                  <div className="inicio-botones">
                    <Link className="nav-link" id="login" to="/usuario">
                      Login
                    </Link>
                    <Link className="nav-link" id="signin" to="/usuario/signup">
                      Signin
                    </Link>
                  </div>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
        </Row>

        {/* Cartas */}
        <Row className="inicio-seccion inicio-cartas">
          <h2 className="inicio-subtitulo">
            Una cosa menos de la que preocuparse
          </h2>

          <div className="inicio-contenedor-cartas">
            {cartas.map((item, index) => {
              return (
                //Carta
                <Cartas
                  key={index}
                  imagen={require("../assets/images/Dashboard.png")}
                  titulo={item.titulo}
                  texto={item.texto}
                />
              );
            })}
          </div>
        </Row>

        {/* Skills */}
        <Row className="inicio-seccion inicio-skills">
          <div className="row">
            <h2 className="inicio-subtitulo mb-1">
              Todo lo que necesitas que haga
            </h2>
            <div className="container-fluid d-flex align-items-center justify-content-center py-3"></div>
          </div>

          {skills.map((item, index) => {
            return (
              //Skill
              <Skills
                key={index}
                icono={item.icono}
                titulo={item.titulo}
                texto={item.texto}
              ></Skills>
            );
          })}
        </Row>

        {/* Nosotros */}
        <Row
          className="inicio-seccion inicio-nosotros d-flex flex-row"
          id="nosotros"
        >
          <h2 className="inicio-subtitulo">Nosotros</h2>
          <Row className="justify-content-center">
            <div className="imagen-equipo"></div>
            <div>
              <p className="fs-3">{empresa.title}</p>
              <p className="w-50 m-auto">{empresa.text}</p>
              <div className="pt-3">
                <Button onClick={cambiarMision}>Mision</Button>{" "}
                <Button onClick={cambiarVision}>Vision</Button>
              </div>
            </div>
          </Row>
        </Row>

        {/* Ubicacion */}
        <Row
          className="inicio-seccion inicio-ubicanos d-flex flex-row"
          id="ubicacion"
        >
          <h2 className="inicio-subtitulo">Ubicanos</h2>
          <Row
            className="justify-content-center"
            style={{ width: "900px", marginTop: "20px" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.1602320787415!2d-104.62015572374098!3d23.99011827850766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb833da45df2b%3A0x2392fefbf317535!2sUniversidad%20Tecnol%C3%B3gica%20de%20Durango!5e0!3m2!1ses-419!2smx!4v1691560504905!5m2!1ses-419!2smx"
              width="400"
              height="450"
              style={{ border: "0" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa"
            ></iframe>
          </Row>
        </Row>

        <Row>
          <footer className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-4 inicio-info inicio-contacto">
                  <h3>
                    <img
                      src={Logo}
                      alt="Logo"
                      width="30"
                      height="24"
                      className="d-inline-block align-text-top"
                    />
                    Bash
                  </h3>
                  <ul>
                    <li>
                      <i className="fa-solid fa-phone"></i>618-300-8978
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope"></i>bash@gmail.com
                    </li>
                    <li>
                      <i className="fa-solid fa-location-dot"></i>Carr. Durango
                      – Mezquital, Km. 4.5 Gabino Santillán. C.P. 34308,
                      Durango, Dgo.
                    </li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div className="col-md-4 inicio-info">
                  <h3>Enlaces</h3>
                  <ul>
                    <li>Inicio</li>
                    <li>Nosotros</li>
                    <li>Registrarse</li>
                    <li>Iniciar sesion</li>
                  </ul>
                </div>

                <div className="col-md-4 inicio-redes inicio-info">
                  <h3>Redes sociales</h3>
                  <i className="fa-brands fa-facebook-f"></i>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-youtube"></i>
                  <i className="fa-brands fa-github"></i>
                </div>
              </div>
            </div>

            <div className="row inicio-copy">
              <p>&copy;2023 Bash. Todos los derechos reservados</p>
            </div>
          </footer>
        </Row>
      </Container>
    </Container>
  );
}
export default Inicio;
