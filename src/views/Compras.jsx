import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaCompras from "../components/compras/TablaCompras";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroCompra from "../components/compras/ModalRegistroCompra";
import ModalEdicionCompra from "../components/compras/ModalEdicionCompra";
import ModalEliminacionCompra from "../components/compras/ModalEliminacionCompra";

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [comprasFiltradas, setComprasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [compraEditada, setCompraEditada] = useState(null);
  const [compraAEliminar, setCompraAEliminar] = useState(null);
  // Alinear las claves con los inputs del modal: id_empleado, fecha_compra, total_compra
  const [nuevaCompra, setNuevaCompra] = useState({
    id_empleado: "",
    fecha_compra: "",
    total_compra: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCompra((prev) => ({ ...prev, [name]: value }));
  };

  const agregarCompra = async () => {
    // Requerir id_empleado (coincide con el input obligatorio del modal)
    if (!String(nuevaCompra.id_empleado).trim()) return;
    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarcompra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCompra),
      });
      if (!respuesta.ok) throw new Error("Error al guardar compra");
      setNuevaCompra({ id_empleado: "", fecha_compra: "", total_compra: "" });
      setMostrarModal(false);
      await obtenerCompras();
    } catch (error) {
      console.error("Error al agregar compra:", error);
      alert("No se pudo guardar la compra. Revisa la consola.");
    }
  };

  const abrirModalEdicion = (compra) => {
    setCompraEditada({ ...compra });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!String(compraEditada?.id_empleado || "").trim()) return;
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarcompra/${compraEditada.id_compra}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(compraEditada),
        }
      );
      if (!respuesta.ok) throw new Error("Error al actualizar compra");
      setMostrarModalEdicion(false);
      await obtenerCompras();
    } catch (error) {
      console.error("Error al editar compra:", error);
      alert("No se pudo actualizar la compra.");
    }
  };

  const abrirModalEliminacion = (compra) => {
    setCompraAEliminar(compra);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarcompra/${compraAEliminar.id_compra}`,
        { method: "DELETE" }
      );
      if (!respuesta.ok) throw new Error("Error al eliminar compra");
      setMostrarModalEliminar(false);
      setCompraAEliminar(null);
      await obtenerCompras();
    } catch (error) {
      console.error("Error al eliminar compra:", error);
      alert("No se pudo eliminar la compra.");
    }
  };

  const obtenerCompras = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/compras");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los clientes");
      }

      const datos = await respuesta.json();
      setCompras(datos);
      setComprasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
  };

  // Derivar las compras filtradas a partir del texto de búsqueda y las compras
  useEffect(() => {
    if (textoBusqueda.trim() === "") {
      setComprasFiltradas(compras);
      return;
    }

    const filtradas = compras.filter((compra) => {
      const t = textoBusqueda;
      return (
        String(compra.id_empleado).toLowerCase().includes(t) ||
        String(compra.id_cliente).toLowerCase().includes(t) ||
        String(compra.fecha_compra).toLowerCase().includes(t) ||
        String(compra.total_compra).toLowerCase().includes(t)
      );
    });

    setComprasFiltradas(filtradas);
  }, [textoBusqueda, compras]);
  useEffect(() => {
    obtenerCompras();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h4>Compras</h4>
        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
              + Nuevo Compra
            </Button>
          </Col>
        </Row>
        <TablaCompras
          compras={comprasFiltradas.slice(
            (paginaActual - 1) * elementosPorPagina,
            paginaActual * elementosPorPagina
          )}
          cargando={cargando}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}
          totalElementos={compras.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />
        <ModalRegistroCompra
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaCompra={nuevaCompra}
          manejarCambioInput={manejarCambioInput}
          agregarCompra={agregarCompra}
        />

        <ModalEdicionCompra
          mostrar={mostrarModalEdicion}
          setMostrar={setMostrarModalEdicion}
          compraEditada={compraEditada}
          setCompraEditada={setCompraEditada}
          guardarEdicion={guardarEdicion}
        />

        <ModalEliminacionCompra
          mostrar={mostrarModalEliminar}
          setMostrar={setMostrarModalEliminar}
          compra={compraAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />
      </Container>
    </>
  );
};
export default Compras;
