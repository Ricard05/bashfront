import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Advertencia({ titulo, texto, callback, show2 }) {
  const [show, setShow] = useState(show2);

  const handleClose = () => {
    setShow(false);
  };

  const handleCallBack = () => {
    callback();
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ backgroundColor: "#FF3535" }} closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{texto}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleCallBack}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Advertencia;
