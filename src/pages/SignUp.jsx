import axios from "axios";
import { useState } from "react";
import { Container, Row, Col, FloatingLabel } from "react-bootstrap";
import "../stylesheets/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  //Inicializar los valores
  const initState = {
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  };

  //Estados
  const [usuario, setUsuario] = useState(initState);
  const { nombre, apellido, correo, password } = usuario;

  //Funcion para cambiar el estado de mis inputs
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  //Funcion para registrar un usuario
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/usuarios/insertar", usuario)
      .then(function (response) {
        // handle success
        if (response.data.status === 300) {
          notify(
            "Las credenciales son incorrectas o el correo ya esta registrado",
            1
          );
        } else {
          setUsuario(initState);
          notify("Usuario registrado", 2);
          console.log(response);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);

        notify("Error en el registro, intentelo mas tarde", 1);
      });
  };

  const notify = (mensaje, num) => {
    if (num === 1) {
      toast.error(
        mensaje, //La opcion que quieres que aparezaca
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          theme: "colored",
        }
      );
    }

    if (num === 2) {
      toast.success(
        mensaje, //La opcion que quieres que aparezaca
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          theme: "colored",
        }
      );
    }
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col>
          <ToastContainer />
        </Col>
      </Row>

      <Row className="login-contenedor">
        <Col md={6} className="login-logo d-none d-md-flex">
          <h2>bash: tu aliado de confianza</h2>
        </Col>
        <Col md={6} className="login-formulario">
          <h1>Registrarse</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3 login-input-container"
              controlId="formBasicText"
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre"
                className="mb-3"
              >
                <Form.Control
                  className="login-input"
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  required
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group
              className="mb-3 login-input-container"
              controlId="formBasicApellido"
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Apellido"
                className="mb-3"
              >
                <Form.Control
                  className="login-input"
                  type="apellido"
                  placeholder="Apellido"
                  name="apellido"
                  value={apellido}
                  required
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group
              className="mb-3 login-input-container"
              controlId="formBasicEmail"
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Correo"
                className="mb-3"
              >
                <Form.Control
                  className="login-input"
                  type="email"
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
              <FloatingLabel
                controlId="floatingInput"
                label="Contraseña"
                className="mb-3"
              >
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

            <Link to="/usuario">Ya tienes una cuenta?</Link>

            <Button variant="primary" type="submit" className="login-boton">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
