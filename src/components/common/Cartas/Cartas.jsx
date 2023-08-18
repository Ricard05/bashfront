import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Cartas.css";

function Cartas({ titulo, texto, imagen }) {
  return (
    <>
      <Card style={{ width: "25rem" }} className="col-md-4 border-0 carta">
        <Card.Img variant="top" src={imagen} />
        <Card.Body>
          <Card.Title>{titulo}</Card.Title>
          <Card.Text>{texto}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Cartas;
