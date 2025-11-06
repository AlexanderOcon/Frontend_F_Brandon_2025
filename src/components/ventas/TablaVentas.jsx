import { Table, Spinner, Button } from "react-bootstrap";
import { useState } from "react";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

// Formatea fechas en estilo local corto (ej: 04/11/2025) sin modificar los datos
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleString("es-NI", {
      timeZone: "America/Managua",
      dateStyle: "short",
    });
  } catch {
    return dateStr;
  }
};

const TablaVentas = ({
  ventas,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
}) => {
  const [orden, setOrden] = useState({ campo: "id_venta", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  const ventasOrdenadas = [...ventas].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA ?? "").localeCompare(String(valorB ?? ""));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando) {
    return (
      <>
        <Spinner animation="border">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </>
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <BotonOrden campo="id_venta" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>

            <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
              ID Cliente
            </BotonOrden>

            <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
              ID Empleado
            </BotonOrden>

            <BotonOrden campo="fecha_venta" orden={orden} manejarOrden={manejarOrden}>
              Fecha Venta
            </BotonOrden>

            <BotonOrden campo="total_venta" orden={orden} manejarOrden={manejarOrden}>
              Total Venta
            </BotonOrden>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventasOrdenadas.map((venta) => {
            return (
              <tr key={venta.id_venta}>
                <td>{venta.id_venta}</td>
                <td>{venta.id_cliente}</td>
                <td>{venta.id_empleado}</td>
                <td>{formatDate(venta.fecha_venta)}</td>
                <td>{venta.total_venta}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEdicion(venta)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => abrirModalEliminacion(venta)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

export default TablaVentas;
