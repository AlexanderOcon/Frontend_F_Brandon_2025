import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaClientes from "../components/clientes/TablaClientes";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroCliente from "../components/clientes/ModalRegistroCliente";
import ModalEdicionCliente from "../components/clientes/ModalEdicionCliente";
import ModalEliminacionCliente from "../components/clientes/ModalEliminacionCliente";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [clienteEditado, setClienteEditado] = useState(null);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    celular: "",
    cedula: "",
    direccion: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prev) => ({ ...prev, [name]: value }));
  };

  const abrirModalEdicion = (cliente) => {
    setClienteEditado({ ...cliente });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!clienteEditado?.primer_nombre?.trim()) return;
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarCliente/${clienteEditado.id_cliente}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clienteEditado),
        }
      );
      if (!respuesta.ok) throw new Error("Error al actualizar cliente");
      setMostrarModalEdicion(false);
      await obtenerClientes();
    } catch (error) {
      console.error("Error al editar cliente:", error);
      alert("No se pudo actualizar el cliente.");
    }
  };

  const abrirModalEliminacion = (cliente) => {
    setClienteAEliminar(cliente);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarcliente/${clienteAEliminar.id_cliente}`,
        { method: "DELETE" }
      );
      if (!respuesta.ok) throw new Error("Error al eliminar cliente");
      setMostrarModalEliminar(false);
      setClienteAEliminar(null);
      await obtenerClientes();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      alert("No se pudo eliminar el cliente.");
    }
  };

  const agregarCliente = async () => {
    if (!nuevoCliente.primer_nombre.trim()) return;
    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarcliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCliente),
      });
      if (!respuesta.ok) throw new Error("Error al guardar cliente");
      // Limpiar y cerrar
      setNuevoCliente({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        celular: "",
        cedula: "",
        direccion: "",
      });
      setMostrarModal(false);
      await obtenerClientes();
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      alert("No se pudo guardar el cliente. Revisa la consola.");
    }
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/clientes");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los clientes");
      }

      const datos = await respuesta.json();
      setClientes(datos);
      setClientesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = clientes.filter(
      (cliente) =>
        cliente.primer_nombre.toLowerCase().includes(texto) ||
        cliente.segundo_nombre.toLowerCase().includes(texto) ||
        cliente.primer_apellido.toLowerCase().includes(texto) ||
        cliente.segundo_apellido.toLowerCase().includes(texto) ||
        cliente.celular.toLowerCase().includes(texto) ||
        cliente.direccion.toLowerCase().includes(texto) ||
        cliente.cedula.toLowerCase().includes(texto)
    );
    setClientesFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const generarPDFClientes = () => {
    const doc = new jsPDF();
    const columnas = ["ID", "Nombre", "Celular", "Cédula", "Dirección"];
    const filas = clientesFiltrados.map((c) => [
      c.id_cliente ?? '',
      `${c.primer_nombre ?? ''} ${c.primer_apellido ?? ''}`.trim(),
      c.celular ?? '',
      c.cedula ?? '',
      c.direccion ?? ''
    ]);

    try {
      if (typeof autoTable === 'function') {
        autoTable(doc, { head: [columnas], body: filas, startY: 20 });
      } else if (typeof doc.autoTable === 'function') {
        doc.autoTable({ head: [columnas], body: filas, startY: 20 });
      } else {
        console.error('autoTable no disponible');
      }
    } catch (err) {
      console.error('Error generating PDF clientes', err, filas);
    }

    const fecha = new Date();
    const nombreArchivo = `clientes_${fecha.getFullYear()}${String(fecha.getMonth()+1).padStart(2,'0')}${String(fecha.getDate()).padStart(2,'0')}.pdf`;
    doc.save(nombreArchivo);
  };

  return (
    <>
      <Container className="mt-4">
        <h4>Clientes</h4>
        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button className="me-2" variant="secondary" onClick={generarPDFClientes}>
              Generar reporte PDF
            </Button>
            <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
              + Nuevo Cliente
            </Button>
          </Col>
        </Row>
        <TablaClientes
          clientes={clientesFiltrados.slice(
            (paginaActual - 1) * elementosPorPagina,
            paginaActual * elementosPorPagina
          )}
          cargando={cargando}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}
          totalElementos={clientes.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />
        <ModalRegistroCliente
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoCliente={nuevoCliente}
          manejarCambioInput={manejarCambioInput}
          agregarCliente={agregarCliente}
        />

        <ModalEdicionCliente
          mostrar={mostrarModalEdicion}
          setMostrar={setMostrarModalEdicion}
          clienteEditado={clienteEditado}
          setClienteEditado={setClienteEditado}
          guardarEdicion={guardarEdicion}
        />

        <ModalEliminacionCliente
          mostrar={mostrarModalEliminar}
          setMostrar={setMostrarModalEliminar}
          cliente={clienteAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />
      </Container>
    </>
  );
};
export default Clientes;