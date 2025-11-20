import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Estadisticas = () => {
  const ventasData = {
    labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    datasets: [
      {
        label: "Ventas (USD)",
        data: [120, 200, 150, 220, 300, 180, 250],
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.3,
      },
    ],
  };

  const productosData = {
    labels: ["Tornillos", "Clavos", "Taladros", "Cemento", "Pintura"],
    datasets: [
      {
        label: "Unidades vendidas",
        data: [120, 95, 60, 40, 85],
        backgroundColor: [
          "#4dc9f6",
          "#f67019",
          "#f53794",
          "#537bc4",
          "#acc236",
        ],
      },
    ],
  };

  return (
    <Container className="mt-4">
      <h2>Estadísticas</h2>
      <Row className="mt-3">
        <Col md={8} sm={12} className="mb-3">
          <Card>
            <Card.Header>Ventas por día</Card.Header>
            <Card.Body>
              <Line data={ventasData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={12} className="mb-3">
          <Card>
            <Card.Header>Productos más vendidos</Card.Header>
            <Card.Body>
              <Bar data={productosData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Header>Distribución de ventas (ejemplo)</Card.Header>
            <Card.Body>
              <div style={{ maxWidth: 420, height: 300, margin: "0 auto" }}>
                <Pie
                  data={productosData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "bottom" } },
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
