import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroVenta = ({
  mostrarModal,
  setMostrarModal,
  nuevaVenta,
  manejarCambioInput,
  agregarVenta,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="id_cliente">
                <Form.Label> ID Cliente</Form.Label>
                <Form.Control
                  type="text"
                  name="id_cliente"
                  value={nuevaVenta.id_cliente}
                  onChange={manejarCambioInput}
                  placeholder=""
                  maxLength={150}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="id_empleado">
                <Form.Label>ID Empleado</Form.Label>
                <Form.Control
                  type="text"
                  name="id_empleado"
                  value={nuevaVenta.id_empleado}
                  onChange={manejarCambioInput}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="fecha_venta">
                <Form.Label>Fecha Venta</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_venta"
                  value={nuevaVenta.fecha_venta}
                  onChange={manejarCambioInput}
                  placeholder="0.00"
                  min={0}
                  step="0.01"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="total_venta">
                <Form.Label>Total Venta</Form.Label>
                <Form.Control
                  type="number"
                  name="total_venta"
                  value={nuevaVenta.total_venta}
                  onChange={manejarCambioInput}
                  placeholder=""
                  min={0}
                  step="0.01"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarVenta}
          disabled={!nuevaVenta.id_cliente?.trim()}
        >
          Guardar Venta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroVenta;
