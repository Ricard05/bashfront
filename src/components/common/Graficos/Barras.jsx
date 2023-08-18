import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SimpleBarCharts = ({ data, keyBar, color }) => {
  const [aspectG, setAspectG] = useState(2);
  const handleResize = () => {
    if (window.innerWidth < 532) {
      setAspectG(1); // Cambiar a 12 cuando el ancho de pantalla sea menor a 1067px
    } else if (window.innerWidth >= 532) {
      setAspectG(2); // Cambiar a 6 cuando el ancho de pantalla sea mayor o igual a 1067px
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
    <ResponsiveContainer width="100%" aspect={aspectG}>
      <BarChart
        data={data}
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 2" />
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={keyBar} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarCharts;
