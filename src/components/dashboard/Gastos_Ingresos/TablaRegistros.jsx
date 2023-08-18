import React from "react";
import * as AiIcons from "react-icons/ai";
import "./TablaRegistros.css";

function TablaRegistros({ array, handleBuscar, handleEliminar }) {
  return (
    <div className="row">
      <div className="table-responsive ">
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="thead-table bg-danger">
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.descripcion}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.fecha.slice(0, 10)}</td>
                  <td>{item.categoria}</td>
                  <td className="acciones">
                    <AiIcons.AiFillEdit
                      className="icon_edit"
                      onClick={() => handleBuscar(item.id_gasto)}
                    />
                    <AiIcons.AiFillDelete
                      className="icon_delete"
                      onClick={() => handleEliminar(item.id_gasto)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaRegistros;
