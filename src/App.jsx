import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import Estadisticas from "./views/Estadisticas.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";
// Importar archivo de estilos
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Encabezado />
        <main className="margen-superior-main">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<PrivateRoute><Inicio /></PrivateRoute>} />
            <Route path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />
            <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
            <Route path="/catalogo" element={<PrivateRoute><Catalogos /></PrivateRoute>} />
            <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} /> 
            <Route path="/compras" element={<PrivateRoute><Compras /></PrivateRoute>} /> 
            <Route path="/empleados" element={<PrivateRoute><Empleados /></PrivateRoute>} />
            <Route path="/ventas" element={<PrivateRoute><Ventas /></PrivateRoute>} />
            <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
            <Route path="/estadisticas" element={<PrivateRoute><Estadisticas /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><h2>404 - Página no encontrada</h2></PrivateRoute>} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default App;