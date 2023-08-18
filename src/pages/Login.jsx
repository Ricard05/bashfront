import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, FloatingLabel } from "react-bootstrap";
import "../stylesheets/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  //Inicializar los valores
  const initState = {
    correo: "",
    password: "",
  };

  const notify = (num) => {
    if (num === 1) {
      toast.success(
        "Usuario agregado", //La opcion que quieres que aparezaca
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        }
      );
    }

    if (num === 2) {
      toast.success(
        "Usuario no agregado", //La opcion que quieres que aparezaca
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        }
      );
    }

    if (num === 3) {
      toast.error(
        "Correo o contraseña incorrectos", //La opcion que quieres que aparezaca
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          theme: "colored",
        }
      );
    }

    if (num === 4) {
      toast.success(
        "Usuario modificado", //La opcion que quieres que aparezaca
        {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          theme: "colored",
        }
      );
    }
  };

  //Estados
  const [usuario, setUsuario] = useState(initState);
  const { correo, password } = usuario;
  const navigate = useNavigate();

  //Funcion para cambiar el estado de mis inputs
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  //Funcion para registrar un usuario
  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:5000/usuarios/login", usuario)
      .then(function (response) {
        // handle success
        setUsuario(initState);
        if (response.data.status === 200) {
          const initState2 = {
            id_usuario: response.data.result[0].id_usuario,
            nombre: response.data.result[0].nombre,
            apellido: response.data.result[0].apellido,
            correo2: response.data.result[0].correo,
            password2: response.data.result[0].password,
            rol: response.data.result[0].rol,
          };
          localStorage.setItem("usuarioData", JSON.stringify(initState2));
          if (response.data.result[0].rol === "usuario") {
            navigate("/usuario/dashboard");
          } else if (response.data.result[0].rol === "administrador") {
            navigate("/administrador/dashboard");
          }
        } else {
          notify(3);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col>
          <ToastContainer />
        </Col>
      </Row>

      <Row className="login-contenedor d-flex">
        <Col md={6} className="login-logo d-none d-md-flex">
          <h2>bash: tu aliado de confianza</h2>
        </Col>

        <Col md={6} className="login-formulario">
          <h1>Iniciar Sesion</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3 login-input-container"
              controlId="formBasicEmail"
            >
              <FloatingLabel controlId="floatingCorreo" label="Correo">
                <Form.Control
                  className="login-input"
                  type="correo"
                  placeholder="Correo"
                  name="correo"
                  value={correo}
                  required
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group
              className="mb-3 login-input-container"
              controlId="formBasicPassword"
            >
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  className="login-input"
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  required
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Link to="/">Olvidaste tu Contraseña?</Link>

            <Button variant="primary" type="submit" className="login-boton">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
