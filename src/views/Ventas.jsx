import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaVentas from "../components/ventas/TablaVentas";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroVenta from "../components/ventas/ModalRegistroVenta";
import ModalEdicionVenta from "../components/ventas/ModalEdicionVenta";
import ModalEliminacionVenta from "../components/ventas/ModalEliminacionVenta";

const Ventas = () => {
  const [ventas, setventas] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;
  
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [ventaEditada, setVentaEditada] = useState(null);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);

  // Usar las mismas claves que el modal: id_cliente, id_empleado, fecha_venta, total_venta
  const [nuevaVenta, setNuevaVenta] = useState({
    id_cliente: "",
    id_empleado: "",
    fecha_venta: "",
    total_venta: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaVenta((prev) => ({ ...prev, [name]: value }));
  };

  const agregarVenta = async () => {
    if (!String(nuevaVenta.id_cliente || "").trim()) return;
    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarventa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaVenta),
      });
      if (!respuesta.ok) throw new Error("Error al guardar venta");
      setNuevaVenta({ id_cliente: "", id_empleado: "", fecha_venta: "", total_venta: "" });
      setMostrarModal(false);
      await ObtenerVentas();
    } catch (error) {
      console.error("Error al agregar venta:", error);
      alert("No se pudo guardar la venta. Revisa la consola.");
    }
  };

  const abrirModalEdicion = (venta) => {
    setVentaEditada({ ...venta });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    // Validar usando la misma clave que el modal/estado
    if (!String(ventaEditada?.id_cliente || "").trim()) return;
    try {
      // Log payload to help debug why the update may fail
      console.log("guardarEdicion - payload:", ventaEditada);
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarventa/${ventaEditada.id_venta}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ventaEditada),
        }
      );
      if (!respuesta.ok) console.warn('guardarEdicion - response status:', respuesta.status);
      if (!respuesta.ok) throw new Error("Error al actualizar venta");
      // Solo cerrar el modal si la actualización fue exitosa
      setMostrarModalEdicion(false);
      await ObtenerVentas();
    } catch (error) {
      console.error("Error al editar venta:", error);
      alert("No se pudo actualizar la venta.");
    }
  };

  const abrirModalEliminacion = (venta) => {
    setVentaAEliminar(venta);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarventa/${ventaAEliminar.id_venta}`,
        { method: "DELETE" }
      );
      if (!respuesta.ok) throw new Error("Error al eliminar venta");
      setMostrarModalEliminar(false);
      setVentaAEliminar(null);
      await ObtenerVentas();
    } catch (error) {
      console.error("Error al eliminar venta:", error);
      alert("No se pudo eliminar la venta.");
    }
  };



  const ObtenerVentas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/ventas");
      if (!respuesta.ok) {
        throw new Error("Error al obtener las ventas");
      }
      const datos = await respuesta.json();
      setventas(datos);
      setVentasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    
    if (texto.trim() === "") {
  setVentasFiltradas(ventas);
  return;
}
    const filtradas = ventas.filter(
      (venta) =>
        venta.id_cliente == texto ||
        venta.id_empleado == texto ||
        venta.fecha_venta == texto ||
        venta.total_venta == texto
    );
    setVentasFiltradas(filtradas);
  }

  useEffect(() => {
    ObtenerVentas();
  }, []);
  return (
    <>
      <Container className="mt-4">
        <h4>Ventas</h4>
        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
              + Nueva Venta
            </Button>
          </Col>
        </Row>
        <TablaVentas
          ventas={ventasFiltradas.slice(
            (paginaActual - 1) * elementosPorPagina,
            paginaActual * elementosPorPagina
          )}
          cargando={cargando}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}
          totalElementos={ventas.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />
        <ModalRegistroVenta
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaVenta={nuevaVenta}
          manejarCambioInput={manejarCambioInput}
          agregarVenta={agregarVenta}
        />

        <ModalEdicionVenta
          mostrar={mostrarModalEdicion}
          setMostrar={setMostrarModalEdicion}
          ventaEditada={ventaEditada}
          setVentaEditada={setVentaEditada}
          guardarEdicion={guardarEdicion}
        />

        <ModalEliminacionVenta
          mostrar={mostrarModalEliminar}
          setMostrar={setMostrarModalEliminar}
          venta={ventaAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />
      </Container>
    </>
  );
}

export default Ventas;