import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import "../stylesheets/Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Grafica from "../components/common/Graficos/Grafica";
import Meta from "../components/dashboard/Ahorro/Meta";
import * as LiaIcons from "react-icons/lia";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";

function calcularInicioFinSemana(diaActual) {
  const fechaActual = new Date(diaActual);

  const diaSemana = fechaActual.getDay();

  const inicioSemana = new Date(fechaActual);
  inicioSemana.setDate(fechaActual.getDate() - diaSemana);

  const finSemana = new Date(inicioSemana);
  finSemana.setDate(inicioSemana.getDate() + 6);

  const initSemana2 = {
    inicio: inicioSemana.toISOString().split("T")[0],
    fin: finSemana.toISOString().split("T")[0],
  };

  return initSemana2;
}

function Dashboard() {
  const [colMd, setColMd] = useState();
  const handleResize = () => {
    if (window.innerWidth < 1067) {
      setColMd(12); // Cambiar a 12 cuando el ancho de pantalla sea menor a 1067px
    } else if (window.innerWidth >= 1067) {
      setColMd(6); // Cambiar a 6 cuando el ancho de pantalla sea mayor o igual a 1067px
    }
  };

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

  const initState = {
    id_usuario: "",
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  };

  const [usuario, setUsuario] = useState([initState]);
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [dias, setDias] = useState([
    { dia: "Lunes", gasto: 0, ingreso: 0 },
    { dia: "Martes", gasto: 0, ingreso: 0 },
    { dia: "Miercoles", gasto: 0, ingreso: 0 },
    { dia: "Jueves", gasto: 0, ingreso: 0 },
    { dia: "Viernes", gasto: 0, ingreso: 0 },
    { dia: "Sabado", gasto: 0, ingreso: 0 },
    { dia: "Domingo", gasto: 0, ingreso: 0 },
  ]);
  const [transacciones, setTransacciones] = useState([]);
  const [gastosFechas, setGastosFechas] = useState([]);
  const [ingresosFechas, setIngresosFechas] = useState([]);
  const [renderizar, setRenderizar] = useState(0);
  const [gastosTotal, setGastosTotal] = useState(0);
  const [ingresosTotal, setIngresosTotal] = useState(0);
  const [tipo, setTipo] = useState("gasto");
  const navigate = useNavigate();
  const diaActual = new Date().toISOString().split("T")[0];
  const [semana, setSemana] = useState(calcularInicioFinSemana(diaActual));

  useEffect(() => {
    try {
      getUsuario();
    } catch (error) {
      navigate("/usuario");
    }
  }, [navigate]);

  const handleSumar = (array) => {
    let array1 = array;
    let suma = 0;

    array1.forEach((item) => {
      suma += parseInt(item.cantidad);
    });
    return suma;
  };

  const handleTraerGastos = async (id) => {
    await axios
      .get(`http://localhost:5000/usuarios/gastos/traer/${id}`)
      .then(function (response) {
        // handle success
        setGastos(response.data.result);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleTraerIngresos = async (id) => {
    await axios
      .get(`http://localhost:5000/usuarios/ingresos/traer/${id}`)
      .then(function (response) {
        // handle success
        setIngresos(response.data.result);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleTraerGastosFechas = async (id) => {
    await axios
      .post(`http://localhost:5000/usuarios/gastos/fechas/traer/${id}`, semana)
      .then(function (response) {
        // handle success
        setGastosFechas(response.data.result);
        console.log("Fechas");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleTraerIngresosFechas = async (id) => {
    await axios
      .post(
        `http://localhost:5000/usuarios/ingresos/fechas/traer/${id}`,
        semana
      )
      .then(function (response) {
        // handle success
        setIngresosFechas(response.data.result);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleSepararDias = (array) => {
    const dias2 = [...dias];

    array.forEach((item) => {
      const dayIndex = new Date(item.fecha.slice(0, 10)).getDay();

      if (item.tipo === "gasto" || item.tipo === "ingreso") {
        console.log(item.tipo);
        dias2[dayIndex][item.tipo] += parseInt(item.cantidad);
      }

      console.log(dias2);
    });
    setDias(dias2);
    setRenderizar((renderizar) => renderizar + 1);
  };

  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarioData"));
    handleTraerGastos(data.id_usuario);
    handleTraerIngresos(data.id_usuario);
  }, []);

  useEffect(() => {
    setGastosTotal(handleSumar(gastos));
    setIngresosTotal(handleSumar(ingresos));
  }, [gastos, ingresos]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarioData"));
    handleTraerGastosFechas(data.id_usuario);
    handleTraerIngresosFechas(data.id_usuario);
  }, [semana]);

  useEffect(() => {
    const combinedArray = gastosFechas.concat(ingresosFechas);
    setTransacciones(combinedArray);
    handleSepararDias(combinedArray);
  }, [gastosFechas, ingresosFechas]);

  const cardMoney = [
    {
      id: 1,
      titulo: "Ingresos",
      cantidad: ingresosTotal,
      color: "#004D64",
      icon: (
        <GiIcons.GiReceiveMoney
          style={{ color: "#004D64" }}
          className="dash-carta-logo fs-1"
        />
      ),
    },
    {
      id: 2,
      titulo: "Gastos",
      cantidad: gastosTotal,
      color: "#D90000",
      icon: (
        <GiIcons.GiPayMoney
          style={{ color: "#D90000" }}
          className="dash-carta-logo fs-1"
        />
      ),
    },
    {
      id: 3,
      titulo: "Ahorro",
      cantidad: ingresosTotal - gastosTotal,
      color: "#A09711",
      icon: (
        <FaIcons.FaPiggyBank
          style={{ color: "A09711" }}
          className="dash-carta-logo fs-1"
        />
      ),
    },
  ];

  useEffect(() => {
    handleResize(); // Llamar la función al inicio para configurar el valor inicial

    // Agregar un listener para el evento de redimensionamiento de pantalla
    window.addEventListener("resize", handleResize);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container fluid={true} className="p-3 container-dashboard" id="dash">
      <Row>
        <p className="fs-2 my-2">Bienvenido {usuario.nombre}</p>
        <div className="dash-welcome">
          <p className="fs-5 mx-2 my-1">Dashboard</p>
          <LiaIcons.LiaAngleRightSolid />
          <p className="fs-5 mx-2 my-1">Inicio</p>
        </div>
      </Row>

      {/*  Ingresos, gastos, ahorro */}
      <Row>
        {cardMoney.map((item) => {
          return (
            <Col
              xs={12}
              sm={12}
              md={4}
              key={item.id}
              className="d-flex flex-fill"
            >
              <Card
                className="mb-2 mt-2 w-100"
                style={{ backgroundColor: "#fff", color: "#000" }}
              >
                {/* <Card.Header className="fs-4">{item.titulo}</Card.Header> */}
                <Card.Body className="dash-inicio-carta">
                  <div>
                    <Card.Title
                      className="fs-3"
                      style={{ color: `${item.color}` }}
                    >
                      {`$${item.cantidad} mxn`}
                    </Card.Title>
                    <Card.Text>
                      Semana pasada <span>7.85%</span>
                    </Card.Text>
                  </div>
                  {item.icon}
                </Card.Body>
                <Card.Footer
                  style={{ border: "none", backgroundColor: "#fff" }}
                >
                  {item.id === 3 ? <Meta porcentage={80} /> : <></>}
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row className="d-flex align-items-stretch flex-fill">
        {/* Poligono de frecuencias */}

        <Col xs={12} sm={12} md={colMd} style={{ backgroundColor: "#fff" }}>
          <Card
            bg=""
            key=""
            text=""
            className="mb-2 mt-2"
            style={{ backgroundColor: "#fff" }}
          >
            <Card.Body>
              <Grafica key={renderizar} data={dias} />
            </Card.Body>
          </Card>
        </Col>

        {/* Tabla */}
        <Col xs={12} sm={12} md={colMd}>
          <Card
            bg=""
            key=""
            text=""
            className="mb-2 mt-2"
            style={{ backgroundColor: "#fff" }}
          >
            <Card.Header>
              <Form.Group controlId="opciones">
                <Form.Select
                  onChange={handleChangeTipo}
                  defaultValue={"gastos"}
                >
                  <option value={"gasto"}>Gastos</option>
                  <option value={"ingreso"}>Ingresos</option>
                </Form.Select>
              </Form.Group>
            </Card.Header>

            {/* Tabla */}
            <Card.Body className="p-0 dash-container-table">
              <table className="dash-table">
                <thead style={{ color: "#e1da67" }}>
                  <tr>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Categoria</th>
                  </tr>
                </thead>
                <tbody>
                  {transacciones.map((item, index) => {
                    if (item.tipo === tipo) {
                      return (
                        <tr key={index}>
                          <td>{item.descripcion}</td>
                          <td>{`$${item.cantidad} mxn`}</td>
                          <td>{item.fecha.slice(0, 10)}</td>
                          <td>{item.categoria}</td>
                        </tr>
                      );
                    }
                    return <></>;
                  })}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
