import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect } from "react";

const StackedAreaCharts = ({ data }) => {
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
    <ResponsiveContainer width="100%" height="100%" aspect={aspectG}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" angle={0} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="ingreso"
          stroke="#67e1c9"
          fill="#67e1c9"
        />
        <Area type="monotone" dataKey="gasto" stroke="#FF3535" fill="#FF3535" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaCharts;
