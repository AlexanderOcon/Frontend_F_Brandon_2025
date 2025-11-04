import { Modal, Button } from "react-bootstrap";

const ModalEliminacionCompra = ({ mostrar, setMostrar, compra, confirmarEliminacion }) => {
  const id = compra?.id_compra || compra?.folio || compra?.fecha_compra || "esta compra";
  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar la compra <strong>"{id}"</strong>?
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

export default ModalEliminacionCompra;
