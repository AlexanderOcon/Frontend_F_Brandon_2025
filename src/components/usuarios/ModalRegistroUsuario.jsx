import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";

const ModalRegistroUsuario = ({
  mostrarModal,
  setMostrarModal,
  nuevoUsuario,
  manejarCambioInput,
  agregarUsuario,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="Usuario">
            <Form.Label>Nombre del Usuario</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              value={nuevoUsuario.usuario}
              onChange={manejarCambioInput}
              placeholder="Ej: JuanPerez"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Contraseña">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="contraseña"
                value={nuevoUsuario.contraseña}
                onChange={manejarCambioInput}
                placeholder="Ingrese la contraseña"
                maxLength={20}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} aria-hidden="true" />
                <span className="visually-hidden">
                  {showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                </span>
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarUsuario}
          disabled={!nuevoUsuario.usuario.trim()}
        >
          Guardar Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroUsuario;
