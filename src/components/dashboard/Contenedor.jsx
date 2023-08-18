import React from "react";
import Card from "react-bootstrap/Card";

function Contenedor({ title, children, height }) {
  return (
    <Card
      className="mb-2 mt-2"
      style={{
        backgroundColor: "#fff",
        color: "#000",
        height: `${height === "auto" ? "auto" : "98%"}`,
      }}
    >
      <Card.Header>{title}</Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}

export default Contenedor;
