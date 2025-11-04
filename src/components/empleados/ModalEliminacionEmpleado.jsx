import { Modal, Button } from "react-bootstrap";

const ModalEliminacionEmpleado = ({ mostrar, setMostrar, empleado, confirmarEliminacion }) => {
  const nombre = empleado ? `${empleado.primer_nombre || ""} ${empleado.primer_apellido || ""}`.trim() : "";
  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar al empleado <strong>"{nombre || empleado?.cargo || 'este empleado'}"</strong>?
        </p>
        <p className="text-muted small">Esta acción no se puede deshacer.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacion}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionEmpleado;
