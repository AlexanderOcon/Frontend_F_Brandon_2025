import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCliente = ({
  mostrar,
  setMostrar,
  clienteEditado,
  setClienteEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setClienteEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="primer_nombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={clienteEditado?.primer_nombre}
              onChange={manejarCambio}
              maxLength={50}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="segundo_nombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={clienteEditado?.segundo_nombre}
              onChange={manejarCambio}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="primer_apellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={clienteEditado?.primer_apellido}
              onChange={manejarCambio}
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="segundo_apellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={clienteEditado?.segundo_apellido}
              onChange={manejarCambio}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="tel"
              name="celular"
              value={clienteEditado?.celular}
              onChange={manejarCambio}
              maxLength={20}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={clienteEditado?.cedula}
              onChange={manejarCambio}
              maxLength={30}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="direccion"
              value={clienteEditado?.direccion}
              onChange={manejarCambio}
              maxLength={200}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={!clienteEditado?.primer_nombre?.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCliente;
