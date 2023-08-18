import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Barras from "../components/common/Graficos/Barras";
import Contenedor from "../components/dashboard/Contenedor";
import ModalP from "../components/dashboard/Gastos_Ingresos/ModalP";
import Reporte from "../components/dashboard/Gastos_Ingresos/Reporte";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../stylesheets/Dashboard.css";
import "../stylesheets/Gastos.css";
import * as LiaIcons from "react-icons/lia";
import TablaRegistros from "../components/dashboard/Gastos_Ingresos/TablaRegistros";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Gastos() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("usuarioData")) {
      navigate("/usuario");
    }
  }, [navigate]);

  const [colMd, setColMd] = useState();
  const handleResize = () => {
    if (window.innerWidth < 1067) {
      setColMd(12); // Cambiar a 12 cuando el ancho de pantalla sea menor a 1067px
    } else if (window.innerWidth >= 1067) {
      setColMd(6); // Cambiar a 6 cuando el ancho de pantalla sea mayor o igual a 1067px
    }
  };

  //Recuperacion del usuario almacenador en el localstorage
  const data = JSON.parse(localStorage.getItem("usuarioData"));

  //Inicializacion de los estados
  const initGasto = {
    id_usuario: data.id_usuario,
    categoria: 1,
    cantidad: "",
    fecha: "",
    descripcion: "",
  };

  const initGasto2 = {
    show2: false,
    id_gasto2: "",
    cantidad2: "",
    fecha2: "",
    descripcion2: "",
    categoria2: "",
  };

  const initCategoria = [
    { nombre: "Comida", gasto: 0, value: 1 },
    { nombre: "Transporte", gasto: 0, value: 2 },
    { nombre: "Vivienda", gasto: 0, value: 3 },
    { nombre: "Entretenimiento", gasto: 0, value: 4 },
    { nombre: "Ropa", gasto: 0, value: 5 },
    { nombre: "Otros", gasto: 0, value: 6 },
  ];

  //Estados
  const [gasto, setGasto] = useState(initGasto);
  const [gastoM, setGastoM] = useState(initGasto2);
  const [categorias, setCategorias] = useState(initCategoria);
  const [gastos, setGastos] = useState([]);
  const [show, setShow] = useState(false);
  const [renderizar, setRenderizar] = useState(0);

  //Desestructuracion
  const { id_usuario, cantidad, fecha, descripcion, categoria } = gasto;
  const { show2, id_gasto2, cantidad2, fecha2, descripcion2, categoria2 } =
    gastoM;

  const modal = [
    {
      type: "number",
      label: "Monto",
      name: "cantidad",
      value: cantidad,
    },
    {
      type: "date",
      label: "Fecha",
      name: "fecha",
      value: fecha,
    },
    {
      type: "text",
      label: "Descripcion",
      name: "descripcion",
      value: descripcion,
    },
  ];

  //id, cantidad, fecha, descripcion
  const modal_modificar = [
    {
      label: "id",
      type: "number",
      placeholder: "id",
      name: "id_gasto2",
      value: id_gasto2,
    },
    {
      label: "cantidad",
      type: "number",
      placeholder: "cantidad",
      name: "cantidad2",
      value: cantidad2,
    },
    {
      label: "fecha",
      type: "date",
      placeholder: "fecha",
      name: "fecha2",
      value: fecha2,
    },
    {
      label: "descripcion",
      type: "text",
      placeholder: "descripcion",
      name: "descripcion2",
      value: descripcion2,
    },
  ];

  //Esta funcion es utilizada para mostrar el modal
  const handleShow = () => {
    setShow(true);
  };

  //Esta funcion es usada para cerrar el modal
  const handleClose = () => {
    setGasto(initGasto);
    setShow(false);
  };

  const handleClose2 = () => {
    setGastoM(initGasto2);
  };

  //Utilizada para recoger los datos al querer ingresar un gasto nuevo
  const handleChange = (e) => {
    let { name, value } = e.target;
    setGasto({ ...gasto, [name]: value });
    console.log(`${name}:${value}`);
  };

  //Utilizada para recoger los datos al querer modificar un gasto
  const handleChange2 = (e) => {
    let { name, value } = e.target;
    setGastoM({ ...gastoM, [name]: value });
    console.log(`${name}:${value}`);
    console.log(gastoM);
  };

  const handleInsertar = async () => {
    await axios
      .post("http://localhost:5000/usuarios/insertar/gasto", gasto)
      .then(function (response) {
        // handle success
        setCategorias(initCategoria);
        handleTraerGastos(id_usuario);
        setGasto(initGasto);
        console.log(response);
        notify("Gasto añadido", 2);
      })
      .catch(function (error) {
        // handle error
        if (error.response && error.response.status === 400) {
          notify("Completa todos los campos", 1);
        } else {
          console.log(error);
        }
      });
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

  const handleBuscar = async (id) => {
    await axios
      .get(`http://localhost:5000/usuarios/gasto/traer/${id}`)
      .then(function (response) {
        // handle success
        const initGasto2 = {
          show2: true,
          id_gasto2: response.data.result[0].id_gasto,
          cantidad2: response.data.result[0].cantidad,
          fecha2: response.data.result[0].fecha.slice(0, 10),
          descripcion2: response.data.result[0].descripcion,
          categoria2: response.data.result[0].id_categoria_g,
        };
        setGastoM(initGasto2);
        console.log(response.data.result);
        console.log(gastoM);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleModificarGasto = async () => {
    console.log(gastoM);
    await axios
      .patch("http://localhost:5000/usuarios/gasto/modificar", gastoM)
      .then(function (response) {
        //handle success
        setGastoM(initGasto2);
        setGasto(initGasto);
        setCategorias(initCategoria);
        handleTraerGastos(id_usuario);
        console.log(response);
        notify("Registro modificado con exito", 2);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  //Funcion para filtrar los gastos por categorias
  const handleSepararCategorias = () => {
    const [...categorias2] = categorias;
    gastos.forEach((item) => {
      switch (item.categoria) {
        case "Comida":
          categorias2[0].gasto += parseInt(item.cantidad);
          break;
        case "Transporte":
          categorias2[1].gasto += parseInt(item.cantidad);
          break;
        case "Vivienda":
          categorias2[2].gasto += parseInt(item.cantidad);
          break;
        case "Entretenimiento":
          categorias2[3].gasto += parseInt(item.cantidad);
          break;
        case "Ropa":
          categorias2[4].gasto += parseInt(item.cantidad);
          break;
        case "Otros":
          categorias2[5].gasto += parseInt(item.cantidad);
          break;
        default:
          break;
      }
    });
    setRenderizar((renderizar) => renderizar + 1);
    setCategorias(categorias2);
    console.log(categorias);
  };

  const handleEliminar = async (id) => {
    await axios
      .delete(`http://localhost:5000/usuarios/gasto/eliminar/${id}`)
      .then(function (response) {
        //handle success
        setCategorias(initCategoria);
        handleTraerGastos(id_usuario);
        console.log(response);
        notify("Gasto eliminado con exito", 2);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  //Este use effect trae los datos de la tabla transacciones al entrar a la pagina
  useEffect(() => {
    handleTraerGastos(id_usuario);
    console.log(gastos);
  }, []);

  useEffect(() => {
    handleSepararCategorias();
  }, [gastos]);

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
    <Container fluid={true} className="p-3 mt-4 container-dashboard" id="dash">
      <Row>
        <Col>
          <ToastContainer />
        </Col>
      </Row>

      <Row>
        <div className="contenedor-header dash-welcome">
          <p className="fs-5 mx-2 my-1">Dashboard</p>
          <LiaIcons.LiaAngleRightSolid />
          <p className="fs-5 mx-2 my-1">Gastos</p>
          <Button variant="danger" onClick={handleShow}>
            Añadir gasto
          </Button>
        </div>
      </Row>

      <Row className="d-flex align-items-stretch flex-fill mt-3">
        <Col xs={12} sm={12} md={colMd}>
          <Contenedor title="Gastos registrados" height="98">
            <TablaRegistros
              array={gastos}
              handleEliminar={handleEliminar}
              handleBuscar={handleBuscar}
            />
            {/* Modal para modificar datos */}
            <ModalP
              color="#e1da67"
              show={show2}
              titulo="Modificar datos"
              array={modal_modificar}
              handleClose={handleClose2}
              handleEjecutar={handleModificarGasto}
              handleChange={handleChange2}
              dValue={categoria2}
              catNombre="categoria2"
              opciones={categorias}
              MI="Modificar"
            />

            {/* Modal para ingresar datos */}
            <ModalP
              color="#FF3535"
              show={show}
              titulo="Añadir gasto"
              array={modal}
              handleClose={handleClose}
              handleEjecutar={handleInsertar}
              handleChange={handleChange}
              catNombre="categoria"
              dValue={categoria}
              opciones={categorias}
              MI="Añadir"
            />
          </Contenedor>
        </Col>

        {/* Graficas */}
        <Col xs={12} sm={12} md={colMd}>
          <Contenedor title="Grafica de barras" height="auto">
            <Barras
              key={renderizar}
              aspect={2}
              data={categorias}
              keyBar="gasto"
              color="#FF3535"
            />
          </Contenedor>
          <Reporte transacciones={gastos} titulo="Concetrado de gastos" />
        </Col>
      </Row>
    </Container>
  );
}

export default Gastos;
