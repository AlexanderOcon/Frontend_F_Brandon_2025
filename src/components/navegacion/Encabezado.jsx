import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const Encabezado = () => {
	const [expanded, setExpanded] = useState(false);
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const handleNavigate = (ruta) => {
		navigate(ruta);
		setExpanded(false);
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<Navbar bg="primary" expand="md" expanded={expanded} fixed="top" className="text-white">
			<Container>
				<Navbar.Brand onClick={() => handleNavigate("/")} className="text-white fw-bold" style={{ cursor: "pointer" }}>
					Ferretería
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded((s) => !s)} className="bg-light" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link onClick={() => handleNavigate("/")}>Inicio</Nav.Link>
						<Nav.Link onClick={() => handleNavigate("/categorias")}>Categorías</Nav.Link>
						<Nav.Link onClick={() => handleNavigate("/productos")}>Productos</Nav.Link>
						<Nav.Link onClick={() => handleNavigate("/ventas")}>Ventas</Nav.Link>
						<Nav.Link onClick={() => handleNavigate("/clientes")}>Clientes</Nav.Link>
						<Nav.Link onClick={() => handleNavigate("/empleados")}>Empleados</Nav.Link>
						<Nav.Link onClick={() => handleNavigate("/usuarios")}>Usuarios</Nav.Link>
						<Nav.Link onClick={() => handleNavigate("/compras")}>Compras</Nav.Link>
						<Nav.Link onClick={() => handleNavigate("/catalogo")}>Catálogo</Nav.Link>
					</Nav>
					<Nav>
						{user ? (
							<>
								<Nav.Link onClick={() => handleNavigate("/estadisticas")} className="text-white">Estadísticas</Nav.Link>
								<Nav.Link onClick={handleLogout} className="text-white">Cerrar sesión</Nav.Link>
							</>
						) : (
							<Nav.Link onClick={() => handleNavigate("/login")} className="text-white">Iniciar sesión</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Encabezado;

