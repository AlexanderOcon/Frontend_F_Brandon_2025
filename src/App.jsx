import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importar componente Encabezado
import Encabezado from "./components/navegacion/Encabezado";
// Importar las vistas
import Login from "./views/Login.jsx";
import Inicio from "./views/Inicio.jsx";
import Categorias from "./views/Categorias.jsx";
import Productos from "./views/Productos.jsx";
import Catalogos from "./views/Catalogo.jsx";
import Ventas from "./views/Ventas";
import Clientes from "./views/Clientes";
import Empleados from "./views/Empleados";
import Compras from "./views/Compras";
import Usuarios from "./views/Usuarios";
// Importar archivo de estilos
import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/catalogo" element={<Catalogos />} />
          <Route path="/clientes" element={<Clientes />} /> 
          <Route path="/compras" element={<Compras />} /> 
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/usuarios" element={<Usuarios />} />  
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;