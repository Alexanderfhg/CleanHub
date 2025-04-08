import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from '../../components/ContactForm/ContactForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Contact.css';

/**
 * Contact page component that displays company contact information
 * and a contact form for user inquiries.
 */
const Contact = () => {
	return (
		<div>
			<Header />

			<Container className="contact-page py-5">
				<h1 className="text-center mb-5 display-5 fw-bold">Contact Us</h1>

				<Row className="g-4">
					{/* Contact Information */}
					<Col md={6} className="mb-4">
						<Card className="shadow-sm h-100">
							<Card.Body className="p-4">
								<h3 className="mb-4">
									<FaMapMarkerAlt className="me-2 text-primary" />
									Our Office
								</h3>

								<ListGroup variant="flush">
									<ListGroup.Item className="d-flex align-items-center border-0 px-0 py-3">
										<FaMapMarkerAlt className="me-3 text-muted fs-5" />
										<div>
											<h6 className="mb-0">Address</h6>
											<p className="mb-0 text-muted">
												Calle 123 #45-89
												<br />
												Bogotá D.C - Colombia
											</p>
										</div>
									</ListGroup.Item>

									<ListGroup.Item className="d-flex align-items-center border-0 px-0 py-3">
										<FaPhone className="me-3 text-muted fs-5" />
										<div>
											<h6 className="mb-0">Phone</h6>
											<p className="mb-0 text-muted">+57 11 1234-5678</p>
										</div>
									</ListGroup.Item>

									<ListGroup.Item className="d-flex align-items-center border-0 px-0 py-3">
										<FaEnvelope className="me-3 text-muted fs-5" />
										<div>
											<h6 className="mb-0">Email</h6>
											<p className="mb-0 text-muted">contact@cleanhub.com</p>
										</div>
									</ListGroup.Item>

									<ListGroup.Item className="d-flex align-items-center border-0 px-0 py-3">
										<FaClock className="me-3 text-muted fs-5" />
										<div>
											<h6 className="mb-0">Opening Hours</h6>
											<p className="mb-0 text-muted">
												Monday to Friday: 9:00 AM - 6:00 PM
												<br />
												Saturday: 9:00 AM - 1:00 PM
											</p>
										</div>
									</ListGroup.Item>
								</ListGroup>
							</Card.Body>
						</Card>
					</Col>

					{/* Contact Form */}
					<Col md={6}>
						<ContactForm />
					</Col>
				</Row>
			</Container>

			<Footer />
		</div>
	);
};

export default Contact;
