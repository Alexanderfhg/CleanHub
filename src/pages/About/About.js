import { Container, Card, ListGroup, Row, Col } from 'react-bootstrap';
import { FaUniversity, FaBook, FaLaptopCode, FaUsers } from 'react-icons/fa';
import './About.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const About = () => {
	return (
		<div>
			<Header />

			<Container className="about-page py-5">
				<Card className="shadow-sm border-0">
					<Card.Body className="p-4 p-md-5">
						<h1 className="text-center mb-4 display-5 fw-bold">
							<FaUniversity className="me-2 text-primary" />
							Sobre el Proyecto
						</h1>

						<Row className="g-4">
							<Col md={6}>
								<div className="about-section mb-4">
									<h3 className="h4 mb-3">
										<FaUsers className="me-2 text-warning" />
										Objetivos de Aprendizaje
									</h3>
									<ul className="text-muted list-unstyled">
										<li className="mb-2">✔️ Aplicar conceptos de desarrollo de Single Page Applications (SPA)</li>
										<li className="mb-2">✔️ Implementar rutas y navegación entre componentes</li>
										<li className="mb-2">✔️ Practicar el manejo de estados y props en React</li>
										<li className="mb-2">✔️ Desarrollar interfaces responsivas con Bootstrap</li>
										<li className="mb-2">✔️ Implementar formularios con validaciones</li>
									</ul>
								</div>

								{/* Team Section */}
								<section className="about-section mb-4">
									<Container>
										<h2 className="text-center mb-5">
											<FaUsers className="me-2" /> Nuestro Equipo
										</h2>

										<Row className="g-4 justify-content-center">
											<Col md={6} lg={4}>
												<Card className="h-100 text-center team-card shadow-sm">
													<Card.Body>
														<div className="team-member-avatar mb-3">
															<div className="initials-badge bg-primary text-white">CG</div>
														</div>
														<Card.Title>Cristian Leonel Gómez Espitia</Card.Title>
														<Card.Text className="text-muted">Desarrollador Frontend</Card.Text>
													</Card.Body>
												</Card>
											</Col>

											<Col md={6} lg={4}>
												<Card className="h-100 text-center team-card shadow-sm">
													<Card.Body>
														<div className="team-member-avatar mb-3">
															<div className="initials-badge bg-primary text-white">FH</div>
														</div>
														<Card.Title>Freddy Alexander Herrera Garcia</Card.Title>
														<Card.Text className="text-muted">Diseñador UI/UX</Card.Text>
													</Card.Body>
												</Card>
											</Col>

											<Col md={6} lg={4}>
												<Card className="h-100 text-center team-card shadow-sm">
													<Card.Body>
														<div className="team-member-avatar mb-3">
															<div className="initials-badge bg-primary text-white">DA</div>
														</div>
														<Card.Title>Deiby Paul Ariza Lozano</Card.Title>
														<Card.Text className="text-muted">Gestor de Proyecto</Card.Text>
													</Card.Body>
												</Card>
											</Col>
										</Row>
									</Container>
								</section>
							</Col>

							<Col md={6}>
								<div className="about-section mb-4">
									<h3 className="h4 mb-3">
										<FaBook className="me-2 text-success" />
										Propósito Académico
									</h3>
									<p className="text-muted">
										Este proyecto fue desarrollado como parte de la materia <strong>FrontEnd</strong>
										de la <strong>Institución Universitaria Politécnico Grancolombiano</strong>, con el objetivo
										principal de poner en práctica los conocimientos adquiridos durante el curso.
									</p>
								</div>

								<div className="about-section mb-4">
									<h3 className="h4 mb-3">
										<FaUniversity className="me-2 text-secondary" />
										Agradecimiento
									</h3>
									<p className="text-muted">
										Este proyecto fue posible gracias al conocimiento impartido por los docentes del Politécnico
										Grancolombiano, quienes brindaron las herramientas necesarias para el desarrollo de aplicaciones web
										modernas.
									</p>
								</div>

								<div className="about-section mb-4">
									<h3 className="h4 mb-3">
										<FaLaptopCode className="me-2 text-info" />
										Tecnologías Utilizadas
									</h3>
									<ListGroup variant="flush">
										<ListGroup.Item className="d-flex align-items-center">
											<span className="badge bg-primary me-2">React</span>
											Biblioteca principal para el desarrollo de la interfaz
										</ListGroup.Item>
										<ListGroup.Item className="d-flex align-items-center">
											<span className="badge bg-success me-2">Bootstrap</span>
											Framework para el diseño responsive
										</ListGroup.Item>
										<ListGroup.Item className="d-flex align-items-center">
											<span className="badge bg-danger me-2">React Router</span>
											Manejo de navegación entre páginas
										</ListGroup.Item>
									</ListGroup>
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Container>

			<Footer />
		</div>
	);
};

export default About;
