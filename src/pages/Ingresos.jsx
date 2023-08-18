import { useEffect, useState } from "react";
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
  //Recuperacion del usuario almacenador en el localstorage
  const data = JSON.parse(localStorage.getItem("usuarioData"));

  const [colMd, setColMd] = useState();
  const handleResize = () => {
    if (window.innerWidth < 1067) {
      setColMd(12); // Cambiar a 12 cuando el ancho de pantalla sea menor a 1067px
    } else if (window.innerWidth >= 1067) {
      setColMd(6); // Cambiar a 6 cuando el ancho de pantalla sea mayor o igual a 1067px
    }
  };

  //Inicializacion de los estados
  const initIngreso = {
    id_usuario: data.id_usuario,
    categoria: 1,
    cantidad: "",
    fecha: "",
    descripcion: "",
  };

  const initIngreso2 = {
    show2: false,
    id_ingreso2: "",
    cantidad2: "",
    fecha2: "",
    descripcion2: "",
    categoria2: "",
  };

  const initCategoria = [
    { nombre: "Salario", ingreso: 0, value: 1 },
    { nombre: "Negocio", ingreso: 0, value: 2 },
    { nombre: "Renta", ingreso: 0, value: 3 },
    { nombre: "Otros", ingreso: 0, value: 4 },
  ];

  //Estados
  const [ingreso, setIngreso] = useState(initIngreso);
  const [ingresoM, setIngresoM] = useState(initIngreso2);
  const [categorias, setCategorias] = useState(initCategoria);
  const [ingresos, setIngresos] = useState([]);
  const [show, setShow] = useState(false);
  const [renderizar, setRenderizar] = useState(0);

  //Desestructuracion
  const { id_usuario, cantidad, fecha, descripcion, categoria } = ingreso;
  const { show2, id_ingreso2, cantidad2, fecha2, descripcion2, categoria2 } =
    ingresoM;

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
      name: "id_ingreso2",
      value: id_ingreso2,
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
    setIngreso(initIngreso);
    setShow(false);
  };

  const handleClose2 = () => {
    setIngresoM(initIngreso2);
  };

  //Utilizada para recoger los datos al querer ingresar un gasto nuevo
  const handleChange = (e) => {
    let { name, value } = e.target;
    setIngreso({ ...ingreso, [name]: value });
    console.log(`${name}:${value}`);
  };

  //Utilizada para recoger los datos al querer modificar un gasto
  const handleChange2 = (e) => {
    let { name, value } = e.target;
    setIngresoM({ ...ingresoM, [name]: value });
    console.log(`${name}:${value}`);
    console.log(ingresoM);
  };

  const handleInsertar = async () => {
    await axios
      .post("http://localhost:5000/usuarios/insertar/ingreso", ingreso)
      .then(function (response) {
        // handle success
        setCategorias(initCategoria);
        handleTraerIngresos(id_usuario);
        setIngreso(initIngreso);
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

  const handleBuscar = async (id) => {
    await axios
      .get(`http://localhost:5000/usuarios/ingreso/traer/${id}`)
      .then(function (response) {
        // handle success
        const initIngreso2 = {
          show2: true,
          id_ingreso2: response.data.result[0].id_ingreso,
          cantidad2: response.data.result[0].cantidad,
          fecha2: response.data.result[0].fecha.slice(0, 10),
          descripcion2: response.data.result[0].descripcion,
          categoria2: response.data.result[0].id_categoria_i,
        };
        setIngresoM(initIngreso2);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleModificarGasto = async () => {
    await axios
      .patch("http://localhost:5000/usuarios/gasto/modificar", ingresoM)
      .then(function (response) {
        //handle success
        setIngresoM(initIngreso2);
        setIngreso(initIngreso);
        setCategorias(initCategoria);
        handleTraerIngresos(id_usuario);
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
    ingresos.forEach((item) => {
      switch (item.categoria) {
        case "Salario":
          categorias2[0].ingreso += parseInt(item.cantidad);
          break;
        case "Negocio":
          categorias2[1].ingreso += parseInt(item.cantidad);
          break;
        case "Renta":
          categorias2[2].ingreso += parseInt(item.cantidad);
          break;
        case "Otros":
          categorias2[3].ingreso += parseInt(item.cantidad);
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
      .delete(`http://localhost:5000/usuarios/ingreso/eliminar/${id}`)
      .then(function (response) {
        //handle success
        setCategorias(initCategoria);
        handleTraerIngresos(id_usuario);
        console.log(response);
        notify("Ingreso eliminado con exito", 2);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  //Este use effect trae los datos de la tabla transacciones al entrar a la pagina
  useEffect(() => {
    handleTraerIngresos(id_usuario);
  }, []);

  useEffect(() => {
    handleResize(); // Llamar la función al inicio para configurar el valor inicial

    // Agregar un listener para el evento de redimensionamiento de pantalla
    window.addEventListener("resize", handleResize);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleSepararCategorias();
  }, [ingresos]);

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
    <>
      <Row>
        <Col>
          <ToastContainer />
        </Col>
      </Row>

      <Container
        fluid={true}
        className="p-3 mt-4 container-dashboard"
        id="dash"
      >
        <Row>
          <div className="contenedor-header dash-welcome">
            <p className="fs-5 mx-2 my-1">Dashboard</p>
            <LiaIcons.LiaAngleRightSolid />
            <p className="fs-5 mx-2 my-1">Ingresos</p>
            <Button variant="success" onClick={handleShow}>
              Añadir ingreso
            </Button>
          </div>
        </Row>

        <Row className="d-flex align-items-stretch flex-fill mt-3">
          <Col xs={12} sm={12} md={colMd}>
            <Contenedor title="Gastos registrados" height="98">
              {/* Tabla de registros */}
              <TablaRegistros
                array={ingresos}
                handleBuscar={handleBuscar}
                handleEliminar={handleEliminar}
                n={1}
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
                color="#67e1c9"
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
                keyBar="ingreso"
                color="#004D64"
              />
            </Contenedor>
            <Reporte transacciones={ingresos} titulo="Mini reporte de gastos" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Gastos;
