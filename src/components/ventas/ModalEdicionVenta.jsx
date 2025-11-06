import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionVenta = ({
  mostrar,
  setMostrar,
  ventaEditada,
  setVentaEditada,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setVentaEditada((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="id_cliente">
            <Form.Label>Cliente (ID)</Form.Label>
            <Form.Control
              type="text"
              name="id_cliente"
              value={ventaEditada?.id_cliente || ""}
              onChange={manejarCambio}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fecha_venta">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha_venta"
              value={ventaEditada?.fecha_venta || ""}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="id_empleado">
            <Form.Label>Empleado (ID)</Form.Label>
            <Form.Control
              type="text"
              name="id_empleado"
              value={ventaEditada?.id_empleado || ""}
              onChange={manejarCambio}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="total_venta">
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="number"
              name="total_venta"
              value={ventaEditada?.total_venta ?? ""}
              onChange={manejarCambio}
              min={0}
              step="0.01"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          // Coerce to string to avoid errors if id_cliente es number or undefined
          disabled={!String(ventaEditada?.id_cliente ?? "").trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionVenta;
