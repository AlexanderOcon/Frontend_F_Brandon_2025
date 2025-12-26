import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaCategorias from "../components/categorias/TablaCategoria";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";
import ModalEdicionCategoria from "../components/categorias/ModalEdicionCategoria";
import ModalEliminacionCategoria from "../components/categorias/ModalEliminacionCategoria";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "../supabaseClient";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de productos por página

  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  // Calcular productos paginados
// Calcular productos paginados
const categoriasPaginadas = categoriasFiltradas.slice(
  (paginaActual - 1) * elementosPorPagina,
  paginaActual * elementosPorPagina
);



  const abrirModalEdicion = (categoria) => {
    setCategoriaEditada({ ...categoria });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!categoriaEditada.nombre_categoria.trim()) return;
    try {
      const { error } = await supabase
        .from('categorias')
        .update(categoriaEditada)
        .eq('id_categoria', categoriaEditada.id_categoria);
      if (error) throw error;
      setMostrarModalEdicion(false);
      await obtenerCategorias();
    } catch (error) {
      console.error("Error al editar categoría:", error);
      alert("No se pudo actualizar la categoría.");
    }
  };

  const abrirModalEliminacion = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const { error } = await supabase
        .from('categorias')
        .delete()
        .eq('id_categoria', categoriaAEliminar.id_categoria);
      if (error) throw error;
      setMostrarModalEliminar(false);
      setCategoriaAEliminar(null);
      await obtenerCategorias();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      alert("No se pudo eliminar la categoría.");
    }
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const agregarCategoria = async () => {
    if (!nuevaCategoria.nombre_categoria.trim()) return;
    try {
      const { error } = await supabase.from('categorias').insert([nuevaCategoria]);
      if (error) throw error;
      // Limpiar y cerrar
      setNuevaCategoria({ nombre_categoria: "", descripcion_categoria: "" });
      setMostrarModal(false);
      await obtenerCategorias(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar categoría:", error);
      alert("No se pudo guardar la categoría. Revisa la consola.");
    }
  };

  const obtenerCategorias = async () => {
    try {
      const { data, error } = await supabase.from('categorias').select('*');
      if (error) throw error;
      setCategorias(data);
      setCategoriasFiltradas(data);
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = categorias.filter(
      (categoria) =>
        categoria.nombre_categoria.toLowerCase().includes(texto) ||
        categoria.descripcion_categoria.toLowerCase().includes(texto)
    );
    setCategoriasFiltradas(filtradas);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const generarPDFCategorias = () => {
    const doc = new jsPDF();
    const columnas = ["ID", "Nombre", "Descripción"];
    const filas = categoriasFiltradas.map(cat => [cat.id_categoria ?? '', cat.nombre_categoria ?? '', cat.descripcion_categoria ?? '']);

    try {
      if (typeof autoTable === 'function') {
        autoTable(doc, { head: [columnas], body: filas, startY: 20 });
      } else if (typeof doc.autoTable === 'function') {
        doc.autoTable({ head: [columnas], body: filas, startY: 20 });
      }
    } catch (err) {
      console.error('Error generating PDF categorias', err, filas);
    }

    const fecha = new Date();
    const nombreArchivo = `categorias_${fecha.getFullYear()}${String(fecha.getMonth()+1).padStart(2,'0')}${String(fecha.getDate()).padStart(2,'0')}.pdf`;
    doc.save(nombreArchivo);
  };

  return (
    <>
      <Container className="mt-4">
        <h4> Categorias </h4>
        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button className="me-2" variant="secondary" onClick={generarPDFCategorias}>
              Generar reporte PDF
            </Button>
            <Button
              className="color-boton-registro"
              onClick={() => setMostrarModal(true)}
            >
              + Nueva Categoría
            </Button>
          </Col>
        </Row>

      <TablaCategorias
        categorias={categoriasPaginadas}
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={categorias.length} // Total de categorias
        elementosPorPagina={elementosPorPagina} // Elementos por página
        paginaActual={paginaActual} // Página actual
        establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
      />


        <ModalRegistroCategoria
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaCategoria={nuevaCategoria}
          manejarCambioInput={manejarCambioInput}
          agregarCategoria={agregarCategoria}
        />

        <ModalEdicionCategoria
          mostrar={mostrarModalEdicion}
          setMostrar={setMostrarModalEdicion}
          categoriaEditada={categoriaEditada}
          setCategoriaEditada={setCategoriaEditada}
          guardarEdicion={guardarEdicion}
        />

        <ModalEliminacionCategoria
          mostrar={mostrarModalEliminar}
          setMostrar={setMostrarModalEliminar}
          categoria={categoriaAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />
      </Container>
    </>
  );
};

export default Categorias;
