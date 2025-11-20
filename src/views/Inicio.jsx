import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Inicio = () => {
  const navigate = useNavigate();
  return (
    <Container className="mt-5">
      <Card className="p-4 mb-4 text-center bg-light">
        <img src={logo} alt="Ferretería El Pez Cuezón" style={{ height: 64, marginBottom: 12 }} />
        <h1 className="mb-2">Bienvenida</h1>
        <p className="mb-1 text-muted">Ferretería El Pez Cuezón</p>
        <p className="mb-3 text-muted">Encuentra herramientas, materiales y suministros para tus proyectos.</p>
        <Button variant="primary" onClick={() => navigate('/catalogo')}>Ver catálogo</Button>
      </Card>

      <Row>
        <Col md={6} className="mb-3">
          <Card className="p-3">
            <h5>Ofertas de la semana</h5>
            <p className="text-muted">Revisa los mejores precios en herramientas seleccionadas.</p>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="p-3">
            <h5>Novedades</h5>
            <p className="text-muted">Incorporamos nuevos productos a nuestro catálogo.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Inicio;