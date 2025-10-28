import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
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
                  value={nuevoCliente.primer_nombre}
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
                  value={nuevoCliente.segundo_nombre}
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
                  value={nuevoCliente.primer_apellido}
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
                  value={nuevoCliente.segundo_apellido}
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
                  value={nuevoCliente.celular}
                  onChange={manejarCambioInput}
                  placeholder="Número de celular"
                  maxLength={20}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="cedula">
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  type="text"
                  name="cedula"
                  value={nuevoCliente.cedula}
                  onChange={manejarCambioInput}
                  placeholder="Cédula"
                  maxLength={30}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Dirección"
              maxLength={200}
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
          onClick={agregarCliente}
          disabled={!nuevoCliente.primer_nombre?.trim()}
        >
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;
