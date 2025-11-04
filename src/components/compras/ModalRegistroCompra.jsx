import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroCompra = ({
  mostrarModal,
  setMostrarModal,
  nuevaCompra,
  manejarCambioInput,
  agregarCompra,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="id_empleado">
                <Form.Label>ID Empleado</Form.Label>
                <Form.Control
                  type="text"
                  name="id_empleado"
                  value={nuevaCompra.id_empleado}
                  onChange={manejarCambioInput}
                  placeholder=""
                  maxLength={150}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="fecha_compra">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_compra"
                  value={nuevaCompra.fecha_compra}
                  onChange={manejarCambioInput}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="total_compra">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="number"
                  name="total_compra"
                  value={nuevaCompra.total_compra}
                  onChange={manejarCambioInput}
                  placeholder="0.00"
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
          onClick={agregarCompra}
          // habilitar cuando el campo requerido del modal (id_empleado) tenga valor
          disabled={!String(nuevaCompra.id_empleado || "").trim()}
        >
          Guardar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCompra;
