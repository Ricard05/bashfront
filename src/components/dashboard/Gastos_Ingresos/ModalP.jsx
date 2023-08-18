import React from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import "./ModalP.css";
function ModalP({
  color,
  show,
  titulo,
  array,
  handleClose,
  handleEjecutar,
  handleChange,
  dValue,
  catNombre,
  opciones,
  MI,
}) {
  const handleDefault = () => {};

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ width: "100%" }}>
        <Modal.Header style={{ backgroundColor: `${color}` }} closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDefault}>
            {/* Inputs del Form */}
            {array.map((item, index) => {
              return (
                <Form.Group
                  className="mb-3 login-input-container"
                  controlId="formBasicText2"
                  key={index}
                >
                  <FloatingLabel
                    controlId="floatingInput2"
                    label={item.label}
                    className="mb-3"
                  >
                    <Form.Control
                      className="login-input"
                      type={item.type}
                      placeholder={item.placeholder}
                      name={item.name}
                      value={item.value}
                      required
                      onChange={handleChange}
                      disabled={item.label === "id" ? true : false}
                    />
                  </FloatingLabel>
                </Form.Group>
              );
            })}

            <Form.Group controlId="opciones">
              <Form.Label>Categoria:</Form.Label>
              <Form.Select
                onChange={handleChange}
                className="login-input"
                name={catNombre}
                defaultValue={dValue}
                required
              >
                {opciones.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.nombre}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEjecutar}>
            {MI}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalP;
