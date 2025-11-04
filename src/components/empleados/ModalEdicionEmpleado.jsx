import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionEmpleado = ({
  mostrar,
  setMostrar,
  empleadoEditado,
  setEmpleadoEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setEmpleadoEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="primer_nombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={empleadoEditado?.primer_nombre}
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
              value={empleadoEditado?.segundo_nombre}
              onChange={manejarCambio}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="primer_apellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={empleadoEditado?.primer_apellido}
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
              value={empleadoEditado?.segundo_apellido}
              onChange={manejarCambio}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="tel"
              name="celular"
              value={empleadoEditado?.celular}
              onChange={manejarCambio}
              maxLength={20}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={empleadoEditado?.cargo}
              onChange={manejarCambio}
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fecha_contratacion">
            <Form.Label>Fecha de Contratación</Form.Label>
            <Form.Control
              type="date"
              name="fecha_contratacion"
              value={empleadoEditado?.fecha_contratacion}
              onChange={manejarCambio}
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
          disabled={!empleadoEditado?.primer_nombre?.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionEmpleado;
