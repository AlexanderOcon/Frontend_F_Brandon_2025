import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";

const Productos = () => {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos");
      if (!respuesta.ok) {
        throw new Error("Error al obtener las categorias");
      }

      const datos = await respuesta.json();
      setProductos(datos);
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <>
      <Container className = "mt-4">
        <h4> Productos </h4>
        <TablaProductos productos={productos}
        cargando={cargando}/>
      </Container>
    </>
  );
}

export default Productos;