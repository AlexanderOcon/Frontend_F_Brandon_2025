import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaUsuarios from "../components/usuarios/TablaUsuarios";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroUsuario from "../components/usuarios/ModalRegistroUsuario";
import ModalEdicionUsuario from "../components/usuarios/ModalEdicionUsuario";
import ModalEliminacionUsuario from "../components/usuarios/ModalEliminacionUsuario";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "../supabaseClient";

const Usuarios = () => {
  const [usuarios, setusuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: "",
    contraseña: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const agregarUsuario = async () => {
    if (!nuevoUsuario.usuario.trim()) return;
    try {
      const { error } = await supabase.from('usuarios').insert([nuevoUsuario]);
      if (error) throw error;
      // Limpiar y cerrar
      setNuevoUsuario({ usuario: "", contraseña: "" });
      setMostrarModal(false);
      await obtenerUsuarios(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("No se pudo guardar el usuario. Revisa la consola.");
    }
  };

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditado({ ...usuario });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!usuarioEditado?.usuario?.trim()) return;
    try {
      const { error } = await supabase
        .from('usuarios')
        .update(usuarioEditado)
        .eq('id_usuario', usuarioEditado.id_usuario);
      if (error) throw error;
      setMostrarModalEdicion(false);
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("No se pudo actualizar el usuario.");
    }
  };

  const abrirModalEliminacion = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id_usuario', usuarioAEliminar.id_usuario);
      if (error) throw error;
      setMostrarModalEliminar(false);
      setUsuarioAEliminar(null);
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("No se pudo eliminar el usuario.");
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const { data, error } = await supabase.from('usuarios').select('*');
      if (error) throw error;
      setusuarios(data);
      setUsuariosFiltrados(data);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = usuarios.filter(
      (usuario) =>
        usuario.usuario.toLowerCase().includes(texto) ||
        usuario.contraseña.toLowerCase().includes(texto)
    );
    setUsuariosFiltrados(filtrados);
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const generarPDFUsuarios = () => {
    const doc = new jsPDF();
    const columnas = ["ID", "Usuario"];
    const filas = usuariosFiltrados.map(u => [u.id_usuario ?? '', u.usuario ?? '']);

    try {
      if (typeof autoTable === 'function') {
        autoTable(doc, { head: [columnas], body: filas, startY: 20 });
      } else if (typeof doc.autoTable === 'function') {
        doc.autoTable({ head: [columnas], body: filas, startY: 20 });
      }
    } catch (err) {
      console.error('Error generating PDF usuarios', err, filas);
    }

    const fecha = new Date();
    const nombreArchivo = `usuarios_${fecha.getFullYear()}${String(fecha.getMonth()+1).padStart(2,'0')}${String(fecha.getDate()).padStart(2,'0')}.pdf`;
    doc.save(nombreArchivo);
  };
  return (
    <>
      <Container className="mt-4">
        <h4>Usuarios</h4>
        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button className="me-2" variant="secondary" onClick={generarPDFUsuarios}>
              Generar reporte PDF
            </Button>
            <Button
              className="color-boton-registro"
              onClick={() => setMostrarModal(true)}
            >
              + Nuevo Usuario
            </Button>
          </Col>
        </Row>
        <TablaUsuarios
          usuarios={usuariosFiltrados.slice(
            (paginaActual - 1) * elementosPorPagina,
            paginaActual * elementosPorPagina
          )}
          cargando={cargando}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}
          totalElementos={usuarios.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />
        <ModalRegistroUsuario
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoUsuario={nuevoUsuario}
          manejarCambioInput={manejarCambioInput}
          agregarUsuario={agregarUsuario}
        />

        <ModalEdicionUsuario
          mostrar={mostrarModalEdicion}
          setMostrar={setMostrarModalEdicion}
          usuarioEditado={usuarioEditado}
          setUsuarioEditado={setUsuarioEditado}
          guardarEdicion={guardarEdicion}
        />

        <ModalEliminacionUsuario
          mostrar={mostrarModalEliminar}
          setMostrar={setMostrarModalEliminar}
          usuario={usuarioAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />
      </Container>
    </>
  );
};
export default Usuarios;