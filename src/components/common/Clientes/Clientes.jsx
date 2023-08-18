import { Container, Row, Col } from "react-bootstrap";
import "./Clientes.css";

function Clientes({ titulo, texto }) {
  return (
    <Container fluid={true}>
      <Row className="clientes">
        <Col md={2}>
          <p>Icono</p>
        </Col>
        <Col md={10}>
          <h3>{titulo}</h3>
          <p>{texto}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Clientes;
