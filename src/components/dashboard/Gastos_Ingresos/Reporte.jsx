import React from "react";
import { BsBarChart } from "react-icons/bs";
import { Card } from "react-bootstrap";
import "../Gastos_Ingresos/Reporte.css";

function MiniReporteBarras({ transacciones, titulo }) {
  const totalGastos = transacciones.reduce(
    (total, transaccion) => total + parseFloat(transaccion.cantidad),
    0
  );

  const promedioGastos = totalGastos / transacciones.length || 0;

  const categorias = {};
  transacciones.forEach((transaccion) => {
    categorias[transaccion.categoria] =
      (categorias[transaccion.categoria] || 0) + 1;
  });
  const categoriaMasFrecuente = Object.keys(categorias).reduce(
    (maxCategoria, categoria) =>
      categorias[categoria] > categorias[maxCategoria]
        ? categoria
        : maxCategoria,
    Object.keys(categorias)[0]
  );

  return (
    <Card className="mt-2 reporte-contenedor">
      <Card.Body className="reporte-cuerpo">
        <Card.Title>
          <BsBarChart className="me-2" />
          {titulo}
        </Card.Title>
        <hr />
        <p className="mb-2">Total de Gastos: ${totalGastos.toFixed(2)}</p>
        <p className="mb-2">Promedio de Gastos: ${promedioGastos.toFixed(2)}</p>
        <p>Categoría más Frecuente: {categoriaMasFrecuente}</p>
      </Card.Body>
    </Card>
  );
}

export default MiniReporteBarras;
