import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Gastos from "./pages/Gastos";
import Ingresos from "./pages/Ingresos";
import NavD from "../src/components/dashboard/Nav/Nav";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Inicio />} />
          <Route path="usuario">
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<NavD />}>
              <Route index element={<Dashboard />} />
              <Route path="gastos" element={<Gastos />} />
              <Route path="ingresos" element={<Ingresos />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
