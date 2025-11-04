import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="primer_nombre">
                <Form.Label>Primer Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="primer_nombre"
                  value={nuevoEmpleado.primer_nombre}
                  onChange={manejarCambioInput}
                  placeholder="Primer nombre"
                  maxLength={50}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="segundo_nombre">
                <Form.Label>Segundo Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="segundo_nombre"
                  value={nuevoEmpleado.segundo_nombre}
                  onChange={manejarCambioInput}
                  placeholder="Segundo nombre (opcional)"
                  maxLength={50}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="primer_apellido">
                <Form.Label>Primer Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="primer_apellido"
                  value={nuevoEmpleado.primer_apellido}
                  onChange={manejarCambioInput}
                  placeholder="Primer apellido"
                  maxLength={50}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="segundo_apellido">
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="segundo_apellido"
                  value={nuevoEmpleado.segundo_apellido}
                  onChange={manejarCambioInput}
                  placeholder="Segundo apellido (opcional)"
                  maxLength={50}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="celular">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="tel"
                  name="celular"
                  value={nuevoEmpleado.celular}
                  onChange={manejarCambioInput}
                  placeholder="Número de celular"
                  maxLength={20}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="cargo">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  type="text"
                  name="cargo"
                  value={nuevoEmpleado.cargo}
                  onChange={manejarCambioInput}
                  placeholder="Cargo"
                  maxLength={100}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="fecha_contratacion">
            <Form.Label>Fecha de Contratación</Form.Label>
            <Form.Control
              type="date"
              name="fecha_contratacion"
              value={nuevoEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarEmpleado}
          disabled={!nuevoEmpleado.primer_nombre?.trim()}
        >
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;
