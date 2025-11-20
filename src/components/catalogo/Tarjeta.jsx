import React from "react";
import { Col, Card, Badge, Stack } from 'react-bootstrap';

const Tarjeta = ({ nombre_producto, descripcion_producto, precio_unitario, stock, id_categoria, imagen }) => {
  return (
    <Col lg={3} md={4} sm={6} className="mt-3 d-flex align-items-stretch">
      <Card className="w-100 h-100">
        <div style={{ overflow: 'hidden', height: 180 }}>
          <Card.Img
            variant="top"
            src={imagen ? `data:image/png;base64,${imagen}` : '/src/assets/placeholder.png'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <Card.Body className="d-flex flex-column">
          <Card.Title>
            <strong>{nombre_producto}</strong>
          </Card.Title>
          <Card.Text className="flex-grow-1">{descripcion_producto || 'Sin descripción'}</Card.Text>
          <Stack direction="horizontal" gap={2} className="mt-2">
            <Badge pill bg="primary">
              <i className="bi-currency-dollar"></i> {Number(precio_unitario).toFixed(2)}
            </Badge>
            <Badge pill bg="secondary">
              <i className="bi-box"></i> Stock: {stock}
            </Badge>
            <Badge pill bg="info">
              <i className="bi-tag"></i> Categoría: {id_categoria}
            </Badge>
          </Stack>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Tarjeta;